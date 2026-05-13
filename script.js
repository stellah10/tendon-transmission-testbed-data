async function showGraph() {

    const transmission =
        document.getElementById("transmission").value;

    const angle =
        document.getElementById("angle").value;

    let folder = "";

    if (transmission === "pulley") {

        folder =
            `graphs/pulley/${angle}`;
    }

    else {

        const constraint =
            document.getElementById("constraint").value;

        folder =
            `graphs/bowden/${constraint}/${angle}`;
    }

    // Load summary text

    try {

        const response =
            await fetch(`${folder}/summary.txt`);

        const summary =
            await response.text();

        document.getElementById("summary").innerText =
            summary;
    }

    catch {

        document.getElementById("summary").innerText =
            "No summary available.";
    }

    // Display trial graphs

    const graphContainer =
        document.getElementById("graphContainer");

    graphContainer.innerHTML = "";

    const trials = [
        "trial1.png",
        "trial2.png",
        "trial3.png"
    ];

    for (const trial of trials) {

        const img =
            document.createElement("img");

        img.src =
            `${folder}/${trial}`;

        img.className = "graphImage";

        graphContainer.appendChild(img);
    }
}