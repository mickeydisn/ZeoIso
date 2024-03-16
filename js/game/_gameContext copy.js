import { Isomer } from "../iso/isomer.js";
import { AssetLoader } from "./assetLoader.js";

const Point  = Isomer.Point;
const Path   = Isomer.Path;
const Shape  = Isomer.Shape;
const Vector = Isomer.Vector;
const Color  = Isomer.Color;

export class GameContext {

    constructor(mainDiv) {
        this.mainDiv = mainDiv
        this.size = 20;
        this.c = {
            red: new Color(160, 60, 50, 1),
            blue: new Color(80, 100, 240, .5),
            flore: new Color(53, 148, 56),
        }
        this.assetLoader = new AssetLoader(_ => this.init())

        this.selectedTile = null;

        this.mainControl = 'Tile';
        this.mainDirection = 'SE';
        this.colorOffset = {hue:0, saturation:100, contrast:100};
        this.mainOffset = {x: 0, y:0, z:0};

        this.position = {x:10, y:15, direction:0}; // dic : 0-NE, 1-SE, 2-SW, 3-NW
        this.chunkSize = {x: 20, y:20};
    }

    init() {
        this.draw();
        this.drawCurrentSelect();
        this.drawItemListHeader();
        this.drawItemList();
        this.drawHeader();
        this.drawMap();
        this.drawSelectTiled();
        this.iso = new Isomer(document.getElementById("canvas"));

        this.chunks = {0: {0: this.loadChunk()}};
        this.chunk = this.loadChunk();
        this.drawUpdate();
    }

    draw() {
        this.mainDiv
            .style('display', 'flex')
            .style('flex-direction', 'row')
            
        // Left Div
        this.itemDiv = this.mainDiv.append('div')
            .classed("boxListMenuLeft", true)
        
        this.boxItemCurent = this.itemDiv.append('div')
            .classed('boxItemMenuLeft', true)
            .attr('id', "curentSelected")

        this.boxItemListHeader = this.itemDiv.append('div')
            .classed('boxItemMenuLeft', true)
            .attr('id', "listItemHeader")
            

        this.boxItemList = this.itemDiv.append('div')
            .classed('boxItemMenuLeft', true)
            .attr('id', "listItem")

        // Right Div 
        const contentDiv = this.mainDiv.append('div')
            .style('display', 'flex')
            .style('flex-direction', 'column')
        // ---- Header
        this.headerDiv = contentDiv.append('div')
            .classed('headerDiv', true)

    //        mapDiv
        this.mapDiv = contentDiv.append('div')
            .style('border','1px solid #DEDEDE')
            .style('width', "1401px")
            .style('height', "700px")
            .style('position', "relative")
    }

    // ---------------------
    // HEADER 
    // ---------------------

    createHeaderButton(box, control) {
        const b = box.append('div')//.classed('headerSelectBox', true)
        if (this.mainControl == control ) {
            b.style('border', '5px solid #666')
        }
        b.on('click', _ => {
            this.mainControl =  this.mainControl == control ? null : control; 
            this.drawHeader();
            this.drawItemListHeader();
            this.drawItemList();
        })
        return b;
    }


    createHeaderOffsetButton(box, offset, value, range) {
        const g = box.append('div')
            .style('display', 'grid')
            .style('width', '64px')
            .style('grid-template-columns', '20px auto 20px')

        const add_dr = (tag , f) => {
            const bb = g.append('div')
                .classed('headerSelectBoxInBox', true)
                .style('border', '1px solid #AEAEAE')
                .text(tag)
            bb.on('click', _ => {
                f();
                console.log('----', offset[value], this.colorOffset)
                this.drawHeader();
                this.drawCurrentSelect();
                this.drawItemList();
            })
        }
        add_dr('-', _ => offset[value] = offset[value] - range)
        g.append('div').classed('headerCenterBox', true).text('' + offset[value])
        add_dr('+', _ => offset[value] = offset[value] + range)
    }

    createHeaderFilesButton(box) {
        const b = box.append('div').classed('headerSelectBox', true)

        const g = b.append('div')
            .style('display', 'grid')
            .style('height', '64px')
            .style('width', '64px')
            .style('grid-template-columns', 'auto')
            .style('grid-template-rows', '32px 32px')

        this.createHeaderSaveButton(g).text('Save');
        this.createHeaderLoadButton(g).text('Load');
        return b;
    }

