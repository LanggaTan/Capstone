# NutriTrack

NutriTrack adalah aplikasi berbasis web yang membantu pengguna melacak informasi nutrisi dan makanan yang dikonsumsi menggunakan teknologi pemindaian gambar makanan berbasis Machine Learning.

---

## 🚀 Fitur Utama

- Autentikasi Login & Register dengan JWT
- Isi & Edit data personal (berat badan, tinggi badan, usia, tujuan)
- Deteksi makanan berbasis gambar (Food Scan)
- Estimasi kalori dari gambar makanan (Flask + YOLOv5)
- Halaman profil dengan fitur update dan hapus akun

---

## 🧩 Struktur Proyek

```
NutriTrack/
│
├── backend/                 # Backend utama (Hapi.js)
│   ├── index.js
│   ├── routes/
│   └── models/
│
├── flask-backend/          # Backend ML (Flask + YOLO)
│   ├── app.py
│   ├── static/model/od.pt
│   └── ...
│
├── pages/                  # Frontend HTML
│   ├── login.html
│   ├── register.html
│   ├── profil.html
│   ├── fill-details.html
│   └── food-scan.html
│
├── assets/                 # Gambar, CSS
│
└── script/
    └── main.js
```

---

## ⚙️ Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/username/nutritrack.git
cd nutritrack
```

---

### 2. Setup Backend Hapi.js (Autentikasi & Data User)

```bash
cd backend
npm install
node index.js
```

> Jalankan di `http://localhost:3000`

---

### 3. Setup Backend Flask (Deteksi Makanan)

```bash
cd flask-backend

# (Opsional tapi disarankan)
python -m venv venv
source venv/bin/activate        # Linux/macOS
venv\Scripts\activate           # Windows

pip install -r requirements.txt
python app.py
```

> Jalankan di `http://localhost:5000`

---

### 4. Jalankan Frontend

Buka file HTML dari folder `pages/` menggunakan Live Server (VS Code) atau langsung klik file `.html`:

Contoh: `pages/login.html`

---

## 📸 Cara Menggunakan Fitur Food Scan

1. Login terlebih dahulu.
2. Akses halaman `food-scan.html`
3. Unggah gambar makanan.
4. Klik **"Scan"**
5. Gambar dikirim ke server Flask, dianalisis oleh YOLOv5, dan hasilnya ditampilkan di layar.

---

## 🔌 API Endpoint

### Backend Hapi.js (Port 3000)

| Endpoint               | Method | Keterangan                       |
|------------------------|--------|----------------------------------|
| `/api/register`        | POST   | Register akun                    |
| `/api/login`           | POST   | Login user, token disimpan       |
| `/api/fill-details`    | POST   | Isi data personal                |
| `/api/user-details`    | GET    | Ambil data personal              |
| `/api/profile`         | GET    | Ambil data profil                |
| `/api/profile`         | PUT    | Update data profil               |
| `/api/profile`         | DELETE | Hapus akun                       |

### Backend Flask (Port 5000)

| Endpoint     | Method | Keterangan                            |
|--------------|--------|----------------------------------------|
| `/predict`   | POST   | Terima gambar dan kembalikan hasil deteksi dan estimasi kalori |

---

## 📦 Dependency Utama

### Backend Hapi.js

- `@hapi/hapi`
- `jsonwebtoken`
- `bcrypt`
- `joi`
- `lowdb`

### Flask Backend

- `Flask`
- `torch`, `torchvision`
- `opencv-python`
- `Pillow`

---

## 🧠 Catatan Teknis

- Model YOLOv5 disimpan di `flask-backend/static/model/od.pt`
- Hasil deteksi dikirim sebagai gambar base64 + label kalori
- Kalori per makanan didefinisikan secara manual di frontend (`script/main.js`)
- Token JWT disimpan di browser menggunakan `localStorage`

---

## 👨‍💻 Pengembang

Dikembangkan oleh **[Nama Kamu]**  
Untuk keperluan **[Mata Kuliah / Proyek Tugas Akhir / Pribadi]**

---

## 📝 Lisensi

Proyek ini bebas digunakan untuk tujuan pembelajaran dan pengembangan. Untuk penggunaan komersial, mohon hubungi pengembang terlebih dahulu.

