// main.js

// ============================
// Configurable Variables
// ============================

// Color Mapping for Each Block Type
const COLOR_MAP = {
    'A': '#1f77b4', // Blue
    'B': '#ff7f0e', // Orange
    'C': '#2ca02c', // Green
    'D': '#d62728', // Red
    'I': '#9467bd', // Purple
    'L': '#8c564b', // Brown
    'O': '#e377c2', // Pink
    'S': '#7f7f7f', // Gray
    'T': '#bcbd22', // Olive
    'U': '#17becf', // Cyan
    'X': '#ff9896'  // Light Coral
};

// SVG Generation Parameters
const SVG_PARAMS = {
    squareSize: 2,       // Size of each square in pixels
    strokeWidth: 0.1,    // Stroke width in pixels
    svgWidth: 40,        // Fixed SVG width for uniformity
    svgHeight: 40        // Fixed SVG height for uniformity
};

// Canvas Rendering Parameters
const CANVAS_PARAMS = {
    maxCanvasWidth: 600,  // Maximum canvas width in pixels
    maxCanvasHeight: 600, // Maximum canvas height in pixels
    maxCellSize: 40       // Maximum cell size in pixels to prevent oversized blocks
};

// ============================
// Block Definitions
// ============================

// Define all block shapes with their unique rotations and reflections
const BLOCKS = {
    'A': [ // Monomino
        [[1]]
    ],
    'B': [ // Domino
        [[1,1]],       // Horizontal
        [[1], [1]]     // Vertical
    ],
    'C': [ // Triomino I
        [[1,1,1]],     // Horizontal
        [[1], [1], [1]] // Vertical
    ],
    'D': [ // Triomino L
        [[1,0],
            [1,1]],       // Orientation 1
        [[0,1],
            [1,1]],       // Orientation 2
        [[1,1],
            [1,0]],       // Orientation 3
        [[1,1],
            [0,1]]        // Orientation 4
    ],
    'I': [ // Tetromino I
        [[1,1,1,1]],
        [[1],
            [1],
            [1],
            [1]]
    ],
    'L': [ // Tetromino L
        [[1,1,1],
            [1,0,0]],
        [[1,0],
            [1,0],
            [1,1]],
        [[0,0,1],
            [1,1,1]],
        [[1,1],
            [0,1],
            [0,1]]
    ],
    'O': [ // Tetromino O
        [[1,1],
            [1,1]]
    ],
    'S': [ // Tetromino S
        [[0,1,1],
            [1,1,0]],
        [[1,0],
            [1,1],
            [0,1]]
    ],
    'T': [ // Tetromino T
        [[1,1,1],
            [0,1,0]],
        [[0,1,0],
            [1,1,1]],
        [[1,0],
            [1,1],
            [1,0]],
        [[0,1],
            [1,1],
            [0,1]]
    ],
    'U': [ // Pentomino U
        [[1,0,1],
            [1,1,1]],
        [[1,1,1],
            [1,0,1]],
        [[1,1],
            [1,0],
            [1,1]],
        [[1,1],
            [0,1],
            [1,1]]
    ],
    'X': [ // Pentomino X
        [[0,1,0],
            [1,1,1],
            [0,1,0]]
    ]
};

// ============================
// SVG Generation Functions
// ============================

/**
 * Generates SVG content based on a given shape and color.
 * @param {Array<Array<number>>} shape - 2D array representing the block shape.
 * @param {string} blockColor - Hex color code for the block.
 * @returns {SVGElement} - Generated SVG element.
 */
