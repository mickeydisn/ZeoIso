import { cityNode_do_inventory_from_player, cityNode_do_inventory_to_player, cityNode_text_inventory, cityNode_text_player_inventory } from "../build/wcCity/config/defaultCity.js"
import { BoxInventory } from "../industry/Box/boxInventory.js"
import { BoxProduction } from "../industry/Box/boxProduction.js"
import { TILE_HEIGHT } from "./interfaceIso.js"



export class IsoDivBox {
    constructor(canavBox, tile, boxConf) {
        this.canavBox = canavBox
        this.tile = tile
        this.x = tile.x
        this.y = tile.y
        this.isHide = false;
        this.boxConf = boxConf
        this.conf = {
            openDist: 10,
            ...boxConf
        }
        this.init()
    }

    init() {
        this.mainDiv = this.canavBox.append('div')
            .classed('isoDivBox', true)
    }


    hide() {
        this.isHide = true;
        this.mainDiv
            .classed('isHide', true)
            .classed('isShow', false)
            .style('display', "none")
    }

    show() {
        this.isHide = false;
        this.mainDiv
            .classed('isHide', false)
            .classed('isShow', true)
            .style('display', "flex")
    }

    update(x, y) {
        // this.isHide = false;
        this.mainDiv
            // .style('display', "flex")
            .style('top', (y - TILE_HEIGHT - 5) + "px")
            .style('left', (x - 5) + "px")
    }




}


export class IsoDivBoxMarkDown extends IsoDivBox {
    constructor(canavBox, tile, boxConf) {
        super(canavBox, tile, boxConf)
        this.initDraw()
    }


    initDraw() {
        this.contentDiv = this.mainDiv.append('div')
            .classed('content', true)
            .style('border','1px solid #FFF')
            .style('position', "absolute")
            .style('width', this.conf.width ? this.conf.width : "10vw")


        if ( true || this.conf.canBeRemove) {
            const idx = Math.random(100000)

            const btt = this.contentDiv.append('label')
                .attr('id', 'buttRemove')
                .style("border", "1px solid #000")
                    .text('✕')

            btt.on('click', _ => {
                this.hide()
                this.tile.clearItem()
            })
            
        }

        if ( this.conf.canBeEdit) {
            const idx = Math.random(100000)
            this.contentDiv.append('input')
                .attr('type', 'checkbox')
                .attr('id', 'buttEdit_'+idx)

            this.contentDiv.append('label')
                .attr('id', 'buttEditLabel')
                .attr('for', 'buttEdit_'+idx)
                .style("border", "1px solid #000")
                    .text('⚙️')


            const textEdit = this.contentDiv.append('textarea')
                .style('width', this.conf.width ? this.conf.width : "10vw")
                .text(this.conf.md)

            textEdit.on('change', e => {
                this.conf.md = textEdit.node().value
                MDDiv.html(window.marked.parse(this.conf.md))
            })

            textEdit.on('focus' , _ => {
            })
            textEdit.on('blur' , _ => {
            })
        }

        const MDDiv = this.contentDiv.append('div')
            .classed('Markdown', true)
            .html(window.marked.parse(this.conf.md))

        if (this.conf.style) {
            const regex = /[\s\n]*/g
            this.conf.style.replaceAll(regex, '').split(';').forEach(style => {
                const [s, v] = style.split(":")
                if (s && v) {
                    MDDiv.style(s, v)
                }
            });
        }

    }


}




export class IsoDivCityBox extends IsoDivBox {
    constructor(canavBox, tile, boxConf) {
        super(canavBox, tile, boxConf)
        this.cityNode = this.tile.cityNode;
        this.cityNode.setIsoDivBox(this)

        this.currentStepAction = _ => {return true}

        this.initContentDraw()
        this.updateContent()
    }

    show() {
        super.show()
        // this.tile.cityNode.currentStepIdx = 0
        // this.currentStep = this.tile.cityNode.currentStep;
        this.updateContent()
    }

