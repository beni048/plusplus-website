import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Readable } from 'stream';

import archiver from 'archiver';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        // Extract fields
        const fields: Record<string, any> = {};
        const files: File[] = [];

        formData.forEach((value, key) => {
            if (value instanceof File) {
                files.push(value);
            } else {
                fields[key] = value;
            }
        });

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

        // Add files to archive
        for (const file of files) {
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
