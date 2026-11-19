import db from './config/db.js';

export async function semua() {
  const [rows] = await db.query('SELECT * FROM materi');
  return rows;
}

export async function tambah(dataBaru) {
  const { judul, mata_kuliah, pertemuan, link } = dataBaru;
  const query = 'INSERT INTO materi (judul, mata_kuliah, pertemuan, link) VALUES (?, ?, ?, ?)';
  const [result] = await db.execute(query, [judul, mata_kuliah, pertemuan, link]);
  return result.insertId;
}