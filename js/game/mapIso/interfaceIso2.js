import { Isomer } from "../../iso/isomer.js";
import { TilesMatrix } from "../map/tilesMatrix.js";
import { IsoDivBox, IsoDivBoxMarkDown, IsoDivCityBox } from "./isoDivBox.js";

const Point  = Isomer.Point;
const Path   = Isomer.Path;
const Shape  = Isomer.Shape;
const Vector = Isomer.Vector;
const Color  = Isomer.Color;


export const TILE_HEIGHT = 34 / 2; // Definie by hand , can be ajusted . 
export const TILE_WIGTH = 60 / 2;

export const SIZE20 = 30;
const SIZE20_D = SIZE20 - 30

// ISO CALIBRATION
const ISO_CANVA_YORIGINE =  660 + 32 * (SIZE20_D / 2);
const ISO_TILE_LEFT = 248 - 22.6 * SIZE20_D; 
const ISO_TILE_TOP = -114 - 22.45 * SIZE20_D; 


const DISPLAY_LVL_ALPHA = .07
const DISPLAY_LVL_ALPHA_DIFF = 3

export class InterfaceIso2 {

    constructor(world, mainDiv) {
        this.world = world;
        this.GS = this.world.globalState;
        this.fm = this.world.factoryMap;
        this.mainDiv = mainDiv;
        this.size = SIZE20;
        this.c = {
            selected: new Color(160, 60, 50, .2),
            red: new Color(160, 60, 50, 1),
            blue: new Color(80, 100, 240, .5),
            flore: new Color(53, 148, 56),
        }

        // this.center = {x: 0, y:0}
        this.center = {x: 2000 - 5, y:400 - 5}
        /*
        {label:"Beach Hill",    x:492,      y:-376},
        {label:"Cliff",         x:1028,     y:147},
        {label:"Top Montagne",  x:-1218,    y:1164},
        {label:"Hill Ice",  x:2819, y:-5689},
        {label:"Mix",  x:3902, y:-4584},
        */
        // this.center = {x: -1100, y:1300}
        

        this.selectedTile = null;
        this.tilesMatrix = new TilesMatrix(world, SIZE20, 30)

        this.assetLoader = this.world.assetLoader; //new AssetLoader(_ => this.init())
        this.frameSubCount = 0;
        this.frameCount = 0;
        // list of Div That folow the iso cell.
        this.isoDivBoxs = [];
        this.init();
    }

    init() {
        console.log('=== GameContext- Init')

        this.draw();
        this.drawMap();

        this.drawUpdate();
    }

    draw() {
        this.mainDiv
            .style("position", "absolute")
            .style('zoom', ".3")
            .style('top', "50%")
 
        this.mapDiv = this.mainDiv.append('div')
            .style('width', "0px")
            .style('height', "0px")
            .style('box-shadow', "0 0 0px 20000px #000")
            // .style('position', "relative")
            // .style('overflow', 'hidden')
            
        this.absolutBox = this.mapDiv.append('div')
            .style('width', "80%")
            .style('height', "80%")
            .style("background-color", "#000")
            .style("position", "absolute")
            .style('top', '-350px')
            .style('left', '-700px')

    }


    updateZoom(z) {
        this.mapDiv.style('zoom', z)
    }

    // -------------
    // INIT MAP LAYER . 
    // -------------

    drawMap() {
        const GRID_SIZE = 3
        this.mapGrid = []
        for (let x = - GRID_SIZE; x <= GRID_SIZE; x++) 
            for (let y = - GRID_SIZE; y <= GRID_SIZE; y++) {
            const canvaBox = this.absolutBox.append('div')
            .style('width', "1400px")
            .style('height', "700px")
            .style("position", "absolute")
            // .style("border", "2px solid #FFF")
            // .style("opacity", ".5")


            const canvas = canvaBox.append('canvas')
                .attr('id', "canvasMap2")
                .attr('width', "1400")
                .attr('height', "700")
                .style('width', "1400px")
                .style('height', "700px")

            const ctx = canvas.node().getContext('2d')
            ctx.webkitImageSmoothingEnabled = false;
            ctx.mozImageSmoothingEnabled = false;
            ctx.imageSmoothingEnabled = false;

            const iso = new Isomer(canvas.node());
            iso.originY = ISO_CANVA_YORIGINE
    

            this.mapGrid.push({
                box : canvaBox,
                canvas: canvas,
                ctx: ctx,
                isomer: iso,
                x: x,
                y: y,
            })            
        }

    }

    // --------------------------------------

    drawTileItem(ctx, isomer, x, y, metaTile, itemConf, currentlvl) {
        const expr = itemConf.t;
        const off = itemConf.off ? itemConf.off : {x:0, y:0};
        const lvl = currentlvl + (itemConf.lvl || 0);

        switch (expr) {
            case 'Asset':
            case 'Svg': {
                try {
                    const key = itemConf.key
                    const keySelect = Array.isArray(key) ? key[this.frameCount % key.length] : key
                    const cimage = this.assetLoader.getAsset(keySelect)
                    if (cimage && cimage.ctx) {
                        const p = isomer._translatePoint(Point(x+off.x, y+off.y, lvl))
                            ctx.drawImage(cimage, p.x - 127 + 64, p.y - 172 + 64 - 1, 128, 128);
                    }
                } catch(e) {
                    console.log('errorDraw', itemConf.key)
                }
            }
            break;
            case 'Box': {
                // this.drawTilesBox(isomer._translatePoint(Point(x, y, lvl)), metaTile, itemConf);
            }
            break;
            case 'Selected': {
                const height = itemConf.height || .1;
                isomer.add(Shape.Prism(Point(x, y, lvl), 1, 1, height), this.c.selected);
            }
            break;
            /*
            case 'Pyramid': {
                isomer.add(Shape.Pyramid(Point(x, y, lvl)), this.c.red);
            }
            break;
            case 'Prism': {
                const height = itemConf.height || 1;
                isomer.add(Shape.Prism(Point(x, y, lvl), 1, 1, height), this.c.red);
            }
            break;
            case 'Surface': {
                const height = itemConf.height || 1;
                isomer.add(Shape.Surface(Point(x, y, lvl), 1, 1, height), this.c.red);
            }
            break;
            case 'Cylinder': {
                const height = itemConf.height || 1;
                const face = itemConf.face || 8;
                const stretch = itemConf.stretch || 1;
                isomer.add(Shape.Cylinder(Point(x+.5, y+.5, lvl), stretch / 2, face, height), this.c.red);
            }
            break;
            */
            default:
                console.log(`Sorry, we are out of ${expr}.`);                
        }
    }

