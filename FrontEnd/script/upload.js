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