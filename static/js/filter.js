const countersConfig = [
  // AUTONOMOUS
  { field: 'autoProcCounterAlgea', weight: 6.0, decreaseBtnId: 'autoProcDAlgea', increaseBtnId: 'autoProcIAlgea' },
  { field: 'autoBargeCounterAlgea', weight: 4.0, decreaseBtnId: 'autoBargeDAlgea', increaseBtnId: 'autoBargeIAlgea' },
  { field: 'autoCounterReefL1', weight: 3.0, decreaseBtnId: 'autoDReefL1', increaseBtnId: 'autoIReefL1' },
  { field: 'autoCounterReefL2', weight: 4.0, decreaseBtnId: 'autoDReefL2', increaseBtnId: 'autoIReefL2' },
  { field: 'autoCounterReefL3', weight: 6.0, decreaseBtnId: 'autoDReefL3', increaseBtnId: 'autoIReefL3' },
  { field: 'autoCounterReefL4', weight: 7.0, decreaseBtnId: 'autoDReefL4', increaseBtnId: 'autoIReefL4' },

  { field: 'autoCounterReefL1miss', weight: -0.5, decreaseBtnId: 'autoDReefL1miss', increaseBtnId: 'autoIReefL1miss' },
  { field: 'autoCounterReefL2miss', weight: -1.0, decreaseBtnId: 'autoDReefL2miss', increaseBtnId: 'autoIReefL2miss' },
  { field: 'autoCounterReefL3miss', weight: -1.5, decreaseBtnId: 'autoDReefL3miss', increaseBtnId: 'autoIReefL3miss' },
  { field: 'autoCounterReefL4miss', weight: -2.0, decreaseBtnId: 'autoDReefL4miss', increaseBtnId: 'autoIReefL4miss' },

  // TELEOP
  { field: 'teleopProcCounterAlgea', weight: 6.0, decreaseBtnId: 'teleopProcDAlgea', increaseBtnId: 'teleopProcIAlgea' },
  { field: 'teleopBargeCounterAlgea', weight: 4.0, decreaseBtnId: 'teleopBargeDAlgea', increaseBtnId: 'teleopBargeIAlgea' },
  { field: 'teleopCounterReefL1', weight: 2.0, decreaseBtnId: 'teleopDReefL1', increaseBtnId: 'teleopIReefL1' },
  { field: 'teleopCounterReefL2', weight: 3.0, decreaseBtnId: 'teleopDReefL2', increaseBtnId: 'teleopIReefL2' },
  { field: 'teleopCounterReefL3', weight: 4.0, decreaseBtnId: 'teleopDReefL3', increaseBtnId: 'teleopIReefL3' },
  { field: 'teleopCounterReefL4', weight: 5.0, decreaseBtnId: 'teleopDReefL4', increaseBtnId: 'teleopIReefL4' },

  { field: 'teleopCounterReefL1miss', weight: -0.5, decreaseBtnId: 'teleopDReefL1miss', increaseBtnId: 'teleopIReefL1miss' },
  { field: 'teleopCounterReefL2miss', weight: -1.0, decreaseBtnId: 'teleopDReefL2miss', increaseBtnId: 'teleopIReefL2miss' },
  { field: 'teleopCounterReefL3miss', weight: -1.5, decreaseBtnId: 'teleopDReefL3miss', increaseBtnId: 'teleopIReefL3miss' },
  { field: 'teleopCounterReefL4miss', weight: -2.0, decreaseBtnId: 'teleopDReefL4miss', increaseBtnId: 'teleopIReefL4miss' },
];
const cageWeights = {
  none: 2.0,
  deep: 12.0,
  shallow: 6.0
};

countersConfig.forEach(config => {
  const counterInput = document.getElementById(config.field);
  const decreaseBtn = document.getElementById(config.decreaseBtnId);
  const increaseBtn = document.getElementById(config.increaseBtnId);

  decreaseBtn.addEventListener('click', () => {
    let currentValue = parseInt(counterInput.value, 10) || 0;
    if (currentValue > 0) {
      counterInput.value = currentValue - 1;
    }
  });

  increaseBtn.addEventListener('click', () => {
    let currentValue = parseInt(counterInput.value, 10) || 0;
    counterInput.value = currentValue + 1;
  });
});

function fetchArray() {
  fetch(`${window.location.origin}/data_fetch`)
    .then(response => response.json())
    .then(data => console.log("Fetched data:", data))
    .catch(error => console.error("Error fetching data:", error));
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById("submit").onclick = async function () {
    const teamNumber = document.getElementById("teamNumber").value;
    let data = { teamNumber };
    let totalPoints = 0;

    countersConfig.forEach(config => {
      const counterValue = parseInt(document.getElementById(config.field).value, 10) || 0;
      const score = counterValue * config.weight;
      data[config.field] = score;
      totalPoints += score;
    });

    const cageTypeElement = document.querySelector('input[name="climb"]:checked');
    const cageValue = cageTypeElement ? cageTypeElement.value : "no";
    const cageScore = cageWeights[cageValue] || 0;
    data.cageScore = cageScore;
    totalPoints += cageScore;

    data.totalPoints = totalPoints;

    try {
      const response = await fetch(`${window.location.origin}/data_submit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log(result);

  } catch (error) {
      console.error('Error:', error);
  }
  };
});

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
    });
});
