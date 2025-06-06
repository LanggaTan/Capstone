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
          // Simpan token jika diperlukan: localStorage.setItem("token", data.token);
          window.location.href = "home.html"; // redirect ke halaman utama
        } else {
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
