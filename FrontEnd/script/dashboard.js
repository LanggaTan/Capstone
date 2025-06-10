document.addEventListener("DOMContentLoaded", () => {
    const history = JSON.parse(localStorage.getItem("scan_history")) || [];
    console.log("ISI scan_history:", history); // Tambahkan ini

    const tbody = document.querySelector(".history-table tbody");
    tbody.innerHTML = "";

    // === RINGKASAN HARI INI ===
    const today = new Date().toISOString().slice(0, 10);
    let totalKalori = 0;
    let totalProtein = 0;
    let totalLemak = 0;
    let totalKarbo = 0;
    let totalItems = 0;

    history.forEach(entry => {
        const entryDate = new Date(entry.timestamp).toISOString().slice(0, 10);
        if (entryDate === today) {
            const nut = Object.values(entry.nutrisi)[0];
            totalItems++;
            totalKalori += entry.energi || 0;
            totalProtein += nut["Protein (Protein) (g)"] || 0;
            totalLemak += nut["Lemak (Fat) (g)"] || 0;
            totalKarbo += nut["Karbohidrat (CHO) (g)"] || 0;
        }
    });

    const avgProtein = totalItems ? (totalProtein / totalItems).toFixed(2) : 0;
    const avgLemak = totalItems ? (totalLemak / totalItems).toFixed(2) : 0;
    const avgKarbo = totalItems ? (totalKarbo / totalItems).toFixed(2) : 0;

    // Masukkan datanya ke dalam kartu Ringkasan Hari Ini
    document.querySelector(".summary-cards").innerHTML = `
        <div class="summary-card">
            <h4>Kalori</h4>
            <p><strong>${totalKalori.toFixed(2)} kcal</strong></p>
            <p>${totalItems} makanan hari ini</p>
        </div>
        <div class="summary-card">
            <h4>Nutrisi</h4>
            <p>Protein: ${avgProtein}g</p>
            <p>Lemak: ${avgLemak}g</p>
            <p>Karbo: ${avgKarbo}g</p>
        </div>
        <div class="summary-card">
            <h4>Progress</h4>
            <p>Data dari ${totalItems} scan hari ini</p>
        </div>
        `;


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
