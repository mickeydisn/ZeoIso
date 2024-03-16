import { Isomer } from "../iso/isomer.js";

const Point  = Isomer.Point;
const Path   = Isomer.Path;
const Shape  = Isomer.Shape;
const Vector = Isomer.Vector;
const Color  = Isomer.Color;

export class InterfaceIso {

    constructor(world, mainDiv) {
        this.world = world;
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
        const [xx, yy] = this.tilesMatrix.getPos()
        const tile = this.fm.getTile(xx + x - 10, yy + y - 10)
        console.log("Click Tile", [xx + x - 10, yy + y - 10])
        tile.getLog()

        /*
        switch (this.mainControl) {
            case "Delect":
                this.chunk[x][y] = this.chunk[x][y].filter(x => (x.lvl ? x.lvl : 0) < 0)
                this.drawUpdate();
                break;
            case "Tile":
                this.chunk[x][y] = this.chunk[x][y].filter(x => (x.lvl ? x.lvl : 0) >= 0)
                this.chunk[x][y].push({t: 'Svg', lvl: -.2, key: this.selectedTile, colorOffset: JSON.parse(JSON.stringify(this.colorOffset))})
                this.drawUpdate();
                break;
            case "Perso":
            case "Nature":
            case "Item":
            case "Wall":
            case "Other":
                this.chunk[x][y].push({t: 'Svg', lvl: this.mainOffset.z, key: this.selectedTile, colorOffset: JSON.parse(JSON.stringify(this.colorOffset))})
                this.drawUpdate();
                break;
            default:
                break;
        }
        */
    }

    // -------------

    drawMap() {

        this.absolutBox = this.mapDiv.append('div')
            .style('border','1px solid #F00')
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
            // .style('border', '1px solid #000')
            .style('display', 'grid')
            .style('grid-template-columns', 'repeat(20, 5%)')
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
                /*
                tileClick.on("mouseover", _ => {
                    tileClick
                        .style('background-color', '#FFF4')
                })
                tileClick.on("mouseout", _ => {
                    tileClick
                        .style('background-color', '#0000')
                })
                */
          
            }
        }
    }
    

    // --------------------------------------


    drawTileItem(x, y, item, currentlvl) {
        const expr = item.t;
        const off = item.off ? item.off : {x:0, y:0};
        const lvl = currentlvl + (item.lvl || 0);

        switch (expr) {
            case 'Box': {
                this.addTilesBox(this.iso._translatePoint(Point(x, y, lvl)));
            }
            break;
            case 'Pyramid': {
                this.iso.add(Shape.Pyramid(Point(x, y, lvl)), this.c.red);
            }
            break;
            case 'Prism': {
                const height = item.height || 1;
                this.iso.add(Shape.Prism(Point(x, y, lvl), 1, 1, height), this.c.red);
            }
            case 'Surface': {
                const height = item.height || 1;
                this.iso.add(Shape.Surface(Point(x, y, lvl), 1, 1, height), this.c.red);
            }
            
            break;
            case 'Cylinder': {
                const height = item.height || 1;
                const face = item.face || 8;
                const stretch = item.stretch || 1;
                this.iso.add(Shape.Cylinder(Point(x+.5, y+.5, lvl), stretch / 2, face, height), this.c.red);
            }
            break;
            case 'Svg': {
                if (this.assetLoader.assetTree[item.key]) {
                    const cimage = this.assetLoader.assetTree[item.key].cimage
                    const p = this.iso._translatePoint(Point(x+off.x, y+off.y, lvl))
                    this.ctx.drawImage(cimage, p.x - 127 + 64, p.y - 172 + 64 - 1, 128, 128);
                }
            }
            break;
            default:
                console.log(`Sorry, we are out of ${expr}.`);
        }
    }


    drawTile(x, y, size){
        const xx = size - x - 1;
        const yy = size - y - 1;
        const metaTile = this.tilesMatrix.tiles[xx][yy];
        const currentlvl = (metaTile.lvl - this.tilesMatrix.avgLvl) * .3;

        const lpx = -Math.floor((currentlvl) * 55)
        this.selectedTile[x][y].style("translate", `${lpx}px ${lpx}px`)
        // console.log(metaTile , tiles.avgLvl)

        const height = 1
        const alpha = 1
        const color = new Color(metaTile.color[0], metaTile.color[1], metaTile.color[2], alpha)
        this.iso.add(Shape.Surface(Point(xx, yy, currentlvl - height), 1, 1, height), color);
        

        const items = [...metaTile.items]
        // Draw Item,
        // const items = ;
        
        if (x == size / 2 && y == size / 2) {
            const asset = this.world.player.currentAsset;
            const tilePos = this.world.player.tileIsoPos;
            // console.log(tilePos, tilePos.off)
            items.push({t:'Svg', key:asset, off:tilePos.off});
        }
        
        items
            .sort((a, b) => (a.lvl || 0) - (b.lvl || 0))
            .forEach(item => this.drawTileItem(xx, yy, item, currentlvl))   
    }

    drawTileBorder(x, y, size, axe){
        const xx = size - x - 1;
        const yy = size - y - 1;
        const metaTile = this.tilesMatrix.tiles[xx][yy];
        const currentlvl = (metaTile.lvl - this.tilesMatrix.avgLvl) * .3;

        const lpx = -Math.floor((currentlvl) * 55)
        this.selectedTile[x][y].style("translate", `${lpx}px ${lpx}px`)
        // console.log(metaTile , tiles.avgLvl)
        const height = 1
        const alpha = .8
        const color = new Color(metaTile.color[0], metaTile.color[1], metaTile.color[2], alpha)


        const off = this.world.player.tileIsoPos.off;

        if (axe == 0) {
            const xs = off.x

            this.iso.add(Shape.Surface(Point(xx, yy, currentlvl - height), .5, 1, height), color);
            
        } else {
            this.iso.add(Shape.Surface(Point(xx, yy, currentlvl - height), 1, 1, height), color);
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
                    this.drawTileBorder(x, y, size, 0)
                } else if (y == 0) {
                    this.drawTileBorder(x, y, size, 1)
                } else {
                    this.drawTile(x, y, size)

                }


            }
        }
        // iso.addImage();
    }


    updateAbsolutOffset() {

        const off = this.world.player.tileIsoPos.off;

        const height = 34 / 2; // Definie by hand , can be ajusted . 
        const wigth = 60 / 2;

        const top = off.x * height + off.y * height; 
        const left = - off.x * wigth + off.y * wigth; 

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

    addTilesBox(boxPoint) {
        this.canavBox.append('div')
            .style('border','2px solid #000')
            .style('position','absolute')
            .style('top', boxPoint.y + "px")
            .style('left', boxPoint.x + "px")
            .style('width', "10px")
            .style('height', "10px")
            .style('cursor', "pointer")
    }


    //: --------


}