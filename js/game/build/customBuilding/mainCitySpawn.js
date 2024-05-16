import { AbstractWcBuildConf } from "../wcBuilding2/AbstractBuildConf.js";
import { WcBuildConf_Path } from "../wcBuilding2/buildConf_path.js";
import { BuildTile, WcBuildTile } from "../wcBuilding2/wcBuildTile.js";
import { AbstractBuilding } from "../wcBuilding2/wcBuildingFactory.js";



export class CustomBuilding {


    constructor(world, conf) {
        this.world = world;
        this.fm = world.factoryMap;
        this.ta = this.world.tilesActions
        this.conf = conf; 

        this.allTileList = []
        // this.openList = []
    }

    drawWcBuilding (x, y) {
        const buildingConf = new WcBuildConf_Path()
        buildingConf.init()
        const building = new AbstractBuilding(this.world, buildingConf)

        { const bTile = new WcBuildTile(this.world, building, x-2, y-1).manual('NO'); bTile.isPath = 2 }
        { const bTile = new WcBuildTile(this.world, building, x-2, y+0).manual('NO'); bTile.isPath = 2 }
        { const bTile = new WcBuildTile(this.world, building, x-2, y+1).manual('NO'); bTile.isPath = 2 }

        { const bTile = new WcBuildTile(this.world, building, x-1, y-2).manual('NO'); bTile.isPath = 2 }
        { const bTile = new WcBuildTile(this.world, building, x-1, y-1).manual('NO'); bTile.isPath = 2 }
        { const bTile = new WcBuildTile(this.world, building, x-1, y+0).manual('NO'); bTile.isPath = 2 }
        { const bTile = new WcBuildTile(this.world, building, x-1, y+1).manual('NO'); bTile.isPath = 2 }
        { const bTile = new WcBuildTile(this.world, building, x-1, y+2).manual('NO'); bTile.isPath = 2 }

        { const bTile = new WcBuildTile(this.world, building, x+0, y-2).manual('NO'); bTile.isPath = 2 }
        { const bTile = new WcBuildTile(this.world, building, x+0, y-1).manual('NO'); bTile.isPath = 2 }
        { const bTile = new WcBuildTile(this.world, building, x+0, y+0).manual('NO'); bTile.isPath = 2 }
        { const bTile = new WcBuildTile(this.world, building, x+0, y+1).manual('NO'); bTile.isPath = 2 }
        { const bTile = new WcBuildTile(this.world, building, x+0, y+2).manual('NO'); bTile.isPath = 2 }

        { const bTile = new WcBuildTile(this.world, building, x+1, y-2).manual('NO'); bTile.isPath = 2 }
        { const bTile = new WcBuildTile(this.world, building, x+1, y-1).manual('NO'); bTile.isPath = 2 }
        { const bTile = new WcBuildTile(this.world, building, x+1, y+0).manual('NO'); bTile.isPath = 2 }
        { const bTile = new WcBuildTile(this.world, building, x+1, y+1).manual('NO'); bTile.isPath = 2 }
        { const bTile = new WcBuildTile(this.world, building, x+1, y+2).manual('NO'); bTile.isPath = 2 }

        { const bTile = new WcBuildTile(this.world, building, x+2, y-1).manual('NO'); bTile.isPath = 2 }
        { const bTile = new WcBuildTile(this.world, building, x+2, y+0).manual('NO'); bTile.isPath = 2 }
        { const bTile = new WcBuildTile(this.world, building, x+2, y+1).manual('NO'); bTile.isPath = 2 }

        { const bTile = new WcBuildTile(this.world, building, x+3, y).manual('NO'); bTile.isPath = 2 }
        { const bTile = new WcBuildTile(this.world, building, x-3, y).manual('NO'); bTile.isPath = 2 }
        { const bTile = new WcBuildTile(this.world, building, x, y+3).manual('NO'); bTile.isPath = 2 }
        { const bTile = new WcBuildTile(this.world, building, x, y-3).manual('NO'); bTile.isPath = 2 }

    }


