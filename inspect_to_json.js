const db = require('./db');
const fs = require('fs');
const path = require('path');

async function inspect() {
    try {
        const results = {};
        const tables = ['BEEFCUTS_INTRO', 'BEEFCUTS_NAMES', 'BEEFCUTS_USES'];
        for (const table of tables) {
            const [cols] = await db.query(`SHOW COLUMNS FROM gogimoya.${table}`);
            results[table] = cols.map(c => c.Field);
        }
        const outputPath = path.join(__dirname, 'schema_info.json');
        fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');
        console.log('Written to ' + outputPath);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

inspect();
