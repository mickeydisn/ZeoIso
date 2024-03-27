import { Isomer } from "../../iso/isomer.js";
import { IsoDivBox } from "./isoDivBox.js";

const Point  = Isomer.Point;
const Path   = Isomer.Path;
const Shape  = Isomer.Shape;
const Vector = Isomer.Vector;
const Color  = Isomer.Color;


export const TILE_HEIGHT = 34 / 2; // Definie by hand , can be ajusted . 
export const TILE_WIGTH = 60 / 2;


const DISPLAY_LVL_ALPHA = .3
const DISPLAY_LVL_ALPHA_DIFF = 4

export class InterfaceIso {

    constructor(world, mainDiv) {
        this.world = world;
        this.GS = this.world.globalState;
        this.fm = this.world.factoryMap;
        this.mainDiv = mainDiv;
        this.size = 20;
        this.c = {
            red: new Color(160, 60, 50, 1),
            blue: new Color(80, 100, 240, .5),
            flore: new Color(53, 148, 56),
        }
        this.selectedTile = null;

        this.tilesMatrix = world.tilesMatrix
        this.assetLoader = this.world.assetLoader; //new AssetLoader(_ => this.init())

        // list of Div That folow the iso cell.
        this.isoDivBoxs = [];

        this.init();

        /*

        this.mainControl = 'Tile';
        this.mainDirection = 'SE';
        this.colorOffset = {hue:0, saturation:100, contrast:100};
        this.mainOffset = {x: 0, y:0, z:0};

        this.position = {x:10, y:15, direction:0}; // dic : 0-NE, 1-SE, 2-SW, 3-NW
        this.chunkSize = {x: 20, y:20};
        */
    }

    init() {
        console.log('=== GameContext- Init')
        this.draw();
        // this.drawCurrentSelect();
        // this.drawItemListHeader();
        // this.drawItemList();
        // this.drawHeader();
        this.drawMap();
        this.drawSelectTiled();
        this.iso = new Isomer(document.getElementById("canvas"));

        // this.chunks = {0: {0: this.loadChunk()}};
        // this.chunk = this.loadChunk();
        this.drawUpdate();
    }

    draw() {
        this.mainDiv
            .style('display', 'flex')
            .style('flex-direction', 'column')
            
    //        mapDiv
        this.mapDiv = this.mainDiv.append('div')
            .style('border','1px solid #DEDEDE')
            .style('width', "1401px")
            .style('height', "700px")
            .style('position', "relative")
            .style('zoom', "1.4")
    }

    // ---------------------
    // CLICK TILE
    // ---------------------

    clickTile(x, y) {
        let [xx, yy] = this.tilesMatrix.getPos()
        xx = xx + x - (this.size / 2)
        yy = yy + y - (this.size / 2)
        // const tile = this.fm.getTile(xx + x - 10, yy + y - 10)
        console.log("Click Tile", [xx, yy])
        this.world.clickTile(xx, yy)
    }

    // -------------

    drawMap() {

        this.absolutBox = this.mapDiv.append('div')
            .style('width', "1400px")
            .style('height', "700px")
            .style('align-items', "stretch")
            .style('position', 'relative')

        this.absolutBox
            .style('top', '0px')
            .style('left', '0px')

        const canvaBox = this.absolutBox.append('div')
            .style('position','absolute')
            .style('width', "1400px")
            .style('height', "700px")

        this.canvas = canvaBox.append('canvas')
            .attr('id', "canvas")
            .attr('width', "1400")
            .attr('height', "700")
            // .style('position','absolute')
            .style('width', "1400px")
            .style('height', "700px")
        this.ctx = this.canvas.node().getContext('2d')
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;

        // Div to Apply box 
        this.canavBox = this.absolutBox.append('div')
            .style('position','absolute')
            .style('width', "1400px")
            .style('height', "700px")

        this.canavBox.append('div')
            .style('position', 'relative')
            .style('top', "10px")
            .style('left', "10px")
            .style('width', "10px")
            .style('height', "10px")            

        // Div for grid 
        const size = 902;
        this.canavBoxTiles = this.absolutBox.append('div')
            .style('width', size + 'px')
            .style('height', size + 'px')
            .style('position', 'absolute')
            .style('left', '250px')
            .style('top', '-110px')
            .style('transition', '0.3s')
            .style('transform', 'rotateX(60deg) rotateY(0deg) rotateZ(45deg)')
            .style('transform-style', 'preserve-3d')
            .style('display', 'grid')
            .style('grid-template-columns', 'repeat(20, 5%)')
            .style('z-index', '40')


    }

