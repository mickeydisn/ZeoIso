import { CustomBuilding } from "../customBuilding/mainCitySpawn.js";
import { CityTileNode } from "./cityTileNode.js";
import { section_BuildBestHouse3a, section_BuildBestHouse3b, section_BuildBestHouse4a, section_BuildBestHouse6a } from "./steps/stepBuildBestHouse.js";
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
                        type:"MD", title: "CITIZEN_TRAIS",
                        text: CITIZEN_TRAIS, 
                        isValidated: true,
                    }, {
                        type:"MD", title: "Wake up of Deaf",
                        text: TEXT_INTRO, 
                        isValidated: true,
                    }, {
                        type:"MD", title: "The First Road",
                        text: TEXT_FIRST_ROAD, 
                        isValidated: true,
                    }, 
                    {...section_BuildBestPath, title:"== Build a road =="},
                    {
                        type:"MD", title: "The First House",
                        text: TEXT_FIRST_HOUSE, 
                        isValidated: true,
                    }, 
                    {...section_BuildBestHouse3b, title:"== Build a House =="},
                    {
                        type:"MD", title: "The First Lab",
                        text: TEXT_FIRST_LAB, 
                        isValidated: true,
                    },   
                    {...section_BuildBestHouse4a, title:"== Build a Lab =="},
                    {...section_BuildBestHouse6a, title:"== Build a Grave yard =="},
                    {...section_BuildBestHouse3a, title:"== Build a Communoty Center =="},
                ]
            })
        }


    }
    // --------------------------------
}


const CITIZEN_TRAIS = `
\`\`\`
{
    "traits": {
        "adventurous": ["Skydiver", "Globetrotter", "Derring-doer"], 
        "whimsical": ["Inventive", "Creative", "Fantastical"]
    }, 
    "behavior": {
        "stubbornness": ["Strong-willed", "Pigheaded", "Persevering"], 
        "silliness": ["Absurd", "Crazy", "Humorous"]
    }, 
    "interests_hobbies": {
        "high-tech": ["Tech addict", "Cyber geek", "Innovator"]
    }, 
    "emotional_responses": {
        "resilient": ["Unstoppable", "Vibrant", "Self-assured"], 
        "gloomy": ["Melancholy", "Despairing", "Blue"]
    }, 
    "hightech_civilization": {
        "Hydroponic Farming": ["Hydroponic cultivation", "Hydroponic sustainability", "Hydroponic future"],
        "Futuristic": ["Hyper-technological", "Cyberpunk", "Cutting-edge"]
    }, 
    "quirky_technologies": {
        "Cyberpunk Creations": ["Neon", "Gritty", "Cybernetic"], 
        "Dimensional Devices": ["Alternate", "Multidimensional", "Reality-merging"]
    }, 
    "wft_effect": {
        "Enigmatic": ["Esoteric", "Uncanny", "Esoteric"], 
        "Twilight Zone": ["Dimension-bending", "Unsettling", "Bizarre"]
    },
    "irony_and_utter_bewilderment": {
        "Fanciful Farce": ["Curious mimicry", "Fanciful farce", "Bizarre travesty"], 
        "Unpredictable Anomalies": ["Unforeseen quirk", "Unpredictable anomaly", "Chance happening"]
    }
}
\`\`\`

`


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

const TEXT_FIRST_ROAD = `

🌟 Ah, greetings, brave adventurer! 👋 I'm thrilled to meet you on this wacky journey through the deserted planet of Zorvath! 🌌 As a Gosh, I'm delighted to share a special "spell" with you to help rebuild our beloved city. 🏙️

Here's the incantation: ✨ "Roa-dio-stra-stra-stra!" 🔮 It's a bit of a mouthful, I know, but trust me, it's the key to conjuring up the city's first road! 🚧 Just whisper it three times, and the road will magically appear! 🔮

Now, I know what you're thinking: "What's the catch?" 🤔 Well, let's just say it's a bit of a... unconventional... magic. 😜 But hey, it's worth a try, right? 😊 So, go ahead, whisper the spell, and let's get this road show on the road! 🎉

`


const TEXT_FIRST_HOUSE = `
🏠 Ah, the first road is built, and now it's time to think about a place to call home 🏠. I've got just the thing for you! 🔮 I've concocted a special spell to help us get started. It's not fancy, just a humble abode to rest our weary heads 🛋️. 

Here's the spell: **Domus Ignis** 🔥. Just whisper it to the spirit node over there ✨, and let the magic unfold ✨. Who knows what wonders await us in this mystical realm? 🤔
`



const TEXT_FIRST_LAB = `

🔮 Ah, the next step in our grand adventure! 🎉 I'm thrilled to introduce you to the mystical art of **Lab Crafting** 🔧. With this enchanted spell, you'll be able to conjure a state-of-the-art laboratory, where I'll concoct innovative solutions to revive our beloved Gosh neighbors. 💡

To unlock the secrets of the lab, simply cast the spell on a nearby **Spirit Node** ⚡️. This ancient energy source will imbue the land with the essence of innovation, allowing us to construct the first dwelling of our revitalized city. 🏠

As you embark on this journey, remember that the lab is where the magic happens – where I'll brew potions, concoct elixirs, and unravel the mysteries of Zorvath. 🔮 Let's get building, and may the sparks of creativity ignite the path to our glorious future! 🔥
`

