import { WcBuildConf_House3a } from "../../wcBuilding2/buildConf_house3a.js"
import { WcBuildConf_House3b } from "../../wcBuilding2/buildConf_house3b.js"
import { WcBuildingFactory } from "../../wcBuilding2/wcBuildingFactory.js"
import { CitNodeHouse } from "../cityTileNode.js"
import { STEP_ERROR, abstractStep } from "./abstractStep.js"



const PATH_CONFIG = {
    length: 4,
    minDist: 3,
    crossDist: null,
    alphaStep : 8,

    lvlDeviationCount: 4,
    lvlDefviationAlpha: 2,  
    asset: {key: [
        "statue_obelisk_NW#_H180_C150_S95_B75_I1_R1",
        "statue_obelisk_NW#_H180_C150_S95_B75_I1_R2",
        "statue_obelisk_NW#_H180_C150_S95_B75_I1_R3",
        "statue_obelisk_NW#_H180_C150_S95_B75_I1_R2",
    ]},
}


export const section_BuildBestHouse = {
    type:"Build", 
    title: "House Builder",
    isValidated:true,
    steps: [
        {...abstractStep, 
            title: "House Builder",
            text: `> ### ...Waiting To Build `, 
            isValidated : (cityNode) =>  {
                return cityNode.sData && cityNode.sData.isWaiting
            },
        },
        {...abstractStep,
            title: "House Builder",
            text: `# Select \n > Create Ghost for road ... `, 
            isValidated: (cityNode) => !cityNode.sData,
            doEnter: (cityNode, callback=_ => {}) => { 

                const isValid = (tile) => (!tile.wcBuild)
                const allTile = []
                cityNode.sData = {
                    possibleTiles: [],
                    selectedTile: null,
                    isWaiting:false,
                }
                // loop on city node road
                cityNode.roads.forEach(road => {
                    console.log('road', road)
                    // foreach tile of the road
                    road.wcPath.tileList.forEach(roadTile => {
                        // look to tile around the path 
                        const nearRoadTile = [...roadTile.nearTilesAxe(3), ...roadTile.nearTilesAxe(4)];
                        nearRoadTile.forEach(nTile => {
                            if (allTile.includes(nTile)) return ;
                            allTile.push(nTile)

                            if (
                                isValid(nTile) 
                                && nTile.nearTiles.filter(t => isValid(t)).length == 4
                                && nTile.nearCrossTiles.filter(t => isValid(t)).length == 4
                            ) {
                                const n = nTile
                                cityNode.sData.possibleTiles.push(nTile)
                            }


                        })

                    })
                })
                /*
                cityNode.GS.set("TileClickFunction", { 
                    func:'doFunction', do: (x, y) => {
                        const select = cityNode.sData.possibleTiles.filter(n => n.x == x && n.y == y)
    
                        if (select.length) {
                            const n = select[0]
                            console.log("selectNearNode", n)
                            cityNode.sData.selectedTile = n
                            cityNode.ta.doAction({func:'clearAllTemporatyItems'})
                            cityNode.ta.doAction({func:'temporatyItemsForceKey', x:n.x, y:n.y, assetKey:this.asset.key})
                            this.GS.set("TileClickFunction", null)
                        } else {
                            console.log("bad_selection")
                            // cityNode.sData.selectedTile = null
                            // this.GS.set("TileClickFunction", null)
                        }
                    }, callback:callback
                })
                */
                const sortedPosibleTile = cityNode.sData.possibleTiles
                    .map(tile => {return {score:cityNode.nodeDistance(tile), tile:tile}})
                    .sort((a, b) => a.score - b.score)

                let validBuild = false
                const HOUSE_CONFIGURATION = new WcBuildConf_House3a({growLoopCount:10})
                const building = new WcBuildingFactory(cityNode.world, HOUSE_CONFIGURATION)

                while (!validBuild && sortedPosibleTile.length != 0) {
                    let n = sortedPosibleTile.shift().tile
                    validBuild = building.test(n.x, n.y)
                    console.log("validBuild", n.x, n.y, validBuild)
                    if (!validBuild) {
                        cityNode.sData.possibleTiles = cityNode.sData.possibleTiles.filter(t => t != n)
                    } else {
                        cityNode.sData.selectedTile = n
                    }
                }
                callback()
            },
        }, 
        // Node Valide Not Exist
        {...abstractStep,
            title: "House Builder",
            text: `# Select \n > Not Existe ... `, 
            isValidated: (cityNode) => !cityNode.sData || cityNode.sData.selectedTile == null,
        }, 
        // Node Is Selected Ready to be Build 
        {...abstractStep,
            title: "House Builder",
            text: `# Select \n > Veiw ... `, 
            isValidated: (cityNode) => !cityNode.sData || cityNode.sData.selectedTile != null,

            doEnter: (cityNode, callback=_ => {}) => { 
                cityNode.ta.doAction({func:'clearAllTemporatyItems'})
                cityNode.sData.possibleTiles.forEach(n => {
                    cityNode.ta.doAction({func:'temporatyItemsForceKey', x:n.x, y:n.y, assetKey:"mushroom_red_NW#_C130_B110_I1_R3"})
                })

                if (cityNode.sData.selectedTile) {
                    const n = cityNode.sData.selectedTile
                    cityNode.ta.doAction({func:'temporatyItemsForceKey', x:n.x, y:n.y, assetKey:[
                        "mushroom_red_NW#H100_C130_B110_I1_R1",
                        "mushroom_red_NW#H100_C130_B110_I1_R2",
                        "mushroom_red_NW#H100_C130_B110_I1_R3",
                    ]})
                }
                // callback()
            },  

            // doParamShema : {'toto':1},
            do: (cityNode, param={}, callback=_ => {}) => {
                cityNode.ta.doAction({func:'clearAllTemporatyItems'})
                const HOUSE_CONFIGURATION = new WcBuildConf_House3b({growLoopCount:25})
                const building = new WcBuildingFactory(cityNode.world, HOUSE_CONFIGURATION)
                const n = cityNode.sData.selectedTile
                building.start(n.x, n.y).then(_ => {
                    cityNode.sData = null

                    const cityNodeHouse = n.cityNode ? n.cityNode : new CitNodeHouse(cityNode.world, n)
                    cityNodeHouse.buildFactory = building;
                    callback()
                })
                cityNode.sData.isWaiting = true
                callback()
            }
        },
        STEP_ERROR
    ] 

}

