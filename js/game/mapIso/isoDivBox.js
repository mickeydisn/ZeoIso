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
        this.isHide = true;
        this.mainDiv
            .classed('isHide', false)
            .classed('isShow', true)
            .style('display', "flex")
    }

    update(x, y) {
        this.isHide = false;
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
            .style('width', this.conf.width ? this.conf.width : "400px")

    
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
                console.log('----- UNDO_CLICK')
                
                this.currentStep = this.tile.cityNode.homeStep();
                this.updateContent()
            })
            this.titleDiv = titleDiv.append('div')  
        }

        
        // Step Pagination
        /* { 
            this.stepDiv = this.contentDiv.append('div')
                .classed('pageDiv', true)
                .html(`
                    <div class='buttAction'> Back </div>
                    <div class='buttAction'> Next </div>
                `)

            this.stepDiv.select('div:nth-child(1)').on('click', _ => {
                this.currentStep = this.tile.cityNode.presStep
                this.updateContent()
            })
            this.stepDiv.select('div:nth-child(2)').on('click', _ => {
                this.currentStep = this.tile.cityNode.nextStep
                this.updateContent()
            })
        } */

        // MD
        this.initMDContent()

        // StepList
        {

            this.stepListDiv = this.contentDiv.append('div').classed('stepList', true)
            this.stepListDiv.style('display', 'none')
            this.initStepListContent()
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
        const cityStep = this.tile.cityNode.currentStep 
        if (cityStep.undo) {
            this.currentStepUndoActionDiv.style('display', 'flex') 
            this.currentStepUndoActionDiv.on('click', _ => {
                cityStep.undo(this.tile.cityNode, _ => { this.updateContent() })
            })
        }
        // console.log("updateContent", cityStep)

        this.titleDiv.text(cityStep.title)
        
        // this.stepDiv.style('display', 'none')
        this.MDDiv.style('display', 'none') 
        this.stepListDiv.style('display', 'none') 

        this.doParamDiv.style('display', 'none')

        this.currentStepUndoActionDiv.style('display', 'none') 
        this.currentStepUndoActionDiv.on('click', _ => {})
        this.currentStepActionDiv.style('display', 'none') 
        this.currentStepActionDiv.on('click', _ => {})

        const MdText = cityStep.text
        if (MdText) {
            this.MDDiv.html(window.marked.parse(MdText))
        }


        if (cityStep.type.localeCompare('menu') == 0) {
            this.titleDiv.style('display', 'none') 
            this.titleHomeDiv.style('display', 'none') 
            this.stepListDiv.style('display', 'flex') 
        } else {
           //  this.stepDiv.style('display', 'flex')
            this.MDDiv.style('display', 'flex') 
            this.titleHomeDiv.style('display', 'flex') 
            this.titleDiv.style('display', 'flex') 
        }  

        if (cityStep.type.localeCompare('Build') == 0) {
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
                editor = new JSONEditor(this.doParamDiv.node(),{
                    schema: {
                        // "title": "Person",
                        type: "object",
                        required: [
                            "buildType", "growLoopCount",
                          ],
                        properties: {
                            "buildType": {
                                title: "Building Type",
                                type: "string",
                                enum: [
                                    "house3a",
                                    "house3b",
                                    "house4a",
                                    "house6a",
                                    // "Big Lab",
                                ]
                            },    
                            "growLoopCount": {
                                title:"Building Size",
                                type: "integer",
                                enum: [
                                   1, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100
                                  ],
                                default: 10,
                                minimum: 1,
                                maximum: 100
                              },
    
                        }
                      }
                });

            }
            
            if (cityStep.doEnter) {
                console.log('DO_ENTER: ', cityStep.title, cityStep.text)
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
                console.log('DO_BUTT: ', cityStep.title, cityStep.text)
                this.currentStepActionDiv.style('display', 'flex') 
                this.currentStepActionDiv.on('click', _ => {
                    const param = editor ? editor.getValue() : {}
                    console.log('DO: ', cityStep.title, cityStep.text)
                    cityStep.do(this.tile.cityNode, param, _ => { this.updateContent() })
                })
            }

        } 


        // this.stepDiv.select('div:nth-child(1)')

    }

}
