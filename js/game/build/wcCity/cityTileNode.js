import { CityNode } from "./cityNode.js";
import { section_BuildBestHouse, section_BuildBestHouse3b } from "./steps/stepBuildBestHouse.js";
import { section_BuildBestPath } from "./steps/stepBuildBestPath.js";
import { section_BuildGraphPath } from "./steps/stepBuildPathGraph.js";
import { section_RemoveBuilding } from "./steps/stepRemoveHouse.js";


const STEPS_DEFAULT_PATH = [

    {
        type:"menu",
        title: "Menu",
        isValidated: true,
    }, {
        type:"MD",
        title: "Intro",
        text: ` HELLO WORD `, 
        isValidated: true,
    }, {
        type:"Quest", 
        title: "Quest",
        text: `> Collect Biome Resource .. `, 
        isValidated: true,
    },
    section_BuildBestPath,
    // section_BuildHouse,
    section_BuildBestHouse,
    section_BuildBestHouse3b,
    section_BuildGraphPath,
]

export class CityTileNode extends CityNode {

    constructor(world, tile, conf={}) {
        super(world, tile.x, tile.y)
        this.world = world
        this.tile = tile
        this.conf = conf

        tile.cityNode = this

        this.fm = world.factoryMap;
        this.ta = world.tilesActions;
        this.GS = world.globalState

        this.isHide = false;
        this.hideDistance = 1;
        
        this.asset = {key: "statue_obelisk_NW#_H180_C150_S95_B75_I1"}
        this.text = "# Hello word"

        this.STEPS = STEPS_DEFAULT_PATH
        this._currentStepIdx = 0

    }

    // --------------------------------

    set currentStepIdx(stepIndex) {
        if (stepIndex < 0 || stepIndex >= this.STEPS.length) return;
        this._currentStepIdx = stepIndex
    }
    get currentStepIdx() {
        return this._currentStepIdx
    }


    get currentStep() {
        const curentStep = this.STEPS[this._currentStepIdx]
        console.log('--STEP: ', curentStep.title)

        if (curentStep.steps) {
            let subStep = null;
            const subStepList = [...curentStep.steps]
            while(subStepList.length > 0) {
                subStep = subStepList.shift()
                console.log('CHECK: ', subStep.title, subStep.text)
                if (subStep.isValidated(this)) {
                    return { type:curentStep.type, ...subStep}; 
                }                               
            }
            return { type:curentStep.type, 
                title: "## Error",
                text: `> No valide Step `, 
            }; 
        }
        this._currentStep = curentStep
        return curentStep
    }


    /**
     * Returns the previous validated step.
     */
    homeStep() {
        this.currentStepIdx =  0;
        this.sData =  null;
        return this.currentStep;
    }
    
    /**
     * Returns the previous validated step.
     */
    get presStep() {
        const stepIndex = this.STEPS.findLastIndex(
            (step, index) => index < this.currentStepIdx && step.isValidated
        );
        if (stepIndex !== -1) {
            this.currentStepIdx =  stepIndex;
            return this.STEPS[stepIndex];
        }
        return this.currentStep;
    }

    /**
     * Returns the next validated step.
     */
    get nextStep() {
        const stepIndex = this.STEPS.findIndex(
            (step, index) => index > this.currentStepIdx && step.isValidated
        );
        if (stepIndex !== -1) {
            this.currentStepIdx = stepIndex;
            return this.STEPS[stepIndex];
        }
        return this.currentStep;
    }

    toJson() {
        return {
            // sData: this.sData,
            power: this.power,
            alphaStep: this.alphaStep,
            isHide: this.isHide,
            hideDistance: this.hideDistance,
            roads: this.roads.map(r => r.length),

        }
    }

}



// --------------



const STEPS_DEFAULT_HOUSE = [

    {
        type:"menu",
        title: "Menu",
        isValidated: true,
    }, {
        type:"MD",
        title: "Intro",
        text: ` HELLO WORD `, 
        isValidated: true,
    },
    section_RemoveBuilding,

]

export class CitNodeHouse extends CityTileNode {
    constructor(world, tile, conf={}) {
        super(world, tile, conf)
        this.STEPS = STEPS_DEFAULT_HOUSE
        this.asset = {key: [
            "coinGold_NW#_H190_C110_S80_B80_R1",
            "coinGold_NW#_H190_C110_S80_B80_R1",
            "coinGold_NW#_H190_C110_S80_B80_R2",
            "coinGold_NW#_H190_C110_S80_B80_R2",
        ]}
    }
}

