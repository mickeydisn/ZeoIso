
// --> Hydro + 8 * Temp

export const GAME_BIOMES_MATRIS = [

    "-9", "-9", "-9", "-7", "-8", "-10","-10", "-10", 
    "-9", "-9", "-7", "-7", "-8", "-8", "-10", "-10", 
    "-3", "-5", "-5", "-5", "-6", "-6",  "-6",  "-4",
    "-3", "-3", "-3", "-1", "-2", "-4",  "-4",  "-4", 
     "3",  "3",  "3",  "1",  "2",  "4",   "4",   "4", 
     "3",  "5",  "5",  "5",  "6",  "6",   "6",   "4", 
     "9",  "9",  "7",  "7",  "8",  "8",  "10",  "10",  
     "9",  "9",  "9",  "7",  "8", "10",  "10",  "10"

]


/* 

    |  -9 Désert de cendres |    -7 Désert gelé |            -8 Taïga |  -10 Désert de glace|
    |          -3 Toundra |   -5 Toundra alpine |   -6 Forêt tempérée | -4 Forêt de conifères  |
    |                     |          -1 Steppe  |          -2 Prairie |                     |    
    |                     |   1 Plaine herbeuse | 2 Forêt de feuillus |                     |    
    |           3 Savane  |           5 Plateau |  6 Forêt pluviale   |          4 Marécage |
    |   9 Désert de sable |    7 Steppe fertile |  8 Jungle tropicale |       10 Volcanique |



*/

/*
| Montagne             | -10°C - 15°C      | 10% - 50%    |
| Montagne enneigée    | -20°C - 5°C      | 20% - 60%    |
| Plage                | 15°C - 30°C       | 60% - 100%   |
| Plage paradisiaque   | 25°C - 35°C      | 50% - 100%   |



-10 | Désert de cendres    | 35°C - 50°C      | 0% - 10%     |
-9 | Désert de glace      | -40°C - -20°C     | 0% - 10%     |
| Toundra glaciaire    | -40°C - -20°C     | 10% - 30%    |
| Toundra perpétuelle  | -30°C - -10°C    | 30% - 50%    |
| Toundra désolée      | -30°C - -10°C    | 0% - 20%     |

| Toundra              | -30°C - 5°C       | 0% - 30%     |
| Désert froid         | -20°C - 5°C       | 0% - 20%     |
-7 | Désert gelé          | -20°C - -5°C     | 0% - 10%     |

-5 | Toundra alpine       | -20°C - 0°C       | 20% - 50%    |
-4 | Forêt de conifères   | -10°C - 20°C      | 40% - 80%    |
-8 | Taïga                | -10°C - 10°C      | 30% - 60%    |
| Marais               | 0°C - 25°C        | 70% - 100%   |
-6 | Forêt tempérée       | 5°C - 25°C        | 50% - 90%    |


-2 | Steppe               | 10°C - 30°C       | 10% - 30%    |
-1 | Prairie              | 10°C - 25°C       | 20% - 60%    |
1  | Plaine herbeuse      | 15°C - 30°C      | 20% - 60%    |
2  | Forêt de feuillus    | 10°C - 25°C      | 40% - 80%    |

4 | Marécage             | 10°C - 25°C      | 60% - 90%    |


| Jungle               | 20°C - 35°C       | 70% - 100%   |

| Oasis                | 20°C - 35°C       | 50% - 100%   |
3 | Savane               | 20°C - 35°C       | 10% - 40%    |
| Steppe aride         | 20°C - 40°C       | 0% - 10%     |
7 | Steppe fertile       | 20°C - 30°C      | 30% - 50%    |
8 | Jungle tropicale     | 20°C - 35°C      | 80% - 100%   |
5 | Plateau              | 20°C - 35°C      | 10% - 40%    |
| Oasis verdoyante     | 20°C - 30°C      | 70% - 100%   |

| Forêt tropicale      | 25°C - 35°C      | 70% - 100%   |
| Savane aride         | 25°C - 40°C      | 0% - 20%     |
| Canyon               | 25°C - 40°C      | 10% - 30%    |
| Désert               | 25°C - 40°C      | 0% - 20%     |
6 | Forêt pluviale       | 25°C - 35°C       | 80% - 100%   |
| Désert de sel        | 25°C - 50°C       | 0% - 5%      |


| Désert aride         | 30°C - 50°C       | 0% - 10%     |
| Volcan               | 30°C - 60°C       | 0% - 30%     |
| Désert chaud         | 30°C - 45°C      | 0% - 10%     |
10 | Volcanique           | 30°C - 60°C      | 0% - 20%     |
9 | Désert de sable      | 35°C - 50°C      | 0% - 5%      |


*/




