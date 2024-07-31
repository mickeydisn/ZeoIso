
export const tooltipsFollow = (d3Elm, html) => {
    // ToolTips
    const trackMouse =  e => {
        d3.selectAll('#tooltips')
            .classed('visible', true)
            .style('top', (e.pageY + 5) + 'px')
            .style('left', (e.pageX + 5)+ 'px')
        d3.selectAll('#tooltipsContent')
            .html(html)
    }
    d3Elm.on('mouseover', trackMouse)
    d3Elm.on('mousemove', trackMouse)
    d3Elm.on('mouseout', e => {
        d3.selectAll('#tooltips')
            .classed('visible', false)
    })

}

/* -- */

export const initToolmodal = (mainBox) => {
    const toolBox  = mainBox.append('div')
        .attr("id", "toolmodal")
        .classed("toolmodal", true)
        .classed('visible', true)
    const content = toolBox.append('div')
            .attr("id", "toolmodalContent")

    content.append('div')
        .attr('id', 'message')
        .text('Hello Word !')
    const buttOK = content.append('div')
        .attr('id', 'ok')
        .append('input')
            .attr('type', 'button')
            .attr('value', 'OK')
    buttOK.on('click', _ => toolBox.classed('visible', false))
    return toolBox
}

export const activeToolmodal = (msg, callback=null) => {

    const toolBox = d3.selectAll('#toolmodal')
    toolBox.selectAll('#message').html(msg)
    toolBox.classed('visible', true)

    //TODO Callback
}