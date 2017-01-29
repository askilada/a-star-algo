
function AStar(start, end, dist) {
    this.openSet = [start]
    this.closedSet = []
    this.cameFrom = {}
    this.gScore = []
    this.fScore = []
    this.current = null
    this.end = end


    this.heuristic_cost_of = function(a,b) {
        return dist(b.x , b.y, a.x, a.y)
    }


    this.gScore[start] = 0
    this.fScore[start] = this.heuristic_cost_of(start, end)


    this.hasNext = function() {
        return this.openSet.length > 0
    }

    this.doNext = function(doneCB) {
        this.openSet.sort(function(a,b) {
            if (this.fScore[a] < this.fScore[b]) {
                return -1
            } else if (this.fScore[a] > this.fScore[b]) {
                return 1
            } else {
                return 0
            }
        }.bind(this))

        this.current = this.openSet[Object.keys(this.openSet)[0]]
        this.current.current = true

        if (this.current == this.end) {
            // You are now done
            console.log("DONE");
            
            doneCB()
            return
        }

        var oIndex = this.openSet.indexOf(this.current)
        this.openSet.splice(oIndex, 1)
        this.closedSet.push(this.current)

        for (var i = 0; i < this.current.neighbors.length; i++) {
            // Go to next we have been here
            if(this.closedSet.includes(this.current.neighbors[i])) {
                this.current.done = true
                this.current.current = false
                continue
            }

            // Cacl the score if the current length
            var tGScore = this.gScore[this.current] + 1 // dist_between(current, current.neighbors[i])
            if(this.openSet.includes(this.current.neighbors[i]) === false) {
                this.openSet.push(this.current.neighbors[i])
            } else if (tGScore > this.gScore[this.current.neighbors[i]]) {
                this.current.done = true
                this.current.current = false
                continue
            }


            this.current.done = true
            this.current.current = false
            this.cameFrom[this.current.neighbors[i]] = this.current
            this.gScore[this.current.neighbors[i]] = tGScore
            this.fScore[this.current.neighbors[i]] = this.gScore[this.current.neighbors[i]] + this.heuristic_cost_of(this.current.neighbors[i], this.end)
        }

    }
}
//window.AStar = AStar;