function generateSVGContent(shape, blockColor) {
    const { squareSize, strokeWidth, svgWidth, svgHeight } = SVG_PARAMS;
    const maxRows = shape.length;
    let maxCols = 0;

    // Determine the maximum number of columns
    shape.forEach(row => {
        if (row.length > maxCols) {
            maxCols = row.length;
        }
    });

    // Calculate SVG viewBox dimensions
    const viewBoxWidth = maxCols * (squareSize + strokeWidth) + strokeWidth;
    const viewBoxHeight = maxRows * (squareSize + strokeWidth) + strokeWidth;

    // Create SVG namespace
    const svgNS = "http://www.w3.org/2000/svg";

    // Create SVG element
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("xmlns", svgNS);
    svg.setAttribute("role", "img");
    // Set viewBox based on shape size
    svg.setAttribute("viewBox", `0 0 ${viewBoxWidth} ${viewBoxHeight}`);
    // Set fixed width and height for uniformity
    svg.setAttribute("width", svgWidth);
    svg.setAttribute("height", svgHeight);

    // Create <title> for accessibility
    const title = document.createElementNS(svgNS, "title");
    title.textContent = "Block Shape";
    svg.appendChild(title);

    // Iterate over the shape to create squares
    shape.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell === 1) {
                const rect = document.createElementNS(svgNS, "rect");
                rect.setAttribute("width", squareSize);
                rect.setAttribute("height", squareSize);
                rect.setAttribute("x", colIndex * (squareSize + strokeWidth) + strokeWidth / 2);
                rect.setAttribute("y", rowIndex * (squareSize + strokeWidth) + strokeWidth / 2);
                rect.setAttribute("fill", blockColor);
                rect.setAttribute("stroke", "#000");
                rect.setAttribute("stroke-width", strokeWidth);
                svg.appendChild(rect);
            }
        });
    });

    return svg;
}

/**
 * Initializes SVG elements for each block type based on their shapes.
 */
function initializeSVGs() {
    // Iterate through each block type
    for (let block in BLOCKS) {
        if (BLOCKS.hasOwnProperty(block)) {
            const svgElement = document.getElementById(`svg-${block}`);
            if (svgElement) {
                const firstOrientation = BLOCKS[block][0];
                const blockColor = COLOR_MAP[block] || '#000'; // Default to black if color not defined
                const svgContent = generateSVGContent(firstOrientation, blockColor);
                svgElement.replaceWith(svgContent); // Replace empty SVG with generated content
            }
        }
    }
}

// ============================
// Utility Functions
// ============================

/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 * @param {Array} array - The array to shuffle.
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * Computes grid dimensions based on the total area, aiming for the most square-like grid.
 * @param {number} totalArea - Total area (width * height) of the grid.
 * @returns {Object} - Object containing 'width' and 'height' properties.
 */
function computeGridDimensions(totalArea) {
    let bestWidth = 1;
    let bestHeight = totalArea;
    let minDifference = totalArea - 1; // Initialize with maximum possible difference.

    for (let h = 1; h <= Math.sqrt(totalArea); h++) {
        if (totalArea % h === 0) {
            let w = totalArea / h;
            let diff = Math.abs(w - h);
            if (diff < minDifference) {
                minDifference = diff;
                bestWidth = w;
                bestHeight = h;
            }
        }
    }

    return { width: bestWidth, height: bestHeight };
}

// ============================
// Dancing Links (Algorithm X) Implementation
// ============================

class DancingLinks {
    constructor(columns, maxTimeMs = 10000) { // Default 10-second timeout
        this.header = new Node();
        this.columns = {};
        let last = this.header;
        this.startTime = performance.now(); // Record start time
        this.maxTimeMs = maxTimeMs;         // Time limit in milliseconds
        this.found = false;

        columns.forEach(col => {
            const column = new ColumnNode(col);
            this.columns[col] = column;
            last.right = column;
            column.left = last;
            last = column;
        });

        last.right = this.header;
        this.header.left = last;
    }

    search(k, solution, solutions) {
        const elapsedTime = performance.now() - this.startTime;

        // Stop if the elapsed time exceeds the allowed time
        if (elapsedTime > this.maxTimeMs) {
            console.warn('Algorithm stopped due to timeout.');
            return;
        }

        if (this.header.right === this.header) {
            solutions.push([...solution]);
            this.found = true;
            return;
        }

        // Find the column with the smallest size (fewest options)
        let min = Infinity;
        let chosenColumn = null;
        let tmp = this.header.right;
        while (tmp !== this.header) {
            if (tmp.size < min) {
                min = tmp.size;
                chosenColumn = tmp;
            }
            tmp = tmp.right;
        }

        if (chosenColumn === null || chosenColumn.size === 0) {
            return; // No possible solution
        }

        chosenColumn.cover();

        let row = chosenColumn.down;
        const rows = [];

        // Collect all rows in the chosen column
        while (row !== chosenColumn) {
            rows.push(row);
            row = row.down;
        }

        // Shuffle the rows to ensure random selection
        shuffle(rows);

        for (let i = 0; i < rows.length && !this.found; i++) {
            row = rows[i];
            solution.push(row);

            let j = row.right;
            while (j !== row) {
                j.column.cover();
                j = j.right;
            }

            this.search(k + 1, solution, solutions);

            // Backtrack
            solution.pop();
            j = row.left;
            while (j !== row) {
                j.column.uncover();
                j = j.left;
            }
        }

        chosenColumn.uncover();
    }
}



