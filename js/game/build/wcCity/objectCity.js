import { CityNode, Node } from "./cityNode.js"
import { CityRoad } from "./cityRoad.js"
import { CITY_DEFAULT_PARAM } from "./config/defaultCity.js";

export class  City {

    x= 0
    y= 0
    name= "HoWe"
    infoCell= null

    gridNodes= null
    centerNode= null
    pointNode= null
    blockNodes= null
    roads= null
    openNodes= null
    param= null
    

    constructor (world, x, y, param={}) {
        this.world = world;
        this.fm = this.world.factoryMap

        this.x = x;
        this.y = y;
        this.nodeCenter = new Node(x, y)
        this.param = {...param, ...CITY_DEFAULT_PARAM}

        this.init();
    }




    // ------------------------------------------------------------------------------------------------------------------
    // Init

    init(){
        console.log("Init", this);
        
        // this.infoCell = this.world.getCellInfo(this.x, this.y);

        this.gridNodes = [];
        this.centerNode = [];
        this.pointNode = [];
        this.blockNodes = [];
        this.roads = [];
        this.openNodes = [];

        const centerNode = new CityNode(this.x, this.y);
        this.gridNodes.push(centerNode);
        this.openNodes.push(centerNode);

        console.log('=MainRoad');
        for (let i = 0; i < this.param.mainRoad.count; i++) {
            this.createMainRoads();
        }
        
        console.log('=CreateCenter');
        console.log(this.gridNodes);
        this.createCenter();

        console.log('=SubNode');
        for (let i = 0; i < this.param.subRoad.count; i++) {
            this.expendSubRoads();
        }
        
        console.log('=Connected Node');
        this.connectSubRoads();
        this.createBlock();
    }

    update (param) {
        this.param = param;
        this.init()
    }

    evalNode (node) {
        const tile = this.fm.getRoundTile(node.x, node.y)
        const lvl = tile.lvl
        /*
        if (lvl < this.world.factoryGenerator.waterLvl + 1) {
            return 0;
        }
        const density = tile.fDensity;
        if (density < 128) {
            return 0;
        }
        */
        const centerProximity = this.nodeCenter.nodeDistance(node)
        
        const centerFactor = centerProximity > 400 ? 0 : 1 - (centerProximity / 400)

        const minDistance = node.nodeMeanMinDisance(this.gridNodes);

        return centerFactor *  minDistance;
    }


    nodeLvlDeviation (startNode, newNode, param) {
        
        const lvl = this.fm.getRoundTile(startNode.x, startNode.y).lvl;
        // const arround = newNode.getNodesAroud(param.lvlDeviationLength, param.lvlDefviationAlphaStep);
        const arround = newNode.getNodesNearTarget(startNode, param.lvlDefviationAlpha, param.lvlDeviationCount);
        let endNode = newNode;
        
        let diffLvl = Math.abs(this.fm.getRoundTile(newNode.x, newNode.y).lvl - lvl);
        arround.forEach(tmpNode => {
            const tmpDiffLvl = Math.abs(this.fm.getRoundTile(tmpNode.x, tmpNode.y).lvl - lvl);
            if (tmpDiffLvl < diffLvl) {
                diffLvl = tmpDiffLvl;
                endNode = tmpNode;
            }          
        })
        return endNode;
    }

    createNewRoad(startNode, newNode, param) {

        this.gridNodes.push(newNode);
        this.openNodes.push(newNode);
        const road = new CityRoad(startNode, newNode, param);
        startNode.addRoad(road, param.powerIter, Number(param.powerCost));
        newNode.addRoad(road, 0, Number(param.powerCost));

        this.roads.push(road);
    }

    // Chose the best Node Aroud can be created.
    createBestRoadAgroundNodeList (nodesList, param) {
        let arrRoad = [];
        nodesList.forEach(startNode => {
            const arround = startNode.getNodesAroud(param.length, param.alphaStep);
            arround.forEach(newNode => {
                const evals = this.evalNode(newNode);
                if (evals > 0) {
                    arrRoad.push([evals, startNode, newNode]);
                }
            })
        })
        arrRoad = arrRoad.sort((a, b) => - a[0] + b[0])
        if (arrRoad.length < 1) {
            console.log("=== End City ==== ");
            return false;
        } else {
            const bestStartNode = arrRoad[0][1]
            const bestEndNode = arrRoad[0][2]

            const newNode = this.nodeLvlDeviation(bestStartNode, bestEndNode, param)

            this.createNewRoad(bestStartNode, newNode, param)
            return true;
        }

    }

    // Create Main Raod 
    createMainRoads () {
        // Check The power each Node the road syteme to computed cross section 
        const crossRoadNodes = this.gridNodes.filter(node => {
            return node.roads.length < 3 & node.power == this.param.crossingRoad.powerCondition;
        })
        if (crossRoadNodes.length > 0) {
            if (this.createBestRoadAgroundNodeList(
                crossRoadNodes, this.param.crossingRoad, 
            )) return true
        }
        // Expend the The road System.
        this.openNodes = this.openNodes.filter(node => {
            return node.roads.length < 2;
        })
        return this.createBestRoadAgroundNodeList(
            this.openNodes, this.param.mainRoad
        );
   }


    expendSubRoads () {
        // SubSelect a part of Road , Find a Road extention
        const sizeGridRand = 1 / (this.gridNodes.length / 20.);

        const crossNodes = this.gridNodes.filter(node => {
            return node.roads.length < 3 & Math.random() < sizeGridRand ; // Magic Random to Perf
        })
        this.createBestRoadAgroundNodeList(crossNodes, this.param.subRoad);

    }

    connectSubRoads () {
        const param = this.param.connectRoad;
        const crossNodes = this.gridNodes.filter(node => {
            return node.roads.length == 2 // & node.power > this.param.subRoad.powerCondition;
        })
        crossNodes.forEach(startNode => {
            const nearNodes = startNode.getNodeConnected(2);
            const arround = startNode.getNodesAroud(param.length, param.alphaStep)
            let arroundNear = arround.map(endNode => {
                const [dist, node] = endNode.nodeMinDistance(this.gridNodes)
                return [dist, startNode, node];
            })
            arroundNear = arroundNear
                .filter(x => x[0] > 0)
                .filter(x => ! nearNodes.includes(x[2]))
                .sort((a, b) => - a[0] + b[0])
            arroundNear = arroundNear[0] 
            if (arroundNear) {
                this.createNewRoad(arroundNear[1], arroundNear[2], param)
            }
        })

    }

    createCenter () {
        const count = 8
        const step = Math.round(this.gridNodes.length / count);
        let centerNode = [];
        for (let i = 0; i < count; i++) {

            centerNode.push(new CityNode(this.gridNodes[i * step].x, this.gridNodes[i * step].y))
        }
        this.gridNodes.forEach(node => {
            const movingNode = node.nodeMinDistance(centerNode)[1];
            // movingNode.move(node);
        })
        this.centerNode = centerNode;
    }

    createBlock () {
        // Compute Point For Block Around each CrossRoadNode
        this.gridNodes
            // .filter(node => node.roads.length > 2)
            .forEach(node => {node.getCrossZoneRoadNode()})

        this.roads.forEach(road => {
            road.sliptBlocks(3, 0.1)
        })
        
    } 

}