    actionDrawList(x, y) { return  [

        {func:'clearItemSquare', x:x, y:y, size:5},
        {func:'colorSquare', x:x, y:y, size:5, color:[128, 128, 128, 255]},

        {func:'lvlFlatSquare', x:x, y:y, size:5, color:[128, 128, 128, 255]},

        {func:'itemAddKey',  x:x, y:y, assetKey:'crypt_NE#_C110_S40_B90'},
        // {func:'setBlocked',  x:x, y:y, isBlock:true},
        
        {func:'itemAddKey',  x:x+2, y:y, assetKey:'fence_planksDouble_NE#_C110_S40_B90'},
        {func:'itemAddKey',  x:x+2, y:y, assetKey:'columnLarge_NE#_C110_S40_B90'},
        {func:'setBlocked',  x:x+2, y:y, isBlock:true},

        {func:'itemAddKey',  x:x-2, y:y, assetKey:'columnLarge_SW#_C110_S40_B90'},
        {func:'itemAddKey',  x:x-2, y:y, assetKey:'fence_planksDouble_SW#_C110_S40_B90'},
        {func:'setBlocked',  x:x-2, y:y, isBlock:true},

        {func:'itemAddKey',  x:x, y:y+2, assetKey:'fence_planksDouble_NW#_C110_S40_B90'},
        {func:'itemAddKey',  x:x, y:y+2, assetKey:'columnLarge_NW#_C110_S40_B90'},
        {func:'setBlocked',  x:x, y:y+2, isBlock:true},

        {func:'itemAddKey',  x:x, y:y-2, assetKey:'columnLarge_SE#_C110_S40_B90'},
        {func:'itemAddKey',  x:x, y:y-2, assetKey:'fence_planksDouble_SE#_C110_S40_B90'},
        {func:'setBlocked',  x:x, y:y-2, isBlock:true},

        {func:'setFriseSquare', x:x, y:y, size:5, isFrise:true},

        {func:'setFrise', x:x+2, y:y+2, isFrise:false},
        {func:'setFrise', x:x+2, y:y-2, isFrise:false},
        {func:'setFrise', x:x-2, y:y+2, isFrise:false},
        {func:'setFrise', x:x-2, y:y-2, isFrise:false},

        {func:'setFrise', x:x+3, y:y, isFrise:false},
        {func:'setFrise', x:x-3, y:y, isFrise:false},
        {func:'setFrise', x:x, y:y+3, isFrise:false},
        {func:'setFrise', x:x, y:y-3, isFrise:false},


        {func:'clearLvlSquare', x:x, y:y,  size:5},
        {func:'clearColorSquare', x:x, y:y,  size:5}

    ]}

    start(x, y) {
        // Create the first building Tile :   
        this.mainLvl = this.fm.getTile(x, y).lvl   

        this.actionDrawList(x, y).forEach(action => {
            this.ta.doAction(action)
        })

        this.drawWcBuilding(x, y)

        // this.md(x, y)

    }


    md (x, y) {

        const md = `

**Ghostly Greeting** 👻

Oh, dear adventurer, I'm thrilled to finally meet you. I'm Kaelin, a former citizen of this forsaken planet. *sigh* It's been an eternity since I've seen the light of day... or, in this case, the faint glow of the Plateau of Ancient Whispers. 🌫️

As I rise from the dead, I'm met with an eerie silence. The wind whispers secrets in my ear, and I'm reminded of the Harmonizer, an ethereal wind chime that once harmonized the environment. 🎶 It's said to generate soothing breezes, but I fear it's been silenced for far too long. 🕰️

Legend has it that the Harmonizer holds the key to unlocking the secrets of the ancient civilization. They say it's imbued with the spirits of the ancients, capable of manipulating reality itself. 🤯 But, I'm just a ghost, and my memories are as fleeting as the wind. 💨

Will you help me uncover the truth behind the Harmonizer and the secrets of this mystical plateau? 🌊 Together, we can unravel the mysteries of Zorvath and perhaps, just perhaps, bring life back to this desolate world. 💫
                        

`

        this.ta.addBoxMD({x:x, y:y, md:md, hideDistance:1, width:'400px'})

    }

}