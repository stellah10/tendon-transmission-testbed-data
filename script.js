function updateOptions() {

    const transmission =
        document.getElementById("transmission").value;

    const constraintContainer =
        document.getElementById("constraintContainer");

    // Hide constraint options for pulley

    if (transmission === "pulley") {

        constraintContainer.style.display = "none";
    }

    else {

        constraintContainer.style.display = "block";
    }
}

async function showGraph() {

    const transmission =
        document.getElementById("transmission").value;

    const angle =
        document.getElementById("angle").value;

    let folder = "";

    // Build folder path

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

    console.log(folder);

    // Load summary

    try {

        const response =
            await fetch(`${folder}/summary.txt`);

        const summary =
            await response.text();

        document.getElementById("summary").innerText =
            summary;
    }

    catch (error) {

        console.log(error);

        document.getElementById("summary").innerText =
            "No summary available.";
    }

    // Display trial images

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

        img.className =
            "graphImage";

        img.alt =
            trial;

        graphContainer.appendChild(img);
    }
}

// Run immediately when page loads

updateOptions();