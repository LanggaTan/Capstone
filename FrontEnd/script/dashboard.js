document.addEventListener("DOMContentLoaded", () => {
  const history = JSON.parse(localStorage.getItem("scan_history")) || [];
  console.log("ISI scan_history:", history); // Tambahkan ini

  const tbody = document.querySelector(".history-table tbody");
  tbody.innerHTML = "";

  history.reverse().forEach((entry, i) => {
    console.log(`Entry ke-${i}:`, entry);

    const nut = Object.values(entry.nutrisi || {})[0];
    console.log(`Nutrisi ke-${i}:`, nut);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <img src="${entry.image_url}" alt="food" style="width:40px;height:40px;border-radius:5px;margin-right:5px;">
        ${entry.food_names}
      </td>
      <td>${parseFloat(nut?.["Karbohidrat (CHO) (g)"] || 0).toFixed(2)}</td>
      <td>${parseFloat(nut?.["Lemak (Fat) (g)"] || 0).toFixed(2)}</td>
      <td>${parseFloat(nut?.["Protein (Protein) (g)"] || 0).toFixed(2)}</td>
      <td>${parseFloat(entry.energi || 0).toFixed(2)}</td>
    `;
    tbody.appendChild(row);
  });
});
