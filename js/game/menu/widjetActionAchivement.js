
export class WidjetActionsAchivement {

    constructor(world, mainDiv) {
        this.world = world;
        this.assetLoader = this.world.assetLoader
        this.GS = this.world.globalState;

        
        console.log('=== WidjetAssetList - Init')

        this.mainDiv = mainDiv

        // Create Switch Button 
        this.mainDiv.html( `


<div class="buttMenuBox  switch" id="achivementAction">
        <input type="radio" id="checkbox_menuBox_achivementAction" name="MenuBox">
        <label for="checkbox_menuBox_achivementAction">🥇</label>
        <div class="widjetMenuBox slider" id="achivementAction" >
            <div id="content" class="menuAction">  </div>
        </div>
</div>
        `)

        // Generate Content 
        {
            this.contentBox = this.mainDiv.select('#content')
            this.drawachivementActionList();

        }
        // Sub to Global state. 
       
    }



    // ---------------------
    //  Floor Action 
    // ---------------------
    drawachivementActionList() {
        this.contentBox.selectAll('div').remove()

        // --------------------------------
        {
            this.contentBox.append('div').classed('row', true).classed('titel', true)
                .text("= Achivement =")
        }
        {

            // this.contentBox.append('div').classed('row', true).classed('subtitel', true)
            //    .text("Zoom:")
            this._drawBiomeList(this.contentBox)
        }

    }


    _drawBiomeList (parentBox) {
        const FB = this.world.factoryBiomes

        Object.entries(FB.biomes).forEach(([k, biome]) => {
            const pattern_stone = /(\w+)_NW/;
            const pattern_params = /#(\w+)/;
            const items = biome.floreCondition.map(x => {
                const stone = x.match(pattern_stone)
                const param =  x.match(pattern_params)
                return [
                    stone ? stone[1] : null,
                    param ? param[1] : null,
                ]
            }).filter(x => x[0] != null)



            const c = biome.color(128, 128)            
            const bBox = parentBox.append('div').classed('row', true).classed('achBiome', true)
                .style('border', `1px solid rgb(${c[0]} ${c[1]} ${c[2]})`)

            bBox.append('div').classed('titel', true)
                .text(biome.name)
            
            items.forEach(i => {
                const key = i[0] + '_NW#' + i[1]
                this._AssetBox(parentBox, key)

            })
        });
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


