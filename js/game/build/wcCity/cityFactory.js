import { CustomBuilding } from "../customBuilding/mainCitySpawn.js";
import { CityTileNode } from "./cityTileNode.js";
import { section_BuildBestHouse3a, section_BuildBestHouse3b, section_BuildBestHouse4a, section_BuildBestHouse6a } from "./steps/stepBuildBestHouse.js";
import { section_BuildBestPath } from "./steps/stepBuildBestPath.js";
import { section_StartNode } from "./steps/stepStartNode.js";


export class CityFactory {

    constructor(world,conf={}) {
        this.world = world
        Object.assign(this, conf)

        this.fm = world.factoryMap;
        this.ta = world.tilesActions;
        this.GS = world.globalState

        this.nodeList = []


        this.inventory = {
            STEPS: {
                'StartNode' : [],
                'PathNode' : [],
                'HouseNode' : [],
            },
        }

    }


    start(x, y) {

        const centreCity = new CustomBuilding(this.world, {})
        centreCity.start(x, y)

        {
            const tile = this.fm.getTile(x, y)
            new CityTileNode(this.world, tile, {
                type:'StartNode',
                asset : {key : [10, 10, 10, 10, 10, 8, 6].map(x => 'crypt_NE#_C110_S40_B90_R' + x)},
                STEPS: [
                    {
                        type:"menu",
                        title: "Menu",
                        isValidated: true,
                    }, 
                    {...section_StartNode, title:"Story"},
                    {...section_BuildBestPath, title:"== Build a road =="},
                    {...section_BuildBestHouse3b, title:"== Build a House =="},
                    {...section_BuildBestHouse4a, title:"== Build a Lab =="},
                    {...section_BuildBestHouse6a, title:"== Build a Grave yard =="},
                    {...section_BuildBestHouse3a, title:"== Build a Communoty Center =="},
                ]
            })
        }


    }
    // --------------------------------
}

