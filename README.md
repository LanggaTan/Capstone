# Capstone
CC25 Project

# NutriTrack 🥗

**NutriTrack** adalah aplikasi web sederhana telah integrasi dengan sistem Machine Learning untuk penghitungan nutrisi dan rekomendasi makanan.

---

## 🚀 Fitur

- Autentikasi (Register & Login)
- Validasi input menggunakan Joi
- Hashing password dengan Bcrypt
- Penyimpanan pengguna sementara (in-memory array)
- Frontend dengan HTML, CSS, dan JavaScript Native
- (Planned) Integrasi Machine Learning untuk prediksi nutrisi/kesehatan

---

## 📁 Struktur Proyek

```

nutritrack/
├── FrontEnd/
│   ├── pages/
│   │   ├── login.html
│   │   └── regis.html
│   ├── assets/
│   │   ├── css/
│   │   └── images/
├── users.js
├── server.js
├── package.json
├── .gitignore
└── README.md

````

---

## 🛠️ Cara Menjalankan

1. **Clone repositori:**

2. **Install dependencies:**

```bash
npm install
```

3. **Jalankan server:**

```bash
node server.js
```

4. **Buka aplikasi di browser:**

```
http://localhost:3000
```

---

## 📡 API Endpoint

| Method | Endpoint        | Deskripsi           |
| ------ | --------------- | ------------------- |
| POST   | `/api/register` | Registrasi pengguna |
| POST   | `/api/login`    | Login pengguna      |

---

## 📦 Catatan `.gitignore`

Folder `node_modules/` **tidak diupload ke repo** untuk menghemat ruang. Pastikan setelah clone, kamu menjalankan:

```bash
npm install
```

Untuk mengunduh semua dependency yang dibutuhkan dari `package.json`.

---

## 🧠 Integrasi Machine Learning (Planned)

masih otw ehehehe

---

## 👨‍💻 Teknologi yang Digunakan

* Backend: Hapi.js, Joi, Bcrypt, JSON Web Token (JWT)
* Frontend: HTML, CSS, JavaScript (Vanilla)
* Tools: Node.js, VSCode, Postman


