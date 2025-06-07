// ==========================
// PROTEKSI HALAMAN TERLOGIN
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const protectedPages = ["dashboard.html", "fill-details.html"];
  const currentPage = window.location.pathname.split("/").pop();
  const token = localStorage.getItem("token");

  if (protectedPages.includes(currentPage) && !token) {
    alert("Silakan login terlebih dahulu.");
    window.location.href = "/pages/login.html";
    return;
  }

  // ... (login/register/logout handler lanjutan di sini)
});

// =====================
// HANDLER FOR LOGIN
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login-form form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          alert("Login berhasil!");
          localStorage.setItem("token", data.token); // simpan token JWT
          window.location.href = "dashboard.html"; // redirect ke halaman utama
        }
        else {
          alert("Login gagal: " + data.message);
        }
      } catch (error) {
        alert("Terjadi kesalahan pada saat login");
        console.error(error);
      }
    });
  }

  // =====================
  // HANDLER FOR REGISTER
  // =====================
  const registerForm = document.querySelector(".signup-form form");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const mobile = document.getElementById("mobile").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("http://localhost:3000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: email,
            password,
            name,
            mobile,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert("Pendaftaran berhasil!");
          window.location.href = "login.html"; // Arahkan ke login
        } else {
          alert("Pendaftaran gagal: " + data.message);
        }
      } catch (error) {
        alert("Terjadi kesalahan pada saat registrasi");
        console.error(error);
      }
    });
  }
});
// =====================
// HANDLER FOR LOGOUT
// =====================
const logoutButton = document.querySelector(".logout-link");
if (logoutButton) {
  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    alert("Logout berhasil!");
    window.location.href = "/pages/home.html";
  });
}
// =====================
// HANDLER FOR FILL DETAILS
// =====================
const fillDetailsForm = document.querySelector(".fill-details-form form");
if (fillDetailsForm) {
  fillDetailsForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Silakan login terlebih dahulu.");
      window.location.href = "/pages/login.html";
      return;
    }

    const fullname = document.getElementById("fullname").value;
    const dob = document.getElementById("dob").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const currentWeight = document.getElementById("current-weight").value;
    const goal = document.getElementById("goal").value;
    const height = document.getElementById("height").value;

    try {
      const response = await fetch("http://localhost:3000/api/fill-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullname,
          dob,
          gender,
          weight: currentWeight,
          goal,
          height,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Data berhasil disimpan!");
        window.location.href = "dashboard.html"; // Redirect ke dashboard
      } else {
        alert("Gagal menyimpan data: " + data.message);
      }
    } catch (error) {
      alert("Terjadi kesalahan saat menyimpan data");
      console.error(error);
    }
  });
}