    drawTile(ctx, isomer, x, y){
        const size = this.size;
        const xx = size - x - 1;
        const yy = size - y - 1;
        // Get the Matrix to display
        const metaTile = this.tilesMatrix.tiles[xx][yy];
        // console.log("metaTile", xx, yy, metaTile)
        // Comput the matrix lvl to display
        let currentlvl = (metaTile.lvl - this.tilesMatrix.avgLvl) * 1/3;

        // Update the SelectedTile layer position 
        // const lpx = -Math.floor((currentlvl) * 55)
        // this.selectedTile[x][y].style("translate", `${lpx}px ${lpx}px`)


        // Get Tile Floor information of the tile . 
        const height = 1
        const alpha = 1 // this.tileAlpha(x, y)
        const color = new Color(metaTile.color[0], metaTile.color[1], metaTile.color[2], alpha)

        /*
        if (metaTile.isWater) {
            currentlvl = metaTile.waterLvl
        }
        if (metaTile.isFrise) {
            isomer.add(Shape.Prism(Point(xx, yy, currentlvl), 1, 1, .1), this.c.selected);
        }
        */

        // Display the Floor ( Horizontal Floor tile)
        isomer.add(Shape.SurfaceFlat(Point(xx, yy, currentlvl - height), 1, 1, height), color);
        // Display Floor Border ( Vertical Foor of the tile - only front )
        {
            const diffLvl = (metaTile.lvl - this.tilesMatrix.tiles[xx][yy-1].lvl) * 1/3;
            if (diffLvl > 0) {
                isomer.add(Shape.SurfaceSE(Point(xx, yy, currentlvl - diffLvl), 1, 1, diffLvl), color);
            }
        }
        {
            const diffLvl = (metaTile.lvl - this.tilesMatrix.tiles[xx-1][yy].lvl) * 1/3;
            if (diffLvl > 0) {
                isomer.add(Shape.SurfaceSW(Point(xx, yy, currentlvl - diffLvl), 1, 1, diffLvl), color);
            }
        }

        // Create list of item to add to the tile . 
        const items = [...metaTile.items, ...metaTile.temporatyItems]

        /*
        // If tile is the center of the matrix -> add player asset to the list of display item  )
        if (x == size / 2 - 1 && y == size / 2 - 1 ) {
            const asset = this.world.player.currentAsset;
            const tilePos = this.world.player.tileIsoPos;
            items.push({t:'Svg', key:asset, off:tilePos.off});
        }
        */
        // if is a CityNode
        if (metaTile.cityNode) {
            items.push({t:'Svg', key:metaTile.cityNode.asset.key});
            // this.drawTilesCityBox(isomer._translatePoint(Point(x, y, currentlvl)), metaTile);
        }

        // Draw Each item on the list. 
        items
            .sort((a, b) => (a.lvl || 0) - (b.lvl || 0))
            .forEach(item => this.drawTileItem(ctx, isomer, xx, yy, metaTile, item, currentlvl))   

    }


    drawIso(ctx, isomer) {

        const size = this.size;
        ctx.clearRect(0, 0, 1400, 700);
        // Draw tiles
        for (let x = 1; x < size -1; x++) {
            for (let y = 1; y < size -1 ; y++) {
                this.drawTile(ctx, isomer, x, y)
            }
        }
        // iso.addImage();

    }

    drawUpdate() {
        const centreX = this.world.tilesMatrix.x;
        const centreY = this.world.tilesMatrix.y;
        console.log('DRAW ', centreX, centreY)
        const CSizeX = 14
        const CSizeY = 14

        const mg = this.mapGrid[Math.round(this.mapGrid.length / 2)]
        this.tilesMatrix.setCenter(centreX + mg.x * CSizeX, centreY + mg.y * CSizeY)
        this.tilesMatrix.update();
        const lvlCenter = this.tilesMatrix.avgLvl

        this.mapGrid.forEach((mg, idx) => {

            this.tilesMatrix.setCenter(centreX + mg.x * CSizeX, centreY + mg.y * CSizeY)
            this.tilesMatrix.update();
            this.drawIso(mg.ctx, mg.isomer);

            const diffLvl = lvlCenter - this.tilesMatrix.avgLvl

            const xx = mg.x * CSizeX
            const yy = mg.y * CSizeY
            mg.box
                .style('top',  -  yy * 16  - xx * 16 + Math.round(diffLvl * 13) + 'px')
                .style('left',  - yy * 32  + xx * 32 + 'px')
                .style('z-index', this.mapGrid.length - idx)
    
        })
    }

}       
