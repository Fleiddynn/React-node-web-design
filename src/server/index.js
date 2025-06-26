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

    let resimYolu = '';
    if (req.file) {
        resimYolu = 'uploads/' + path.basename(req.file.path);
        console.log("POST: Kaydedilen resimYolu:", resimYolu);
    }

    const query = `
        INSERT INTO egitimler
        (egitimAdi, egitimAciklamasi, resimYolu, fiyat, onlineFiyat, kategori, egitimSuresi, egitimYeri, egitimTakvimid, egitimProgramid)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        egitimAdi,
        egitimAciklamasi,
        resimYolu,
        fiyat === '' ? null : Number(fiyat),
        onlineFiyat === '' ? null : Number(onlineFiyat),
        kategori,
        egitimSuresi === '' ? null : egitimSuresi,
        egitimYeri,
        egitimTakvimid === '' ? null : Number(egitimTakvimid),
        egitimProgramid === '' ? null : Number(egitimProgramid),
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Veritabanı hatası (POST /egitimler):', err);
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

app.put('/egitimler/:id', upload.single('resim'), async (req, res) => {
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
        resimYolu: frontendResimYolu
    } = req.body;

    try {
        const existingEgitimResult = await queryPromise('SELECT * FROM egitimler WHERE id = ?', [id]);
        if (existingEgitimResult.length === 0) {
            return res.status(404).json({ error: 'Eğitim bulunamadı.' });
        }
        const existingEgitim = existingEgitimResult[0];

        const updatedFields = {
            egitimAdi: egitimAdi !== undefined ? egitimAdi : existingEgitim.egitimAdi,
            egitimAciklamasi: egitimAciklamasi !== undefined ? egitimAciklamasi : existingEgitim.egitimAciklamasi,
            fiyat: fiyat === '' ? null : (fiyat !== undefined ? Number(fiyat) : existingEgitim.fiyat),
            onlineFiyat: onlineFiyat === '' ? null : (onlineFiyat !== undefined ? Number(onlineFiyat) : existingEgitim.onlineFiyat),
            kategori: kategori !== undefined
                ? (Array.isArray(kategori) ? kategori.join(",") : kategori)
                : existingEgitim.kategori,
            egitimSuresi: egitimSuresi !== undefined ? egitimSuresi : existingEgitim.egitimSuresi,
            egitimYeri: egitimYeri !== undefined ? egitimYeri : existingEgitim.egitimYeri,
            egitimTakvimid: egitimTakvimid === '' ? null : (egitimTakvimid !== undefined ? Number(egitimTakvimid) : existingEgitim.egitimTakvimid),
            egitimProgramid: egitimProgramid === '' ? null : (egitimProgramid !== undefined ? Number(egitimProgramid) : existingEgitim.egitimProgramid),
        };

        let newResimYolu = existingEgitim.resimYolu;

        if (req.file) {
            deleteImageFile(existingEgitim.resimYolu);
            newResimYolu = 'uploads/' + path.basename(req.file.path);
            console.log("PUT: Yeni resimYolu:", newResimYolu);
        } else if (frontendResimYolu === '') {
            deleteImageFile(existingEgitim.resimYolu);
            newResimYolu = null;
            console.log("PUT: Resim silindi, resimYolu null oldu.");
        } else {
            newResimYolu = frontendResimYolu; 
            console.log("PUT: Mevcut resimYolu kullanılıyor:", newResimYolu);
        }

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

app.get('/api/egitim-programlari', async (req, res) => {
    try {
        const query = 'SELECT id, program_name FROM egitim_programlari ORDER BY id ASC';
        const results = await queryPromise(query);
        res.json(results);
    } catch (err) {
        console.error('Eğitim programı yapıları getirilirken hata oluştu (GET /api/egitim-programlari):', err.message);
        res.status(500).json({ error: 'Eğitim programı yapıları getirilirken bir hata oluştu.', details: err.message });
    }
});

app.get('/api/egitim-programlari/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'SELECT * FROM egitim_programlari WHERE id = ?';
        const results = await queryPromise(query, [id]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'Eğitim programı yapısı bulunamadı.' });
        }

        const program = results[0];
        program.program_sections = JSON.parse(program.program_sections);

        res.json(program);
    } catch (err) {
        console.error(`ID ${id} ile eğitim programı yapısı getirilirken hata oluştu (GET /api/egitim-programlari/:id):`, err.message);
        res.status(500).json({ error: 'Eğitim programı yapısı detayları getirilirken bir hata oluştu.', details: err.message });
    }
});

app.post('/api/egitim-programlari', async (req, res) => {
    const { program_name, program_sections } = req.body;

    let sectionsJson;
    if (Array.isArray(program_sections)) {
        sectionsJson = JSON.stringify(program_sections);
    } else {
        return res.status(400).json({ error: 'Program bölümleri (program_sections) bir dizi olmalıdır.' });
    }

    const query = `
        INSERT INTO egitim_programlari (program_name, program_sections)
        VALUES (?, ?)
    `;
    const values = [program_name, sectionsJson];

    try {
        const result = await queryPromise(query, values);
        res.status(201).json({ success: true, message: 'Eğitim programı yapısı başarıyla eklendi.', id: result.insertId });
    } catch (err) {
        console.error('Eğitim programı yapısı eklenirken hata oluştu (POST /api/egitim-programlari):', err.message);
        res.status(500).json({ success: false, error: 'Eğitim programı yapısı eklenirken bir hata oluştu.', details: err.message });
    }
});

app.put('/api/egitim-programlari/:id', async (req, res) => {
    const { id } = req.params;
    const { program_name, program_sections } = req.body;

    let sectionsJson;
    if (program_sections !== undefined) {
        if (Array.isArray(program_sections)) {
            sectionsJson = JSON.stringify(program_sections);
        } else {
            return res.status(400).json({ error: 'Program bölümleri (program_sections) bir dizi olmalıdır.' });
        }
    }

    try {
        const updateFields = [];
        const updateValues = [];

        if (program_name !== undefined) {
            updateFields.push('program_name = ?');
            updateValues.push(program_name);
        }
        if (program_sections !== undefined) {
            updateFields.push('program_sections = ?');
            updateValues.push(sectionsJson);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({ message: 'Güncellenecek veri sağlanmadı.' });
        }

        const query = `UPDATE egitim_programlari SET ${updateFields.join(', ')} WHERE id = ?`;
        updateValues.push(id);

        const result = await queryPromise(query, updateValues);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Güncellenecek eğitim programı yapısı bulunamadı.' });
        }
        res.status(200).json({ success: true, message: 'Eğitim programı yapısı başarıyla güncellendi!' });
    } catch (err) {
        console.error('Eğitim programı yapısı güncellenirken hata oluştu (PUT /api/egitim-programlari/:id):', err.message);
        res.status(500).json({ success: false, error: 'Eğitim programı yapısı güncellenirken bir hata oluştu.', details: err.message });
    }
});

app.delete('/api/egitim-programlari/:id', async (req, res) => {
    const { id } = req.params;
    try {
        console.log(`Attempting to delete egitim_programi with ID: ${id}`);

        const checkFkQuery = 'SELECT COUNT(*) AS count FROM egitimler WHERE egitimProgramid = ?';

        const [fkRows] = await queryPromise(checkFkQuery, [id]);

        const fkCount = (fkRows && fkRows.length > 0) ? fkRows[0].count : 0;

        if (fkCount > 0) {
            console.warn(`Attempted to delete egitim_programi ID ${id} but it is referenced by ${fkCount} egitimler.`);
            return res.status(400).json({
                error: `Bu eğitim programı yapısı (${id}), ${fkCount} adet eğitim tarafından kullanıldığı için silinemez. Lütfen önce bu program yapısını kullanan eğitimleri güncelleyin veya silin.`,
                details: 'Foreign key constraint violation.'
            });
        }

        const deleteQuery = 'DELETE FROM egitim_programlari WHERE id = ?';

        const result = await queryPromise(deleteQuery, [id]);

        if (result.affectedRows === 0) {
            console.warn(`Egitim programı yapısı ID ${id} bulunamadı.`);
            return res.status(404).json({ error: 'Eğitim programı yapısı bulunamadı.' });
        }

        console.log(`Egitim programı yapısı ID ${id} başarıyla silindi.`);
        res.status(200).json({ message: 'Eğitim programı yapısı başarıyla silindi.' });

    } catch (err) {
        console.error(`ERROR: Eğitim programı yapısı ID ${id} silinirken beklenmeyen hata oluştu:`, err);

        res.status(500).json({
            error: 'Eğitim programı yapısı silinirken sunucu tarafında beklenmeyen bir hata oluştu.',
            details: err.message
        });
    }
});

app.get('/api/egitimler-sorted', async (req, res) => {
    try {
        const egitimler = await queryPromise('SELECT * FROM egitimler');
        const programlar = await queryPromise('SELECT * FROM programlar');

        const programMap = new Map(programlar.map(p => [p.id, p]));

        const coursesWithDates = egitimler.map(course => {
            const programId = course.egitimTakvimid;
            const program = programMap.get(programId);
            let closestDate = null;
            let closestDateType = null;

            if (program) {
                const now = new Date();
                now.setHours(0, 0, 0, 0);

                const potentialDates = [];
                if (program.haftasonu_tarih) {
                    const date = new Date(program.haftasonu_tarih);
                    date.setHours(0, 0, 0, 0);
                    if (date >= now) {
                        potentialDates.push({ date: date, type: 'haftasonu' });
                    }
                }
                if (program.haftaici_tarih) {
                    const date = new Date(program.haftaici_tarih);
                    date.setHours(0, 0, 0, 0);
                    if (date >= now) {
                        potentialDates.push({ date: date, type: 'haftaici' });
                    }
                }
                if (program.online_tarih) {
                    const date = new Date(program.online_tarih);
                    date.setHours(0, 0, 0, 0);
                    if (date >= now) {
                        potentialDates.push({ date: date, type: 'online' });
                    }
                }

                if (potentialDates.length > 0) {
                    potentialDates.sort((a, b) => a.date.getTime() - b.date.getTime());
                    closestDate = potentialDates[0].date;
                    closestDateType = potentialDates[0].type;
                }
            }

            return {
                ...course,
                closestDate: closestDate ? closestDate.toISOString() : null,
                closestDateType: closestDateType
            };
        });

        const sortedCourses = coursesWithDates
            .filter(course => course.closestDate !== null)
            .sort((a, b) => new Date(a.closestDate).getTime() - new Date(b.closestDate).getTime());

        res.json(sortedCourses);

    } catch (err) {
        console.error('Eğitimler sıralanırken hata oluştu (GET /api/egitimler-sorted):', err.message);
        res.status(500).json({ error: 'Eğitimler getirilirken bir hata oluştu.', details: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is working on port: ${port}`);
});