    initContentDraw() {
        this.contentDiv = this.mainDiv.append('div')
            .classed('content', true)
            .style('border','1px solid #FFF')
            .style('position', "absolute")
            .style('width', this.conf.width ? this.conf.width : "600px")

    
        if ( true || this.conf.canBeRemove) {
            const idx = Math.random(100000)
            const btt = this.contentDiv.append('label')
                .attr('id', 'buttRemove')
                .style("border", "1px solid #000")
                    .text('✕')
            btt.on('click', _ => {
                this.hide()
                // this.tile.clearItem()
            })
        }

        // Title
        {
            const titleDiv = this.contentDiv.append('div').classed('titleDiv', true)
            this.titleHomeDiv = titleDiv.append('div').text('⇧').on('click', _ => {
                /*
                const cityStep = this.tile.cityNode.currentStep 
                if (cityStep.undo) {
                    cityStep.undo(this.tile.cityNode, _ => {})
                }
                */
                
                this.currentStep = this.cityNode.homeStep();
                this.updateContent()
            })
            this.titleDiv = titleDiv.append('div') 
 
        }


        // MD
        this.initMDContent()

        {
            this.inventoryListDiv = this.contentDiv.append('div').classed('inventoryNode', true)
            this.inventoryListDiv.style('display', 'flex');
            this.inventoryBox = new BoxInventory(this.inventoryListDiv, this.cityNode.inventory);
            this.productionBox = new BoxProduction(this.inventoryListDiv, this.cityNode.production);
        }


        // StepList
        {
            this.stepListDiv = this.contentDiv.append('div').classed('stepList', true)
            this.stepListDiv.style('display', 'none')
            // this.initStepListContent()
        }
        {
            this.entityListDiv = this.contentDiv.append('div').classed('stepList', true)
            this.entityListDiv.style('display', 'none')
        }
        {

            this.doParamDiv = this.contentDiv.append('div').classed('paramDiv', true)
            this.doParamDiv.style('display', 'none')
            //this.initStepListContent()
        }

        // Action
        {
            const actionDiv = this.contentDiv.append('div').classed('actionDiv', true)
            this.currentStepUndoActionDiv = actionDiv.append('div')
                    .classed('buttAction', true)
                    .text('Undo')
            this.currentStepUndoActionDiv.on('click', _ => {})

            this.currentStepActionDiv = actionDiv.append('div')
                    .classed('buttAction', true)
                    .text('Do It !')
            this.currentStepActionDiv.on('click', _ => {})

            
        }

        
    }
    /*
    initStepListContent() {
        this.tile.cityNode.STEPS.forEach((step, idx) => {
            if (idx == 0) return ;
            this.stepListDiv.append('div').text("● " + step.title).on('click', _ => {
                this.tile.cityNode.currentStepIdx = idx
                this.currentStep = this.tile.cityNode.currentStep;
                this.updateContent()
            })
        })
    }
    */
    updateStepListDiv() {
        this.stepListDiv.selectAll('div').remove()
        this.cityNode.STEPS.forEach((step, idx) => {
            if (idx == 0) return ;
            if ((typeof step.isValidated !== 'boolean' &&  step.isValidated(this.cityNode)) 
                || (typeof step.isValidated === 'boolean'  && step.isValidated == true)) {

                this.stepListDiv.append('div').text("● " + step.title).on('click', _ => {
                    this.cityNode.currentStepIdx = idx
                    this.currentStep = this.cityNode.currentStep;
                    this.updateContent()
                })
            }
        })

    }
    

    updateInventoryNodeDiv() {

        this.inventoryBox.update()
        // this.inventoryListDiv.selectAll('div').remove("div")

        /*
        const playerInventory = cityNode_text_player_inventory(cityNode)
        
        const nodeInventory =  cityNode_text_inventory(cityNode)
        const nInventoryDiv = this.inventoryListDiv.append('div')
            .style('display', 'flex')
            .classed('Markdown', true) 
        nInventoryDiv.html(window.marked.parse(nodeInventory))

        const buttsDiv = this.inventoryListDiv.append('div')
            .style('display', 'flex')
            .classed('butts', true)

        const buttCollect = buttsDiv.append('div').text('⬇︎Collect⬇︎')
        buttCollect.on('click', _ => { 
            cityNode_do_inventory_to_player(cityNode)
            this.updateContent()
        })

        const buttClose = buttsDiv.append('div').text('Close')
        buttClose.on('click', _ => { 
            this.currentStep = this.tile.cityNode.homeStep();
            this.updateContent()
        })
        */

        /*
         const buttDrop = buttsDiv.append('div').text('⬆︎Drop⬆︎')
        

        buttDrop.on('click', _ => { 
            cityNode_do_inventory_from_player(cityNode) 
            this.updateContent()
        })

        const pInventoryDiv = this.inventoryListDiv.append('div')
            .style('display', 'flex')
            .classed('Markdown', true) 
        pInventoryDiv.html(window.marked.parse("### Player" + playerInventory))
        */

    }

    initMDContent() {

        this.MDDiv = this.contentDiv.append('div')
            .classed('Markdown', true)
            .html(window.marked.parse("xt"))

        if (this.conf.style) {
            const regex = /[\s\n]*/g
            this.conf.style.replaceAll(regex, '').split(';').forEach(style => {
                const [s, v] = style.split(":")
                if (s && v) {
                    this.MDDiv.style(s, v)
                }
            });
        }


    }

