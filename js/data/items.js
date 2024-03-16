const B_ALL = [
     "-6", "-7", "-8", "-9", "-10",
     "-1", "-2", "-3", "-4", "-5", 
      "1",  "2",  "3",  "4",  "5", 
      "6",  "7",  "8",  "9",  "10"
]

export const GAME_FLORE_ITEMS = [
    {b: B_ALL, l:{min:0, max:255}, flore:{mod:64, eq:0, min:0, max:255}, t: 'Svg', key: 'tree_detailed_dark_NW'},
    {b: B_ALL, l:{min:0, max:255}, flore:{mod:64, eq:1, min:0, max:255}, t: 'Svg', key: 'tree_blocks_SE'},
    {b: B_ALL, l:{min:0, max:255}, flore:{mod:64, eq:2, min:0, max:255}, t: 'Svg', key: 'tree_detailed_dark_NW'},
    {b: B_ALL, l:{min:0, max:255}, flore:{mod:64, eq:3, min:0, max:255}, t: 'Svg', key: 'tree_blocks_SW'},
    {b: B_ALL, l:{min:0, max:255}, flore:{mod:64, eq:4, min:0, max:255}, t: 'Svg', key: 'tree_oak_dark_NW'},
    {b: B_ALL, l:{min:0, max:255}, flore:{mod:64, eq:5, min:0, max:255}, t: 'Svg', key: 'tree_oak_dark_NW'},
    {b: B_ALL, l:{min:0, max:255}, flore:{mod:64, eq:6, min:0, max:255}, t: 'Svg', key: 'tree_blocks_SW'},
]



export const GAME_ITEMS = {
    "chaos": {
        "name": "Chaos",
        "color": [
            "0",
            "0",
            "0",
            "255"
        ]
    },
    "earth": {
        "name": "Earth",
        "color": [
            "0",
            "224",
            "0",
            "255"
        ]
    },
    "water": {
        "name": "Water",
        "color": [
            "96",
            "96",
            "255",
            "255"
        ]
    },
    "fire": {
        "name": "Fire",
        "color": [
            "255",
            "64",
            "0",
            "255"
        ]
    },
    "wind": {
        "name": "Wind",
        "color": [
            "224",
            "64",
            "224",
            "255"
        ]
    },
    "star": {
        "name": "Star",
        "color": [
            "255",
            "255",
            "0",
            "255"
        ]
    }
}