    createHeaderSaveButton(box) {
        const b = box.append('div').classed('headerSelectBoxInBox', true)
            .style('border', '1px solid #DEDEDE')

        b.on('click', _ => {
            // const inputElem = document.createElement('input');
            // inputElem.setAttribute('type', 'file')
            // inputElem.addEventListener('change', event => {
                const text = JSON.stringify(this.chunk);
                const filename = "map.json" // event.target.files[0];
                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                element.setAttribute('download', filename);
                element.style.display = 'none';
                element.click();

            // })
            // inputElem.click();

        })
        return b;
    }

    createHeaderLoadButton(box) {
        const b = box.append('div').classed('headerSelectBoxInBox', true)
            .style('border', '1px solid #DEDEDE')
        b.on('click', _ => {
            const inputElem = document.createElement('input');
            inputElem.setAttribute('type', 'file')
            inputElem.addEventListener('change', event => {
                const reader = new FileReader()
                reader.onload = _ => {
                    const result = reader.result;
                    this.chunk = JSON.parse(result);
                    // console.log(reader) 
                    this.drawUpdate();

                }// desired file content
                // reader.onerror = error => reject(error)
                const inputFile = event.target.files[0]
                reader.readAsText(inputFile) // you could also read images and other binaries
            })
            inputElem.click();
            // document.body.removeChild(inputElem);
        })
        return b;
    }

    drawHeader() {
        this.headerDiv.selectAll("div").remove();

        this.createHeaderButton(this.headerDiv, 'Delect').text('Delect')

        this.createHeaderFilesButton(this.headerDiv)

    }


    // ---------------------
    // ITEM LIST 
    // ---------------------

    drawCurrentSelect() {
        this.boxItemCurent.selectAll('div').remove()

        this.boxItemCurent.append('div')
            .text('Current Select')

        const content = this.boxItemCurent.append('div')
            .style('display', 'grid')
            .style('width', '240px')
            .style('grid-template-columns', '12px 128px 100px')

        const A = content.append('div')
        const B = content.append('div')
        const C = content.append('div')
            .style('display', 'flex')
            .style('align-items', 'center')
            .style('flex-direction', 'column')
            .style('flex-direction', 'column')
            .style('font-family', 'math')
            .style('font-size', '.8em')
        
        C.append('div').text('Height')
        this.createHeaderOffsetButton(C, this.mainOffset, 'z', .5)
        C.append('div').text('Hue')
        this.createHeaderOffsetButton(C, this.colorOffset, 'hue', 10)
        C.append('div').text('Saturation')
        this.createHeaderOffsetButton(C, this.colorOffset, 'saturation', 10)
        C.append('div').text('Contrast')
        this.createHeaderOffsetButton(C, this.colorOffset, 'contrast', 10)

        const d = B.append('div')
            .style('display', 'inline-block')
            .style('border', '1px solid #000')
            .style('min-height', '128px')
            .style('min-width', '128px')
        const c = d.append('div')

        console.log(this.assetLoader.assetTree)
        if (this.assetLoader.assetTree[this.selectedTile]) {
            console.log('______Immage')
            const src = this.assetLoader.assetTree[this.selectedTile].src
            const canvas = c.append('canvas')
                .attr('width', '128px')
                .attr('height', '128px')
            const ctx = canvas.node().getContext("2d")
            const image = this.assetLoader.assetTree[this.selectedTile].image
            console.log(image)
            let cimage = this.imageToCanvas(image)
            console.log(cimage)
            if (this.colorOffset.hue || this.colorOffset.contrast || this.colorOffset.saturation) {
                 this.colorImage(cimage,image,this.colorOffset)
            }
            ctx.drawImage(cimage, -70, -70, 256, 256);
        }        

    }

    drawItemListHeader() {
        this.boxItemListHeader.selectAll('div').remove()

        this.boxItemListHeader.append('div')
            .attr('id', 'ItemListHeaderControl')
            .text(" > " + this.mainControl)

        const boxList = this.boxItemListHeader.append('div')
            .classed('headerList', true)
            .style('padding-left', '12px')
            .style('font-size', '.8em')

        this.createHeaderButton(boxList, 'Tile').text('Tile')
        this.createHeaderButton(boxList, 'Perso').text('Perso')
        this.createHeaderButton(boxList, 'Nature').text('Nature')
        this.createHeaderButton(boxList, 'Item').text('Item')
        this.createHeaderButton(boxList, 'Wall').text('Wall')
        this.createHeaderButton(boxList, 'Other').text('Other')

    }

