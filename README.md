# Code Signal Challenge Question #3 -- Falling Shape

## Description
This is my take on a CodeSignal "general coding assessment" question, as I remember it from memory.

### Scenario
- There is a shape of elements `"F"` in a matrix.

- Every iteration, the shape falls down the height of the matrix by 1 row, so long as it is not stopped

### Constraints
- If an element of the shape has approached an element `"#"` in the next row, the shape is "blocked." It may no longer fall.

## My Implementation
- I used BFS to detect connected falling pieces of the `"F"` shape, in addition to a naive scan approach.
    - BFS will avoid including diagonals and floating islands in the falling shape-- more "tetris-y" shape definition
    - BFS is slower than a naive level scan in smaller matrices, but in larger matrices, it will become more performant

- Shapes fall one step at a time until they hit blockers (`"#"`).

- Each test level animates in the terminal. This was not part of the CodeSignal challenge, but I thought it was awesome!

- Levels are modular — main.js is set to run through every test level in a loop

## How to Run

1. Download the project zip from GitHub, or in your email, if attached.
2. Unzip the file. Ensure that `main.js`, `levels.js`, and `package.json` are in the same directory.
3. Ensure you have Node.js installed on your system.
4. cd into the directory in your terminal, and execute the command:
```bash
npm start
```
5. That's it! Enjoy the animations

