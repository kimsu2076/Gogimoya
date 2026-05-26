const mysql = require('mysql2/promise');

/**
 * MySQL 커넥션 풀 설정
 * 환경: localhost:3306, 데이터베이스: kopodb
 */
const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'kopouser',
    password: 'kopouser',
    database: 'kopodb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
