import { Router } from 'express';
import { semua, tambah } from './materi.repository.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const data = await semua();
    res.status(200).json(data);
  } catch (err) {
    console.error('Database Error:', err.message);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { judul, mata_kuliah } = req.body;

    if (!judul || !mata_kuliah) {
      return res.status(400).json({ error: 'Judul dan Mata Kuliah wajib diisi!' });
    }

    const insertId = await tambah(req.body);

    res.status(201).json({
      message: 'Materi berhasil ditambahkan',
      id: insertId
    });
  } catch (err) {
    console.error('Gagal insert database:', err.message);
    res.status(500).json({ error: 'Gagal menyimpan data ke database' });
  }
});

export default router;