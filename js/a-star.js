function heuristic_cost_of(elm, end) {
    return Math.abs(end.x - elm.x) + Math.abs(end.y - elm.y)
}

var PlaceColor = {
    Ready: [0, 255, 0],
    Wall: [0, 0, 0],
    Current: [0, 0, 255],
    Done: [255, 0, 0],
    Used: [255, 255, 0]
}

var NeighborPosition = {
    Top: "Top",
    TopRight: "TopRight",
    TopLeft: "TopLeft",
    Bottom: "Bottom",
    BottomRight: "BottomRight",
    BottomLeft: "BottomLeft",
    Left: "Left",
    Right: "Right",
}

function Place(x, y) {
    this.x = x
    this.y = y
    this.wall = false
    this.current = false
    this.done = false
    this.used = false


    this.neighbors = []

    this.getNeighbor = function(where) {
        switch (where) {
            case NeighborPosition.Top:
                return this.neighbors.filter(function(ne) {
                    return this.y - 1 == ne.y && this.x == ne.x
                }.bind(this))[0]
            case NeighborPosition.TopRight:
                return this.neighbors.filter(function(ne) {
                    return this.y - 1 == ne.y && this.x + 1 == ne.x
                }.bind(this))[0]
            case NeighborPosition.Right:
                return this.neighbors.filter(function(ne) {
                    return this.y == ne.y && this.x + 1 == ne.x
                }.bind(this))[0]
            case NeighborPosition.BottomRight:
                return this.neighbors.filter(function(ne) {
                    return this.y + 1 == ne.y && this.x + 1 == ne.x
                }.bind(this))[0]
            case NeighborPosition.Bottom:
                return this.neighbors.filter(function(ne) {
                    return this.y + 1 == ne.y && this.x == ne.x
                }.bind(this))[0]
            case NeighborPosition.BottomLeft:
                return this.neighbors.filter(function(ne) {
                    return this.y + 1 == ne.y && this.x - 1 == ne.x
                }.bind(this))[0]
            case NeighborPosition.Left:
                return this.neighbors.filter(function(ne) {
                    return this.y == ne.y && this.x - 1 == ne.x
                }.bind(this))[0]
            case NeighborPosition.TopLeft:
                return this.neighbors.filter(function(ne) {
                    return this.y - 1 == ne.y && this.x - 1 == ne.x
                }.bind(this))[0]
            default:

        }
    }
    this.getTrueNeighbor = function(where) {
        switch (where) {
            case NeighborPosition.Top:
                return pathMapping.filter(function(ne) {
                    return this.y - 1 == ne.y && this.x == ne.x
                }.bind(this))[0]
            case NeighborPosition.TopRight:
                return this.neighbors.filter(function(ne) {
                    return this.y - 1 == ne.y && this.x + 1 == ne.x
                }.bind(this))[0]
            case NeighborPosition.Right:
                return this.neighbors.filter(function(ne) {
                    return this.y == ne.y && this.x + 1 == ne.x
                }.bind(this))[0]
            case NeighborPosition.BottomRight:
                return this.neighbors.filter(function(ne) {
                    return this.y + 1 == ne.y && this.x + 1 == ne.x
                }.bind(this))[0]
            case NeighborPosition.Bottom:
                return this.neighbors.filter(function(ne) {
                    return this.y + 1 == ne.y && this.x == ne.x
                }.bind(this))[0]
            case NeighborPosition.BottomLeft:
                return this.neighbors.filter(function(ne) {
                    return this.y + 1 == ne.y && this.x - 1 == ne.x
                }.bind(this))[0]
            case NeighborPosition.Left:
                return this.neighbors.filter(function(ne) {
                    return this.y == ne.y && this.x - 1 == ne.x
                }.bind(this))[0]
            case NeighborPosition.TopLeft:
                return this.neighbors.filter(function(ne) {
                    return this.y - 1 == ne.y && this.x - 1 == ne.x
                }.bind(this))[0]
            default:

        }
    }

    this.draw = function() {
        var fillColor

        //  if(this.x === 0 && this.y === 0) console.log(this);

        if (this.wall === true) {
            fillColor = PlaceColor.Wall
        } else if (this.used == true) {
            fillColor = PlaceColor.Used
        } else if (this.done == true) {
            fillColor = PlaceColor.Done
        } else if (this.current === true) {
            fillColor = PlaceColor.Current
        } else {
            fillColor = PlaceColor.Ready
        }



        fill.apply(null, fillColor)
        rect(x * 15, y * 15, 15, 15)
            //stroke(255)
    }

    this.addNeighbor = function(neighbor) {

        if (neighbor.wall === false) {
            // if neighbors neighbors has .5 of their neighbors as walls
            var t = neighbor.getNeighbor(NeighborPosition.Top)
            var tl = neighbor.getNeighbor(NeighborPosition.TopLeft)
            var l = neighbor.getNeighbor(NeighborPosition.Left)
            var tr = neighbor.getNeighbor(NeighborPosition.TopRight)
            var bl = neighbor.getNeighbor(NeighborPosition.BottomLeft)
            var br = neighbor.getNeighbor(NeighborPosition.BottomRight)
            if (
                (t && l && t.wall && l.wall)
            ) {
                console.log("NO N");
                return
            }


            this.neighbors.push(neighbor)
        }

    }

    this.toString = function() {
        return this.x + ", " + this.y
    }

}


var pathMapping = new Array(50)
for (var i = 0; i < pathMapping.length; i++) {
    pathMapping[i] = new Array(50)
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
            pathMapping[i][j].wall = (Math.random(1) < .2)
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
        if (
            j - 1 >= 0 && i + 1 < pathMapping.length &&
            (
                pathMapping[i + 1][j].wall == false && pathMapping[i][j - 1].wall ==
                false
            )
        ) {
            pathMapping[i][j].addNeighbor(pathMapping[i + 1][j - 1])
        }

        // Top left
        if (
            j - 1 >= 0 && i - 1 >= 0 &&
            (
                pathMapping[i - 1][j].wall == false && pathMapping[i][j - 1].wall ==
                false
            )
        ) {
            pathMapping[i][j].addNeighbor(pathMapping[i - 1][j - 1])
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
        if (
            j + 1 < pathMapping[i].length && i - 1 >= 0 &&
            (
                pathMapping[i][j + 1].wall == false && pathMapping[i - 1][j].wall ==
                false
            )
        ) {
            pathMapping[i][j].addNeighbor(pathMapping[i - 1][j + 1])
        }

        // Bottom right
        if (
            j + 1 < pathMapping[i].length && i + 1 < pathMapping.length &&
            (
                pathMapping[i][j + 1].wall == false && pathMapping[i + 1][j].wall ==
                false
            )
        ) {
            pathMapping[i][j].addNeighbor(pathMapping[i + 1][j + 1])
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
    aStar = new AStar(firstPlace, pathMapping[49][22], dist)


}

var i = 0;

function draw() {
    if (aStar.hasNext()) {
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
