
function BoxJsonEditor (parentDiv, jsonData){
  this.parentDiv = parentDiv;
  this.data = jsonData;
  this.init();
}
BoxJsonEditor.prototype = {

  bData: null,

    init : function () {
      this.parentDiv
        .style('flex-direction', 'column')

      console.log('key', Object.keys(this.data))
      const bDiv = this.parentDiv.append('div')

      const recLoop = function (items) {

        const childNode = items.selectAll('div')
          .data(d => {
            const objectList = Object.keys(d.value)
            .filter(x => d.value[x] instanceof Object )
            .map(x => {return {key: x, value: d.value[x]}});
            return objectList;
          })
          .enter()
            .append('div')
              .style('padding-left', '10px')
              .text(d => '. ' + d.key)
        if (childNode.size() > 0) {
          recLoop(childNode);
        }

        const childItems = items.selectAll('div')
          .data(d => {
            const objectList = Object.keys(d.value)
              .filter(x => ! (d.value[x] instanceof Object) )
              .map(x => {return {key: x, value: d.value[x], parent: d.value}});
            // console.log('objectList', objectList)
            return objectList;
          })
          .enter()
            .append('div')
            .style('padding-left', '1vw')
            .style('display', 'flex')
            .style('flex-direction', 'row')

          childItems.append('div')
              .style('width', '8vw')
              .text(d => d.key)
          const inputs = childItems.append('input')
            .attr('type', d => isNaN(d.value) ? 'text' : 'number')
            .attr('value', d=> d.value)
            .style('color', '#FFF')
            .style('background-color', '#222')

          inputs.on('change', function(d) {
              console.log(d, this.value );
              d.parent[d.key] = this.value;
          })
          
    
          //   .text(d => d[1])

      }

      const items =  bDiv.selectAll('div')
        .data([{key: "", value: this.data}])
        .enter()
          .append('div')
      recLoop(items);

      this.bData = this.parentDiv.append('textarea')
        .style('width', '100%')
        .style('height', '50vh')
        .style('color', '#FFF')
        .style('background-color', '#222')
        .text(' '+ JSON.stringify(this.data, null, 2) );

    },

    getData : function () {
      return this.data;
    }

}