fetch('ranked_profiles.csv')
    .then(response => {
        if (!response.ok) {
            throw new Error('CSV dosyası yüklenemedi!');
        }
        return response.text();
    })
    .then(data => {
        const table = document.getElementById('ranking-table');
        const rows = data.split('\n').filter(row => row.trim() !== '');

        const header = rows.shift();

        const parsedRows = rows.map(row => {
            const cols = row.split(/\s+/).filter(col => col.trim() !== '');
            return {
                teamNumber: parseInt(cols[1]),
                totalPoints: parseFloat(cols[cols.length - 1])
            };
        });

        parsedRows.sort((a, b) => b.totalPoints - a.totalPoints);

        const headerRow = document.createElement('tr');
        headerRow.classList.add('scoreboard');

        const th1 = document.createElement('th');
        th1.textContent = 'Team Number';
        headerRow.appendChild(th1);

        const th2 = document.createElement('th');
        th2.textContent = 'Total Points';
        headerRow.appendChild(th2);

        table.appendChild(headerRow);

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