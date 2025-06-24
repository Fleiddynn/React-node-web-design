import express from "express";
import mysql from "mysql"
import fs from "fs";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const app = express();
const port = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dtp",
});

db.connect((err) => {
  if (err) {
    console.log('MySQL connection error:', err);
  } else {
    console.log('MySQL successfully connected');
  }
});

app.get('/egitimler', (req, res) => {
  db.query('SELECT * FROM egitimler', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/egitimler/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM egitimler WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Eğitim bulunamadı' });
    res.json(results[0]);
  });
});

app.post('/egitimler', upload.single('resim'), (req, res) => {
  const {
    egitimAdi,
    egitimAciklamasi,
    fiyat,
    onlineFiyat,
    kategori,
    egitimSuresi,
    egitimYeri,
    egitimTakvimid,
    egitimProgramid
  } = req.body;

  const resimYolu = req.file ? req.file.path.replace(/\\\\/g, '/') : '';

  const query = `
    INSERT INTO egitimler 
    (egitimAdi, egitimAciklamasi, resimYolu, fiyat, onlineFiyat, kategori, egitimSuresi, egitimYeri, egitimTakvimid, egitimProgramid)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    egitimAdi,
    egitimAciklamasi,
    resimYolu,
    fiyat || null,
    onlineFiyat || null,
    kategori,
    egitimSuresi || null,
    egitimYeri,
    egitimTakvimid || null,
    egitimProgramid || null,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Veritabanı hatası:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, id: result.insertId });
  });
});

app.put('/egitimler/:id', (req, res) => {
  const { id } = req.params;
  const {
    egitimAdi,
    egitimAciklamasi,
    fiyat,
    onlineFiyat,
    kategori,
    egitimSuresi,
    egitimYeri,
    egitimTakvimid,
    egitimProgramid,
    resimYolu
  } = req.body;

  const query = `
    UPDATE egitimler SET 
      egitimAdi = ?, 
      egitimAciklamasi = ?, 
      resimYolu = ?, -- <<< Her zaman güncellensin (null veya boş string de olabilir)
      fiyat = ?, 
      onlineFiyat = ?, 
      kategori = ?, 
      egitimSuresi = ?, 
      egitimYeri = ?, 
      egitimTakvimid = ?, 
      egitimProgramid = ?
    WHERE id = ?
  `;

  const values = [
    egitimAdi,
    egitimAciklamasi,
    resimYolu,
    fiyat,
    onlineFiyat,
    kategori,
    egitimSuresi,
    egitimYeri,
    egitimTakvimid,
    egitimProgramid,
    id
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Veritabanı güncelleme hatası:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, message: "Eğitim başarıyla güncellendi." });
  });
});

app.delete('/egitimler/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM egitimler WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.post('/admin/login', (req, res) => {
  const { username, sifre } = req.body;

  const ADMIN_USERNAME = "admin";
  const ADMIN_SIFRE = "1234";

  if (username === ADMIN_USERNAME && sifre === ADMIN_SIFRE) {
    return res.json({ success: true, token: "dummy_token" });
  } else {
    return res.status(401).json({ success: false, message: "Geçersiz kullanıcı adı veya şifre" });
  }
});


app.listen(port, () => {
    console.log(`Server is working on port: ${port}`);
  });