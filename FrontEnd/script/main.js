document.addEventListener("DOMContentLoaded", () => {
  const page = window.location.pathname.split("/").pop();
  const token = localStorage.getItem("token");

  if (["dashboard.html", "fill-details.html"].includes(page) && !token) {
    alert("Silakan login terlebih dahulu.");
    return window.location.href = "/pages/login.html";
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
      alert("Login berhasil!");
      location.href = "dashboard.html";
    } else alert("Login gagal: " + data.message);
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
      body: JSON.stringify({ name: name.value, mobile: mobile.value, username: email.value, password: password.value }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Pendaftaran berhasil!");
      location.href = "login.html";
    } else alert("Pendaftaran gagal: " + data.message);
  });
}

function initFillDetailsForm() {
  const form = document.querySelector(".fill-details-form form");
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const detail = {
      fullname: form.fullname.value,
      dob: form.dob.value,
      gender: form.querySelector("input[name='gender']:checked").value,
      weight: parseFloat(form["current-weight"].value),
      goal: form.goal.value,
      height: parseFloat(form.height.value),
    };

    const res = await fetch("http://localhost:3000/api/fill-details", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify(detail),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Data berhasil disimpan!");
      location.href = "dashboard.html";
    } else alert("Gagal menyimpan: " + data.message);
  });
}

async function fetchUserDetails() {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:3000/api/user-details", {
    headers: { "Authorization": `Bearer ${token}` },
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
    alert("Data belum diisi!");
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

// Logout
const logout = document.querySelector(".logout-link");
if (logout) {
  logout.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    alert("Logout berhasil!");
    window.location.href = "/pages/home.html";
  });
}