class Node {
    constructor() {
        this.left = this;
        this.right = this;
        this.up = this;
        this.down = this;
        this.column = null;
    }
}

class ColumnNode extends Node {
    constructor(name) {
        super();
        this.name = name;
        this.size = 0;
        this.column = this;
    }

    /**
     * Covers this column node, removing it from the header and unlinking its rows.
     */
    cover() {
        this.right.left = this.left;
        this.left.right = this.right;

        let i = this.down;
        while (i !== this) {
            let j = i.right;
            while (j !== i) {
                j.down.up = j.up;
                j.up.down = j.down;
                j.column.size--;
                j = j.right;
            }
            i = i.down;
        }
    }

    /**
     * Uncovers this column node, restoring it to the header and relinking its rows.
     */
    uncover() {
        let i = this.up;
        while (i !== this) {
            let j = i.left;
            while (j !== i) {
                j.column.size++;
                j.down.up = j;
                j.up.down = j;
                j = j.left;
            }
            i = i.up;
        }

        this.right.left = this;
        this.left.right = this;
    }
}

class DataNode extends Node {
    constructor(column) {
        super();
        this.column = column;
    }
}

// ============================
// Event Listeners and Handlers
// ============================

document.addEventListener('DOMContentLoaded', () => {
    initializeSVGs();
    updateGridDimensions();

    const solveBtn = document.getElementById('solve-btn');
    const resetBtn = document.getElementById('reset-btn');
    const canvas = document.getElementById('solution-canvas');
    const ctx = canvas.getContext('2d');
    const solutionInfo = document.getElementById('solution-info');
    const summaryText = document.getElementById('summary-text');
    const modal = document.getElementById('countdown-modal');
    const timerDisplay = document.getElementById('countdown-timer');
    const cancelBtn = document.getElementById('cancel-solve');

    let isSolving = false;

    // Attach listeners to all block count input fields
    const blockInputs = document.querySelectorAll('#block-form input[type="number"]');
    blockInputs.forEach(input => {
        input.addEventListener('input', updateGridDimensions);
    });

    function updateGridDimensions() {
        const blockCounts = {
            'A': parseInt(document.getElementById('A').value) || 0,
            'B': parseInt(document.getElementById('B').value) || 0,
            'C': parseInt(document.getElementById('C').value) || 0,
            'D': parseInt(document.getElementById('D').value) || 0,
            'I': parseInt(document.getElementById('I').value) || 0,
            'L': parseInt(document.getElementById('L').value) || 0,
            'O': parseInt(document.getElementById('O').value) || 0,
            'S': parseInt(document.getElementById('S').value) || 0,
            'T': parseInt(document.getElementById('T').value) || 0,
            'U': parseInt(document.getElementById('U').value) || 0,
            'X': parseInt(document.getElementById('X').value) || 0
        };

        const blockSizes = {
            'A': 1, 'B': 2, 'C': 3, 'D': 3,
            'I': 4, 'L': 4, 'O': 4, 'S': 4,
            'T': 4, 'U': 5, 'X': 5
        };

        let totalBlockArea = 0;
        for (let block in blockCounts) {
            totalBlockArea += blockCounts[block] * (blockSizes[block] || 0);
        }

        if (totalBlockArea === 0) {
            document.getElementById('grid-width').value = 'N/A';
            document.getElementById('grid-height').value = 'N/A';
            return;
        }

        const gridDims = computeGridDimensions(totalBlockArea);

        if (gridDims.width * gridDims.height !== totalBlockArea) {
            document.getElementById('grid-width').value = 'N/A';
            document.getElementById('grid-height').value = 'N/A';
            return;
        }

        document.getElementById('grid-width').value = gridDims.width;
        document.getElementById('grid-height').value = gridDims.height;

        return gridDims;
    }


    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function stopSolving() {
        // Cancel solving process
        isSolving = false;

        // Clear any ongoing timeout for the solving process
        if (solvingTimeout) {
            clearTimeout(solvingTimeout);
            solvingTimeout = null;
        }

        // Clear the countdown interval if active
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }

        // Hide the modal
        modal.style.display = 'none';

        // Update summary or display a cancellation message
        summaryText.innerHTML = 'Solve process was canceled.';
        solutionInfo.innerHTML = ''; // Clear solution info if necessary

        console.log('Solve process canceled by user.');
    }



    function displaySolution(solution, gridWidth, gridHeight, cellSize) {
        clearCanvas(); // Clear canvas before drawing

        solution.forEach(row => {
            const blockCells = [];
            let node = row;

            // Collect all cells related to the block
            do {
                if (node.column && /\d+,\d+/.test(node.column.name)) {
                    blockCells.push(node.column.name);
                }
                node = node.right;
            } while (node !== row);

            // Skip drawing if blockCells is empty
            if (blockCells.length === 0) {
                console.warn('No valid cells found for a block in the solution:', row);
                return;
            }

            // Identify the block instance (e.g., "L_0") in the row
            let blockInstance = null;
            node = row;
            do {
                if (node.column && /^[A-Z]_\d+$/.test(node.column.name)) {
                    blockInstance = node.column.name;
                    break;
                }
                node = node.right;
            } while (node !== row);

            if (!blockInstance) {
                console.warn('Block instance not found for row:', row);
                return;
            }

            const blockType = blockInstance.split('_')[0];
            const blockColor = COLOR_MAP[blockType] || '#000'; // Default to black if not found

            // Draw the block cells on the canvas
            ctx.fillStyle = blockColor;
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 1;

            blockCells.forEach(cell => {
                const [y, x] = cell.split(',').map(Number);
                if (y === undefined || x === undefined) {
                    console.error('Invalid cell coordinate:', cell);
                    return;
                }
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
            });

            // Optionally, add a label (block type) on the first cell of the block
            const [labelY, labelX] = blockCells[0].split(',').map(Number);
            ctx.fillStyle = '#000';
            ctx.font = `${cellSize / 2}px Arial`;
            ctx.fillText(blockType, labelX * cellSize + cellSize / 4, labelY * cellSize + cellSize * 0.75);
        });
    }


    function displaySolutions(solutions, gridWidth, gridHeight, cellSize) {
        if (solutions.length === 0) {
            solutionInfo.innerHTML = `<p>No solutions found.</p>`;
            clearCanvas();
            return;
        }

        const randomSolution = solutions[0];
        solutionInfo.innerHTML = `<p>Solution:</p>`;
        displaySolution(randomSolution, gridWidth, gridHeight, cellSize);
    }

    function generateSummary(blockCounts, gridDims, timeTaken, foundSolution) {
        let selectedBlocks = [];
        let totalBlocks = 0;

        for (let block in blockCounts) {
            if (blockCounts[block] > 0) {
                selectedBlocks.push(`${blockCounts[block]} x ${getBlockName(block)}`);
                totalBlocks += blockCounts[block];
            }
        }

        const selectedBlocksStr = selectedBlocks.join(', ') || 'None';
        const timeFormatted = timeTaken < 1000 ? `${timeTaken.toFixed(2)} ms` : `${(timeTaken / 1000).toFixed(2)} seconds`;

        const summary = `
        <strong>Selected Blocks:</strong> ${selectedBlocksStr}<br><br>
        <strong>Board Area:</strong> ${gridDims.width} x ${gridDims.height} (Total Blocks: ${totalBlocks})<br><br>
        <strong>Time to Find Solutions:</strong> ${timeFormatted}<br><br>
        <strong>Result:</strong> <span style="color: ${foundSolution ? 'green' : 'red'}; font-weight: bold;">${foundSolution ? 'Solution Found' : 'No solution found within the time limit.'}</span><br>
    `;

        summaryText.innerHTML = summary;

        // Adjust the canvas size based on the solution result
        const canvas = document.getElementById('solution-canvas');
        if (!foundSolution) {
            canvas.width = 300;
            canvas.height = 300;
        }
    }


    /**
     * Helper function to get the full name of a block type.
     * @param {string} block - The block type identifier (e.g., 'A', 'B', 'C').
     * @returns {string} - Full name of the block.
     */
    function getBlockName(block) {
        const blockNames = {
            'A': 'Monomino',
            'B': 'Domino',
            'C': 'Triomino I',
            'D': 'Triomino L',
            'I': 'Tetromino I',
            'L': 'Tetromino L',
            'O': 'Tetromino O',
            'S': 'Tetromino S',
            'T': 'Tetromino T',
            'U': 'Pentomino U',
            'X': 'Pentomino X'
        };

        // Return the block name if defined, otherwise return a default name.
        return blockNames[block] || 'Unknown Block';
    }

    /**
     * Generates all possible placements of a block on the grid.
     * @param {Array<Array<number>>} blockShape - 2D array representing the block shape.
     * @param {number} gridWidth - Width of the grid.
     * @param {number} gridHeight - Height of the grid.
     * @returns {Array<Array<string>>} - Array of cell coordinates for each placement.
     */
    function getAllPlacements(blockShape, gridWidth, gridHeight) {
        if (!blockShape || blockShape.length === 0) {
            console.error('Invalid block shape:', blockShape);
            return [];
        }

        const placements = [];
        const blockHeight = blockShape.length;
        const blockWidth = blockShape[0].length;

        for (let y = 0; y <= gridHeight - blockHeight; y++) {
            for (let x = 0; x <= gridWidth - blockWidth; x++) {
                const cells = [];
                for (let i = 0; i < blockHeight; i++) {
                    for (let j = 0; j < blockWidth; j++) {
                        if (blockShape[i][j] === 1) {
                            cells.push(`${y + i},${x + j}`);
                        }
                    }
                }
                placements.push(cells);
            }
        }
        return placements;
    }

    function startSolving(gridDims, maxTimeMs) {
        const { width: gridWidth, height: gridHeight } = gridDims;
        const cellSizeX = Math.floor(CANVAS_PARAMS.maxCanvasWidth / gridWidth);
        const cellSizeY = Math.floor(CANVAS_PARAMS.maxCanvasHeight / gridHeight);
        const cellSize = Math.min(cellSizeX, cellSizeY, CANVAS_PARAMS.maxCellSize);
        canvas.width = gridWidth * cellSize;
        canvas.height = gridHeight * cellSize;

        const blockCounts = {
            'A': parseInt(document.getElementById('A').value) || 0,
            'B': parseInt(document.getElementById('B').value) || 0,
            'C': parseInt(document.getElementById('C').value) || 0,
            'D': parseInt(document.getElementById('D').value) || 0,
            'I': parseInt(document.getElementById('I').value) || 0,
            'L': parseInt(document.getElementById('L').value) || 0,
            'O': parseInt(document.getElementById('O').value) || 0,
            'S': parseInt(document.getElementById('S').value) || 0,
            'T': parseInt(document.getElementById('T').value) || 0,
            'U': parseInt(document.getElementById('U').value) || 0,
            'X': parseInt(document.getElementById('X').value) || 0
        };

        const columns = [];
        for (let y = 0; y < gridHeight; y++) {
            for (let x = 0; x < gridWidth; x++) {
                columns.push(`${y},${x}`);
            }
        }
        for (let block in blockCounts) {
            for (let i = 0; i < blockCounts[block]; i++) {
                columns.push(`${block}_${i}`);
            }
        }

        const dlx = new DancingLinks(columns, maxTimeMs);

        const allPlacements = [];
        for (let block in blockCounts) {
            for (let count = 0; count < blockCounts[block]; count++) {
                BLOCKS[block].forEach(shape => {
                    const placements = getAllPlacements(shape, gridWidth, gridHeight);
                    placements.forEach(cells => {
                        allPlacements.push({ block, cells, count });
                    });
                });
            }
        }
        shuffle(allPlacements);

        allPlacements.forEach(placement => {
            const nodesInRow = [];
            placement.cells.forEach(cell => {
                const colNode = dlx.columns[cell];
                if (!colNode) return;
                const newNode = new DataNode(colNode);
                nodesInRow.push(newNode);
                newNode.up = colNode.up;
                newNode.down = colNode;
                colNode.up.down = newNode;
                colNode.up = newNode;
                colNode.size++;
            });
            const blockInstance = `${placement.block}_${placement.count}`;
            const blockColNode = dlx.columns[blockInstance];
            if (blockColNode) {
                const newNode = new DataNode(blockColNode);
                nodesInRow.push(newNode);
                newNode.up = blockColNode.up;
                newNode.down = blockColNode;
                blockColNode.up.down = newNode;
                blockColNode.up = newNode;
                blockColNode.size++;
            }
            nodesInRow.forEach((node, i) => {
                node.left = nodesInRow[i - 1] || nodesInRow[nodesInRow.length - 1];
                node.right = nodesInRow[i + 1] || nodesInRow[0];
            });
        });

        const solutions = [];
        const startTime = performance.now();
        dlx.search(0, [], solutions);
        const endTime = performance.now();
        const timeTaken = endTime - startTime;

        modal.style.display = 'none'; // Ensure modal closes
        isSolving = false; // Reset solving state

        const foundSolution = solutions.length > 0;
        if (foundSolution) {
            displaySolutions(solutions, gridWidth, gridHeight, cellSize);
        }
        generateSummary(blockCounts, gridDims, timeTaken, foundSolution);
    }

    let solvingTimeout = null;
    let countdownInterval = null;

    solveBtn.addEventListener('click', () => {
        if (isSolving) return; // Prevent multiple solve attempts

        solutionInfo.innerHTML = '';
        summaryText.innerHTML = 'No solution yet.';
        clearCanvas();

        const gridDims = updateGridDimensions();
        if (!gridDims) {
            clearCanvas();
            summaryText.innerHTML = 'Invalid grid dimensions.';
            return;
        }

        const { width: gridWidth, height: gridHeight } = gridDims;

        const blockCounts = {
            'A': parseInt(document.getElementById('A').value) || 0,
            'B': parseInt(document.getElementById('B').value) || 0,
            'C': parseInt(document.getElementById('C').value) || 0,
            'D': parseInt(document.getElementById('D').value) || 0,
            'I': parseInt(document.getElementById('I').value) || 0,
            'L': parseInt(document.getElementById('L').value) || 0,
            'O': parseInt(document.getElementById('O').value) || 0,
            'S': parseInt(document.getElementById('S').value) || 0,
            'T': parseInt(document.getElementById('T').value) || 0,
            'U': parseInt(document.getElementById('U').value) || 0,
            'X': parseInt(document.getElementById('X').value) || 0
        };

        const totalBlocks = Object.values(blockCounts).reduce((sum, count) => sum + count, 0);
        const onlyMonominos = blockCounts['A'] === totalBlocks;

        if ((gridWidth === 1 || gridHeight === 1) && !onlyMonominos) {
            alert('The specified blocks cannot fit into a grid with width or height of 1 unless only Monominos are selected.');
            return;
        }

        if (gridWidth === 0 || gridHeight === 0) {
            summaryText.innerHTML = 'Invalid grid dimensions.';
            return;
        }

        const maxTimeMs = 10000; // 10 seconds timeout
        isSolving = true;

        modal.style.display = 'block';
        let remainingTime = 10;
        timerDisplay.textContent = remainingTime;

        // Start the countdown timer
        countdownInterval = setInterval(() => {
            remainingTime--;
            timerDisplay.textContent = remainingTime;
            if (remainingTime <= 0 || !isSolving) {
                clearInterval(countdownInterval);
                countdownInterval = null;
            }
        }, 100);

        // Start the solving process after a short delay to allow modal rendering
        solvingTimeout = setTimeout(() => {
            if (isSolving) {
                startSolving(gridDims, maxTimeMs);
            }
            modal.style.display = 'none'; // Ensure modal closes
            isSolving = false; // Reset solving state
        }, 100); // Delay computation to allow modal rendering
    });



    // Reset button event listener
    resetBtn.addEventListener('click', () => {
        document.getElementById('block-form').reset();
        updateGridDimensions();
        solutionInfo.innerHTML = '';
        summaryText.innerHTML = 'No solution yet.';
        clearCanvas();
    });


});

