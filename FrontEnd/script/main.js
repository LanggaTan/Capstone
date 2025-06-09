document.addEventListener("DOMContentLoaded", () => {
  const page = window.location.pathname.split("/").pop();
  const token = localStorage.getItem("token");

  if (
    [
      "dashboard.html",
      "fill-details.html",
      "food-scan.html",
      "profil.html",
      "hasil.html",
      "rekomendasi.html",
    ].includes(page) &&
    !token
  ) {
    Swal.fire({
      icon: "warning",
      title: "Perhatian",
      text: "Silakan login terlebih dahulu.",
    }).then(() => {
      window.location.href = "/pages/login.html";
    });
    return;
  }

  initLoginForm();
  initRegisterForm();
  initFillDetailsForm();
  if (page === "dashboard.html") fetchUserDetails();
});

function initLoginForm() {
  const form = document.querySelector(".login-form form");
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = form.email.value;
    const password = form.password.value;

    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      Swal.fire({
        icon: "success",
        title: "Login berhasil!",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        location.href = "dashboard.html";
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Login gagal",
        text: data.message,
      });
    }
  });
}

function initRegisterForm() {
  const form = document.querySelector(".signup-form form");
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const { name, mobile, email, password } = form;
    const res = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.value,
        mobile: mobile.value,
        username: email.value,
        password: password.value,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      Swal.fire({
        icon: "success",
        title: "Pendaftaran berhasil!",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        location.href = "login.html";
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Pendaftaran gagal",
        text: data.message,
      });
    }
  });
}

function initFillDetailsForm() {
  const form = document.querySelector(".fill-details-form form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Token tidak ditemukan",
        text: "Silakan login kembali.",
      }).then(() => {
        window.location.href = "/pages/login.html";
      });
      return;
    }

    const detail = {
      fullname: form.fullname.value,
      dob: form.dob.value,
      gender: form.querySelector("input[name='gender']:checked")?.value || "",
      weight: parseFloat(form["current-weight"].value),
      goal: form.goal.value,
      height: parseFloat(form.height.value),
    };

    try {
      const res = await fetch("http://localhost:3000/api/fill-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(detail),
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Data berhasil disimpan!",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "dashboard.html";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal menyimpan",
          text: data.message,
        });
        if (res.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/pages/login.html";
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Kesalahan jaringan",
        text: "Terjadi kesalahan saat mengirim data. Cek koneksi atau coba lagi.",
      });
      console.error("Fetch error:", error);
    }
  });
}

async function fetchUserDetails() {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:3000/api/user-details", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await res.json();

  if (result.status === "success") {
    const { fullname, dob, gender, weight, goal, height } = result.data;
    document.querySelector(".info-item:nth-child(1) p").textContent = fullname;
    document.querySelector(".info-item:nth-child(2) p").textContent = `${weight} kg`;
    document.querySelector(".info-item:nth-child(3) p").textContent = `${calculateAge(dob)} tahun`;
    document.querySelector(".info-item:nth-child(4) p").textContent = `${height} cm`;
    document.querySelector(".info-item:nth-child(5) p").textContent = gender;
    document.querySelector(".info-item:nth-child(6) p").textContent = goal;
  } else {
    Swal.fire({
      icon: "warning",
      title: "Data belum diisi!",
    }).then(() => {
      window.location.href = "/pages/fill-details.html";
    });
  }
}

function calculateAge(dobString) {
  const dob = new Date(dobString);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
}
