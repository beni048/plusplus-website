
import { google } from 'googleapis';
import * as path from 'path';
import * as fs from 'fs';

// Load env vars from .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            const key = match[1].trim();
            const value = match[2].trim().replace(/^"(.*)"$/, '$1'); // Remove quotes if present
            process.env[key] = value;
        }
    });
}

async function debugDrive() {
    const folderId = process.env.GOOGLE_DRIVE_NEWS_FOLDER_ID;
    console.log('Folder ID:', folderId);

    if (!folderId) {
        console.error('GOOGLE_DRIVE_NEWS_FOLDER_ID not set');
        return;
    }

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    const drive = google.drive({ version: 'v3', auth });

    try {
        console.log('Listing files in folder...');
        const res = await drive.files.list({
            q: `'${folderId}' in parents and trashed = false`,
            fields: 'files(id, name, mimeType, parents)',
            supportsAllDrives: true,
            includeItemsFromAllDrives: true,
        });

        const files = res.data.files || [];
        console.log('Files found:', files.length);

        const filenameRegex = /^([^_]+)_([a-z]{2})_(.+)$/i;

        for (const file of files) {
            console.log(`\nFile: "${file.name}" (ID: ${file.id})`);

            // Check naming
            const match = (file.name || '').match(filenameRegex);
            if (match) {
                const [, id, lang, title] = match;
                console.log(`   ✅ VALID FORMAT: ${id} (${lang})`);
            } else {
                console.log(`   ❌ INVALID FORMAT`);
            }

            // Dump HTML for analysis
            if ((file.name?.includes('NEW2026001') || file.name?.includes('Magdalena')) && file.id) {
                console.log('Found target file! Fetching content...');
                try {
                    const exportRes = await drive.files.export({
                        fileId: file.id,
                        mimeType: 'text/html',
                    });
                    console.log('--- RAW HTML START ---');
                    console.log(exportRes.data);
                    console.log('--- RAW HTML END ---');
                } catch (e) {
                    console.error('Error exporting file:', e);
                }
            }
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

debugDrive();