    drawItemList() {
        console.log("=drawItemList")
        this.boxItemList.selectAll('div').remove()

        const group = this.assetLoader.assetList
            .filter(([path, label, img]) => {
                /*
                const checkDirection = 
                    ['SE', 'SW', 'NE', 'NW'].filter(x => label.endsWith(x)).length == 0 || 
                    label.endsWith(this.mainDirection)
                */
                const testLabel = ["Tile", "Perso", "Nature", "Item", "Wall"];
                const checkMainSelect = 
                    testLabel.includes(this.mainControl) && path.endsWith(this.mainControl) ||
                    this.mainControl == "Other" && testLabel.filter(x => path.endsWith(x)).length == 0  
    
                return checkMainSelect
            })
            .reduce((rv, [path, label, img]) => {
                const glabel = label.split('_')[0]
                rv[glabel] = rv[glabel] || []
                rv[glabel].push([label, img.src]);
                return rv;
            }, {});
        console.log(group)

        Object.entries(group).forEach(([glabel, items]) => {
            this.boxItemList.append('div').text(glabel)

            items.forEach(item => {
                const src = item[1]
                const d = this.boxItemList.append('div')
                .style('display', 'inline-block')
                .style('width', '64px')
                .style('height', '64px')
                .style('position', 'relative')
                .style('overflow', 'hidden')
                .style('border', '1px solid #000')
                const c = d.append('div')
                    .style('top', '-60px')
                    .style('left', '-46px')
                    .style('width', '64px')
                    .style('height', '64px')
                    .style('position', 'absolute')

                c.append('img')
                    .attr('src', src)
                    .style('width', '64px')
                    .style('height', '64px')
                    .style('zoom', '2.5')
                // console.log(x, attr)
                const key = item[0];
                c.on('click', _ => {
                    console.log('this.selectedTile = ', key)
                    this.selectedTile = key;
                    this.drawCurrentSelect()
                })
            })

        })
    }    

    // ---------------------
    // CLICK TILE
    // ---------------------

    clickTile(x, y) {
        console.log("Click Tile", x, y)

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

    }

    // -------------

