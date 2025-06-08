// Fungsi untuk memuat file HTML eksternal
function loadComponent(id, file, callback) {
  fetch(file)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;
      if (callback) callback();
    });
}

// Fungsi untuk memuat menu aktif
function setActiveSidebar() {
  const path = window.location.pathname.toLowerCase();
  let activeId = "";

  if (path.includes("dashboard")) activeId = "nav-dashboard";
  else if (
    path.includes("food-scan") ||
    path.includes("hasil") ||
    path.includes("rekomendasi")
  )
    activeId = "nav-foodscan";
  else if (path.includes("profil")) activeId = "nav-profil";
  else if (path.includes("logout")) activeId = "nav-logout";

  if (activeId) {
    const nav = document.getElementById(activeId);
    if (nav) nav.classList.add("active");
  }
}

// Load komponen
loadComponent("header", "header.html");
loadComponent("sidebar", "sidebar.html", setActiveSidebar);
loadComponent("footer", "footer.html");


// Fungsi Upload
const input = document.getElementById('product-image');
  const preview = document.getElementById('image-preview');

  input.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.setAttribute('src', this.result);
        preview.style.display = 'block';
      });

      reader.readAsDataURL(file);
    } else {
      preview.style.display = 'none';
    }
  });
