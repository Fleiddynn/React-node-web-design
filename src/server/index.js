import express from "express";
import mysql from "mysql";
import fs from "fs"; // Needed for file deletion
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
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
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

// Function to safely delete old image files
const deleteImageFile = (filePath) => {
    if (filePath) {
        const fullPath = path.join(__dirname, filePath);
        if (fs.existsSync(fullPath)) {
            fs.unlink(fullPath, (err) => {
                if (err) console.error("Eski resim silinirken hata oluştu:", err);
            });
        }
    }
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
        fiyat === '' ? null : Number(fiyat), // Convert empty string to null, otherwise to Number
        onlineFiyat === '' ? null : Number(onlineFiyat),
        kategori,
        egitimSuresi === '' ? null : egitimSuresi, // Assuming egitimSuresi can be text
        egitimYeri,
        egitimTakvimid === '' ? null : Number(egitimTakvimid), // Convert to Number for ID, or null
        egitimProgramid === '' ? null : Number(egitimProgramid), // Convert to Number for ID, or null
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Veritabanı hatası (POST /egitimler):', err);
            // If there was a file, delete it if the DB insert fails
            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlink(req.file.path, (unlinkErr) => {
                    if (unlinkErr) console.error("Failed to delete uploaded file:", unlinkErr);
                });
            }
            return res.status(500).json({ error: err.message });
        }
        res.json({ success: true, id: result.insertId });
    });
});

// UPDATED PUT ROUTE FOR EGITIMLER
app.put('/egitimler/:id', upload.single('resim'), async (req, res) => { // ADDED upload.single('resim')
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
        resimYolu: frontendResimYolu // Renamed to avoid conflict with req.file.path
    } = req.body; // req.body now only contains non-file fields

    console.log('--- Incoming PUT Request Body ---');
    console.log(req.body);
    console.log('--- Incoming PUT Request File ---');
    console.log(req.file);
    console.log('-----------------------------------');

    try {
        // 1. Get existing data from the database
        const existingEgitimResult = await queryPromise('SELECT * FROM egitimler WHERE id = ?', [id]);
        if (existingEgitimResult.length === 0) {
            return res.status(404).json({ error: 'Eğitim bulunamadı.' });
        }
        const existingEgitim = existingEgitimResult[0];

        // 2. Prepare fields for update, using new values or existing ones
        const updatedFields = {
            egitimAdi: egitimAdi !== undefined ? egitimAdi : existingEgitim.egitimAdi,
            egitimAciklamasi: egitimAciklamasi !== undefined ? egitimAciklamasi : existingEgitim.egitimAciklamasi,
            // Convert numeric fields to Number or null if empty string
            fiyat: fiyat === '' ? null : (fiyat !== undefined ? Number(fiyat) : existingEgitim.fiyat),
            onlineFiyat: onlineFiyat === '' ? null : (onlineFiyat !== undefined ? Number(onlineFiyat) : existingEgitim.onlineFiyat),
            kategori: kategori !== undefined ? kategori : existingEgitim.kategori,
            egitimSuresi: egitimSuresi !== undefined ? egitimSuresi : existingEgitim.egitimSuresi,
            egitimYeri: egitimYeri !== undefined ? egitimYeri : existingEgitim.egitimYeri,
            // Convert IDs to Number or null if empty string
            egitimTakvimid: egitimTakvimid === '' ? null : (egitimTakvimid !== undefined ? Number(egitimTakvimid) : existingEgitim.egitimTakvimid),
            egitimProgramid: egitimProgramid === '' ? null : (egitimProgramid !== undefined ? Number(egitimProgramid) : existingEgitim.egitimProgramid),
        };

        let newResimYolu = existingEgitim.resimYolu; // Start with current image path

        // 3. Handle image logic
        if (req.file) { // A new file was uploaded
            deleteImageFile(existingEgitim.resimYolu); // Delete old image if exists
            newResimYolu = req.file.path.replace(/\\/g, '/'); // Store new relative path
        } else if (frontendResimYolu === '') { // Frontend explicitly requested to remove image
            deleteImageFile(existingEgitim.resimYolu); // Delete old image
            newResimYolu = null; // Set to null in DB
        }
        // If req.file is null AND frontendResimYolu is not '', then newResimYolu remains existingEgitim.resimYolu

        updatedFields.resimYolu = newResimYolu;

        const query = `
            UPDATE egitimler SET
              egitimAdi = ?, egitimAciklamasi = ?, resimYolu = ?,
              fiyat = ?, onlineFiyat = ?, kategori = ?,
              egitimSuresi = ?, egitimYeri = ?,
              egitimTakvimid = ?, egitimProgramid = ?
            WHERE id = ?
        `;

        const values = [
            updatedFields.egitimAdi,
            updatedFields.egitimAciklamasi,
            updatedFields.resimYolu,
            updatedFields.fiyat,
            updatedFields.onlineFiyat,
            updatedFields.kategori,
            updatedFields.egitimSuresi,
            updatedFields.egitimYeri,
            updatedFields.egitimTakvimid,
            updatedFields.egitimProgramid,
            id
        ];

        const result = await queryPromise(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Güncellenecek eğitim bulunamadı.' });
        }
        res.json({ success: true, message: "Eğitim başarıyla güncellendi." });

    } catch (err) {
        console.error("Veritabanı güncelleme hatası (PUT /egitimler/:id):", err);
        // If a new file was uploaded but DB update failed, delete the new file
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlink(req.file.path, (unlinkErr) => {
                if (unlinkErr) console.error("Failed to delete newly uploaded file after DB error:", unlinkErr);
            });
        }
        res.status(500).json({ error: err.message || 'Sunucu hatası' });
    }
});

