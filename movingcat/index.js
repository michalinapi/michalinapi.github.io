
function jump() {

    const cat = document.getElementById("cat");
    if (cat.classList !== "animate") {
        cat.classList.add("animate");
    }

    setTimeout(function() {
        cat.classList.remove("animate");
    }, 500)

}

function move() {

    const cat = document.getElementById("cat");
    if (cat.classList !== "move") {
        cat.classList.add("move");
    }

    setTimeout(function() {
        cat.classList.remove("move");
    }, 500)

}

function flip() {
    const cat = document.getElementById("cat");
    if (cat.classList !== "flip") {
        cat.classList.add("flip");
    }

    setTimeout(function() {
        cat.classList.remove("flip");
    }, 500)
}