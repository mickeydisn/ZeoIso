import { CustomBuilding } from "../customBuilding/mainCitySpawn.js";
import { CityTileNode } from "./cityTileNode.js";
import { section_BuildBestPath } from "./steps/stepBuildBestPath.js";


export class CityFactory {

    constructor(world,conf={}) {
        this.world = world
        Object.assign(this, conf)

        this.fm = world.factoryMap;
        this.ta = world.tilesActions;
        this.GS = world.globalState


        this. nodeList = []

    }


    start(x, y) {

        const centreCity = new CustomBuilding(this.world, {})
        centreCity.start(x, y)

        {
            const tile = this.fm.getTile(x, y)
            new CityTileNode(this.world, tile, {
                asset : {key : [10, 10, 10, 10, 10, 8, 6].map(x => 'crypt_NE#_C110_S40_B90_R' + x)},
                STEPS: [
                    {
                        type:"menu",
                        title: "Menu",
                        isValidated: true,
                    }, {
                        type:"MD",
                        title: "INTO",
                        text: TEXT_INTRO, 
                        isValidated: true,
                    }, {
                        type:"Quest", 
                        title: "Quest",
                        text: `> Collect Biome Resource .. `, 
                        isValidated: true,
                    },    
                    section_BuildBestPath,
                ]
            })
        }


    }
    // --------------------------------
}




const TEXT_INTRO = `

**Ghostly Greeting** 👻
Hello there, adventurer! 👋 I'm Kaelin, a former citizen of this mystical plateau. 🌄 As I rise from the ashes of time, I'm still trying to wrap my ethereal mind around this strange new world. 🤯

**Legend of the Harmonizer** 🎶
You see, I've heard whispers of an ancient artifact, the Harmonizer, which can harmonize the environment. 🌈 Legend has it that this wind chime of ethereal beauty can soothe the savage beast, or in this case, the turbulent winds of Zorvath. 💨

**A Glimpse into the Past** 🔮
As I recall, the Harmonizer was said to be crafted by the ancient Gosh, who harnessed the power of wind to sustain their utopia. 🌊 But, alas, their city was ravaged by a catastrophic storm, leaving behind only remnants of their advanced civilization. 🌪️

**A Mysterious Legacy** 🕰️
Now, as a ghost, I'm left to ponder the secrets of the Harmonizer and the other artifacts. 🤔 Will you, brave adventurer, help me unravel the mysteries of this mystical plateau? 🌟

`