import { CustomBuilding } from "../customBuilding/mainCitySpawn.js";
import { CitNodeCenter } from "./config/cityNodeCenter.js";
import { CREATE_SUBSTEP_BUILD } from "./nodeSteps/stepBuildBestHouse.js";
import { SUBSTEP_BestPathBuilder_Build } from "./nodeSteps/stepBuildBestPath.js";
import { SUBSTEP_SummonEntity } from "./nodeSteps/stepSummonEntity.js";


export class CityFactory {

    constructor(world,conf={}) {
        this.world = world
        Object.assign(this, conf)

        this.fm = world.factoryMap;
        this.ta = world.tilesActions;
        this.GS = world.globalState

        this.cityNodeMaxId = 1;
        this.cityNodesIndex = {}
        this.cityNodes = []
        this.entities = []
    }



    start(x, y) {

        const centreCity = new CustomBuilding(this.world, {})
        centreCity.start(x, y)

        {
            const tile = this.fm.getTile(x, y)
            new CitNodeCenter(this.world, this, tile, {})
        }
    }

    // --------------------------------

	addEntity(entity) {
		if (!this.entities.includes(entity)) {
			this.entities.push(entity)
		}
	}
	removeEntity(entity) {
		const index = this.entities.indexOf(entity);
		if (index > -1) {
			this.entities.splice(index, 1);
		}
	}

    doTick() {
        this.entities.forEach(e => e.doTick())
    }

    // --------------------------------

    appendNode(cityNode) {
        if (!this.cityNodes.includes(cityNode)) {
            cityNode.hashId = this.cityNodeMaxId
            this.cityNodeMaxId += 1
            this.cityNodes.push(cityNode)
            this.cityNodesIndex[cityNode.hashId] = cityNode
            console.log(`/addCityNode ${cityNode.type} ${cityNode.x} ${cityNode.y} hash:${cityNode.hashId}`, cityNode.conf )
        }
    }
    removeNode(cityNode) {
        const idx = this.cityNodes.findIndex(cityNode)
        if (idx) {
            this.cityNodes.splice(idx, 1)
            delete this.cityNodesIndex[cityNode.hashId]
        }
    }

    load(callback) {
        this.reloadSteps(callback)
    }

    reloadSteps(callback=() => {}) {
        const steps = [

            {nodeHash:1, step:SUBSTEP_SummonEntity},           // 2

            {nodeHash:1, step:SUBSTEP_BestPathBuilder_Build},           // 2
            {nodeHash:1, step:CREATE_SUBSTEP_BUILD({buildType:'house3b', growLoopCount:10})},     // 3
            {nodeHash:1, step:CREATE_SUBSTEP_BUILD({buildType:'house4a', growLoopCount:10})},     // 4

            {nodeHash:1, step:CREATE_SUBSTEP_BUILD({buildType:'house6a', growLoopCount:10})},     // 5

            {nodeHash:5, step:SUBSTEP_SummonEntity},           // 2
            {nodeHash:5, step:SUBSTEP_SummonEntity},           // 2
            {nodeHash:5, step:SUBSTEP_SummonEntity},           // 2
            {nodeHash:5, step:SUBSTEP_SummonEntity},           // 2
            {nodeHash:5, step:SUBSTEP_SummonEntity},           // 2

            {nodeHash:2, step:SUBSTEP_BestPathBuilder_Build},           // 6
            {nodeHash:2, step:SUBSTEP_BestPathBuilder_Build},           // 7

            {nodeHash:2, step:CREATE_SUBSTEP_BUILD({buildType:'house3b', growLoopCount:10})},     // 8
            {nodeHash:2, step:CREATE_SUBSTEP_BUILD({buildType:'house3b', growLoopCount:10})},     // 9

            {nodeHash:6, step:SUBSTEP_BestPathBuilder_Build},           // 10
            {nodeHash:7, step:SUBSTEP_BestPathBuilder_Build},           // 11

            {nodeHash:6, step:CREATE_SUBSTEP_BUILD({buildType:'house3b', growLoopCount:10})},     // 4
            {nodeHash:6, step:CREATE_SUBSTEP_BUILD({buildType:'house3b', growLoopCount:10})},     // 4
            {nodeHash:6, step:CREATE_SUBSTEP_BUILD({buildType:'house3b', growLoopCount:10})},     // 4

            {nodeHash:6, step:CREATE_SUBSTEP_BUILD({buildType:'house4a', growLoopCount:10})},     // 4
            {nodeHash:6, step:CREATE_SUBSTEP_BUILD({buildType:'house4a', growLoopCount:10})},     // 4
            {nodeHash:6, step:CREATE_SUBSTEP_BUILD({buildType:'house4a', growLoopCount:10})},     // 4


            {nodeHash:7, step:CREATE_SUBSTEP_BUILD({buildType:'house3b', growLoopCount:10})},     // 4
            {nodeHash:7, step:CREATE_SUBSTEP_BUILD({buildType:'house3b', growLoopCount:10})},     // 4
            {nodeHash:7, step:CREATE_SUBSTEP_BUILD({buildType:'house3b', growLoopCount:10})},     // 4

            {nodeHash:7, step:CREATE_SUBSTEP_BUILD({buildType:'house4a', growLoopCount:10})},     // 4
            {nodeHash:7, step:CREATE_SUBSTEP_BUILD({buildType:'house4a', growLoopCount:10})},     // 4
            {nodeHash:7, step:CREATE_SUBSTEP_BUILD({buildType:'house4a', growLoopCount:10})},     // 4


            {nodeHash:10, step:SUBSTEP_BestPathBuilder_Build},           // 10
            {nodeHash:10, step:SUBSTEP_BestPathBuilder_Build},           // 10

            {nodeHash:11, step:SUBSTEP_BestPathBuilder_Build},           // 11
            {nodeHash:11, step:SUBSTEP_BestPathBuilder_Build},           // 11

            {nodeHash:10, step:CREATE_SUBSTEP_BUILD({buildType:'house3b', growLoopCount:50})},     // 9
            {nodeHash:10, step:CREATE_SUBSTEP_BUILD({buildType:'house3b', growLoopCount:50})},     // 9
            {nodeHash:10, step:CREATE_SUBSTEP_BUILD({buildType:'house3b', growLoopCount:50})},     // 9

            {nodeHash:11, step:CREATE_SUBSTEP_BUILD({buildType:'house3b', growLoopCount:50})},     // 9
            {nodeHash:11, step:CREATE_SUBSTEP_BUILD({buildType:'house3b', growLoopCount:50})},     // 9
            {nodeHash:11, step:CREATE_SUBSTEP_BUILD({buildType:'house3b', growLoopCount:50})},     // 9

        ]
        this.do_reloadSteps(steps, callback=() => {})
    }


    do_reloadSteps (steps, callback=() => {}) {

        // Function to handle errors
        const handleError = () => {
            callback();
        };
    
    
        // Function to handle each step
        const handleStep = (cityNode, step) => {
            return new Promise((resolve) => {
                step.doEnter(cityNode, resolve, callback);
            });
        };
    
        // Function to start the process
        const startProcess = async () => {
    
            for (let i = 0; i < steps.length; i++) {
                console.log("STEP ", i, steps[i], this.cityNodesIndex)
                const step = steps[i].step;
                const cityNode = this.cityNodesIndex[steps[i].nodeHash]
                if (cityNode && step.isValidated(cityNode)) {
                    await handleStep(cityNode, step);
                } else {
                    handleError();
                    return;
                }
            }
            callback(); // All steps completed successfully
        };
    
        // ---------
        // Start the process with the first step
        startProcess();
    }
    
    


}

