        let startX = parseInt(document.getElementById("startX").value);
        let startY = parseInt(document.getElementById("startY").value);
        let startZ = parseInt(document.getElementById("startZ").value);
        let endX = parseInt(document.getElementById("endX").value);
        let endY = parseInt(document.getElementById("endY").value);
        let endZ = parseInt(document.getElementById("endZ").value);
        let spacing = parseInt(document.getElementById("spacing").value);

  let debounceTimer;

function debounce(func, delay) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(func, delay);
}

function CalcUpdateOutput() {
    debounce(() => {
        let startX = parseInt(document.getElementById("startX").value);
        let startY = parseInt(document.getElementById("startY").value);
        let startZ = parseInt(document.getElementById("startZ").value);
        let endX = parseInt(document.getElementById("endX").value);
        let endY = parseInt(document.getElementById("endY").value);
        let endZ = parseInt(document.getElementById("endZ").value);
        let spacing = parseInt(document.getElementById("spacing").value);

        let calcConsole = document.getElementById("calc-console");
        let blockPositions = '';
        let hasMessage = false;

        if (isNaN(startX) || isNaN(startY) || isNaN(startZ) || isNaN(endX) || isNaN(endY) || isNaN(endZ) || isNaN(spacing)) {
            blockPositions = "Please enter all coordinates and spacing.";
            hasMessage = true;
        } else if (spacing < 1) {
            blockPositions = "Block spacing must be at least 1.";
            hasMessage = true;
        } else {
            let dx = Math.abs(endX - startX);
            let dy = Math.abs(endY - startY);
            let dz = Math.abs(endZ - startZ);
            let maxLength = Math.max(dx, dy, dz);
            let currentStep = 0;

            function calculateNextBlock() {
                if (currentStep <= maxLength) {
                    let x = Math.round(startX + currentStep * (endX - startX) / maxLength);
                    let y = Math.round(startY + currentStep * (endY - startY) / maxLength);
                    let z = Math.round(startZ + currentStep * (endZ - startZ) / maxLength);
                    blockPositions += `#${currentStep / spacing + 1}: ${x}, ${y}, ${z}<br>`;
                    calcConsole.innerHTML = blockPositions;
                    currentStep += spacing;
                    setTimeout(calculateNextBlock, 0);
                }
            }

            calculateNextBlock();
        }

        if (hasMessage) {
            calcConsole.innerHTML = blockPositions;
            calcConsole.classList.add("divparenttable");
        } else {
            calcConsole.classList.remove("divparenttable");
        }
    }, 300);
}

document.addEventListener("DOMContentLoaded", function(event) { CalcUpdateOutput(); });
