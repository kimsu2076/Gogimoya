const db = require('./db');

async function inspect() {
    try {
        console.log('--- [gogimoya.BEEFCUTS_INTRO] 컬럼 정보 ---');
        const [introCols] = await db.query('DESCRIBE gogimoya.BEEFCUTS_INTRO');
        console.table(introCols);

        console.log('\n--- [gogimoya.BEEFCUTS_NAMES] 컬럼 정보 ---');
        const [namesCols] = await db.query('DESCRIBE gogimoya.BEEFCUTS_NAMES');
        console.table(namesCols);

        console.log('\n--- [gogimoya.BEEFCUTS_USES] 컬럼 정보 ---');
        const [usesCols] = await db.query('DESCRIBE gogimoya.BEEFCUTS_USES');
        console.table(usesCols);

        process.exit(0);
    } catch (err) {
        console.error('검사 중 오류 발생:', err);
        process.exit(1);
    }
}

inspect();
