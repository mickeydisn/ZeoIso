import { Line } from "./cityRoad.js";

export class Node{
    constructor(x, y) {
        this.x = Math.round(x);
        this.y = Math.round(y);
    }

    /**
     * Returns an array of nodes around the current node within a specified radius and step.
     */
    getNodesAround(radius, step) {
        const alpha = (2 * Math.PI) / step;
        const arr = [];

        for (let i = 0; i < step; i++) {
            const deltaStep = this.alphaStep + alpha * i;
            const x = Math.round(this.x + radius * Math.cos(deltaStep));
            const y = Math.round(this.y + radius * Math.sin(deltaStep));
            arr.push(new CityNode(x, y, deltaStep));
        }
        
        return arr;
    }
    
    /**
     * Returns an array of nodes near a target node based on a specified angle and count.
     */
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

    nodeMinDistance(nodes) {
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
    
    getNodeConnected(pIter) {
        let nodes = [];
        this.roads.forEach(road => {
            const bro = road.getBrother(this);
            nodes.push(bro);
            if(pIter > 0) nodes = nodes.concat(bro.getNodeConnected(pIter-1));
        })
        return [... new Set(nodes)];
    }


    addRoad(road, pIter=5, cost=1) {
        this.roads.push(road);
        this.propagateRoad(pIter, road.getBrother(this), cost);
    }

    propagateRoad(pIter, parent, cost) {
        this.power += it >= 0 ? cost : - cost;
        if (pIter == 0) return ;

        if (this.roads.length == 1) { // Return
            this.power -=  pIter >= 0 ? cost : - cost;
        } else {
            this.roads.forEach(r => {
                const bro = r.getBrother(this);
                if (bro != parent) {
                    bro.propagateRoad(pIter-1, this, cost);
                }
            })
        }
    }
}



export class CityTile extends CityNode {

    constructor(tile) {
        super(tile.x, tile.y)
        tile.cityNode = this
    }

}