    updateContent() {
        if (this.isHide) return 

        const cityNode = this.tile.cityNode
        const cityStep = cityNode.currentStep 
        if (cityStep.undo) {
            this.currentStepUndoActionDiv.style('display', 'flex') 
            this.currentStepUndoActionDiv.on('click', _ => {
                cityStep.undo(cityNode, _ => { this.updateContent() })
            })
        }

        this.titleDiv.text(cityStep.title)
        
        // this.stepDiv.style('display', 'none')
        this.MDDiv.style('display', 'none') 
        this.stepListDiv.style('display', 'none') 
        this.entityListDiv.style('display', 'none')
        // this.inventoryListDiv.style('display', 'none')


        this.doParamDiv.style('display', 'none')

        this.currentStepUndoActionDiv.style('display', 'none') 
        this.currentStepUndoActionDiv.on('click', _ => {})
        this.currentStepActionDiv.style('display', 'none') 
        this.currentStepActionDiv.on('click', _ => {})
        if (cityStep.text) {
            const MdText = typeof cityStep.text == 'string' ? cityStep.text : cityStep.text(this.tile.cityNode)
            this.MDDiv.style('display', 'flex') 
            this.MDDiv.html(window.marked.parse(MdText))
        }

        this.titleHomeDiv.style('display', 'flex') 
        this.titleDiv.style('display', 'flex') 

        if (cityStep.type.localeCompare('Menu') == 0) {
            this.titleDiv.style('display', 'none') 
            this.titleHomeDiv.style('display', 'none') 
            this.stepListDiv.style('display', 'flex') 

            this.updateStepListDiv()
            
        } else if (cityStep.type.localeCompare('Entities') == 0) {
            this.entityListDiv.selectAll('div').remove("div")
            this.entityListDiv.style('display', 'flex')
            cityNode.entities.forEach(e => {
                this.entityListDiv.append('div').text(
                    ''
                    + (e.cityLink.grave ? ' G ' : ' _ ')
                    + (e.cityLink.house ? ' H ' : ' _ ')
                    + (e.cityLink.lab ? ' L ' : ' _ ')
                    + ' |' + e.name + '| '
                    + ' >(' + e.mainGoal 
                )
            })
            // setTimeout(_ => this.updateContent(), 1000)
        } else if (cityStep.type.localeCompare('Inventory') == 0) {
            this.inventoryListDiv.style('display', 'flex')
            this.updateInventoryNodeDiv()

        } else if (cityStep.type.localeCompare('Build') == 0) {
            let editor = null
            if (cityStep.doParamShema) {
                this.doParamDiv.style('display', 'flex')

                // Set default options
                // JSONEditor.defaults.options.theme = 'bootstrap2';
                JSONEditor.defaults.options.theme = 'html';
                // 
                Object.assign(JSONEditor.defaults.options, {
                    disable_array_add : true,	// If true, remove all "add row" buttons from arrays.	false
                    disable_array_delete :true,// 	If true, remove all "delete row" buttons from arrays.	false
                    disable_array_delete_all_rows : true,//	If true, remove all "delete all rows" buttons from arrays.	false
                    disable_array_delete_last_row :true,// 	If true, remove all "delete last row" buttons from arrays.	false
                    disable_array_reorder : true,//	If true, remove all "move up" and "move down" buttons from arrays.	false
                    enable_array_copy	: true,// If true, add copy buttons to arrays.	false
                    disable_collapse	: true,// If true, remove all collapse buttons from objects and arrays.	false
                    disable_edit_json	: true,// If true, remove all Edit JSON buttons from objects.	false
                    disable_properties : true,// If true, remove all Edit Properties buttons from objects.
                })
                // Initialize the editor
                this.doParamDiv.select('div').remove()
                editor = new JSONEditor(this.doParamDiv.node(), cityStep.doParamShema);

            }
            
            if (cityStep.doEnter) {
                cityStep.doEnter(this.tile.cityNode, _ => { this.updateContent() })
            }
            /*
            if (cityStep.undo) {
                this.currentStepUndoActionDiv.style('display', 'flex') 
                this.currentStepUndoActionDiv.on('click', _ => {
                    cityStep.undo(this.tile.cityNode, _ => { this.updateContent() })
                })
            }
            */
            if (cityStep.do) {
                this.currentStepActionDiv.style('display', 'flex') 
                this.currentStepActionDiv.text(cityStep.doText ? cityStep.doText : 'Do It !')
                this.currentStepActionDiv.on('click', _ => {
                    const param = editor ? editor.getValue() : {}
                    cityStep.do(this.tile.cityNode, _ => { this.updateContent() }, param)
                })
            }

        } 


        // this.stepDiv.select('div:nth-child(1)')

    }

}
