const db = require('./db');
const fs = require('fs');
const path = require('path');

async function inspectLanguages() {
    try {
        console.log('--- [gogimoya.GOGIMOYA_LANGUAGES] 데이터 확인 ---');
        const [rows] = await db.query('SELECT * FROM gogimoya.GOGIMOYA_LANGUAGES');
        console.table(rows);
        
        fs.writeFileSync('languages_data.json', JSON.stringify(rows, null, 2), 'utf-8');
        process.exit(0);
    } catch (err) {
        // 테이블이 없을 경우 대비
        console.error('GOGIMOYA_LANGUAGES 테이블이 존재하지 않거나 접근할 수 없습니다.');
        process.exit(1);
    }
}

inspectLanguages();
