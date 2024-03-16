
export const GAME_BIOMES_MATRIS = [
    "-9", "-9", "-9", "-7", "-8", "-10", "-10", "-10", 
    "-9", "-9", "-7", "-7", "-8", "-8", "-10", "-10", 
    "-3", "-5", "-5", "-5", "-6", "-6", "-6",  "-4",
    "-3", "-3", "-3", "-1", "-2", "-4", "-4",  "-4", 
     "3",  "3",  "3",  "1",  "2",  "4",  "4",  "4", 
     "3",  "5",  "5",  "5",  "6",  "6",  "6",  "4", 
     "9",  "9",  "7",  "7",  "8",  "8",  "10", "10",  
     "9",  "9",  "9",  "7",  "8",  "10", "10", "10"
]


export const GAME_BIOMES = [ 
    {id:"10",   name:"10",    rgb:["192 -lvl / 3", "0", "128 -lvl / 4"]},
    {id:"9",    name:"9",     rgb:["192 -lvl / 3", "64 - lvl * 0.65", "0"]},
    {id:"8",    name:"8",     rgb:["192 -lvl / 3", "128 - lvl * 0.65", "0"]},
    {id:"7",    name:"7",     rgb:["192 -lvl / 3", "176 -  lvl * 0.65", "0"]},
    {id:"6",    name:"6",     rgb:["255 -lvl / 2", "192 -  lvl * 0.70", "0"]},
    {id:"5",    name:"5",     rgb:["255 -lvl / 2", "224 -  lvl * 0.75", "0"]},
    {id:"4",    name:"4",     rgb:["255 -lvl / 2", " 256  - lvl * 0.75", "0"]},
    {id:"3",    name:"3",     rgb:["192 -lvl / 3", " 256  - lvl * 0.75", "0"]},
    {id:"2",    name:"2",     rgb:["128 -lvl / 4", " 256  - lvl * 0.75", "0"]},
    {id:"1",    name:"1",     rgb:["96 -lvl / 8", " 256  - lvl * 0.75", "0"]},
    {id:"-1",   name:"-1",    rgb:["0", " 256  - lvl * 0.75", "0"]},
    {id:"-2",   name:"-2",    rgb:["0", " 256  - lvl * 0.75", "32 -lvl / 10"]},
    {id:"-3",   name:"-3",    rgb:["0", " 256  - lvl * 0.75", "64 -lvl / 8"]},
    {id:"-4",   name:"-4",    rgb:["0", " 256  - lvl * 0.75", "96 -lvl / 6"]},
    {id:"-5",   name:"-5",    rgb:["0", " 256  - lvl * 0.75", "128 -lvl / 4"]},
    {id:"-6",   name:"-6",    rgb:["0", " 256  - lvl * 0.75", "192 -lvl / 3"]},
    {id:"-7",   name:"-7",    rgb:["0", " 256  - lvl * 0.75", "255 -lvl / 2"]},
    {id:"-8",   name:"-8",    rgb:["128 - lvl * 0.65", " 256  - lvl * 0.75", "255 -lvl / 2"]},
    {id:"-9",   name:"-9",    rgb:["176 -  lvl * 0.65", " 256  - lvl * 0.75", "255 -lvl / 2"]},
    {id:"-10",  name:"-10",   rgb:["224 -  lvl * 0.75", " 256  - lvl * 0.75", "255 -lvl / 2"]},
    {id:"mont1", name:"Montagne", rgb:["(lvl - 192) * 2 + 64", "(lvl - 192) * 2 + 64", "(lvl - 192) * 2 + 64"]},
    {id:"ocean", name:"Ocean", rgb:["32", "64 + lvl", "64 + lvl * 3"]},
]

