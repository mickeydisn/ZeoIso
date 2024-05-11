import { Line } from "./cityRoad.js";

export class Node{
    constructor(x, y) {
        this.x = Math.round(x);
        this.y = Math.round(y);
    }

    move(node) {
        this.power += 1;
        this.x = (this.x * this.power + node.x) / (this.power + 1)
        this.y = (this.y * this.power + node.y) / (this.power + 1)
    }

    getx(zoom) {
        return this.x / zoom;
    }
    gety(zoom) {
        return this.y / zoom;
    }
    /*
    getAngle(node) {
        const diffX = node.x - this.x;
        const diffY = node.y - this.y;
        
        let alpha = Math.atan(diffY/ diffX);
        
        if (diffX >= 0) {
            if (diffY >= 0) {
                return alpha;
            } else {
                return 2 * Math.PI + alpha;
            }
        } else {
            if (diffY >= 0) {
                return Math.PI + alpha;
            } else {
                return Math.PI + alpha;
            }
        }
        return alpha
    }
    */

    // Get N Node at radius distance each 360 / step
    getNodesAroud(radius, step) {
        let arr = [];
        const alpha = (2 * Math.PI) / step; 
        for (let i = 0; i < step; i++) {
            let deltaStep =  this.alphaStep + alpha * i;
            const x = Math.round(this.x + radius * Math.cos(deltaStep))
            const y = Math.round(this.y + radius * Math.sin(deltaStep))
            arr.push(new CityNode(x, y, deltaStep));
        }
        return arr;
    }

    // Get count Nodes, sapce by alpha ° , 
    getNodesNearTarget(centerNode, alpha, count) {
        const myAlpha = (alpha / 180) * Math.PI;
        const myStep = Math.round(count / 2);

        let arr = [];
        // translate point back to origin:
        const x = this.x - centerNode.x;
        const y = this.y - centerNode.y;

        for (let i = - myStep; i <= myStep; i++) {
            const s = Math.sin(i * myAlpha);
            const c = Math.cos(i * myAlpha);
            // rotate point
            let newx = x * c - y * s;
            let newy = x * s + y * c;
            let deltaStep =  this.alphaStep + myAlpha * i;
            arr.push(new CityNode(newx + centerNode.x, newy + centerNode.y, deltaStep));
        }
        return arr;
    }

    nodeDistance(node) {
        const x = Math.abs(this.x - node.x);
        const y =  Math.abs(this.y - node.y);
        return Math.sqrt(x * x + y * y);
    }

    nodesDistance(nodes) {
        let distanceMap = nodes.map(endNode => {
            return [this.nodeDistance(endNode), endNode];
        })
        distanceMap = distanceMap.sort((a, b) => a[0] - b[0]);
        return distanceMap;
    }

    nodesMinDistance(nodes) {
        return this.nodesDistance(nodes)[0];
    }

    nodeMeanMinDisance(nodes) {
        const nodesDistance = this.nodesDistance(nodes);
        const count = Math.min(nodesDistance.length, 3);
        let distanceMeanMin = 0;
        for (let i = 0; i < count; i++) {
            distanceMeanMin += nodesDistance[i][0]
        }
        return distanceMeanMin / count;
    }

}

export  class CityNode extends Node {
    constructor(x, y, alphaStep=0) {
        super(x, y);
        this.alphaStep = alphaStep;
        this.roads = [];
        this.power = 0;
    }
    
    addRoad(road, iter=5, cost=1) {
        this.roads.push(road);
        this.propagateRoad(iter, road.getBrother(this), cost);
    }

    getNodeConnected(iter) {
        let nodes = [];
        this.roads.forEach(road => {
            const bro = road.getBrother(this);
            nodes.push(bro);
            if(iter > 0) nodes = nodes.concat(bro.getNodeConnected(iter-1));
        })
        return [... new Set(nodes)];
    }

    propagateRoad(it, parent, cost) {
        this.power += it >= 0 ? cost : - cost;
        if (it == 0) return ;

        if (this.roads.length == 1) { // Return
            this.power -=  it >= 0 ? cost : - cost;
        } else {
            this.roads.forEach(r => {
                const bro = r.getBrother(this);
                if (bro != parent) {
                    bro.propagateRoad(it-1, this, cost);
                }
            })
        }
    }

    getCrossZoneRoadNode() {
        const RADIUS = 2;
        const RADIUS_OUT = 16;
        let roads = this.roads
          .map(road => {
            const node = road.getBrother(this)
            const cosR = (node.x - this.x) / road.length + 1;
            const sinR = (node.y - this.y) / road.length;
            const sort = sinR > 0 ? cosR : - cosR
            return {sort : sort, road: road, line: new Line(this, node)}
          })
          .sort((a, b) => b.sort - a.sort)
        this.roads = roads.map(r => r.road)
        // roads = roads.map(({road}) => road)
        let crossNode = [];
        
        crossNode = roads.map((r1, i) => {
          let r2 = i == 0 ? roads[this.roads.length - 1] : roads[i-1];
          // res = r1.getRightBoarder(RADIUS).n1
          const res1 = r1.line.getParalle(RADIUS).intersect(r2.line.getParalle(-RADIUS))
          r1.road.setBlockNodeRoad(this, true, res1);
          r2.road.setBlockNodeRoad(this, false, res1); 

          const res2 = r1.line.getParalle(RADIUS_OUT).intersect(r2.line.getParalle(-RADIUS_OUT))
          r1.road.setBlockNodeOut(this, true, res2);
          r2.road.setBlockNodeOut(this, false, res2); 

          // console.log('Zone', r1.block.nodes)
          return res2
        })
        
        // crossNode = crossNode.map(node => new Node(node.x, node.y))
        /**/
        return crossNode;
    }

}




