
# Tangram/Tetris Block Puzzle Solver

The Block Puzzle Solver is an advanced tool designed to solve tangram and tetris-style puzzles using efficient algorithms (such as the Dancing Links method). This solver supports 11 block types and considers rotations, reflections, and grid constraints to optimize the solution.

## Features
- **Dynamic Block Configuration**: Select and configure different types of blocks (e.g., Monomino, Domino, Tetromino).
- **Grid Adaptability**: Automatically computes the best-fit grid dimensions based on the selected blocks.
- **Visualization**: Interactive visual display of the solution on an HTML5 canvas.
- **Timeout Handling**: Ensures solutions are computed within a reasonable time frame.

## Demo
- **Live Demo**: [Block Puzzle Solver](https://www.joe0.com/blockpuzzlesolver.com/)
- **Project Details**: Learn more about the development of this project [here](https://www.joe0.com/2018/01/03/n-block-tetromino-tangram-puzzle-solver-in-javascript/).

## Screenshots
![image](https://github.com/user-attachments/assets/60e10df4-9dd4-4599-b1df-263b188eca8f)


## 🧩 What Can You Use This Solver For?
Many puzzle enthusiasts enjoy solving **Blocks Puzzle Brain Teasers Toys** like [this one on Amazon](https://www.amazon.ca/Coogam-Teasers-Intelligence-Colorful-Educational/dp/B07GF9421C/ref=asc_df_B07GF9421C/). While solving these puzzles can be fun and challenging, sometimes it seems impossible to solve them. That’s where this solver comes in! ✨It will compute a valid solution in seconds, showing exactly how the pieces should fit together.

![image](https://github.com/user-attachments/assets/f8c2d5b0-7044-403d-8cf9-86519d410014)


## How It Works
1. **Block Selection**: Users input the number of blocks for each type (e.g., Monomino, Domino, etc.).
2. **Grid Computation**: The tool calculates the optimal grid dimensions for the selected blocks.
3. **Solution Computation**: Utilizes the Dancing Links algorithm to determine valid block placements on the grid.
4. **Visualization**: Displays the solution with color-coded blocks and detailed summaries.

## Supported Block Types
- **Monomino (A)**: 1 square
- **Domino (B)**: 2 squares
- **Triomino I (C)**: 3 squares in a line
- **Triomino L (D)**: L-shaped block of 3 squares
- **Tetromino I (I)**: Line of 4 squares
- **Tetromino L (L)**: L-shaped block of 4 squares
- **Tetromino O (O)**: Square block of 4 squares
- **Tetromino S (S)**: S-shaped block of 4 squares
- **Tetromino T (T)**: T-shaped block of 4 squares
- **Pentomino U (U)**: U-shaped block of 5 squares
- **Pentomino X (X)**: X-shaped block of 5 squares

## Options and Controls
- **Block Count Input**: Configure the quantity for each block type.
- **Solve Button**: Initiates the solving process.
- **Reset Button**: Clears all inputs and resets the visualization.
- **Grid Configuration**: Displays the calculated grid dimensions.

## File Structure
- `index.html`: Main HTML file for the interface.
- `styles.css`: CSS file for styling the interface.
- `main.js`: JavaScript file containing the logic for block generation, grid computation, and solving.

## Help with Development - Installation and Usage
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/block-puzzle-solver.git
   cd block-puzzle-solver
   ```

## License
This project is licensed under the MIT License.
See the LICENSE file for details: https://github.com/JozefJarosciak/TangramPuzzleSolver/blob/master/license.md

## Resources
* Old version of this code: https://github.com/JozefJarosciak/BlockPuzzleSolver/
* Dancing Links - https://en.wikipedia.org/wiki/Dancing_Links
* Wikipedia Tetromino - https://en.wikipedia.org/wiki/Tetromino
* Polyomino - https://en.wikipedia.org/wiki/Polyomino
* Wolfram Math Polyomino - http://mathworld.wolfram.com/Polyomino.html
* Federico Dossena's Tetromino Solver - https://github.com/adolfintel/tetrispuzzlesolver-html5 (only calculates blocks in order defined)
* George Martin' Polyominoes: A Guide to Puzzles and Problems in Tiling - https://www.google.ca/books/edition/Polyominoes_A_Guide_to_Puzzles_and_Probl/FMH2DwAAQBAJ?hl=en&gbpv=1&dq=Polyominoes:+A+Guide+to+Puzzles+and+Problems+in+Tiling&printsec=frontcover
* Distinguishable Permutations: https://onlinecourses.science.psu.edu/stat414/node/31
* Counting distinct n- n-letter long array permutations: https://math.stackexchange.com/questions/2612013/formula-for-counting-distinct-n-letter-long-array-permutations
---

**Happy solving!**