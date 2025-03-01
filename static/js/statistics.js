fetch('ranked_profiles.csv')
  .then(response => {
    if (!response.ok) {
      throw new Error('CSV dosyası yüklenemedi!');
    }
    return response.text();
  })
  .then(data => {
    // Use the table id "ranking_table" to match your HTML
    const table = document.getElementById('ranking_table');
    const rows = data.split('\n').filter(row => row.trim() !== '');

    // Remove the header row (if any)
    const header = rows.shift();

    // Parse each row assuming comma-separated values
    const parsedRows = rows.map(row => {
      // Split by comma and trim each column
      const cols = row.split(',').map(col => col.trim());
      return {
        teamNumber: parseInt(cols[1]),
        totalPoints: parseFloat(cols[cols.length - 1])
      };
    });

    // Sort rows by totalPoints in descending order
    parsedRows.sort((a, b) => b.totalPoints - a.totalPoints);

    // Create a header row for the table
    const headerRow = document.createElement('tr');
    headerRow.classList.add('scoreboard');

    const th1 = document.createElement('th');
    th1.textContent = 'Team Number';
    headerRow.appendChild(th1);

    const th2 = document.createElement('th');
    th2.textContent = 'Total Points';
    headerRow.appendChild(th2);

    table.appendChild(headerRow);

    // Populate the table with parsed rows
    parsedRows.forEach(({ teamNumber, totalPoints }) => {
      const tr = document.createElement('tr');

      const td1 = document.createElement('td');
      td1.textContent = teamNumber;
      tr.appendChild(td1);

      const td2 = document.createElement('td');
      td2.textContent = totalPoints.toFixed(2);
      tr.appendChild(td2);

      table.appendChild(tr);
    });
  })
  .catch(error => console.error('Hata:', error));
