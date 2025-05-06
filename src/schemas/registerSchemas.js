import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const SCHEMA_DIR = './'; // Adjust this if schema files are located elsewhere

async function registerSchema(filePath) {
    const raw = fs.readFileSync(filePath, 'utf8');
    const schema = JSON.parse(raw);
    const { database } = schema;

    const url = `https://api.wize.works/${database}/admin/schema`;
    const apiKey = process.env.WIZE_API_KEY;
    if (!apiKey) {
        throw new Error('WIZE_API_KEY environment variable is not set.');
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'wize-api-key': apiKey,
            },
            body: JSON.stringify(schema),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`HTTP ${response.status} - ${errorBody}`);
        }

        console.log(`✅ Successfully registered: ${path.basename(filePath)} -> ${url}`);
    } catch (err) {
        console.error(`❌ Failed to register ${path.basename(filePath)}:`, err.message);
    }
}

async function main() {
    const files = fs.readdirSync(SCHEMA_DIR).filter(f => f.endsWith('.json'));

    for (const file of files) {
        await registerSchema(path.join(SCHEMA_DIR, file));
    }
}

main().catch(console.error);