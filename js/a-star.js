function heuristic_cost_of(elm, end) {
    var a = Math.abs(end.x - elm.x) + Math.abs(end.y - elm.y)
        // var b = a * .2 + a
    return a
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


function Board(bw, bh) {
    this.width = bw
    this.height = bh

    this.board = []
    this.makeBoard = this.makeBoard.bind(this)
    this.fillNeighbours = this.fillNeighbours.bind(this)

    this.makeBoard()
    this.fillNeighbours()


}

Board.prototype.getPos = function(x, y) {
    try {
        var elm = this.board[x][y]
        if (typeof elm == "undefined") {
            return null
        }
        return elm;
    } catch (e) {
        return null
    }
};

Board.prototype.getNeighbor = function(pos, elm) {
    switch (pos) {
        case NeighborPosition.TopLeft:
            return this.getPos(elm.x - 1, elm.y - 1)
        case NeighborPosition.Top:
            return this.getPos(elm.x, elm.y - 1)
        case NeighborPosition.TopRight:
            return this.getPos(elm.x + 1, elm.y - 1)
        case NeighborPosition.Right:
            return this.getPos(elm.x + 1, elm.y)
        case NeighborPosition.BottomRight:
            return this.getPos(elm.x + 1, elm.y + 1)
        case NeighborPosition.Bottom:
            return this.getPos(elm.x, elm.y + 1)
        case NeighborPosition.BottomLeft:
            return this.getPos(elm.x - 1, elm.y + 1)
        case NeighborPosition.Left:
            return this.getPos(elm.x - 1, elm.y)
        default:
            return null

    }
};


Board.prototype.makeBoard = function() {
    var rows = new Array(this.width)
    for (var i = 0; i < rows.length; i++) {
        rows[i] = new Array(this.height)
        for (var j = 0; j < rows[i].length; j++) {
            rows[i][j] = new Place(i, j)
            if ((i === 0 && j === 0)) { // TODO: Add the last field
                rows[i][j].wall = false
            } else {
                rows[i][j].wall = (Math.random(1) < .2)
            }
        }
    }
    this.board = rows
};

Board.prototype.fillNeighbours = function() {
    this.board.forEach(function(row) {

        row.forEach(function(cell) {
            var top = this.getNeighbor(NeighborPosition.Top,
                cell)
            var topRight = this.getNeighbor(
                NeighborPosition.TopRight, cell)
            var topLeft = this.getNeighbor(NeighborPosition
                .TopLeft, cell)
            var right = this.getNeighbor(NeighborPosition.Right,
                cell)

            var bottom = this.getNeighbor(NeighborPosition.Bottom,
                cell)
            var bottomRight = this.getNeighbor(
                NeighborPosition.BottomRight, cell)
            var bottomLeft = this.getNeighbor(
                NeighborPosition.BottomLeft, cell)
            var left = this.getNeighbor(NeighborPosition.Left,
                cell)

            var sides = [top, topRight, topLeft, right,
                bottom, bottomRight, bottomLeft, left
            ]
            sides.forEach(function(side) {
                if (side != null)
                    cell.addNeighbor(side)
            })

        }.bind(this))


    }.bind(this))
}


var board = new Board(50, 50)
var start = board.board[0][0]
var end = board.board[49][49]

var aStar


function setup() {
    createCanvas(750, 750);
    background(0)
    frameRate(120)
    aStar = new AStar(start, end, dist)


}

var i = 0;

function draw() {
    if (aStar.hasNext()) {
        aStar.doNext(function() {
            noLoop();
        });
    }
    //
    //
    for (var i = 0; i < board.board.length; i++) {
        for (var j = 0; j < board.board[i].length; j++) {
            board.board[i][j].draw()

        }
    }

}