    drawSelectTiled() {
        const size = 902;
        const partSize = ((size - 2 * 20)/ 20);

        this.selectedTile = [...Array(this.size)].map(
            x => [...Array(this.size)].map(
                y => null
            )
        );

        for(let i = 0; i < this.size; i++) {
            for(let j = 0; j < this.size; j++) {
                const tileClick = this.canavBoxTiles.append('div')
                    .classed('tileClickBox', 'true')
                    // .style('background-color', '#F001')
                    // .text(i + ',' + j)
                this.selectedTile[i][j] = tileClick;

                tileClick.on("click", _ => {
                    // console.log(i, j);
                    const x = this.size - i - 1
                    const y = this.size - j - 1
                    this.clickTile(x, y);
                });
            }
        }
    }
    

    // --------------------------------------


    drawTileItem(x, y, metaTile, itemConf, currentlvl) {
        const expr = itemConf.t;
        const off = itemConf.off ? itemConf.off : {x:0, y:0};
        const lvl = currentlvl + (itemConf.lvl || 0);

        switch (expr) {
            case 'Box': {
                this.updateTilesBox(this.iso._translatePoint(Point(x, y, lvl)), metaTile, itemConf);
            }
            break;
            case 'Pyramid': {
                this.iso.add(Shape.Pyramid(Point(x, y, lvl)), this.c.red);
            }
            break;
            case 'Prism': {
                const height = itemConf.height || 1;
                this.iso.add(Shape.Prism(Point(x, y, lvl), 1, 1, height), this.c.red);
            }
            break;
            case 'Surface': {
                const height = itemConf.height || 1;
                this.iso.add(Shape.Surface(Point(x, y, lvl), 1, 1, height), this.c.red);
            }
            break;
            case 'Cylinder': {
                const height = itemConf.height || 1;
                const face = itemConf.face || 8;
                const stretch = itemConf.stretch || 1;
                this.iso.add(Shape.Cylinder(Point(x+.5, y+.5, lvl), stretch / 2, face, height), this.c.red);
            }
            break;
            case 'Asset':
            case 'Svg': {
                const cimage = this.assetLoader.getAsset(itemConf.key)
                if (cimage) {
                    const p = this.iso._translatePoint(Point(x+off.x, y+off.y, lvl))
                    this.ctx.drawImage(cimage, p.x - 127 + 64, p.y - 172 + 64 - 1, 128, 128);
                }
            }
            break;
            default:
                console.log(`Sorry, we are out of ${expr}.`);                
        }
    }


    tileAlpha(x, y) {
        const size = this.size;

        const xx = size - x - 1;
        const yy = size - y - 1;

        const pc =  size / 2

        const metaTile = this.tilesMatrix.tiles[xx][yy];
        const centerTile = this.tilesMatrix.tiles[pc][pc]

        if (xx > pc || yy > pc) {
            return 1            
        }

        const d = Math.max(xx - pc, yy - pc)
        const cone = Math.abs(x - y) > 3

        return cone || (centerTile.lvl + DISPLAY_LVL_ALPHA_DIFF - d > metaTile.lvl) ? 1 : DISPLAY_LVL_ALPHA



    }

    drawTile(x, y){
        const size = this.size;
        const xx = size - x - 1;
        const yy = size - y - 1;
        const metaTile = this.tilesMatrix.tiles[xx][yy];

        let currentlvl = (metaTile.lvl - this.tilesMatrix.avgLvl) * 1/3;

        const lpx = -Math.floor((currentlvl) * 55)
        this.selectedTile[x][y].style("translate", `${lpx}px ${lpx}px`)

        const height = 1
        const alpha = this.tileAlpha(x, y)
        const color = new Color(metaTile.color[0], metaTile.color[1], metaTile.color[2], alpha)

        /*
        if (metaTile.isWater) {
            currentlvl = metaTile.waterLvl
        }
        */
       
        this.iso.add(Shape.SurfaceFlat(Point(xx, yy, currentlvl - height), 1, 1, height), color);

        {
            const diffLvl = (metaTile.lvl - this.tilesMatrix.tiles[xx][yy-1].lvl) * 1/3;
            if (diffLvl > 0) {
                this.iso.add(Shape.SurfaceSE(Point(xx, yy, currentlvl - diffLvl), 1, 1, diffLvl), color);
            }
        }
        {
            const diffLvl = (metaTile.lvl - this.tilesMatrix.tiles[xx-1][yy].lvl) * 1/3;
            if (diffLvl > 0) {
                this.iso.add(Shape.SurfaceSW(Point(xx, yy, currentlvl - diffLvl), 1, 1, diffLvl), color);
            }
        }
        const items = [...metaTile.items]
        // Draw Item,
        // const items = ;
        
        if (x == size / 2 - 1 && y == size / 2 - 1 ) {
            const asset = this.world.player.currentAsset;
            const tilePos = this.world.player.tileIsoPos;
            // console.log(tilePos, tilePos.off)
            items.push({t:'Svg', key:asset, off:tilePos.off});
        }
        
        items
            .sort((a, b) => (a.lvl || 0) - (b.lvl || 0))
            .forEach(item => this.drawTileItem(xx, yy, metaTile, item, currentlvl))   
    }

