
import { WidjetActions } from "./widjetAction.js";

export class WidjetActionsSetting extends WidjetActions {

    constructor(world, mainDiv) {
        super(world, mainDiv)

        this._createMainButt('settingAction', '⚙️')


/*
<div class="buttMenuBox" id="KeyBoard">
        <input type="checkbox" id="checkbox_menuBox_KeyBoard" name="MenuBox">
        <label for="checkbox_menuBox_KeyBoard"></label>
</div>

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
*/

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

        // KEYBOARD
        {
            this.contentBox.append('div').classed('row', true).classed('subtitel', true)
                .text("Keyboard:")
            
            const zoomBox = this.contentBox.append('div').classed('row', true)
            zoomBox.html(`
                <input type="radio" checked id="SettingKeyBoard_AZERT" name="SettingKeyBoard">AZERT</input>
                <input type="radio" id="SettingKeyBoard_QWERTY" name="SettingKeyBoard">QWERTY</input>
            `)

            zoomBox.select('#SettingKeyBoard_AZERT').on('click', _ => {this.GS.set("Setting.KeboardType", 'azerty')})
            zoomBox.select('#SettingKeyBoard_QWERTY').on('click', _ => {this.GS.set("Setting.KeboardType", 'qwzert')})
        }

        // ZOOM 
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


