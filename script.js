function updateOptions() {

    const transmission =
        document.getElementById("transmission").value;

    const constraintContainer =
        document.getElementById("constraintContainer");

    if (transmission === "bowden") {
        constraintContainer.style.display = "block";
    }
    else {
        constraintContainer.style.display = "none";
    }
}

function showGraph() {

    const transmission =
        document.getElementById("transmission").value;

    const angle =
        document.getElementById("angle").value;

    let filename = "";

    if (transmission === "pulley") {

        filename =
            `graphs/pulley/${angle}.png`;
    }

    else {

        const constraint =
            document.getElementById("constraint").value;

        filename =
            `graphs/bowden/${constraint}/${angle}.png`;
    }

    console.log(filename);

    document.getElementById("graphImage").src =
        filename;
}

updateOptions();