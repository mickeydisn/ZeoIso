import { WidjetActions } from "./widjetAction.js";

export class WidjetActionsTileInfo extends WidjetActions {

    constructor(world, mainDiv) {
        super(world, mainDiv)
        this.fm = world.factoryMap;

        this._createMainButt('tileInfoAction', '🔎')

        // Generate Content 
        {
            this.contentBox = this.mainDiv.select('#content')
            this.drawUpdate([0, 0]);
        }

        this.GS.sub("TileInfo.position", "WidjetActionsTileInfo", this.drawUpdate.bind(this)) 

       
    }

    // ---------------------
    //  Floor Action 
    // ---------------------
    drawUpdate(pos) {
        console.log(pos)
        const tile = this.fm.getTile(pos[0], pos[1])
        const t = tile.toJson()
        this.contentBox.selectAll('div').remove()

        // --------------------------------
        {
            this.contentBox.append('div').classed('row', true).classed('titel', true)
                .text("= INFO =")
        }
        {

            if (t.biome) {
                this.contentBox.append('div').classed('row', true)
                    .style('background-color', `rgb(${t.genColor[0]}, ${t.genColor[1]}, ${t.genColor[2]})`)
                    .text(`Biome: ${t.biome.name}`)
                this.contentBox.append('div').classed('row', true)
                    .style('background-color', `rgb(${t.genColor[0]}, ${t.genColor[1]}, ${t.genColor[2]})`)
                    .style('font-size', `.8em`)
                    .text(`(${t.biome.id}) - ${t.biome.lvlType}`)
            }

            this.contentBox.append('div').classed('row', true).text(' ').style('height', '10px')

            this.contentBox.append('div').classed('row', true)
                .style('background-color', `rgb(${t.color[0]}, ${t.color[1]}, ${t.color[2]})`)
                .text(`Pos: ${t.x}  / ${t.y}`)

            this.contentBox.append('div').classed('row', true).text(' ').style('height', '10px')


            if (t.items) {
                t.items.forEach(item => {
                    this.contentBox.append('div').classed('row', true)
                        .text(`Item: ${item.t}`)
                });
                    
            }


            // this._drawBiomeList(this.contentBox)
            this.preBox = this.contentBox.append('div').classed('row', true)
                .append('pre')
                .text(JSON.stringify(t, null, 4))
        }

    }

    _AssetBox(parentBox, assetKey) {
        const canvasBox = parentBox.append('div').classed('cell', true)
            .append('div')

        const cimage = this.assetLoader.getAsset(assetKey)
        if (cimage) {
            const canvas = canvasBox.append('canvas')
                .attr('width', '128px')
                .attr('height', '128px')
            const ctx = canvas.node().getContext("2d")
            ctx.drawImage(cimage, 0, 0, 255, 255, 0, 0, 128, 128);

            // ctx.drawImage(cimage, 32, 32, 192, 192, 0, 0, 128, 128);

        } else {
            console.log('notFind', assetKey)
        }
    }
}


