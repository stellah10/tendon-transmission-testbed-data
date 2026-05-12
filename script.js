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
            `graphs/pulley_${angle}.png`;
    }

    else {

        const constraint =
            document.getElementById("constraint").value;

        filename =
            `graphs/bowden_${constraint}_${angle}.png`;
    }

    document.getElementById("graphImage").src =
        filename;
}

updateOptions();