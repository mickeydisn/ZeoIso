export class WidjetActions {

    constructor(world, mainDiv) {
        this.world = world;
        this.assetLoader = this.world.assetLoader
        this.GS = this.world.globalState;
        this.isOpen = false
        this.mainDiv = mainDiv
    }

    _createMainButt(nameId, label) {
        
        this.mainDiv.html( `
            <div class="buttMenuBox  switch" id="${nameId}">
                    <input type="checkbox" id="checkbox_menuBox_${nameId}" name="MenuBox">
                    <label for="checkbox_menuBox_${nameId}">${label}</label>
                    <div class="widjetMenuBox slider" id="${nameId}" >
                        <div id="content" class="menuAction">  </div>
                    </div>
            </div>
        `)
        
        const input = this.mainDiv.select(`#checkbox_menuBox_${nameId}`)
        input.on('click', _ => {
            this.GS.set('Menu.Selected', nameId)
        })

        this.GS.sub('Menu.Selected', `Menu.Selected_${nameId}`, curentId => {

            if (nameId == curentId) {
                this.isOpen = ! this.isOpen
                if (this.isOpen == false) {
                    this.GS.set("TileClickFunction", null)
                    this.GS.set("WidjetActions.currentButt", null)
                }
            } else {
                this.isOpen = false
            }
    
            input.property('checked', this.isOpen);
        } )
    }
    
}
