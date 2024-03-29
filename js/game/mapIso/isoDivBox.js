import { TILE_HEIGHT } from "./interfaceIso.js"



export class IsoDivBox {
    constructor(canavBox, x, y, boxConf) {
        this.canavBox = canavBox
        this.x = x
        this.y = y
        this.boxConf = boxConf
        this.conf = boxConf.conf
        this.init()
    }

    init() {
        this.mainDiv = this.canavBox.append('div')
            .classed('isoDivBox', true)
        this.initDraw()
    }

    hide() {
        this.mainDiv
            .style('display', "none")
    }

    update(x, y) {
        this.mainDiv
        .style('display', "flex")
        .style('top', (y - TILE_HEIGHT - 5) + "px")
        .style('left', (x - 5) + "px")
    }


    initDraw() {
        this.content = this.mainDiv.append('div')
            .classed('content', true)
            .style('border','1px solid #FFF')
            .style('position', "absolute")
            .style('width', this.conf.width ? this.conf.width : "10vw")


        if ( this.conf.canBeEdit) {
            const idx = Math.random(100000)
            this.content.append('input')
                .attr('type', 'checkbox')
                .attr('id', 'buttEdit_'+idx)

            this.content.append('label')
                .attr('id', 'buttEditLabel')
                .attr('for', 'buttEdit_'+idx)
                .style("border", "1px solid #000")
                    .text('Edit')


            const textEdit = this.content.append('textarea')
                .style('width', this.conf.width ? this.conf.width : "10vw")
                .text(this.conf.md)

            textEdit.on('change', e => {
                console.log('change', textEdit.node().value)
                this.conf.md = textEdit.node().value
                MDDiv.html(window.marked.parse(this.conf.md))
            })

            textEdit.on('focus' , _ => {
                console.log('focus')
            })
            textEdit.on('blur' , _ => {
                console.log('blur')
            })
        }

        const MDDiv = this.content.append('div')
            .classed('Markdown', true)
            .html(window.marked.parse(this.conf.md))

        if (this.conf.style) {
            // console.log("Style", this.conf.style, this.conf.style.replaceAll('/[\s\n]+/gi', ''))
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