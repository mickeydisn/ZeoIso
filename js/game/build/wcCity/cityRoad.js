import { Node } from "./cityNode.js";

export class RoadLine {
    constructor(n1, n2) {
        this.n1 = n1;
        this.n2 = n2;
        this.diffX = (this.n1.x - this.n2.x);
        this.diffY = (this.n1.y - this.n2.y);
        this.length = Math.sqrt(this.diffX * this.diffX + this.diffY * this.diffY);
    
    }    

    getBrother (node) {
        if( node != this.n1 & node != this.n2) console.log("err")
        return node == this.n1 ? this.n2 : node == this.n2 ? this.n1 : null
    }

    getParallel(distance) {
        const XSinge = this.diffX / this.length * distance;
        const YSinge = this.diffY / this.length * distance;
        
        let listBlock = [];
        return new Line(
            new Node(
                this.n1.x - YSinge, 
                this.n1.y + XSinge,
            ), 
            new Node(
                this.n1.x - this.diffX  - YSinge , 
                this.n1.y - this.diffY  + XSinge ,
                ), 
        );
    }

    // line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
    // Determine the intersection point of two line segments
    // Return FALSE if the lines don't intersect
    intersect(line) {
        const x1 = this.n1.x; const y1 = this.n1.y;
        const x2 = this.n2.x; const y2 = this.n2.y;
        const x3 = line.n1.x; const y3 = line.n1.y;
        const x4 = line.n2.x; const y4 = line.n2.y;
        // Check if none of the lines are of length 0
        if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
          return false
        }
        const denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
  
        // Lines are parallel
        if (denominator === 0) {
          return false
        }
        let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
        let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator
  
        // is the intersection along the segments
        /* if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
          return false
        } */
        // Return a object with the x and y coordinates of the intersection
        let x = x1 + ua * (x2 - x1)
        let y = y1 + ua * (y2 - y1)
        return new Node(x, y);
    }

    split(n) {

        const xdiff = (this.n2.x - this.n1.x) / n;
        const ydiff = (this.n2.y - this.n1.y) / n;
        const newLine = []
        for(let i = 0; i < n; i++) {
            const newn1 = new Node(this.n1.x + xdiff * i, this.n1.y + ydiff * i)
            const newn2 = new Node(this.n1.x + xdiff * (i + 1), this.n1.y + ydiff * (i + 1))
            newLine.push(new Line(newn1, newn2))
        }
        return newLine
    } 

}

export class CityRoad extends RoadLine {
    constructor(n1, n2, wcPath) {
        super(n1, n2);
        this.wcPath = wcPath;
    }
}

