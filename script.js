// ===============================
// UI TOGGLE
// ===============================
function updateOptions() {

    const transmission =
        document.getElementById("transmission").value;

    const constraintContainer =
        document.getElementById("constraintContainer");

    constraintContainer.hidden =
        (transmission === "pulley");
}


// ===============================
// MAIN GRAPH LOADER
// ===============================
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

    // ---------------------------
    // Summary
    // ---------------------------
    try {

        const response =
            await fetch(`${folder}/summary.txt`);

        document.getElementById("summary").innerText =
            await response.text();

    } catch (e) {

        console.log(e);

        document.getElementById("summary").innerText =
            "No summary available.";
    }

    // ---------------------------
    // Graph images
    // ---------------------------
    const graphContainer =
        document.getElementById("graphContainer");

    graphContainer.innerHTML = "";

    const response =
        await fetch(`${folder}/trials.json`);

    const trials =
        await response.json();

    for (const trial of trials) {

        const img = document.createElement("img");

        img.src = `${folder}/${trial}`;
        img.className = "graphImage";
        img.alt = trial;

        img.onclick = () => openModal(img.src);

        graphContainer.appendChild(img);
    }
}


// ===============================
// MODAL LOGIC
// ===============================
function openModal(imageSrc) {

    const modal =
        document.getElementById("imageModal");

    const modalImg =
        document.getElementById("modalImage");

    const downloadButton =
        document.getElementById("downloadButton");

    modalImg.src = imageSrc;

    // Convert image path to spreadsheet path
    const excelSrc =
        imageSrc.replace(".png", ".xlsx");

    downloadButton.href =
        excelSrc;

    // Extract filename only
    const fileName =
        excelSrc.split("/").pop();

    // Update button text dynamically
    downloadButton.innerText =
        `Open ${fileName} Data`;

    modal.style.display =
        "block";
}

function closeModal() {

    const modal =
        document.getElementById("imageModal");

    const modalImg =
        document.getElementById("modalImage");

    modal.style.display = "none";
    modalImg.src = "";
}


// ===============================
// INIT (runs once DOM is ready)
// ===============================
document.addEventListener("DOMContentLoaded", () => {

    const modal =
        document.getElementById("imageModal");

    const closeButton =
        document.querySelector(".close");

    // ---------------------------
    // SAFE GUARD (THIS IS CRITICAL)
    // ---------------------------
    if (!modal) {
        console.error("Modal not found in DOM");
        return;
    }

    if (closeButton) {

        closeButton.addEventListener("click", (e) => {
            e.stopPropagation(); // prevents bubbling issues
            closeModal();
        });

    } else {
        console.error("Close button not found (.close)");
    }

    // click outside image closes modal
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
});