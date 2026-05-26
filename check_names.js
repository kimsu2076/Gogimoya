const db = require('./db');
const fs = require('fs');
const path = require('path');
async function run() {
    const [rows] = await db.query('SELECT 한국 FROM gogimoya.BEEFCUTS_NAMES');
    const outputPath = path.join(__dirname, 'names_list.txt');
    fs.writeFileSync(outputPath, rows.map(r => r.한국).join('\n'), 'utf-8');
    process.exit(0);
}
run();
