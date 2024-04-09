

export class WidjetActionsSetting {

    constructor(world, mainDiv) {
        this.world = world;
        this.GS = this.world.globalState;
        
        console.log('=== WidjetAssetList - Init')

        this.mainDiv = mainDiv

        // Create Switch Button 
        this.mainDiv.html( `

<div class="buttMenuBox" id="KeyBoard">
        <input type="checkbox" id="checkbox_menuBox_KeyBoard" name="MenuBox">
        <label for="checkbox_menuBox_KeyBoard"></label>
</div>


<div class="buttMenuBox  switch" id="settingAction">
        <input type="radio" id="checkbox_menuBox_settingAction" name="MenuBox">
        <label for="checkbox_menuBox_settingAction">⚙️</label>
        <div class="widjetMenuBox slider" id="settingAction" >
            <div id="content" class="menuAction">  </div>
        </div>
</div>
        `)

        // Generate Content 
        {
            const changeInput = this.mainDiv.select('#checkbox_menuBox_KeyBoard')
            changeInput
                .on('change', e => {
                    console.log("checkbox_menuBox_KeyBoard", changeInput.property('checked'))
                    if (changeInput.property('checked')) {
                        this.GS.set('Setting.KeboardType', "qwzert")
                    } else {
                        this.GS.set('Setting.KeboardType', "azerty")
                    }

                })

        }

        // Generate Content 
        {
            this.contentBox = this.mainDiv.select('#content')
            this.drawSettingActionList();

        }
        // Sub to Global state. 
       
    }



    // ---------------------
    //  Floor Action 
    // ---------------------
    drawSettingActionList() {
        this.contentBox.selectAll('div').remove()

        // --------------------------------
        {
            this.contentBox.append('div').classed('row', true).classed('titel', true)
                .text("= SETTING =")
        }
        {
            this.contentBox.append('div').classed('row', true).classed('subtitel', true)
                .text("Zoom:")
            
            const zoomBox = this.contentBox.append('div').classed('row', true)
            zoomBox.html(`
                <input type="radio" id="SettingZoom_09" name="SettingZoom">0.9</input>
                <input type="radio" id="SettingZoom_1" name="SettingZoom">1</input>
                <input type="radio" id="SettingZoom_12" name="SettingZoom">1.2</input>
                <input type="radio" checked id="SettingZoom_14" name="SettingZoom">1.4</input>
            `)
            zoomBox.select('#SettingZoom_09').on('click', _ => {this.GS.set("Setting.Zoom", .9)})
            zoomBox.select('#SettingZoom_1').on('click', _ => {this.GS.set("Setting.Zoom", 1)})
            zoomBox.select('#SettingZoom_12').on('click', _ => {this.GS.set("Setting.Zoom", 1.2)})
            zoomBox.select('#SettingZoom_14').on('click', _ => {this.GS.set("Setting.Zoom", 1.4)})
        }
      

    }

}


