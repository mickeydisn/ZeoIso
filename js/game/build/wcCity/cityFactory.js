import { CustomBuilding } from "../customBuilding/mainCitySpawn.js";
import { CitNodeCenter } from "./config/cityNodeCenter.js";


export class CityFactory {

    constructor(world,conf={}) {
        this.world = world
        Object.assign(this, conf)

        this.fm = world.factoryMap;
        this.ta = world.tilesActions;
        this.GS = world.globalState

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
            this.cityNodes.push(cityNode)
        }
    }
    removeNode(cityNode) {
        const idx = this.cityNodes.findIndex(cityNode)
        if (idx) this.cityNodes.splice(idx, 1)
    }
}

