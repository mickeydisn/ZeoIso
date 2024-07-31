import { KmInventory, KmProduction } from "../../industry/kmFacoty.js";
import { CityNode } from "./cityNode.js";



const CITY_NODE_DEFAULT_CONF = {
    type:'CityTileNode',
    asset: {
        key: [10, 10, 10, 10, 10, 10, 9, 8, 7].map(x => "statue_obelisk_NW#_H180_C150_S95_B75_I1_R" + x)
    },
    STEPS: [

        {
            type: "Menu",
            title: "Menu",
            isValidated: true,
        }, {
            type:"MD",
            title: "Intro",
            text: ` HELLO WORD `, 
            isValidated: true,
        }
    ]
}

export class CityTileNode extends CityNode {

    constructor(world, cityFactory, tile, conf={}) {
        super(world, tile.x, tile.y)
        this.world = world
        this.tile = tile

        tile.cityNode = this

        this.fm = world.factoryMap;
        this.ta = world.tilesActions;
        this.GS = world.globalState
        this.player = world.player

        this.isHide = false;
        this.hideDistance = 1;
        
        this.type = conf.type
        this.conf = conf

        // Stor the entity linkend to the CityNode ( ex: Host of house .)
        this.entities = []
        this.inventory = new KmInventory(8)
        this.inventory.addItem('rsTime', 1)

        this.production = new KmProduction(this.inventory)

        this.cityFactory = cityFactory
        this.cityFactory.appendNode(this)

        // this.asset = null //  {key:  [10, 10, 10, 10, 10, 10, 9, 8, 7].map(x => "statue_obelisk_NW#_H180_C150_S95_B75_I1_R" + x)}
        // this.STEPS = null // STEPS_DEFAULT_PATH
        this._currentStepIdx = 0

        Object.assign(this, CITY_NODE_DEFAULT_CONF)
        Object.assign(this, conf)


        // this._inventory = {}

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

    get entitiesAtNode() {
        return this.entities.filter(e => e.tile.x == this.tile.x && e.tile.y == this.tile.y)
    }
    get entitiesIsAtNode() {
        return this.entities.length > 0 && this.entities.length == this.entitiesAtNode.length
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
        // console.log('--STEP: ', curentStep.title)

        if (curentStep.steps) {
            let subStep = null;
            const subStepList = [...curentStep.steps]
            while(subStepList.length > 0) {
                subStep = subStepList.shift()
                const isVal = subStep.isValidated(this)
                // console.log('CHECK: ',isVal,  subStep.title, subStep.text)
                if (isVal) {
                    return { 
                        type:curentStep.type, 
                        title:curentStep.title, 
                        ...subStep
                    }; 
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
    
    // ------------------------------------
    setIsoDivBox(isoDivBox) {
        this.isoDivBox = isoDivBox
    }
    updateIsoDivBox() {
        if (this.isoDivBox && !this.isoDivBox.isHide) {
            this.isoDivBox.updateContent()
        }
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


    jsonSave() {
        return {
            x: this.x,
            y: this.y,
            type: this.type,
            // inventory: this._inventory,
        }        
        
    }

}