export const GAME_BIOMES_OLD = {
    "0": {
        "name": "0",
        "tire": "0",
        "floreCondition": [
            "null"
        ]
    },
    "1": {
        "name": "1",
        "tire": "2",
        "floreCondition": [
            "((flore * 1000 | 0) % 1 == 0 && flore >= 240 && flore < 256 && lvl >= 0 && lvl < 256) ? 'star' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 192 && flore < 240 && lvl >= 0 && lvl < 256) ? 'wind' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 144 && flore < 192 && lvl >= 0 && lvl < 256) ? 'fire' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 128 && flore < 144 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 112 && flore < 128 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 64 && flore < 112 && lvl >= 0 && lvl < 256) ? 'water' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 16 && flore < 64 && lvl >= 0 && lvl < 256) ? 'earth' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 0 && flore < 16 && lvl >= 0 && lvl < 256) ? 'star' ",
            "null"
        ]
    },
    "2": {
        "name": "2",
        "tire": "1",
        "floreCondition": [
            "((flore * 1000 | 0) % 1 == 0 && flore >= 240 && flore < 256 && lvl >= 0 && lvl < 256) ? 'star' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 192 && flore < 240 && lvl >= 0 && lvl < 256) ? 'wind' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 144 && flore < 192 && lvl >= 0 && lvl < 256) ? 'fire' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 128 && flore < 144 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 112 && flore < 128 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 64 && flore < 112 && lvl >= 0 && lvl < 256) ? 'water' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 16 && flore < 64 && lvl >= 0 && lvl < 256) ? 'earth' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 0 && flore < 16 && lvl >= 0 && lvl < 256) ? 'star' ",
            "null"
        ]
    },
    "3": {
        "name": "3",
        "tire": "1",
        "floreCondition": [
            "((flore * 1000 | 0) % 1 == 0 && flore >= 240 && flore < 256 && lvl >= 0 && lvl < 256) ? 'star' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 192 && flore < 240 && lvl >= 0 && lvl < 256) ? 'wind' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 144 && flore < 192 && lvl >= 0 && lvl < 256) ? 'fire' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 128 && flore < 144 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 112 && flore < 128 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 64 && flore < 112 && lvl >= 0 && lvl < 256) ? 'water' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 16 && flore < 64 && lvl >= 0 && lvl < 256) ? 'earth' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 0 && flore < 16 && lvl >= 0 && lvl < 256) ? 'star' ",
            "null"
        ]
    },
    "4": {
        "name": "4",
        "tire": "3",
        "floreCondition": [
            "((flore * 1000 | 0) % 1 == 0 && flore >= 240 && flore < 256 && lvl >= 0 && lvl < 256) ? 'star' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 192 && flore < 240 && lvl >= 0 && lvl < 256) ? 'wind' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 144 && flore < 192 && lvl >= 0 && lvl < 256) ? 'fire' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 128 && flore < 144 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 112 && flore < 128 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 64 && flore < 112 && lvl >= 0 && lvl < 256) ? 'water' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 16 && flore < 64 && lvl >= 0 && lvl < 256) ? 'earth' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 0 && flore < 16 && lvl >= 0 && lvl < 256) ? 'star' ",
            "null"
        ]
    },
    "5": {
        "name": "5",
        "tire": "7",
        "floreCondition": [
            "((flore * 1000 | 0) % 1 == 0 && flore >= 240 && flore < 256 && lvl >= 0 && lvl < 256) ? 'star' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 192 && flore < 240 && lvl >= 0 && lvl < 256) ? 'wind' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 144 && flore < 192 && lvl >= 0 && lvl < 256) ? 'fire' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 128 && flore < 144 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 112 && flore < 128 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 64 && flore < 112 && lvl >= 0 && lvl < 256) ? 'water' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 16 && flore < 64 && lvl >= 0 && lvl < 256) ? 'earth' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 0 && flore < 16 && lvl >= 0 && lvl < 256) ? 'star' ",
            "null"
        ]
    },
    "6": {
        "name": "6",
        "tire": "4",
        "floreCondition": [
            "((flore * 1000 | 0) % 1 == 0 && flore >= 240 && flore < 256 && lvl >= 0 && lvl < 256) ? 'star' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 192 && flore < 240 && lvl >= 0 && lvl < 256) ? 'wind' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 144 && flore < 192 && lvl >= 0 && lvl < 256) ? 'fire' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 128 && flore < 144 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 112 && flore < 128 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 64 && flore < 112 && lvl >= 0 && lvl < 256) ? 'water' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 16 && flore < 64 && lvl >= 0 && lvl < 256) ? 'earth' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 0 && flore < 16 && lvl >= 0 && lvl < 256) ? 'star' ",
            "null"
        ]
    },
    "7": {
        "name": "7",
        "tire": "7",
        "floreCondition": [
            "((flore * 1000 | 0) % 1 == 0 && flore >= 240 && flore < 256 && lvl >= 0 && lvl < 256) ? 'star' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 192 && flore < 240 && lvl >= 0 && lvl < 256) ? 'wind' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 144 && flore < 192 && lvl >= 0 && lvl < 256) ? 'fire' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 128 && flore < 144 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 112 && flore < 128 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 64 && flore < 112 && lvl >= 0 && lvl < 256) ? 'water' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 16 && flore < 64 && lvl >= 0 && lvl < 256) ? 'earth' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 0 && flore < 16 && lvl >= 0 && lvl < 256) ? 'star' ",
            "null"
        ]
    },
    "8": {
        "name": "8",
        "tire": "8",
        "floreCondition": [
            "((flore * 1000 | 0) % 1 == 0 && flore >= 240 && flore < 256 && lvl >= 0 && lvl < 256) ? 'star' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 192 && flore < 240 && lvl >= 0 && lvl < 256) ? 'wind' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 144 && flore < 192 && lvl >= 0 && lvl < 256) ? 'fire' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 128 && flore < 144 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 112 && flore < 128 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 64 && flore < 112 && lvl >= 0 && lvl < 256) ? 'water' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 16 && flore < 64 && lvl >= 0 && lvl < 256) ? 'earth' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 0 && flore < 16 && lvl >= 0 && lvl < 256) ? 'star' ",
            "null"
        ]
    },
    "9": {
        "name": "9",
        "tire": "4",
        "floreCondition": [
            "((flore * 1000 | 0) % 1 == 0 && flore >= 240 && flore < 256 && lvl >= 0 && lvl < 256) ? 'star' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 192 && flore < 240 && lvl >= 0 && lvl < 256) ? 'wind' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 144 && flore < 192 && lvl >= 0 && lvl < 256) ? 'fire' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 128 && flore < 144 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 112 && flore < 128 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 64 && flore < 112 && lvl >= 0 && lvl < 256) ? 'water' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 16 && flore < 64 && lvl >= 0 && lvl < 256) ? 'earth' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 0 && flore < 16 && lvl >= 0 && lvl < 256) ? 'star' ",
            "null"
        ]
    },
    "10": {
        "name": "10",
        "tire": "8",
        "floreCondition": [
            "((flore * 1000 | 0) % 1 == 0 && flore >= 240 && flore < 256 && lvl >= 0 && lvl < 256) ? 'star' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 192 && flore < 240 && lvl >= 0 && lvl < 256) ? 'wind' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 144 && flore < 192 && lvl >= 0 && lvl < 256) ? 'fire' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 128 && flore < 144 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 112 && flore < 128 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 64 && flore < 112 && lvl >= 0 && lvl < 256) ? 'water' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 16 && flore < 64 && lvl >= 0 && lvl < 256) ? 'earth' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 0 && flore < 16 && lvl >= 0 && lvl < 256) ? 'star' ",
            "null"
        ]
    },
    "-1": {
        "name": "-1",
        "tire": "2",
        "floreCondition": [
            "((flore * 1000 | 0) % 1 == 0 && flore >= 240 && flore < 256 && lvl >= 0 && lvl < 256) ? 'star' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 192 && flore < 240 && lvl >= 0 && lvl < 256) ? 'wind' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 144 && flore < 192 && lvl >= 0 && lvl < 256) ? 'fire' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 128 && flore < 144 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 112 && flore < 128 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 64 && flore < 112 && lvl >= 0 && lvl < 256) ? 'water' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 16 && flore < 64 && lvl >= 0 && lvl < 256) ? 'earth' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 0 && flore < 16 && lvl >= 0 && lvl < 256) ? 'star' ",
            "null"
        ]
    },
    "-2": {
        "name": "-2",
        "tire": "1",
        "floreCondition": [
            "((flore * 1000 | 0) % 1 == 0 && flore >= 240 && flore < 256 && lvl >= 0 && lvl < 256) ? 'star' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 192 && flore < 240 && lvl >= 0 && lvl < 256) ? 'wind' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 144 && flore < 192 && lvl >= 0 && lvl < 256) ? 'fire' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 128 && flore < 144 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 112 && flore < 128 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 64 && flore < 112 && lvl >= 0 && lvl < 256) ? 'water' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 16 && flore < 64 && lvl >= 0 && lvl < 256) ? 'earth' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 0 && flore < 16 && lvl >= 0 && lvl < 256) ? 'star' ",
            "null"
        ]
    },
    "-3": {
        "name": "-3",
        "tire": "1",
        "floreCondition": [
            "((flore * 1000 | 0) % 1 == 0 && flore >= 240 && flore < 256 && lvl >= 0 && lvl < 256) ? 'star' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 192 && flore < 240 && lvl >= 0 && lvl < 256) ? 'wind' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 144 && flore < 192 && lvl >= 0 && lvl < 256) ? 'fire' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 128 && flore < 144 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 112 && flore < 128 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 64 && flore < 112 && lvl >= 0 && lvl < 256) ? 'water' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 16 && flore < 64 && lvl >= 0 && lvl < 256) ? 'earth' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 0 && flore < 16 && lvl >= 0 && lvl < 256) ? 'star' ",
            "null"
        ]
    },
    "-4": {
        "name": "-4",
        "tire": "3",
        "floreCondition": [
            "((flore * 1000 | 0) % 1 == 0 && flore >= 240 && flore < 256 && lvl >= 0 && lvl < 256) ? 'star' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 192 && flore < 240 && lvl >= 0 && lvl < 256) ? 'wind' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 144 && flore < 192 && lvl >= 0 && lvl < 256) ? 'fire' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 128 && flore < 144 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 112 && flore < 128 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 64 && flore < 112 && lvl >= 0 && lvl < 256) ? 'water' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 16 && flore < 64 && lvl >= 0 && lvl < 256) ? 'earth' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 0 && flore < 16 && lvl >= 0 && lvl < 256) ? 'star' ",
            "null"
        ]
    },
    "-5": {
        "name": "-5",
        "tire": "6",
        "floreCondition": [
            "((flore * 1000 | 0) % 1 == 0 && flore >= 240 && flore < 256 && lvl >= 0 && lvl < 256) ? 'star' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 192 && flore < 240 && lvl >= 0 && lvl < 256) ? 'wind' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 144 && flore < 192 && lvl >= 0 && lvl < 256) ? 'fire' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 128 && flore < 144 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 112 && flore < 128 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 64 && flore < 112 && lvl >= 0 && lvl < 256) ? 'water' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 16 && flore < 64 && lvl >= 0 && lvl < 256) ? 'earth' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 0 && flore < 16 && lvl >= 0 && lvl < 256) ? 'star' ",
            "null"
        ]
    },
    "-6": {
        "name": "-6",
        "tire": "5",
        "floreCondition": [
            "((flore * 1000 | 0) % 1 == 0 && flore >= 240 && flore < 256 && lvl >= 0 && lvl < 256) ? 'star' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 192 && flore < 240 && lvl >= 0 && lvl < 256) ? 'wind' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 144 && flore < 192 && lvl >= 0 && lvl < 256) ? 'fire' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 128 && flore < 144 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 112 && flore < 128 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 64 && flore < 112 && lvl >= 0 && lvl < 256) ? 'water' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 16 && flore < 64 && lvl >= 0 && lvl < 256) ? 'earth' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 0 && flore < 16 && lvl >= 0 && lvl < 256) ? 'star' ",
            "null"
        ]
    },
    "-7": {
        "name": "-7",
        "tire": "6",
        "floreCondition": [
            "((flore * 1000 | 0) % 1 == 0 && flore >= 240 && flore < 256 && lvl >= 0 && lvl < 256) ? 'star' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 192 && flore < 240 && lvl >= 0 && lvl < 256) ? 'wind' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 144 && flore < 192 && lvl >= 0 && lvl < 256) ? 'fire' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 128 && flore < 144 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 112 && flore < 128 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 64 && flore < 112 && lvl >= 0 && lvl < 256) ? 'water' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 16 && flore < 64 && lvl >= 0 && lvl < 256) ? 'earth' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 0 && flore < 16 && lvl >= 0 && lvl < 256) ? 'star' ",
            "null"
        ]
    },
    "-8": {
        "name": "-8",
        "tire": "8",
        "floreCondition": [
            "((flore * 1000 | 0) % 1 == 0 && flore >= 240 && flore < 256 && lvl >= 0 && lvl < 256) ? 'star' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 192 && flore < 240 && lvl >= 0 && lvl < 256) ? 'wind' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 144 && flore < 192 && lvl >= 0 && lvl < 256) ? 'fire' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 128 && flore < 144 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 112 && flore < 128 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 64 && flore < 112 && lvl >= 0 && lvl < 256) ? 'water' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 16 && flore < 64 && lvl >= 0 && lvl < 256) ? 'earth' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 0 && flore < 16 && lvl >= 0 && lvl < 256) ? 'star' ",
            "null"
        ]
    },
    "-9": {
        "name": "-9",
        "tire": "5",
        "floreCondition": [
            "((flore * 1000 | 0) % 1 == 0 && flore >= 240 && flore < 256 && lvl >= 0 && lvl < 256) ? 'star' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 192 && flore < 240 && lvl >= 0 && lvl < 256) ? 'wind' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 144 && flore < 192 && lvl >= 0 && lvl < 256) ? 'fire' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 128 && flore < 144 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 112 && flore < 128 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 64 && flore < 112 && lvl >= 0 && lvl < 256) ? 'water' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 16 && flore < 64 && lvl >= 0 && lvl < 256) ? 'earth' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 0 && flore < 16 && lvl >= 0 && lvl < 256) ? 'star' ",
            "null"
        ]
    },
    "-10": {
        "name": "-10",
        "tire": "8",
        "floreCondition": [
            "((flore * 1000 | 0) % 1 == 0 && flore >= 240 && flore < 256 && lvl >= 0 && lvl < 256) ? 'star' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 192 && flore < 240 && lvl >= 0 && lvl < 256) ? 'wind' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 144 && flore < 192 && lvl >= 0 && lvl < 256) ? 'fire' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 128 && flore < 144 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 112 && flore < 128 && lvl >= 0 && lvl < 256) ? 'chaos' ",
            "((flore * 1000 | 0) % 64 == 0 && flore >= 64 && flore < 112 && lvl >= 0 && lvl < 256) ? 'water' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 16 && flore < 64 && lvl >= 0 && lvl < 256) ? 'earth' ",
            "((flore * 1000 | 0) % 1 == 0 && flore >= 0 && flore < 16 && lvl >= 0 && lvl < 256) ? 'star' ",
            "null"
        ]
    },
    "mont1": {
        "name": "mont1",
        "tire": "0",
        "floreCondition": [
            "null"
        ]
    },
    "ocean": {
        "name": "ocean",
        "tire": "0",
        "floreCondition": [
            "null"
        ]
    }
}