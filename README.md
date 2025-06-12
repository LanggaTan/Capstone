# NutriTrack

NutriTrack adalah aplikasi berbasis web yang membantu pengguna melacak asupan nutrisi harian dengan menggunakan teknologi deteksi makanan dari gambar berbasis Machine Learning.

---

## 🚀 Fitur Utama

- 📸 **Pindai Makanan dari Foto:** Pengguna dapat mengunggah gambar makanan, yang kemudian dianalisis oleh model Machine Learning untuk mengidentifikasi jenis makanan.
- 🍱 **Informasi Nutrisi Otomatis:** Setelah makanan dikenali, sistem menampilkan estimasi kalori serta informasi nutrisi terkait berdasarkan jenis makanan yang terdeteksi.
- 📊 **Catatan Nutrisi Harian:** Sistem mencatat hasil analisis makanan pengguna dalam log harian untuk membantu memantau total konsumsi kalori dan gizi per hari.

---

## 🧩 Struktur Proyek

```
Capstone/
│
├── Backend/                 # Backend utama (Hapi.js)
│   ├── index.js
│   ├── routes/
│   └── models/
│
├── Frontend/               # Frontend (HTML, CSS, JS)
│   ├── login.html
│   ├── register.html
│   ├── profil.html
│   ├── fill-details.html
│   └── food-scan.html
│
├── Testimg/                # Folder untuk Flask backend
│   └── testimg/
│       ├── app.py
│       ├── static/model/od.pt
│       └── ...
```

---

## ⚙️ Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/LanggaTan/Capstone.git
cd Capstone
```

---

### 2. Setup Backend Hapi.js (Autentikasi & Data User)

```bash
cd Backend
npm install
npm start
```

> Server berjalan di `http://localhost:3000`

---

### 3. Setup Backend Flask (Deteksi Makanan)

```bash
cd Testimg/testimg

# (Opsional tapi disarankan)
python -m venv venv
source venv/bin/activate        # Linux/macOS
venv\Scripts\activate           # Windows

pip install -r requirements.txt
python app.py
```

> Server berjalan di `http://localhost:5000`

---

## 📸 Cara Menggunakan Fitur Scan Makanan

1. Login terlebih dahulu.
2. Akses halaman `food-scan.html`
3. Unggah gambar makanan dari galeri atau kamera.
4. Klik tombol **"Scan"**
5. Gambar dikirim ke backend Flask, dideteksi menggunakan model YOLOv5
6. Sistem akan menampilkan jenis makanan dan estimasi kalori.
7. Hasilnya akan dicatat dalam log nutrisi harian pengguna.

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
| `/predict`   | POST   | Terima gambar dan kembalikan hasil deteksi + estimasi kalori |

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

- Model deteksi makanan menggunakan YOLOv5 disimpan di `Testimg/testimg/static/model/od.pt`
- Deteksi makanan akan mengembalikan gambar hasil anotasi + informasi kalori makanan.
- Estimasi kalori diatur manual dalam frontend (`main.js`)
- Token JWT disimpan di `localStorage` untuk akses endpoint yang membutuhkan otorisasi

---

## 👨‍💻 Pengembang

Proyek ini dikembangkan oleh **Kelompok Capstone CC25**  
Sebagai bagian dari tugas akhir Capstone Project

---

## 📝 Lisensi

Proyek ini bebas digunakan untuk tujuan pembelajaran dan penelitian.  
Untuk penggunaan komersial, harap hubungi pengembang terlebih dahulu.

