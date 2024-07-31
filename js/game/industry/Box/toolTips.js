
export const tooltipsFollow = (d3Elm, html) => {
    // ToolTips
    const trackMouse =  e => {
        d3.selectAll('#tooltips')
            .classed('tooltipsVisible', true)
            .style('top', (e.pageY + 5) + 'px')
            .style('left', (e.pageX + 5)+ 'px')
        d3.selectAll('#tooltipsContent')
            .html(html)
    }
    d3Elm.on('mouseover', trackMouse)
    d3Elm.on('mousemove', trackMouse)
    d3Elm.on('mouseout', e => {
        d3.selectAll('#tooltips')
            .classed('tooltipsVisible', false)
    })

}

