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
    rows.shift();

    const parsedRows = rows.map(row => {
      const cols = row.split(',').map(col => col.trim());
      const teamNumber = parseInt(cols[0]);
      const climbVal = parseFloat(cols[cols.length - 2]);
      let climb;
      if (climbVal === 2) {
        climb = "Barge Zone Park";
      } else if (climbVal === 6) {
        climb = "Shallow Climb";
      } else if (climbVal === 12) {
        climb = "Deep Climb";
      } else {
        climb = "None";
      }
      const totalPoints = parseFloat(cols[cols.length - 1]);
      return { teamNumber, climb, totalPoints };
    });

    parsedRows.sort((a, b) => b.totalPoints - a.totalPoints);

    const headerRow = document.createElement('tr');
    headerRow.classList.add('scoreboard');

    const th1 = document.createElement('th');
    th1.textContent = 'Team Number';
    headerRow.appendChild(th1);

    const th2 = document.createElement('th');
    th2.textContent = 'Climb';
    headerRow.appendChild(th2);

    const th3 = document.createElement('th');
    th3.textContent = 'Total Points';
    headerRow.appendChild(th3);

    table.appendChild(headerRow);

    parsedRows.forEach(({ teamNumber, climb, totalPoints }) => {
      const tr = document.createElement('tr');

      const td1 = document.createElement('td');
      td1.textContent = teamNumber;
      tr.appendChild(td1);

      const td2 = document.createElement('td');
      td2.textContent = climb;
      tr.appendChild(td2);

      const td3 = document.createElement('td');
      td3.textContent = totalPoints.toFixed(2);
      tr.appendChild(td3);

      table.appendChild(tr);
    });
  })
  .catch(error => console.error('Hata:', error));
