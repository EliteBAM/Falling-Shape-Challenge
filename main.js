
import { levels } from './levels.js';


/////////////////
for (const level of levels) { //main program loop -- running the game for every test
  await runGame(level);
}
/////////////////

async function runGame(level) { //main "game" loop

    let shape = getShapeBFS(level);
    let hasFallen = false;

    while(!hasFallen) {

        printLevel(level);
        await sleep(300);

        hasFallen = checkHasFallen(level, shape);

        if (!hasFallen) {
            updateShapePosition(level, shape);
        }
    
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function checkHasFallen(level, shape) {

    if(shape.length <= 0) return true; //return fallen if shape is entirely out of screen or never existed

    for(let i = 0; i < shape.length; i++) {

        const nextY = shape[i].y + 1

        if(level[nextY] && level[nextY][shape[i].x] == "#") {
            return true;
        }

    }

    return false;
}

function updateShapePosition(level, shape) {
    for(let i = shape.length - 1; i >= 0; i--) {

        level[shape[i].y][shape[i].x] = " "; // erase shape piece from previous space

        if(!level[shape[i].y + 1]) { // end redraw if shape piece goes out of bounds
            shape.splice(i, 1); // remove piece from shape array
            continue;
        }

        level[shape[i].y + 1][shape[i].x] = "F"; // draw shape piece at new location if in bounds

        shape[i].y++; // update shape position array
    }
}

function getShape(level) {

    let shape = [];

    const rowLength = level[0].length;
    for(let y = 0; y < level.length; y++) {
        for(let x = 0; x < rowLength; x++) {
            if (level[y][x] == "F") {
                shape.push({x: x, y: y});
            }
        }
    }

    return shape;
}

function printLevel(level) {
    console.clear();

    const rowLength = level[0].length; //assumes matrix, not jagged array
    for(let y = 0; y < level.length; y++) {
        let rowToPrint = "";
        for(let x = 0; x < rowLength; x++) {
            rowToPrint += level[y][x] + " ";
        }
        console.log(rowToPrint);
    }
}


// BFS version of getShape -- ensures floating islands and diagonals are not included in the shape -- more "tetris-y"
function getShapeBFS(level) {
    let foundFirst_F = false;
    
    const rowLength = level[0].length;
    for(let y = 0; y < level.length; y++) {
        for(let x = 0; x < rowLength; x++) {
            if (level[y][x] == "F") {
                foundFirst_F = true;
                return matrix_BFS(level, x, y);
            }
        }
        if(foundFirst_F)
            break;
    }

    return [];
}

function matrix_BFS(level, xIndex, yIndex) {

    //array of shape elements to be built and returned
    let shape = [{x: xIndex, y: yIndex}];

    //this BFS will only search left right and down neighbors, as the initial element is arrived at such that there can be no F above it
    const rightNeighbor = {x: xIndex + 1, y: yIndex};
    const leftNeighbor = {x: xIndex - 1, y: yIndex};
    const downNeighbor = {x: xIndex, y: yIndex + 1};

    const neighbors = new Map(); //false = not visited, true = visited
    neighbors.set("" + rightNeighbor.x + ", " + rightNeighbor.y, rightNeighbor);
    neighbors.set("" + leftNeighbor.x + ", " + leftNeighbor.y, leftNeighbor);
    neighbors.set("" + downNeighbor.x + ", " + downNeighbor.y, downNeighbor);

    //add initial neighbors to toVisit Queue
    let toVisit = [];
    for(const [key] of neighbors) {
        toVisit.push(key);
    }

    while (toVisit.length > 0) {

        //get the neighbor whose key is at the front of the toVisit queue
        let currentNeighbor = neighbors.get(toVisit.shift());

        if(currentNeighbor.x >= 0 && currentNeighbor.y >= 0 && level[currentNeighbor.y][currentNeighbor.x] && level[currentNeighbor.y][currentNeighbor.x] == "F") {
            shape.push({x: currentNeighbor.x, y: currentNeighbor.y});

            //check all neighbors of the current neighbor, and only add the unadded (equivalent to adding only the unvisited?)
            const rightNeighbor = {x: currentNeighbor.x + 1, y: currentNeighbor.y};
            const rn_Key = "" + rightNeighbor.x + ", " + rightNeighbor.y;

            const leftNeighbor = {x: currentNeighbor.x - 1, y: currentNeighbor.y};
            const ln_Key = "" + leftNeighbor.x + ", " + leftNeighbor.y;

            const downNeighbor = {x: currentNeighbor.x, y: currentNeighbor.y + 1};
            const dn_Key = "" + downNeighbor.x + ", " + downNeighbor.y;

            const upNeighbor = {x: currentNeighbor.x, y: currentNeighbor.y - 1};
            const un_Key = "" + upNeighbor.x + ", " + upNeighbor.y;

            if(!neighbors.has(rn_Key)) {
                neighbors.set(rn_Key, rightNeighbor);
                toVisit.push(rn_Key);
            }
            if(!neighbors.has(ln_Key)) {
                neighbors.set(ln_Key, leftNeighbor);
                toVisit.push(ln_Key);
            }
            if(!neighbors.has(dn_Key)) {
                neighbors.set(dn_Key, downNeighbor);
                toVisit.push(dn_Key);
            }
            if(!neighbors.has(un_Key)) {
                neighbors.set(un_Key, upNeighbor);
                toVisit.push(un_Key);
            }
        }
    }

    return shape;
}