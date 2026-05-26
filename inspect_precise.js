const db = require('./db');

async function inspect() {
    try {
        const tables = ['BEEFCUTS_INTRO', 'BEEFCUTS_NAMES', 'BEEFCUTS_USES'];
        for (const table of tables) {
            console.log(`\n--- [gogimoya.${table}] 컬럼 목록 ---`);
            const [cols] = await db.query(`SHOW COLUMNS FROM gogimoya.${table}`);
            console.log(cols.map(c => `'${c.Field}'`).join(', '));
            
            console.log(`--- [gogimoya.${table}] 데이터 샘플 (1행) ---`);
            const [rows] = await db.query(`SELECT * FROM gogimoya.${table} LIMIT 1`);
            console.log(rows[0]);
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

inspect();
