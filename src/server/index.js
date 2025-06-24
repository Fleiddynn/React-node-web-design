import express from "express";
import mysql from "mysql";
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
        console.log('MySQL bağlantı hatası:', err);
    } else {
        console.log('MySQL başarıyla bağlandı');
    }
});

const queryPromise = (sql, values) => {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

// --- API Endpoints ---
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

    const resimYolu = req.file ? req.file.path.replace(/\\/g, '/') : '';

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
          resimYolu = ?,
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

app.post('/api/addProgram', async (req, res) => {
    const { haftasonu, haftaici, online } = req.body;

    const hs = haftasonu || {};
    const hi = haftaici || {};
    const ol = online || {};

    const query = `
        INSERT INTO programlar (
            haftasonu_tarih, haftasonu_gunler, haftasonu_saatler, haftasonu_sure, haftasonu_yer, haftasonu_ucret,
            haftaici_tarih, haftaici_gunler, haftaici_saatler, haftaici_sure, haftaici_yer, haftaici_ucret,
            online_tarih, online_gunler, online_saatler, online_sure, online_yer, online_ucret
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        hs.tarih || null, hs.gunler || null, hs.saatler || null, hs.sure || null, hs.yer || null, hs.ucret || null,
        hi.tarih || null, hi.gunler || null, hi.saatler || null, hi.sure || null, hi.yer || null, hi.ucret || null,
        ol.tarih || null, ol.gunler || null, ol.saatler || null, ol.sure || null, ol.yer || null, ol.ucret || null
    ];

    try {
        await queryPromise(query, values);
        res.status(201).json({ success: true, message: 'Tablo başarıyla eklendi!' });
    } catch (err) {
        console.error('Tablo eklenirken hata oluştu:', err.message);
        res.status(500).json({ success: false, error: 'Tablo eklenirken bir hata oluştu.', details: err.message });
    }
});

app.get('/api/programs', async (req, res) => {
    try {
        const query = `SELECT * FROM programlar ORDER BY id DESC`;
        const results = await queryPromise(query);

        const formattedResults = results.map(row => {
            const newRow = { ...row };
            for (const key in newRow) {
                if (key.endsWith('_tarih') && newRow[key] instanceof Date) {
                    newRow[key] = newRow[key].toISOString().split('T')[0];
                }
            }
            return newRow;
        });

        res.json(formattedResults);
    } catch (err) {
        console.error('Tablo getirilirken hata oluştu:', err.message);
        res.status(500).json({ error: 'Tablo getirilirken bir hata oluştu.', details: err.message });
    }
});

app.get('/api/programs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = `SELECT * FROM programlar WHERE id = ?`;
        const results = await queryPromise(query, [id]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'Tablo bulunamadı.' });
        }

        const dbRow = results[0];
        const formattedRow = { ...dbRow };
        for (const key in formattedRow) {
            if (key.endsWith('_tarih') && formattedRow[key] instanceof Date) {
                formattedRow[key] = formattedRow[key].toISOString().split('T')[0];
            }
        }

        res.json(formattedRow);
    } catch (err) {
        console.error(`ID ${id} ile tablo getirilirken hata oluştu:`, err.message);
        res.status(500).json({ error: 'Tablo detayları getirilirken bir hata oluştu.', details: err.message });
    }
});

app.put('/api/programs/:id', async (req, res) => {
    const { id } = req.params;
    const { haftasonu, haftaici, online } = req.body;

    const hs = haftasonu || {};
    const hi = haftaici || {};
    const ol = online || {};

    const query = `
        UPDATE programlar SET
            haftasonu_tarih = ?, haftasonu_gunler = ?, haftasonu_saatler = ?, haftasonu_sure = ?, haftasonu_yer = ?, haftasonu_ucret = ?,
            haftaici_tarih = ?, haftaici_gunler = ?, haftaici_saatler = ?, haftaici_sure = ?, haftaici_yer = ?, haftaici_ucret = ?,
            online_tarih = ?, online_gunler = ?, online_saatler = ?, online_sure = ?, online_yer = ?, online_ucret = ?
        WHERE id = ?
    `;

    const values = [
        hs.tarih || null, hs.gunler || null, hs.saatler || null, hs.sure || null, hs.yer || null, hs.ucret || null,
        hi.tarih || null, hi.gunler || null, hi.saatler || null, hi.sure || null, hi.yer || null, hi.ucret || null,
        ol.tarih || null, ol.gunler || null, ol.saatler || null, ol.sure || null, ol.yer || null, ol.ucret || null,
        id
    ];

    try {
        const result = await queryPromise(query, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Güncellenecek tablo bulunamadı.' });
        }
        res.status(200).json({ success: true, message: 'Tablo başarıyla güncellendi!' });
    } catch (err) {
        console.error('Tablo güncellenirken hata oluştu:', err.message);
        res.status(500).json({ success: false, error: 'Tablo güncellenirken bir hata oluştu.', details: err.message });
    }
});

app.delete('/api/programs/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const query = `DELETE FROM programlar WHERE id = ?`;
        const result = await queryPromise(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Silinecek tablo bulunamadı.' });
        }
        res.status(200).json({ success: true, message: 'Tablo başarıyla silindi!' });
    } catch (err) {
        console.error('Tablo silinirken hata oluştu:', err.message);
        res.status(500).json({ success: false, error: 'Tablo silinirken bir hata oluştu.', details: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is working on port: ${port}`);
});