export const GAME_BIOMES = [ 
    {id:"10",    name:"Volcanic",            rgb:[  "192 - lvl / 3",                 "0", "128 - lvl / 4"]},
    {id:"9",     name:"Sand Desert",         rgb:[  "192 - lvl / 3",   "64 - lvl * 0.65",             "0"]},
    {id:"8",     name:"Tropical Jungle",     rgb:[  "192 - lvl / 3",  "128 - lvl * 0.65",             "0"]},
    {id:"7",     name:"Fertile Steppe",      rgb:[  "192 - lvl / 3",  "176 - lvl * 0.65",             "0"]},
    {id:"6",     name:"Rainforest",          rgb:[  "255 - lvl / 2",  "192 - lvl * 0.70",             "0"]},
    {id:"5",     name:"Plateau",             rgb:[  "255 - lvl / 2",  "224 - lvl * 0.75",             "0"]},
    {id:"4",     name:"Swamp",               rgb:[  "255 - lvl / 2", " 256 - lvl * 0.75",             "0"]},
    {id:"3",     name:"Savannah",            rgb:[  "192 - lvl / 3", " 256 - lvl * 0.75",             "0"]},
    {id:"2",     name:"Deciduous Forest",    rgb:[  "128 - lvl / 4", " 256 - lvl * 0.75",             "0"]},
    {id:"1",     name:"Grassland",           rgb:[   "96 - lvl / 8", " 256 - lvl * 0.75",             "0"]},
    {id:"-1",    name:"Steppe",              rgb:[              "0", " 256 - lvl * 0.75",             "0"]},
    {id:"-2",    name:"Prairie",             rgb:[              "0", " 256 - lvl * 0.75", "32 - lvl / 10"]},
    {id:"-3",    name:"Tundra",              rgb:[              "0", " 256 - lvl * 0.75",  "64 - lvl / 8"]},
    {id:"-4",    name:"Coniferous Forest",   rgb:[              "0", " 256 - lvl * 0.75",  "96 - lvl / 6"]},
    {id:"-5",    name:"Alpine Tundra",       rgb:[              "0", " 256 - lvl * 0.75", "128 - lvl / 4"]},
    {id:"-6",    name:"Temperate Forest",    rgb:[              "0", " 256 - lvl * 0.75", "192 - lvl / 3"]},
    {id:"-7",    name:"Frozen Desert",       rgb:[              "0", " 256 - lvl * 0.75", "255 - lvl / 2"]},
    {id:"-8",    name:"Ice Taiga",           rgb:["128 - lvl * .65", " 256 - lvl * 0.75", "255 - lvl / 2"]},
    {id:"-9",    name:"Ashen Desert",        rgb:["176 - lvl * .65", " 256 - lvl * 0.75", "255 - lvl / 2"]},
    {id:"-10",   name:"Ice Desert",          rgb:["224 - lvl * .75", " 256 - lvl * 0.75", "255 - lvl / 2"]},
    
    // {id:"river", name:"River",    rgb:[             "32",          "64 + lvl", "64 + lvl * 3"]},



    {id:"ocean", name:"Ocean",    rgb:[             "32",          "64 + lvl", "64 + lvl * 3"]},
    {id:"mont1", name:"Montagne", rgb:["(lvl - 192) * 2 + 64", "(lvl - 192) * 2 + 64", "(lvl - 192) * 2 + 64"]},
    {id:"beach", name:"Beach",    rgb:[           "192",        "192", "32"]},
    {id:"mountL", name:"Mont",    rgb:[            "64",         "64", "64"]},
    {id:"river", name:"River",    rgb:[             "0",          "0", "0"]},
    
]