app.delete('/egitimler/:id', (req, res) => {
    const { id } = req.params;
    // Before deleting the record, get its image path to delete the file
    db.query('SELECT resimYolu FROM egitimler WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length > 0 && results[0].resimYolu) {
            deleteImageFile(results[0].resimYolu);
        }

        db.query('DELETE FROM egitimler WHERE id = ?', [id], (deleteErr, result) => {
            if (deleteErr) return res.status(500).json({ error: deleteErr.message });
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Eğitim bulunamadı' });
            res.json({ success: true });
        });
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
        hs.tarih || null, hs.gunler || null, hs.saatler || null, hs.sure || null, hs.yer || null, hs.ucret === '' ? null : Number(hs.ucret),
        hi.tarih || null, hi.gunler || null, hi.saatler || null, hi.sure || null, hi.yer || null, hi.ucret === '' ? null : Number(hi.ucret),
        ol.tarih || null, ol.gunler || null, ol.saatler || null, ol.sure || null, ol.yer || null, ol.ucret === '' ? null : Number(ol.ucret)
    ];

    try {
        await queryPromise(query, values);
        res.status(201).json({ success: true, message: 'Tablo başarıyla eklendi!' });
    } catch (err) {
        console.error('Tablo eklenirken hata oluştu (POST /api/addProgram):', err.message);
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
        console.error('Tablo getirilirken hata oluştu (GET /api/programs):', err.message);
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
        console.error(`ID ${id} ile tablo getirilirken hata oluştu (GET /api/programs/:id):`, err.message);
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
        hs.tarih || null, hs.gunler || null, hs.saatler || null, hs.sure || null, hs.yer || null, hs.ucret === '' ? null : Number(hs.ucret),
        hi.tarih || null, hi.gunler || null, hi.saatler || null, hi.sure || null, hi.yer || null, hi.ucret === '' ? null : Number(hi.ucret),
        ol.tarih || null, ol.gunler || null, ol.saatler || null, ol.sure || null, ol.yer || null, ol.ucret === '' ? null : Number(ol.ucret),
        id
    ];

    try {
        const result = await queryPromise(query, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Güncellenecek tablo bulunamadı.' });
        }
        res.status(200).json({ success: true, message: 'Tablo başarıyla güncellendi!' });
    } catch (err) {
        console.error('Tablo güncellenirken hata oluştu (PUT /api/programs/:id):', err.message);
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
        console.error('Tablo silinirken hata oluştu (DELETE /api/programs/:id):', err.message);
        res.status(500).json({ success: false, error: 'Tablo silinirken bir hata oluştu.', details: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is working on port: ${port}`);
});