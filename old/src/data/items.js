const GAME_ITEMS = {
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


const GAME_ITEMS_FLORE = {
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
