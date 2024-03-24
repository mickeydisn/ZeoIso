
function BoxBuildings (parentDiv, world){
  this.parentDiv = parentDiv;
  this.world = world;
  this.init();
}
BoxBuildings.prototype = {

    init : function () {


    },

    refrech: function () {

        this.parentDiv.selectAll("*").remove();

        // var bColor = cell.biomeItem.color(128);
        this.parentDiv
          .style("border", "2px solid #F009")

        var cityList = this.world.factoryCity.openList;

        // ROW 

        var list = this.parentDiv.append('div')
          .style('background-color', 'rgba(32, 32, 32, 100%)');

        var rows = list.selectAll('li')
          .data(cityList)
          .enter()
          .append('li')
            // .style('display', 'block')
            .style('display', 'flex')
            .style('justify-content', 'left')
            .style('flex-direction', 'row')
            .style('align-items', 'center')
            .style('border-top', '1px solid #555')
            .style('padding', '.2em')

        rows.append('div')
          .attr('title', d => d.x + '-' + d.y )
          .style('display', 'inline-flex')
          .style('align-items', 'center')
          .style('width', '16px')
          .style('height', '16px')
          .style('padding', '.2em')
          .style('background-color', d =>  {
            var col = d.infoCell.biomeItem.color(128);
            return `rgba(${col[0]}, ${col[1]}, ${col[2]}, 100%)`;
          })
          .style('border-bottom', d =>  {
            var col = d.infoCell.biomeItem.color(128);
            return '1.5px solid ' + `rgba(${col[0]}, ${col[1]}, ${col[2]}, 100%)`;
          })
          .on('click', function (d) {
            this.world.interfaceMap.moveTo(d.x, d.y);
            this.world.interfaceMap.drawSelectedCase(d.x, d.y);
            this.world.interfaceMenu.onClickTile(d.x, d.y);

          }.bind(this))

        rows.append('div')
          .style('display', 'inline-flex')
          .style('padding', '.2em')
          .style('padding-left', '.2em')
          .style('width', '9vh')
          .style('font-size', '1em')
          .style('border-bottom', d =>  {
            var col = d.infoCell.biomeItem.color(128);
            return '1.5px solid ' + `rgba(${col[0]}, ${col[1]}, ${col[2]}, 100%)`;
          })
          .text(d => d.name);

        var environment = rows.append('div')
          .style('display', 'inline-flex')
          .style('padding-left', '.2em')
          .style('width', '10vh')
          .style('font-size', '1em')
            .style('border', '1px solid #888')

        var bioInfo = new divBioInfo(null);
        bioInfo.d3lineBox(environment);


    },

}