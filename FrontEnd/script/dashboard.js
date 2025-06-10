document.addEventListener("DOMContentLoaded", () => {
    const history = JSON.parse(localStorage.getItem("scan_history")) || [];
    console.log("ISI scan_history:", history); // Tambahkan ini

    const tbody = document.querySelector(".history-table tbody");
    tbody.innerHTML = "";

    history.reverse().forEach((entry) => {
        const nut = Object.values(entry.nutrisi)[0];

        const row = document.createElement("tr");
        row.style.cursor = "pointer"; // Buat kelihatan bisa diklik
        row.innerHTML = `
    <td>
      <img src="${entry.image_url}" alt="food" style="width:40px;height:40px;border-radius:5px;margin-right:5px;">
      ${entry.food_names}
    </td>
    <td>${nut["Karbohidrat (CHO) (g)"]?.toFixed(2) || 0}</td>
    <td>${nut["Lemak (Fat) (g)"]?.toFixed(2) || 0}</td>
    <td>${nut["Protein (Protein) (g)"]?.toFixed(2) || 0}</td>
    <td>${entry.energi?.toFixed(2) || 0}</td>
    `;

        // ✅ Tambahkan event listener untuk klik baris
        row.addEventListener("click", () => {
            const selectedEntry = {
                ...entry,
                from_history: true, // ⬅️ tanda bahwa ini bukan scan baru
            };
            localStorage.setItem("scan_result", JSON.stringify(selectedEntry));
            window.location.href = "hasil.html";
        });
        tbody.appendChild(row);
    });

});