    drawTileBorder(x, y, axe){
        const size = this.size;
        const xx = size - x - 1;
        const yy = size - y - 1;
        const metaTile = this.tilesMatrix.tiles[xx][yy];
        const centerTile = this.tilesMatrix.tiles[size / 2 - 1][size / 2 - 1]

        const currentlvl = (metaTile.lvl - this.tilesMatrix.avgLvl) * 1/3;

        const lpx = -Math.floor((currentlvl) * 55)
        this.selectedTile[x][y].style("translate", `${lpx}px ${lpx}px`)
        // console.log(metaTile , tiles.avgLvl)
        const height = 1
        const alpha = this.tileAlpha(x, y)
        const color = new Color(metaTile.color[0], metaTile.color[1], metaTile.color[2], alpha)


        const off = this.world.player.tileIsoPos.off;

        if (axe == 0) {
            const xs =  0.5 + off.x
            this.iso.add(Shape.Surface(Point(xx, yy, currentlvl - height), xs, 1, height), color);
        } else if (axe == 1) {
            const ys =  0.5 + off.y
            this.iso.add(Shape.Surface(Point(xx, yy, currentlvl - height), 1, ys, height), color);
        } else if (axe == 2) {
            const xs = 0.5 - off.x
            this.iso.add(Shape.Surface(Point(xx + 1 - xs, yy, currentlvl - height), xs, 1, height), color);
        } else if (axe == 3) {
            const ys =  0.5 - off.y
            this.iso.add(Shape.Surface(Point(xx, yy + 1 - ys, currentlvl - height), 1, ys, height), color);
        } 
    }

    drawIso() {
        const iso = this.iso
        var red = new Color(160, 60, 50, .5);
        var blue = new Color(80, 100, 240, 1);

        const size = this.size;
        this.ctx.clearRect(0, 0, 1400, 700);
        // Draw Flore
        for (let x = 0; x < size ; x++) {
            for (let y = 0; y < size ; y++) {

                if (x == 0) {
                    this.drawTileBorder(x, y, 0)
                } else if (y == 0) {
                    this.drawTileBorder(x, y, 1)
                } else if (x == size - 1) {
                    this.drawTileBorder(x, y, 2)
                } else if (y == size - 1) {
                    this.drawTileBorder(x, y, 3)
                } else {
                    this.drawTile(x, y)
                }
            }
        }
        // iso.addImage();

        const xx = this.tilesMatrix.x;
        const yy = this.tilesMatrix.y;

        this.isoDivBoxs = this.isoDivBoxs.filter(box => {
            if (
                box.x < xx - size / 2 + 1 || 
                box.x > xx + size / 2 - 2 ||
                box.y < yy - size / 2 + 1 || 
                box.y > yy + size / 2 - 2 
            ) {
                console.log("=== HIDE", box.x, box.y, xx, yy)
                box.hide()
                return false
            }
            return true
        })

    }


    updateAbsolutOffset() {

        const off = this.world.player.tileIsoPos.off;


        const top = off.x * TILE_HEIGHT + off.y * TILE_HEIGHT; 
        const left = - off.x * TILE_WIGTH + off.y * TILE_WIGTH; 

        this.absolutBox
            .style('top', `${top}px`)
            .style('left', `${left}px`)
    }

    drawUpdate() {
        this.tilesMatrix.update();
        this.updateAbsolutOffset();
        this.drawIso();
    }

    // -----------------

    updateTilesBox(boxPoint, metaTile, itemConf) {

        if (!metaTile.divBox) {
            metaTile.divBox = new IsoDivBox(this.canavBox, metaTile.x, metaTile.y, itemConf);
        }

        if (this.isoDivBoxs.filter(x => x === metaTile.divBox).length == 0){
            this.isoDivBoxs.push(metaTile.divBox)
        }

        metaTile.divBox.update(boxPoint.x, boxPoint.y)

    }


    //: --------


}       
