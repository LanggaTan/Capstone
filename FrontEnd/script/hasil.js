document.addEventListener("DOMContentLoaded", () => {
  const result = JSON.parse(localStorage.getItem("scan_result"));

  if (!result || !result.nut_dict) {
    Swal.fire("Error", "Data hasil tidak ditemukan", "error");
    return;
  }

  const resultImg = document.getElementById("result-img");
  resultImg.src = result.image_url;
  resultImg.style.display = "block";
  document.getElementById("img-placeholder").style.display = "none";

  const foodNames = Object.keys(result.detected_objects).join(", ");
  document.getElementById("food-name").value = foodNames;

  const componentsList = document.getElementById("components-list");
  componentsList.innerHTML = "";

  let totalKalori = 0;

  for (const [name, nut] of Object.entries(result.nut_dict)) {
    const energi = nut["Energi (Energy) (Kal)"] || 0;
    const protein = nut["Protein (Protein) (g)"] || 0;
    const lemak = nut["Lemak (Fat) (g)"] || 0;
    const karbo = nut["Karbohidrat (CHO) (g)"] || 0;
    const gram = nut["gram"] || 0;

    totalKalori += energi;

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${name}</strong><br>
      Energi: ${energi.toFixed(2)} Kal<br>
      Protein: ${protein.toFixed(2)} g<br>
      Lemak: ${lemak.toFixed(2)} g<br>
      Karbohidrat: ${karbo.toFixed(2)} g<br>
      Berat: ${gram.toFixed(2)} gram
    `;
    componentsList.appendChild(li);
  }

  document.getElementById("total-calories").value = `${totalKalori.toFixed(2)} kal`;

  // ✅ Simpan ke riwayat DI DALAM block ini
  const scanHistory = JSON.parse(localStorage.getItem("scan_history")) || [];

  scanHistory.push({
    timestamp: new Date().toISOString(),
    image_url: result.image_url,
    food_names: foodNames,
    energi: totalKalori,
    nutrisi: result.nut_dict,
  });

  localStorage.setItem("scan_history", JSON.stringify(scanHistory));
});