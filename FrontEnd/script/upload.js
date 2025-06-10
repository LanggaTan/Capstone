// upload.js

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

// Form submission ke Flask
document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const fileInput = document.getElementById("product-image");
  const file = fileInput.files[0];

  if (!file) {
    Swal.fire("Gagal", "Silakan pilih gambar terlebih dahulu", "error");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.error) {
      Swal.fire("Gagal", result.error, "error");
      return;
    }

    // Simpan hasil ke localStorage
    localStorage.setItem("scan_result", JSON.stringify(result));
    // Redirect ke hasil.html
    window.location.href = "hasil.html";
  } catch (error) {
    Swal.fire("Error", "Terjadi kesalahan saat mengirim gambar", "error");
  }
});