    drawMap() {

        const boxAbsolut = this.mapDiv.append('div')
            .style('border','1px solid #F00')
            .style('width', "1400px")
            .style('height', "700px")
            .style('align-items', "stretch")

        this.canvas = boxAbsolut.append('canvas')
            .attr('id', "canvas")
            .attr('width', "1400")
            .attr('height', "700")
            .style('position','absolute')
            .style('width', "1400px")
            .style('height', "700px")
        this.ctx = this.canvas.node().getContext('2d')
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;

        this.canavBox = boxAbsolut.append('div')
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
        this.canavBoxTiles = boxAbsolut.append('div')
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

        for(let i = 0; i < this.size; i++) {
            for(let j = 0; j < this.size; j++) {
                const tileClick = this.canavBoxTiles.append('div')
                    .classed('tileClickBox', 'true')
                    .style('border', '.1px solid #DEDEDE00')
                    // .style('background-color', '#F001')
                    // .text(i + ',' + j)
                tileClick.on("click", _ => {
                    console.log(i, j);
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

    loadChunk() {
        const chunk = [...Array(this.size)].map(
            x => [...Array(this.size)].map(
                y => [{t: 'Svg', lvl: -.2, key: 'tile_C'}]
            )
        );
        chunk[0][0].push({t: 'Pyramid'})
        chunk[1][0].push({t: 'Prism', height: 3})
        chunk[4][0].push({t: 'Cylinder'})
        chunk[5][0].push({t: 'Box'})
  
        chunk[6][10].push({t: 'Svg', key: 'path_stone_NW'})
        chunk[7][10].push({t: 'Svg', key: 'path_stone_NW'})
        chunk[8][10].push({t: 'Svg', key: 'path_stone_NW'})
        chunk[9][10].push({t: 'Svg', key: 'path_stone_NW'})

        chunk[10][10].push({t: 'Svg', key: 'bridge_side_wood_NW'})
        chunk[11][10].push({t: 'Svg', key: 'bridge_center_wood_NW'})
        chunk[12][10].push({t: 'Svg', key: 'bridge_center_wood_NW'})
        chunk[13][10].push({t: 'Svg', key: 'bridge_center_wood_NW'})
        chunk[14][10].push({t: 'Svg', key: 'bridge_center_wood_NW'})
        chunk[15][10].push({t: 'Svg', key: 'bridge_side_wood_SE'})
        chunk[13][16].push({t: 'Svg', key: 'log_stackLarge_NE'})


        chunk[14][13].push({t: 'Svg', key: 'tree_detailed_dark_NW'})
        chunk[14][15].push({t: 'Svg', key: 'tree_blocks_SE'})
        chunk[14][16].push({t: 'Svg', key: 'tree_detailed_dark_NW'})
        chunk[15][14].push({t: 'Svg', key: 'tree_blocks_SW'})
        chunk[15][17].push({t: 'Svg', key: 'tree_oak_dark_NW'})
        chunk[16][15].push({t: 'Svg', key: 'tree_oak_dark_NW'})
        chunk[16][16].push({t: 'Svg', key: 'tree_blocks_SW'})


        chunk[16][5].push({t: 'Prism', height: 2})
        chunk[16][4].push({t: 'Prism', height: 2})
        chunk[15][5].push({t: 'Prism', height: 2})
        chunk[15][4].push({t: 'Prism', height: 2})
        chunk[14][5].push({t: 'Prism', height: 1})
        chunk[14][4].push({t: 'Prism', height: 1})
        // chunk[13][5].push({t: 'Prism', height: 1})



        return chunk; 
    }

    getChunk(x, y) {
        if (!this.chunks[x]) {
            this.chunks[x] = {}
        }
        if (!this.chunks[x][y]) {
            this.chunks[x][y] = this.loadChunk()
        }
        return this.chunks[x][y];
    }

    initMap() {
        // const chunk = this.chunk; 
        // console.log(chunk)
        this.map = [...Array(this.size)].map(
            (x, idx) => [...Array(this.size)].map(
                (y, idy) => { 
                    const Cx = Math.round((this.position.x + idx - this.chunkSize.x/2) / this.chunkSize.x)
                    const Cy = Math.round((this.position.y + idy - this.chunkSize.x/2) / this.chunkSize.y)
                    const inCx = (this.position.x + idx) - (Cx * this.chunkSize.x)
                    const inCy = (this.position.y + idy) - (Cy * this.chunkSize.y)
                    console.log(idx, idy, Cx, Cy, inCx, inCy)
                    return {
                        lvl: Math.random() * 0.1, 
                        items: this.getChunk(Cx, Cy)[inCx][inCy]
                    }
                }
            )
        );
    }

    // --------------------------------------

    drawUpdate() {
        this.initMap();
        this.drawIso();
    }

    drawTileItem(x, y, item, currentlvl) {
        const expr = item.t;
        const lvl = item.lvl || 0;

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
                    const image = this.assetLoader.assetTree[item.key].image
                    let cimage = this.imageToCanvas(image)
                    if (item.colorOffset) {
                        this.colorImage(cimage,image,item.colorOffset)
                    }
                    const p = this.iso._translatePoint(Point(x, y, lvl))

                    this.ctx.drawImage(cimage, p.x - 127, p.y - 172, 256, 256);
                }
            }
            break;
            default:
                console.log(`Sorry, we are out of ${expr}.`);
        }
    }

    imageToCanvas(image) {
        const c = document.createElement("canvas");
        c.width = image.naturalWidth;
        c.height = image.naturalHeight;
        c.ctx = c.getContext("2d"); // attach context to the canvas for easy reference
        c.ctx.drawImage(image, 0, 0);
        return c;
    }

    colorImage(dest, source, colorOffset) { // image is a canvas image
        dest.ctx.clearRect(0,0,dest.width, dest.height);
        dest.ctx.filter="hue-rotate("+(colorOffset.hue | 0)+"deg) saturate(" + colorOffset.saturation + "%) contrast(" + colorOffset.contrast + "%)";
        dest.ctx.drawImage(source,0, 0, dest.width, dest.height);
        return dest;
    }

    drawTile(metaTile, x, y){
        // Draw Item,
        const items = metaTile.items;
        items.sort((a, b) => (a.lvl || 0) - (b.lvl || 0)) .forEach(item => this.drawTileItem(x, y, item))
    }

    drawIso() {
        const iso = this.iso
        var red = new Color(160, 60, 50, .5);
        var blue = new Color(80, 100, 240, 1);

        const size = 20;
        this.ctx.clearRect(0, 0, 1400, 700);
        // Draw Flore
        for (let x = 0; x < size ; x++) {
            for (let y = 0; y < size ; y++) {
                const xx = size - x - 1;
                const yy = size -y - 1;
                const metaTile = this.map[xx][yy];
                this.drawTile(metaTile, xx, yy)
            }
        }
        // iso.addImage();
    }

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


}