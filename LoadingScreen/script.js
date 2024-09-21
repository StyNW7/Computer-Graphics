function move() {
    var elem = document.querySelector(".progressBar");
    var width = 0;
    var id = setInterval(frame, 100);

    function frame() {
        if (width >= 100) {
            clearInterval(id);
            document.getElementById("loadingScreen").style.display = 'none';
            window.location.href = '../minecraft.html';
        } else {
            width += 1.5;
            elem.style.width = width + '%';
        }
    }
}

move();

// Dark Mode Checker
const imgBackground = document.querySelector("#loadingScreen");

if (window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log("change to dark mode!");
        imgBackground.classList.add('dark');
    } else {
        console.log("change to light mode!");
        imgBackground.classList.remove('dark');
    }
} else {
    console.log("change to light mode!");
}
