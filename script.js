document.addEventListener("DOMContentLoaded", () => {

    // ---------------------------
    // INITIAL UI STATE
    // ---------------------------
    updateOptions();

    const modal =
        document.getElementById("imageModal");

    const closeButton =
        document.getElementsByClassName("close")[0];

    closeButton.onclick = () => {
        modal.style.display = "none";
    };

    modal.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // ---------------------------
    // FUNCTIONS
    // ---------------------------

    window.updateOptions = function () {

        const transmission =
            document.getElementById("transmission").value;

        const constraintContainer =
            document.getElementById("constraintContainer");

        constraintContainer.hidden =
            (transmission === "pulley");
    };

    window.showGraph = async function () {

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

        // Summary
        try {

            const response =
                await fetch(`${folder}/summary.txt`);

            const summary =
                await response.text();

            document.getElementById("summary").innerText =
                summary;

        } catch (e) {

            console.log(e);

            document.getElementById("summary").innerText =
                "No summary available.";
        }

        // Images
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

            img.src = `${folder}/${trial}`;
            img.className = "graphImage";
            img.alt = trial;

            img.onclick = () => {

                modal.style.display = "block";
                document.getElementById("modalImage").src =
                    img.src;
            };

            graphContainer.appendChild(img);
        }
    };

});