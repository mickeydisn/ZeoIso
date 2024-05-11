import { PathFactory } from "../path.js";

export class Node{
    constructor(x, y, alphaStep=0) {
        this.alphaStep = alphaStep
        this.x = Math.round(x);
        this.y = Math.round(y);
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
        if (nodes && nodes.length) {
            return this.nodesDistance(nodes)[0];
        } 
        return [0, null]
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
    constructor(world, x, y, alphaStep=0) {
        super(x, y, alphaStep);
        this.fm = world.factoryMap;
        this.world = world

        this.roads = [];
        this.power = 0;
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

            arr.push(new CityNode(this.world, x, y, deltaStep));
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
            const tile = this.fm.getTile(newx + centerNode.x, newy + centerNode.y)
            const cityNode = tile.cityNode ? tile.cityNode : new CityNode(this.world, newx + centerNode.x, newy + centerNode.y, deltaStep)
            arr.push(cityNode);
        }
        return arr;
    }


    getNodeGraphFrom(pIterMax=5, nodeGraph=null) {
        nodeGraph = nodeGraph ? nodeGraph : [{p:0, node:this, parent:null}]
        const openNode = [...nodeGraph]

        while (openNode.length) {
            const currentNodeInfo = openNode.shift()
            const pIter = currentNodeInfo.p + 1
            
            const currentNode = currentNodeInfo.node
            currentNode.roads.forEach(road => {
                const broNode = road.getBrother(currentNode);

                if(!nodeGraph.map(x => x.node).includes(broNode)) {
                    nodeGraph.push({p:pIter, node:broNode, parent:currentNodeInfo});
                    if (pIter < pIterMax) {
                        openNode.push({p:pIter, node:broNode, parent:currentNodeInfo});
                    }
                }
            })
        }

        return nodeGraph
    }

    nodeGraphDistance(nodeGraph) {
        return nodeGraph
            .map(nodeG => {
                return {
                    distance:this.nodeDistance(nodeG.node),
                    ...nodeG
                }         
            })
            .sort((a, b) => a.distance - b.distance);
    }

    _isValideNearNode(node) {
        const tile = this.fm.getTile(node.x, node.y)
        return !tile.isFrise && !tile.isBlock && !tile.wcBuild
    }

    getBestNearNode(config) {
        
        const NEAR_ITER_LIMIT=2
        const ITER_LIMIT=40

        const CROSS_ITER_MIN=3
        
        const nodeGraph = this.getNodeGraphFrom(ITER_LIMIT) 

        // Get Direct Connected Node    
        if (config.crossDist) {
            const connectedRoad = this.getNodeConnected(0)   
            // Check for Cross Node : 
            const filterCross = this.nodeGraphDistance(nodeGraph)
                .filter(nG => {
                    return nG.p >= CROSS_ITER_MIN && nG.distance <= config.crossDist
                })
            if (filterCross.length) {
                return filterCross.sort((a, b) => (a.distance - b.distance))[0]
            }

        }
        //crossDist

        // Get node Arround with configuration . 
        const nodeAroundRaw = this.getNodesAround(config.length, config.alphaStep)

        const nodeAroundValide = nodeAroundRaw
            .filter(n => this._isValideNearNode(n))

        if (nodeAroundValide.length == 0) return null;

        const nodeAroundInfo = nodeAroundValide
            .map(n => {
                const distNodeGraph = n.nodeGraphDistance(nodeGraph)
                return {
                    node:n,
                    minDist: distNodeGraph[0].distance,
                    avgNearDist: distNodeGraph
                        .filter(nG => nG.p < NEAR_ITER_LIMIT)
                        .reduce((acc, a) => acc + a.distance, 0),
                    avgFareDist: distNodeGraph
                        .filter(nG => nG.p >= NEAR_ITER_LIMIT)
                        .reduce((acc, a) => acc + a.distance, 0),
                }
            })
        
        // Filter To close to other Path
        const nodeFilterA = nodeAroundInfo
            .filter(nInfo => nInfo.minDist > config.minDist)

        if (nodeFilterA.length == 0) return null;

        // Filter half of node with greatess distance of  avgNearDist
        const nodeFilterB = nodeFilterA
                .sort((a, b) => b.avgNearDist - a.avgNearDist)
                .slice(0, Math.min(nodeFilterA.length , 3))
        
        // Filter node with the less distance of avgFareDist
        const nodeFilterC = nodeFilterB
            .sort((a, b) => (a.avgFareDist - b.avgFareDist) || b.avgNearDist - a.avgNearDist)

        // Use pathfinder to check the truck path lenght ( filter > conf.length + 5)
        let bestNode = null
        while(nodeFilterC.length) {
            bestNode = nodeFilterC.shift()
            const path = new PathFactory(this.world, {})
            const wcPath = path.createWcPath({x:this.x, y:this.y}, {x:bestNode.node.x, y:bestNode.node.y})
            // is path note fond
            if (!wcPath) return null
            // check the length of the path
            if (wcPath.tileList.length < config.length + 5) {
                return bestNode
            }
        }
        
        return null        
    }

    // ----
    getCloserDistanceNode(pIter=5) {
        // Get Direct Connected Node        
        const nearNodesConnected = this.getNodeConnected(0);
        // Get All node Conected to a (n)child
        // Filter Node not connected . 
        const nearNodesPossible = this.getNodeConnected(pIter)
            .filter(n => !nearNodesConnected.includes(n) && n !== this)

        const minDistNode = this.nodesMinDistance(nearNodesPossible)
        return minDistNode
    }
    
    getNodeConnected(pIter) {
        let nodes = [];
        this.roads.forEach(road => {
            const bro = road.getBrother(this);
            nodes.push(bro);
            if(pIter > 0) nodes = nodes.concat(bro.getNodeConnected(pIter-1));
        })
        return [...new Set(nodes)];
    }


    addRoad(road, pIter=5, cost=1) {
        this.roads.push(road);
        this.propagateRoad(pIter, road.getBrother(this), cost);
    }

    propagateRoad(pIter, parent, cost) {
        this.power += pIter >= 0 ? cost : - cost;
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

