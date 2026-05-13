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

    // Build folder path

    if (transmission === "pulley") {

        folder = `graphs/pulley/${angle}`;

    } else {

        const constraint =
            document.getElementById("constraint").value;

        folder = `graphs/bowden/${constraint}/${angle}`;
    }

    console.log("Loading from:", folder);

    // Load summary
    try {

        const response =
            await fetch(`${folder}/summary.txt`);

        const summary =
            await response.text();

        document.getElementById("summary").innerText =
            summary;

    } catch (error) {

        console.log("Summary load error:", error);

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

        const img = document.createElement("img");

        img.src = `${folder}/${trial}`;
        img.className = "graphImage";
        img.alt = trial;

        // click to enlarge
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

// Ensure DOM is ready before wiring modal + initial state
document.addEventListener("DOMContentLoaded", () => {

    updateOptions();

    const modal =
        document.getElementById("imageModal");

    const closeButton =
        document.getElementsByClassName("close")[0];

    closeButton.onclick = function () {
        modal.style.display = "none";
    };

    modal.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});