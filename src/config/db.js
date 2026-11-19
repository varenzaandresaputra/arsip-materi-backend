import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'arsip_materi_2455202073',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Fungsi pengujian koneksi database dengan detail versi, database, dan user
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    
    // Menjalankan kueri untuk mendapatkan versi, nama database, dan user
    const [versionRows] = await connection.query('SELECT VERSION() as version');
    const [dbRows] = await connection.query('SELECT DATABASE() as dbname');
    const [userRows] = await connection.query('SELECT CURRENT_USER() as username');
    
    connection.release();

    // Menampilkan informasi detail ke terminal
    console.log('Berhasil terhubung ke database MySQL.');
    console.log(`- Versi Database : ${versionRows[0].version}`);
    console.log(`- Nama Database  : ${dbRows[0].dbname}`);
    console.log(`- Nama Pengguna  : ${userRows[0].username}`);
  } catch (error) {
    console.error('Gagal terhubung ke database MySQL:', error.message);
    throw error;
  }
}

export default pool;