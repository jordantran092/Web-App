import 'dotenv/config';
import pg from 'pg';

console.log('SCRIPT STARTED');
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);

const url = new URL(process.env.DATABASE_URL);

console.log('PG USER:', url.username);
console.log('PG HOST:', url.hostname);
console.log('PG DATABASE:', url.pathname);
console.log('PASSWORD LENGTH:', url.password.length);
console.log('PASSWORD HAS SPECIAL URL CHARS:', /[@#%?:/&+]/.test(url.password));

const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

try {
    console.log('CONNECTING...');
    await client.connect();
    console.log('CONNECTED!');

    const result = await client.query('SELECT current_user, current_database()');

    console.log(result.rows);
} catch (error) {
    console.error('CONNECTION FAILED');
    console.error(error);
} finally {
    console.log('CLOSING...');
    await client.end().catch(console.error);
}
