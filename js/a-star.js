function heuristic_cost_of(elm, end) {
    return Math.abs(end.x - elm.x) + Math.abs(end.y - elm.y)
}

var PlaceColor = {
    Ready: [0, 255, 0],
    Wall: [0, 0, 0],
    Current: [0,0,255],
    Done: [255, 0, 0]
}

function Place(x, y) {
    this.x = x
    this.y = y
    this.wall = false
    this.current = false
    this.done = false


    this.neighbors = []

    this.draw = function() {
        var fillColor

        //  if(this.x === 0 && this.y === 0) console.log(this);

        if (this.wall === true) {
            fillColor = PlaceColor.Wall
        } else if(this.done == true) {
            fillColor = PlaceColor.Done
        } else if(this.current === true) {
            fillColor = PlaceColor.Current
        } else {
            fillColor = PlaceColor.Ready
        }



        fill.apply(null, fillColor)
        rect(x *7.5, y *7.5,7.5,7.5)
            //stroke(255)
    }

    this.addNeighbor = function(neighbor) {

        if (neighbor.wall === false) {
            



            this.neighbors.push(neighbor)
        }

    }

    this.toString = function () {
        return this.x + ", " + this.y
    }

}


var pathMapping = new Array(100)
for (var i = 0; i < pathMapping.length; i++) {
    pathMapping[i] = new Array(100)
    for (var j = 0; j < pathMapping[i].length; j++) {
        pathMapping[i][j] = new Place(i, j)
    }
}

for (var i = 0; i < pathMapping.length; i++) {
    for (var j = 0; j < pathMapping[i].length; j++) {
        // Determen wall
        if (i === 0 && j === 0) {
            console.log('first');
            pathMapping[i][j].wall = false
        } else if (i === pathMapping.length - 1 && j === pathMapping[i].length -
            1) {
            pathMapping[i][j].wall = false
        } else {
            pathMapping[i][j].wall = (Math.random(1) < .3)
        }
    }
}


for (var i = 0; i < pathMapping.length; i++) {
    for (var j = 0; j < pathMapping[i].length; j++) {
        // Setting neighbors
        // Top
        if (j - 1 >= 0) {
            pathMapping[i][j].addNeighbor(pathMapping[i][j - 1])
        }

        // Top right
        if(j-1 >= 0 && i + 1 < pathMapping.length) {
            pathMapping[i][j].addNeighbor(pathMapping[i + 1][j-1])
        }

        // Top left
        if(j-1 >= 0 && i - 1 >=0) {
            pathMapping[i][j].addNeighbor(pathMapping[i - 1][j-1])
        }

        // Right
        if (i + 1 < pathMapping.length) {
            pathMapping[i][j].addNeighbor(pathMapping[i + 1][j])
        }
        // Bottom
        if (j + 1 < pathMapping[i].length) {
            pathMapping[i][j].addNeighbor(pathMapping[i][j + 1])
        }

        // Bottom left
        if(j+1 < pathMapping[i].length && i - 1 >=0) {
            pathMapping[i][j].addNeighbor(pathMapping[i - 1][j+1])
        }

        // Bottom right
        if(j+1 < pathMapping[i].length && i + 1 < pathMapping.length) {
            pathMapping[i][j].addNeighbor(pathMapping[i + 1][j+1])
        }





        // Left
        if (i - 1 >= 0) {
            pathMapping[i][j].addNeighbor(pathMapping[i - 1][j])
        }
    }
}

console.log(pathMapping);

var aStar
function setup() {
    createCanvas(750, 750);
    background(0)
    frameRate(120)

    var firstPlace = pathMapping[0][0]
    //aStar = new AStar(firstPlace, pathMapping[24][24], dist)
    aStar = new AStar(firstPlace, pathMapping[99][99], dist)


}

var i = 0;

function draw() {
    if(aStar.hasNext()) {
        aStar.doNext(function() {
            noLoop();
        });
    }


    for (var i = 0; i < pathMapping.length; i++) {
        for (var j = 0; j < pathMapping[i].length; j++) {
            pathMapping[i][j].draw()

        }
    }

}
