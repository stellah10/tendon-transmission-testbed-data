function updateOptions() {

    const transmission =
        document.getElementById("transmission").value;

    const constraintContainer =
        document.getElementById("constraintContainer");

    if (transmission === "pulley") {
        constraintContainer.hidden = true;
    } else {
        constraintContainer.hidden = false;
    }
}

async function showGraph() {

    const transmission =
        document.getElementById("transmission").value;

    const angle =
        document.getElementById("angle").value;

    let folder = "";

    if (transmission === "pulley") {
        folder = `graphs/pulley/${angle}`;
    } else {
        const constraint =
            document.getElementById("constraint").value;

        folder = `graphs/bowden/${constraint}/${angle}`;
    }

    console.log("Loading:", folder);

    try {

        const response =
            await fetch(`${folder}/summary.txt`);

        document.getElementById("summary").innerText =
            await response.text();

    } catch (e) {

        document.getElementById("summary").innerText =
            "No summary available.";
    }

    const graphContainer =
        document.getElementById("graphContainer");

    graphContainer.innerHTML = "";

    const trials = ["trial1.png", "trial2.png", "trial3.png"];

    for (const trial of trials) {

        const img = document.createElement("img");

        img.src = `${folder}/${trial}`;
        img.className = "graphImage";

        img.onclick = () => {

            const modal =
                document.getElementById("imageModal");

            const modalImg =
                document.getElementById("modalImage");

            modal.style.display = "block";
            modalImg.src = img.src;
        };

        graphContainer.appendChild(img);
    }
}