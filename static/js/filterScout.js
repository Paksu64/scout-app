document.addEventListener("DOMContentLoaded", function () {
    filterSelection('auto');
});

function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("filterDiv");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
        if (x[i].classList.contains(c)) {
            x[i].style.display = "block"; // Göster
        } else {
            x[i].style.display = "none"; // Gizle
        }
    }

    updateTitle(c);
}

function updateTitle(c) {
    var title = document.getElementById("titleFilter");
    if (c === "auto") {
        title.textContent = "Autonomous";
    } else if (c === "teleop") {
        title.textContent = "Tele-Op";
    }
}