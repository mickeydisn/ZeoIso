
function City(world, id, name, x, y, param) {
    this.world = world;
    this.id = id; 
    this.name = name;
    this.x = x;
    this.y = y;
    this.param = param;

    this.init();
}

City.prototype = {

    x: 0,
    y: 0,
    name: "HoWe",
    infoCell: null,

    gridNodes: null,
    centerNode: null,
    pointNode: null,
    blockNodes: null,
    roads: null,
    openNodes: null,
    param : null, 
    
    // ------------------------------------------------------------------------------------------------------------------
    // Init

    init : function (){
        console.log("Init", this);
        
        this.infoCell = this.world.getCellInfo(this.x, this.y);

        this.gridNodes = [];
        this.centerNode = [];
        this.pointNode = [];
        this.blockNodes = [];
        this.roads = [];
        this.openNodes = [];

        const centerNode = new CityNode(this.x * 16 + 8, this.y * 16 + 8);
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
    },

    update : function(param) {
        this.param = param;
        this.init()
    },

    evalNode : function (node) {
        const lvl = this.world.factoryGenerator.getLvl(node.x, node.y);
        if (lvl < this.world.factoryGenerator.waterLvl + 1) {
            return 0;
        }
        const density = this.world.factoryGenerator.getRawDensity(node.x, node.y);
        if (density < 128) {
            return 0;
        }
        const minDistance = node.nodeMeanMinDisance(this.gridNodes);
        // if (density < this.param.mainRoad.length) {
        //     return 0;
        // }
        return density * minDistance;
    },


    nodeLvlDeviation : function (startNode, newNode, param) {
        const lvl = this.world.factoryGenerator.getRawLvl(startNode.x, startNode.y);
        // const arround = newNode.getNodesAroud(param.lvlDeviationLength, param.lvlDefviationAlphaStep);
        const arround = newNode.getNodesNearTarget(startNode, param.lvlDefviationAlpha, param.lvlDeviationCount);
        let endNode = newNode;
        let diffLvl = Math.abs(this.world.factoryGenerator.getRawLvl(newNode.x, newNode.y) - lvl);
        arround.forEach(tmpNode => {
            const tmpDiffLvl = Math.abs(this.world.factoryGenerator.getRawLvl(tmpNode.x, tmpNode.y) - lvl);
            if (tmpDiffLvl < diffLvl) {
                diffLvl = tmpDiffLvl;
                endNode = tmpNode;
            }          
        })
        return endNode;
    },

    createNewRoad : function(startNode, newNode, param) {

        this.gridNodes.push(newNode);
        this.openNodes.push(newNode);
        const road = new CityRoad(startNode, newNode, param);
        startNode.addRoad(road, param.powerIter, Number(param.powerCost));
        newNode.addRoad(road, 0, Number(param.powerCost));

        this.roads.push(road);
    },

    // Chose the best Node Aroud can be created.
    createBestRoadAgroundNodeList : function (nodesList, param) {
        let arrRoad = [];
        nodesList.forEach(startNode => {
            const arround = startNode.getNodesAroud(param.length, param.alphaStep);
            arround.forEach(newNode => {
                const eval = this.evalNode(newNode);
                if (eval > 0) {
                    arrRoad.push([eval, startNode, newNode]);
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

    },

    // Create Main Raod 
    createMainRoads : function () {
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
            this.openNodes, 
            cost=this.param.mainRoad
        );
   },


    expendSubRoads : function () {
        // SubSelect a part of Road , Find a Road extention
        const sizeGridRand = 1 / (this.gridNodes.length / 20.);

        const crossNodes = this.gridNodes.filter(node => {
            return node.roads.length < 3 & Math.random() < sizeGridRand ; // Magic Random to Perf
        })
        this.createBestRoadAgroundNodeList(crossNodes, this.param.subRoad);

    },


    evalNode : function (node) {
        const lvl = this.world.factoryGenerator.getLvl(node.x, node.y);
        if (lvl < this.world.factoryGenerator.waterLvl + 1) {
            return 0;
        }

        const density = this.world.factoryGenerator.getDensity(node.x, node.y);
        if (density < 196) {
            return 0;
        }

        const minDistance = node.nodeMeanMinDisance(this.gridNodes);
        if (density < this.param.mainRoad.length) {
            return 0;
        }
        // if (minDistance < 16) {
        //     return 0;
        // }
        return (density / 255) * minDistance;
    },

    connectSubRoads : function () {
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

    },

    createCenter : function () {
        const count = 8
        const step = Math.round(this.gridNodes.length / count);
        let centerNode = [];
        for (let i = 0; i < count; i++) {

            centerNode.push(new CityNode(this.gridNodes[i * step].x, this.gridNodes[i * step].y))
        }
        this.gridNodes.forEach(node => {
            const movingNode = node.nodeMinDistance(centerNode)[1];
            movingNode.move(node);
        })
        this.centerNode = centerNode;
    },

    createBlock : function () {
        // Compute Point For Block Around each CrossRoadNode
        this.gridNodes
            // .filter(node => node.roads.length > 2)
            .forEach(node => {node.getCrossZoneRoadNode()})

        this.roads.forEach(road => {
            road.sliptBlocks(3, 0.1)
        })
        
    }, 

    drawPoint(context, node, size, color, zoom) {
        if (!node ) return false;

        context.beginPath();
        context.arc(node.getx(zoom), node.gety(zoom), size, 0, 2 * Math.PI);
        context.lineWidth = 0;
        context.fillStyle = color;
        context.fill();
    },

    drawLine(context, n1, n2, size, color, zoom) {
        if (!n1 | !n2 ) return false;
        context.beginPath();
        context.moveTo(n1.getx(zoom), n1.gety(zoom));
        context.lineTo(n2.getx(zoom), n2.gety(zoom));
        context.lineWidth = size;
        context.strokeStyle = color;
        context.stroke();
    },
    drawBlock(context, n1, n2, n3, n4, color, zoom) {
        context.beginPath();
        context.moveTo(n1.getx(zoom), n1.gety(zoom));
        context.lineTo(n2.getx(zoom), n2.gety(zoom));
        context.lineTo(n3.getx(zoom), n3.gety(zoom));
        context.lineTo(n4.getx(zoom), n4.gety(zoom));
        context.lineWidth = 0;
        context.fillStyle = color;
        context.fill();
    },

    draw : function(context, zoom) {
        console.log("Draw", this);
    
        // this.tiledBuilding.context.drawImage(build.imageData, xDisplay, yDisplay, z, z);

        this.roads.forEach(road => {
            this.drawLine(context, road.n1, road.n2, road.param.size, road.param.color, zoom);

            road.blocks
            .filter(blc => blc.lineRoad != undefined & blc.lineOut != undefined)    
            .forEach(blc => {
                if (!blc.lineRoad | !blc.lineOut | !blc.lineRoad.n1 | !blc.lineRoad.n2 | !blc.lineOut.n1 | !blc.lineOut.n2) {
                    return;
                }
                // this.drawLine(context, blc.lineRoad.n1, blc.lineOut.n1, 1, '#9999FF', zoom);
                // this.drawLine(context, blc.lineRoad.n1, blc.lineRoad.n2, 1, '#9999FF', zoom);
                // this.drawLine(context, blc.lineOut.n1, blc.lineOut.n2, 1, '#99FFFF', zoom);
                const density = this.world.factoryGenerator.getRawDensity(blc.lineRoad.n1.x, blc.lineRoad.n1.y);

                if (Math.random() < density - .7) {
                    this.drawBlock(context, 
                        blc.lineRoad.n1, blc.lineRoad.n2,
                        blc.lineOut.n2, blc.lineOut.n1,
                        '#99999999', zoom
                    )
                }
            })
        })   
        
        /*
        this.centerNode.forEach(node => {
            context.beginPath();
            context.arc(node.getx(zoom), node.gety(zoom), 5, 0, 2 * Math.PI);
            context.lineWidth = 5;
            context.strokeStyle = '#000000';
            context.stroke();
        })
        */

        context.beginPath();
        context.arc((this.x * 16 + 8) / zoom, (this.y * 16 + 8) / zoom, 5, 0, 2 * Math.PI);
        context.strokeStyle = '#FFF';
        context.lineWidth = 5;
        context.stroke();


    }


}


function CityBlock(n1, n2) {
    this.n1 = n1;
    this.n2 = n2;
}