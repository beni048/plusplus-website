import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Readable } from 'stream';

import archiver from 'archiver';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        // Extract fields
        const rawFields: Record<string, any> = {};
        const files: File[] = [];

        formData.forEach((value, key) => {
            if (value instanceof File) {
                files.push(value);
            } else {
                try {
                    // Try to parse JSON strings (for nested objects)
                    rawFields[key] = JSON.parse(value as string);
                } catch {
                    rawFields[key] = value;
                }
            }
        });

        // Filter fields based on entity type to ensure clean export
        let fields: Record<string, any> = {};
        const entityType = rawFields.entityType;

        if (entityType === 'natural_person') {
            const allowedFields = [
                'entityType', 'firstName', 'lastName', 'email', 'phone',
                'dateOfBirth', 'nationality', 'idDocumentType',
                'street', 'houseNumber', 'zipCode', 'city', 'country',
                'amlProfile', 'specialClarifications'
            ];

            allowedFields.forEach(key => {
                if (rawFields[key] !== undefined) {
                    fields[key] = rawFields[key];
                }
            });
        } else if (entityType === 'legal_entity') {
            const allowedFields = [
                'entityType', 'companyName', 'legalEntityType',
                'dateOfIncorporation', 'commercialRegisterNumber',
                'domicileStreet', 'domicileHouseNumber', 'domicileZipCode', 'domicileCity', 'domicileCountry',

                // Opener & Signatories
                'openerFirstName', 'openerLastName', 'openerFunction', 'openerEmail', 'openerPhone',
                'openerStreet', 'openerHouseNumber', 'openerZipCode', 'openerCity', 'openerCountry',
                'openerDateOfBirth', 'openerNationality',
                'isOpenerAuthorizedSignatory', 'hasSecondSignatory', 'numberOfSignatories',
                'authorizedSignatory1', 'authorizedSignatory2',

                // Business Details
                'detailedBusinessActivity', 'sourceOfFunds',

                // Structure & People
                'managingDirectors',
                'hasOwnersMoreThan25Percent', 'ownersMoreThan25Percent',
                'economicBeneficiaries',

                // Foundation
                'foundationType', 'isFoundationRevocable', 'founder', 'isFounderDeceased',
                'foundationBoardMembers', 'foundationBeneficiaries', 'foundationBeneficiariesFixedClaim', 'nominationRights',

                // Trust
                'trustType', 'isTrustRevocable', 'settlor', 'isSettlorDeceased',
                'trustee', 'protector', 'trustBeneficiaries', 'trustBeneficiariesFixedClaim',

                // Clarifications
                'specialClarifications'
            ];

            allowedFields.forEach(key => {
                if (rawFields[key] !== undefined) {
                    fields[key] = rawFields[key];
                }
            });
        } else {
            // Fallback for safety
            fields = rawFields;
        }

        // Google Auth
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: [
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/spreadsheets',
            ],
        });

        const drive = google.drive({ version: 'v3', auth });
        const sheets = google.sheets({ version: 'v4', auth });

        const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
        const sheetId = process.env.GOOGLE_SHEET_ID;

        if (!folderId || !sheetId) {
            return NextResponse.json({ error: 'Server configuration error: Missing IDs' }, { status: 500 });
        }

        // Verify Folder Access
        try {
            await drive.files.get({
                fileId: folderId,
                supportsAllDrives: true
            });
        } catch (error) {
            console.error("Drive Access Error:", error);
            return NextResponse.json({
                error: `Service Account cannot access Drive Folder (${folderId}). Please share it with ${process.env.GOOGLE_CLIENT_EMAIL}`
            }, { status: 500 });
        }

        // 1. Create Zip File
        const archive = archiver('zip', { zlib: { level: 9 } });

        // We need to wait for the archive to finalize before we can upload
        const zipPromise = new Promise<Buffer>((resolve, reject) => {
            const buffers: Buffer[] = [];
            archive.on('data', (data) => buffers.push(data));
            archive.on('end', () => resolve(Buffer.concat(buffers as unknown as Uint8Array[])));
            archive.on('error', reject);
        });

        // Add files to archive with validation
        for (const file of files) {
            // Validate size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                return NextResponse.json({ error: `File ${file.name} exceeds 5MB limit` }, { status: 400 });
            }

            // Validate type
            // Validate type
            const allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
            if (!allowedMimeTypes.includes(file.type)) {
                return NextResponse.json({ error: `File ${file.name} type is not allowed (MIME: ${file.type})` }, { status: 400 });
            }

            // Validate extension (prevent spoofing exe as jpg if possible, though basic check)
            const lowerName = file.name.toLowerCase();
            const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png'];
            const hasValidExtension = allowedExtensions.some(ext => lowerName.endsWith(ext));

            if (!hasValidExtension) {
                return NextResponse.json({ error: `File ${file.name} extension is not allowed` }, { status: 400 });
            }

            // Simplification: just check size here as requested by user "maybe just allow low size data uploads".
            // Virus scan is hard without ClamAV etc.

            const buffer = Buffer.from(await file.arrayBuffer());
            archive.append(buffer, { name: file.name });
        }

        await archive.finalize();
        const zipBuffer = await zipPromise;
        const zipStream = Readable.from(zipBuffer);

        // Determine Zip Name
        let zipName = 'onboarding.zip';
        if (fields.entityType === 'natural_person') {
            zipName = `${fields.firstName}_${fields.lastName}_onboarding.zip`;
        } else {
            zipName = `${fields.companyName}_onboarding.zip`;
        }
        // Sanitize filename
        zipName = zipName.replace(/[^a-z0-9._-]/gi, '_');

        // 2. Upload Zip to Drive
        const driveResponse = await drive.files.create({
            requestBody: {
                name: zipName,
                parents: [folderId],
            },
            media: {
                mimeType: 'application/zip',
                body: zipStream,
            },
            supportsAllDrives: true,
        });

        const fileId = driveResponse.data.id;
        const fileLink = `https://drive.google.com/file/d/${fileId}/view`;

        // 3. Append Data to Sheets
        // First, get the correct sheet name
        const spreadsheet = await sheets.spreadsheets.get({
            spreadsheetId: sheetId,
        });

        const sheetName = spreadsheet.data.sheets?.[0]?.properties?.title || 'Sheet1';
        const range = `'${sheetName}'!A:A`;

        // Prepare row data (order must match your sheet headers)
        const rowData = [
            new Date().toISOString(), // Timestamp
            fields.entityType,
            fields.firstName || fields.companyName,
            fields.lastName || '',
            fields.email || '',
            // Add other fields as needed...
            JSON.stringify(fields), // Dump all data for now
            fileLink, // Link to the zip file
        ];

        await sheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: range,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [rowData],
            },
        });

        return NextResponse.json({ success: true, message: 'Application submitted successfully' });

    } catch (error: any) {
        console.error('Submission error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
