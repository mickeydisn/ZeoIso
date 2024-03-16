
function BoxTile (parentDiv, world){
  this.parentDiv = parentDiv;
  this.world = world;
  this.init();
}
BoxTile.prototype = {

    init : function () {


    },

    onClickTile: function (x, y) {
        var boxSize = 16 ;

        this.world.factoryCity.setSelectPosition(x, y);
        var cellInfo =  this.world.getCellInfo(x , y)

        this.parentDiv.selectAll("*").remove();

        // Main box attribut
        var bColor = cellInfo.biomeItem.color(128);

        // ---------------------------------
        // == TITLE : SELECTED CASE
        var head = this.parentDiv.append('div')
            // .style('display', 'block')
            .style('display', 'flex')
            .style('border-bottom', '1px solid #F55')
            .style('padding', '.2em')
            .style('font-size', '1.5em')
            .text('Selected Case')


        // ----------------------------------
        // == Biome Header
        var bioHeader = this.parentDiv.append('div')
            .style('background-color', 'rgba('+bColor[0]+', '+bColor[1]+', '+bColor[2]+', 60%)')
            .style('border-bottom', '1px solid #555')
            .style('padding', '.4em')
            .style('margin-left', '1em')
            .style('margin-right', '1em')
            .style('margin-top', '1em')

        bioHeader.append('span')
          .style('margin-left', '2em')
          .style('font-size', '1.2em')
          .attr('class', 'fas fa-globe-americas')

        bioHeader.append('span')
          .style('font-size', '.9em')
          .text(' - [ '+ x + ' . ' + y + ' ]');

        bioHeader.append('span')
          .style('font-size', '1.2em')
          .style('padding-left', '1.5em')
          .text(cellInfo.biomeItem.name);

        // -----------
        //  Info Bio Flore

        var bioFlore = this.parentDiv.append('div')
            .style('display', 'flex')
            .style('font-size', '1em')
            .style('margin', '1em')
            .style('border', '1px solid #555')


        this.displayInfoCell(bioFlore, x, y, cellInfo);


        // -----------
        //  InfoBuilding Info

        var city = null;
        if (cellInfo.cityCenterItem != null) {
          city = cellInfo.cityCenterItem;
            // ---------------------------------
            // == TITLE : SELECTED CASE
            var head = this.parentDiv.append('div')
                // .style('display', 'block')
                .style('display', 'flex')
                .style('border-top', '1px solid #F55')
                .style('border-bottom', '1px solid #F55')
                .style('margin-top', '.5em')
                .style('padding', '.2em')
                .style('font-size', '1.5em')
                .text('City ' + city.x + ', ' + city.y)

            var tabInfoCity = this.parentDiv.append('div')
                .style('font-size', '1em')
                .style('margin-top', '1em')
                .style('margin-left', '1em')
                .style('margin-right', '1em')

          this.displayInfoCity(tabInfoCity, city);

        } else {

            var d = this.parentDiv.append('div')
                .style('font-size', '1em')
                .style('margin-top', '1em')
                .style('margin-left', '1em')
                .style('margin-right', '1em')
                .style('padding', '.4em')
                .style('border', '1px solid #F55')
                .style('cursor', 'pointer')
                .on('click', function (d) {
                  this.world.factoryCity.addCity('home', x, y);
                  this.world.factoryCity.refreshContext();
                }.bind(this))
  
            d.append('span')
              .attr('class', 'fas fa-cog')
              .style('font-size', '1.3em')    
              .style('padding-right', '.3em') 
              .style('color', '#F84')

            d.append('span')
              .style('font-size', '1.3em')  
              .style('color', '#F84') 
              .text('Build a City' );

        }



        var Footer = this.parentDiv.append('div')
            .style('display', 'flex')
            .style('margin-bottom', '1em')

            .style('border', '1px solid #555')


      /* HR */ // var d = this.parentDiv.append('hr').style('font-size', '0.5em').style('margin', '0em');

    },


    displayInfoCell: function (bioFlore, x, y, cellInfo){


        // -----------
        // Image
        var imageEdit = bioFlore.append('div')
          .style('width', '10vw')

        var imageBuilding = null;
        if (cellInfo.buildingItem != null) {
          imageBuilding = cellInfo.buildingItem.imageData;
        }

        this.TileEdit = new TileEdit(imageEdit, this.world);
        this.TileEdit.draw(x, y, imageBuilding);


        // ---------------------------------
        // == Biome Param

        var bioCellDetail = bioFlore.append('div')

        var head = bioCellDetail.append('div')
            .style('border-bottom', '1px solid #555')
            .style('margin', '.5em')
            .style('font-size', '1.1em')
            .text('BioParam :')

        var bioParam = bioCellDetail.append('div')
          .style('justify-content', 'center')

        var bioInfo = new divBioInfo(cellInfo);
        bioInfo.tileBox(bioParam);

        // ---------------------------------
        // === Flore Info
        var head = bioCellDetail.append('div')
            .style('border-bottom', '1px solid #555')
            .style('margin', '.5em')
            .style('font-size', '1.1em')
            .text('Dencity :')

        var tabInfoFlore = bioCellDetail.append('div')
            .style('width', '9vw')
            .style('flex-direction', 'column')
            .style('justify-content', 'center')
            .style('align-items', 'right')
            .text(Math.max(0, cellInfo.dencity - 128))

    },

    displayInfoCity: function (tabInfoCity, city){

        // ---------------------------------
        // == ICON and NAME
        const bName = tabInfoCity.append('div')
            .style('display', 'flex')
            .style('padding', '.2em')
            .style('font-size', '1.3em')
            .style('border', '1px solid #555')

        bName.append('span')
            .attr('class', 'fas fa-building')
            .style('padding-right', '.3em')

        bName.append('span')
            .text(' '+ city.name );

        const bUpdate = tabInfoCity.append('div')
            .style('display', 'flex')
            .style('justify-content', 'center')
            .style('padding', '.2em')
            .style('font-size', '1.3em')
            .style('border', '1px solid #555')
  
        bUpdate.append('span')
          .style('color', '#F84')
          .style('cursor', 'pointer')
          .text('UPDATE THE CITY');
  
  
        const bParam = tabInfoCity.append('div')
            .style('display', 'flex')
            .style('padding', '.2em')
            .style('font-size', '1.3em')
            .style('border', '1px solid #555')

        const bParamData =  new BoxJsonEditor(bParam, city.param);
        
        bUpdate.on('click', _ => {
            city.update(bParamData.getData())
            this.world.factoryCity.refreshContext();
        })


        const bDelete = tabInfoCity.append('div')
          .style('display', 'flex')
          .style('justify-content', 'center')
          .style('padding', '.2em')
          .style('font-size', '1.3em')
          .style('border', '1px solid #555')

        bDelete.append('span')
          .style('color', '#F84')
          .style('cursor', 'pointer')
          .text('DELETE THE CITY');

        bDelete.on('click', _ => {
          this.world.factoryCity.removeCity(city.id);
          this.world.factoryCity.refreshContext();
        })


    },

}