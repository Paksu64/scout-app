fetch('/load_rankings')
  .then(response => {
    if (!response.ok) {
      throw new Error('CSV dosyası yüklenemedi!');
    }
    return response.text();
  })
  .then(data => {
    const table = document.getElementById('ranking_table');
    const rows = data.split('\n').filter(row => row.trim() !== '');
    if (rows.length === 0) return;

    // Extract header row and split into columns.
    const headerLine = rows.shift();
    const headerCols = headerLine.split(',').map(col => col.trim());

    // Exclude any columns with "miss" in their header
    const includeIndices = headerCols
      .map((col, idx) => (col.toLowerCase().includes('miss') ? -1 : idx))
      .filter(idx => idx !== -1);

    // Build and append the filtered header row.
    const headerRow = document.createElement('tr');
    includeIndices.forEach(i => {
      const th = document.createElement('th');
      th.textContent = headerCols[i];
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Parse the remaining rows.
    const parsedRows = rows.map(row => row.split(',').map(col => col.trim()));

    // Assume totalPoints is in the last column of the original CSV.
    const totalPointsIndex = headerCols.length - 1;

    // Sort rows by totalPoints in descending order.
    parsedRows.sort((a, b) => parseFloat(b[totalPointsIndex]) - parseFloat(a[totalPointsIndex]));

    // Populate the table with filtered cells.
    parsedRows.forEach(cols => {
      const tr = document.createElement('tr');
      includeIndices.forEach(i => {
        const td = document.createElement('td');
        td.textContent = cols[i];
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });
  })
  .catch(error => console.error('Hata:', error));
