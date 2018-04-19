var cols = 100;
var rows = 100;
var grid = new Array(cols);
var openSet = [];
var closedSet = [];
var start;
var end;
var w, h;
var path = [];
function removeFrom(arr, elt) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == elt) {
            arr.splice(i, 1);
        }
    }
}
function heuristic(a,b) {
    //var d = dist(a.x,a.y,b.x,b.y);
    var d = abs(a.x-b.x) + abs(a.y-b.y);
    return d;
}
function setup() {
    w = 400 / cols;
    h = 400 / rows;
    createCanvas(400, 400);
    console.log('A*');
    for (var i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i, j);
        }
    }
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }
    start = grid[0][0];
    end = grid[cols-1][rows-1];
    start.wall = false;
    end.wall = false;
    openSet.push(start);
}
function draw() {
    background(0);
    if (openSet.length > 0) {
        var winner = 0;
        for (var i = 0; i < openSet.length; i++) {
            if (openSet[i].f  < openSet[winner].f) {
                winner = i;
            }
        }
        var current = openSet[winner];
        if (current == end) {
            path = [];
    var temp = current;
            path.push(temp);
            while (temp.previous) {
                path.push(temp.previous);
                temp = temp.previous;
            }
            noLoop();
            console.log("DONE!");
        }
        removeFrom(openSet, current);
        closedSet.push(current);
        var neighbors = current.neighbors;
        for (var i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];
            if (!closedSet.includes(neighbor) && !neighbor.wall) {
                var tempG = current.g + 1;
                if (openSet.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                    }
                } else {
                    neighbor.g = tempG;
                    openSet.push(neighbor);
                }
                neighbor.h = heuristic(neighbor, end);
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.previous = current;
            }
        }
    } else {
        /*
        */
    }
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show(color(255));
        }
    }
    for (var i = 0; i < openSet.length; i++) {
        openSet[i].show(color(0, 255, 0));
    }
    for (var i = 0; i < closedSet.length; i++) {
        closedSet[i].show(color(255, 0, 0));
    }
    path = [];
    var temp = current;
            path.push(temp);
            while (temp.previous) {
                path.push(temp.previous);
                temp = temp.previous;
            }
    for (var i = 0; i < path.length; i++){
        path[i].show(color(0,0,255))
    }
}
function Spot(i, j) {
    this.neighbors = [];
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.x = i;
    this.y = j;
    this.previous = undefined;
    this.wall = false;
    if (random(1) < 0.3) {
        this.wall = true;
    }
    this.show = function(col) {
        fill(col);
        if (this.wall) {
            fill(0);
        }
        noStroke();
        rect(this.x*w, this.y*h, w-1, h-1);
    }
    this.addNeighbors = function(grid) {
        var i = this.x;
        var j = this.y;
        if (i < cols-1) {
            this.neighbors.push(grid[i+1][j]);
        }
        if (i > 0) {
            this.neighbors.push(grid[i-1][j]);
        }
        if (j < rows -1) {
            this.neighbors.push(grid[i][j+1]);
        }
        if (j > 0) {
            this.neighbors.push(grid[i][j-1]);
        }
    }
}