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

    const graphContainer = document.getElementById("graphContainer");
    const summaryEl = document.getElementById("summary");

    // ALWAYS CLEAR FIRST
    graphContainer.innerHTML = "";
    summaryEl.innerText = "Loading...";

    const transmission = document.getElementById("transmission").value;
    const angle = document.getElementById("angle").value;

    let folder = "";

    if (transmission === "pulley") {
        folder = `graphs/pulley/${angle}`;
    } else {
        const constraint = document.getElementById("constraint").value;
        folder = `graphs/bowden/${constraint}/${angle}`;
    }

    console.log("Trying folder:", folder);

    // -----------------------
    // CHECK IF DATA EXISTS
    // -----------------------
    const summaryURL = `${folder}/summary.txt`;

    const response = await fetch(summaryURL, { cache: "no-store" });

    if (!response.ok) {
        summaryEl.innerText = "Still in progress.";
        graphContainer.innerHTML = ""; // ensure clean state
        return;
    }

    const summaryText = await response.text();

    if (summaryText.trim().startsWith("<!DOCTYPE html>")) {
        summaryEl.innerText = "Still in progress.";
        graphContainer.innerHTML = "";
        return;
    }

    summaryEl.innerText = summaryText;

    // -----------------------
    // LOAD IMAGES ONLY IF VALID
    // -----------------------
    const trials = ["trial1.png", "trial2.png", "trial3.png", "trial4.png"];

    for (const trial of trials) {
        const imgPath = `${folder}/${trial}`;

        const img = document.createElement("img");
        img.src = imgPath;
        img.className = "graphImage";
        img.alt = trial;

        img.onclick = () => openModal(imgPath);

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