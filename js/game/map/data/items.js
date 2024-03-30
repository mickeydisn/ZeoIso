

const B_ALL = [
     "-6", "-7", "-8", "-9", "-10",
     "-1", "-2", "-3", "-4", "-5", 
      "1",  "2",  "3",  "4",  "5", 
      "6",  "7",  "8",  "9",  "10"
]

export const GAME_FLORE_ITEMS_OLD = [
    {b: B_ALL, l:{min:0, max:255}, flore:{mod:32, eq:0, min:0, max:255}, cFilter:'H75',  key: 'tree_detailed_dark'},
    {b: B_ALL, l:{min:0, max:255}, flore:{mod:32, eq:1, min:0, max:255}, cFilter:'H90',  key: 'tree_blocks'},
    {b: B_ALL, l:{min:0, max:255}, flore:{mod:32, eq:2, min:0, max:255}, cFilter:'H115',  key: 'tree_detailed_dark'},
    {b: B_ALL, l:{min:0, max:255}, flore:{mod:32, eq:3, min:0, max:255}, cFilter:'H120',  key: 'tree_blocks'},
    {b: B_ALL, l:{min:0, max:255}, flore:{mod:32, eq:4, min:0, max:255}, cFilter:'H45',  key: 'tree_oak_dark'},
    {b: B_ALL, l:{min:0, max:255}, flore:{mod:32, eq:5, min:0, max:255}, cFilter:'H30',  key: 'tree_oak_dark'},
    {b: B_ALL, l:{min:0, max:255}, flore:{mod:32, eq:6, min:0, max:255}, cFilter:'H75',  key: 'tree_blocks'},
].map(x => {
    return ['_NE', '_SE', '_SW', '_NW'].map((d, idx) => {
        const f = x.flore
        const key = x.cFilter ? x.key + d + '#' + x.cFilter : x.key + d 
        return {
            b:x.b, 
            l:x.l, 
            flore:{mod:f.mod*4, eq:f.eq*4 + idx, min:f.min, max:f.max},
            key: key,
        }
    })
}).flat()



/*

    |  -9 Désert de cendres |    -7 Désert gelé |            -8 Taïga |  -10 Désert de glace|
    |          -3 Toundra |   -5 Toundra alpine |   -6 Forêt tempérée | -4 Forêt de conifères  |
    |                     |          -1 Steppe  |          -2 Prairie |                     |    
    |                     |   1 Plaine herbeuse | 2 Forêt de feuillus |                     |    
    |           3 Savane  |           5 Plateau |  6 Forêt pluviale   |          4 Marécage |
    |   9 Désert de sable |    7 Steppe fertile |  8 Jungle tropicale |       10 Volcanique |



*/



export const GAME_FLORE_ITEMS = [

 // ---------------------------------------
// Ice Desert (-10)
// ---------------------------------------
...[
    
    // Stone
    {cFilter:'C110_B110',  key: 'rockLarge'},
    {cFilter:'C110_B110',  key: 'rocks'},
    {cFilter:'C110_B110',  key: 'rockSmall'},


    {cFilter:'H15_C120_S120',  key: 'stone_tallA'},
    {cFilter:'H15_C120_S120',  key: 'stone_tallB'},
    {cFilter:'H15_C120_S120',  key: 'stone_tallE'},
    {cFilter:'H15_C120_S120',  key: 'stone_tallF'},
    {cFilter:'H15_C120_S120',  key: 'stone_tallH'},
    {cFilter:'H15_C120_S120',  key: 'stone_tallJ'},

].map((x, idx) => {return {
    b: [-10],  l:{min:0, max:255}, flore:{mod:32, eq:idx, min:0, max:255}, ...x, 
}}),

// ---------------------------------------
// Ashen Desert (-9)
// ---------------------------------------
...[

    // Plante
    {cFilter:'H225_C90_S110_B110_I1',  key: 'plant_bushDetailed'},
    {cFilter:'H225_C90_S110_B110_I1',  key: 'plant_flatShort'},

    {cFilter:'H270_C90_S110_B110_I1',  key: 'plant_bushDetailed'},
    {cFilter:'H270_C90_S110_B110_I1',  key: 'plant_flatShort'},

    {cFilter:'H255_C90_S110_B110_I1',  key: 'plant_bushDetailed'},
    {cFilter:'H255_C90_S110_B110_I1',  key: 'plant_flatShort'},

    // Stone
    {cFilter:'H90_C90_S10_B80_I1',  key: 'stone_smallI'},
    {cFilter:'H90_C90_S10_B80_I1',  key: 'stone_smallH'},
    {cFilter:'H90_C90_S10_B80_I1',  key: 'stone_smallTopB'},
    {cFilter:'H90_C90_S10_B80_I1',  key: 'stone_smallTopA'},


].map((x, idx) => {return {
    b: [-9],  l:{min:0, max:255}, flore:{mod:32, eq:idx, min:0, max:255}, ...x, 
}}),



// ---------------------------------------
// Taiga (-8)
// ---------------------------------------
...[

    // Tree
    {cFilter:'H30_S40_B140',  key: 'tree_pineRoundA'},
    {cFilter:'H30_S40_B140',  key: 'tree_pineRoundB'},
    {cFilter:'H30_S40_B140',  key: 'tree_pineRoundC'},

    {cFilter:'H20_S40_B140',  key: 'tree_pineRoundA'},
    {cFilter:'H20_S40_B140',  key: 'tree_pineRoundB'},
    {cFilter:'H20_S40_B140',  key: 'tree_pineRoundC'},

    {cFilter:'H40_S40_B140',  key: 'tree_pineRoundA'},
    {cFilter:'H40_S40_B140',  key: 'tree_pineRoundB'},
    {cFilter:'H40_S40_B140',  key: 'tree_pineRoundC'},


    // Stone 
    {cFilter:'H0',  key: 'rocks'},
    {cFilter:'H0',  key: 'rocksTall'},

].map((x, idx) => {return {
    b: [-8],  l:{min:0, max:255}, flore:{mod:32, eq:idx, min:0, max:255}, ...x, 
}}),



// ---------------------------------------
// Frozen Desert (-7)
// ---------------------------------------
...[

    // Tree
    {cFilter:'H10_S10_C140_B160',  key: 'tree_pineSmallB'},
    {cFilter:'H10_S30_C140_B160',  key: 'tree_pineSmallB'},
    {cFilter:'H10_S50_C140_B160',  key: 'tree_pineSmallB'},
    {cFilter:'H10_S60_C140_B160',  key: 'tree_pineSmallB'},

    {cFilter:'H0_S10_C140_B160',  key: 'tree_pineSmallB'},
    {cFilter:'H0_S30_C140_B160',  key: 'tree_pineSmallB'},
    {cFilter:'H0_S50_C140_B160',  key: 'tree_pineSmallB'},
    {cFilter:'H0_S60_C140_B160',  key: 'tree_pineSmallB'},

    {cFilter:'H20_S10_C140_B160',  key: 'tree_pineSmallB'},
    {cFilter:'H20_S30_C140_B160',  key: 'tree_pineSmallB'},
    {cFilter:'H20_S50_C140_B160',  key: 'tree_pineSmallB'},
    {cFilter:'H20_S60_C140_B160',  key: 'tree_pineSmallB'},

    // STONE
    { cFilter:'H15_S110',  key: 'stone_largeC'},
    { cFilter:'H15_S110',  key: 'stone_smallI'},
    { cFilter:'H15_S110',  key: 'stone_smallG'},
    { cFilter:'H15_S110',  key: 'stone_smallC'},

].map((x, idx) => {return {
    b: [-7],  l:{min:0, max:255}, flore:{mod:32, eq:idx, min:0, max:255}, ...x, 
}}),



// ---------------------------------------
// Temperate Forest (-6)
// ---------------------------------------
...[

    // Tree
    {cFilter:'H315_S50_C160_B70',  key: 'tree_detailed'},
    {cFilter:'H315_S50_C160_B70',  key: 'tree_default'},
    {cFilter:'H315_S50_C160_B70',  key: 'tree_fat'},
    {cFilter:'H315_S50_C160_B70',  key: 'tree_small'},

    {cFilter:'H325_S50_C160_B70',  key: 'tree_detailed'},
    {cFilter:'H325_S50_C160_B70',  key: 'tree_default'},
    {cFilter:'H325_S50_C160_B70',  key: 'tree_fat'},
    {cFilter:'H325_S50_C160_B70',  key: 'tree_small'},

    {cFilter:'H305_S50_C160_B70',  key: 'tree_detailed'},
    {cFilter:'H305_S50_C160_B70',  key: 'tree_default'},
    {cFilter:'H305_S50_C160_B70',  key: 'tree_fat'},
    {cFilter:'H305_S50_C160_B70',  key: 'tree_small'},

].map((x, idx) => {return {
    b: [-6],  l:{min:0, max:255}, flore:{mod:32, eq:idx, min:0, max:255}, ...x, 
}}),


// ---------------------------------------
// Alpine Tundra (-5)
// ---------------------------------------
...[

    // Tree
    {cFilter:'H315_S20_C130_B160',  key: 'tree_pineRoundA'},
    {cFilter:'H315_S20_C130_B160',  key: 'tree_pineRoundB'},
    {cFilter:'H315_S20_C130_B160',  key: 'tree_pineRoundC'},

    {cFilter:'H305_S20_C130_B160',  key: 'tree_pineRoundA'},
    {cFilter:'H305_S20_C130_B160',  key: 'tree_pineRoundB'},
    {cFilter:'H305_S20_C130_B160',  key: 'tree_pineRoundC'},

    {cFilter:'H325_S20_C130_B160',  key: 'tree_pineRoundA'},
    {cFilter:'H325_S20_C130_B160',  key: 'tree_pineRoundB'},
    {cFilter:'H325_S20_C130_B160',  key: 'tree_pineRoundC'},

    // Plante
    {cFilter:'H15_C120_S10_B130',  key: 'grass'},
    {cFilter:'H15_C120_S10_B130',  key: 'plant_flatTall'},

].map((x, idx) => {return {
    b: [-5],  l:{min:0, max:255}, flore:{mod:32, eq:idx, min:0, max:255}, ...x, 
}}),


// ---------------------------------------
// Coniferous Forest (-4)
// ---------------------------------------
...[

    // Tree
    {cFilter:'H285_C190_B50',  key: 'tree_pineGroundA'},
    {cFilter:'H285_C190_B50',  key: 'tree_pineRoundC'},
    {cFilter:'H285_C190_B50',  key: 'tree_pineRoundD'},
    {cFilter:'H285_C190_B50',  key: 'tree_pineRoundE'},

    {cFilter:'H295_C190_B50',  key: 'tree_pineGroundA'},
    {cFilter:'H295_C190_B50',  key: 'tree_pineRoundC'},
    {cFilter:'H295_C190_B50',  key: 'tree_pineRoundD'},
    {cFilter:'H295_C190_B50',  key: 'tree_pineRoundE'},

    {cFilter:'H275_C190_B50',  key: 'tree_pineGroundA'},
    {cFilter:'H275_C190_B50',  key: 'tree_pineRoundC'},
    {cFilter:'H275_C190_B50',  key: 'tree_pineRoundD'},
    {cFilter:'H275_C190_B50',  key: 'tree_pineRoundE'},

].map((x, idx) => {return {
    b: [-4],  l:{min:0, max:255}, flore:{mod:32, eq:idx, min:0, max:255}, ...x, 
}}),


// ---------------------------------------
// Tundra (-3)
// ---------------------------------------
...[

    // Tree
    {cFilter:'H300_S80_B80',  key: 'tree_pineSmallB'},
    {cFilter:'H300_S80_B80',  key: 'tree_pineSmallA'},
    {cFilter:'H300_S80_B80',  key: 'tree_pineGroundA'},

    {cFilter:'H310_S80_B80',  key: 'tree_pineSmallB'},
    {cFilter:'H310_S80_B80',  key: 'tree_pineSmallA'},
    {cFilter:'H310_S80_B80',  key: 'tree_pineGroundA'},

    {cFilter:'H290_S80_B80',  key: 'tree_pineSmallB'},
    {cFilter:'H290_S80_B80',  key: 'tree_pineSmallA'},
    {cFilter:'H290_S80_B80',  key: 'tree_pineGroundA'},

    // plante
    {cFilter:'H255_S110_B90',  key: 'grass'},
    {cFilter:'H255_S110_B90',  key: 'plant_flatTall'},

].map((x, idx) => {return {
    b: [-3],  l:{min:0, max:255}, flore:{mod:32, eq:idx, min:0, max:255}, ...x, 
}}),


// ---------------------------------------
// Prairie (-2)
// ---------------------------------------
...[

    // Tree
    {cFilter:'H0_B100',  key: 'tree_oak'},
    {cFilter:'H5_B100',  key: 'tree_oak'},
    {cFilter:'H355_B100',  key: 'tree_oak'},


    // Plante
    {cFilter:'H345_C120_S120',  key: 'plant_bush'},
    {cFilter:'H345_C120_S120',  key: 'plant_bushLargeTriangle'},
    {cFilter:'H345_C120_S120',  key: 'plant_bushSmall'},

    {cFilter:'H345_C180_S150_B90',  key: 'flower_purpleA'},
    {cFilter:'H345_C180_S150_B90',  key: 'flower_purpleB'},
    {cFilter:'H345_C180_S150_B90',  key: 'flower_purpleC'},

    {cFilter:'H0_C180_S150_B90',  key: 'flower_purpleA'},
    {cFilter:'H0_C180_S150_B90',  key: 'flower_purpleB'},
    {cFilter:'H0_C180_S150_B90',  key: 'flower_purpleC'},

    {cFilter:'H30_C180_S150_B90',  key: 'flower_purpleA'},
    {cFilter:'H30_C180_S150_B90',  key: 'flower_purpleB'},
    {cFilter:'H30_C180_S150_B90',  key: 'flower_purpleC'},

].map((x, idx) => {return {
    b: [-2],  l:{min:0, max:255}, flore:{mod:32, eq:idx, min:0, max:255}, ...x, 
}}),


// ---------------------------------------
// Steppe (-1)
// ---------------------------------------
...[

    // Tree
    {cFilter:'H0_B100',  key: 'tree_simple_dark'},
    {cFilter:'H0_B100',  key: 'tree_tall_dark'},
    {cFilter:'H0_B100',  key: 'tree_pineTallB'},
    {cFilter:'H0_B100',  key: 'tree_pineTallD'},

    {cFilter:'H10_B100',  key: 'tree_simple_dark'},
    {cFilter:'H10_B100',  key: 'tree_tall_dark'},
    {cFilter:'H10_B100',  key: 'tree_pineTallB'},
    {cFilter:'H10_B100',  key: 'tree_pineTallD'},

    {cFilter:'H350_B100',  key: 'tree_simple_dark'},
    {cFilter:'H350_B100',  key: 'tree_tall_dark'},
    {cFilter:'H350_B100',  key: 'tree_pineTallB'},
    {cFilter:'H350_B100',  key: 'tree_pineTallD'},

].map((x, idx) => {return {
    b: [-1],  l:{min:0, max:255}, flore:{mod:32, eq:idx, min:0, max:255}, ...x, 
}}),


// ---------------------------------------
// Grassland (1)
// ---------------------------------------
...[

    // Tree
    {cFilter:'H0_B100',  key: 'tree_oak'},
    {cFilter:'H0_B100',  key: 'tree_fat'},

    {cFilter:'H10_B100',  key: 'tree_oak'},
    {cFilter:'H10_B100',  key: 'tree_fat'},


    // Plante
    {cFilter:'H285',  key: 'grass_large'},
    {cFilter:'H285',  key: 'grass_leafs'},
    {cFilter:'H285',  key: 'grass_leafsLarge'},
    {cFilter:'H285',  key: 'grass'},
    {cFilter:'H285',  key: 'crops_wheatStageA_NE'},

    {cFilter:'H295',  key: 'grass_large'},
    {cFilter:'H295',  key: 'grass_leafs'},
    {cFilter:'H295',  key: 'grass_leafsLarge'},
    {cFilter:'H295',  key: 'grass'},
    {cFilter:'H295',  key: 'crops_wheatStageA_NE'},

].map((x, idx) => {return {
    b: [1],  l:{min:0, max:255}, flore:{mod:32, eq:idx, min:0, max:255}, ...x, 
}}),


// ---------------------------------------
// Deciduous Forest (2)
// ---------------------------------------
...[

    // Tree
    {cFilter:'H0_B100',  key: 'tree_cone'},
    {cFilter:'H0_B100',  key: 'tree_detailed'},
    {cFilter:'H0_B100',  key: 'tree_blocks'},
    {cFilter:'H0_B100',  key: 'tree_thin'},

    {cFilter:'H10_B100',  key: 'tree_cone'},
    {cFilter:'H10_B100',  key: 'tree_detailed'},
    {cFilter:'H10_B100',  key: 'tree_blocks'},
    {cFilter:'H10_B100',  key: 'tree_thin'},

    {cFilter:'H350_B100',  key: 'tree_cone'},
    {cFilter:'H350_B100',  key: 'tree_detailed'},
    {cFilter:'H350_B100',  key: 'tree_blocks'},
    {cFilter:'H350_B100',  key: 'tree_thin'},

].map((x, idx) => {return {
    b: [2],  l:{min:0, max:255}, flore:{mod:32, eq:idx, min:0, max:255}, ...x, 
}}),

// ---------------------------------------
// Savannah (3)
// ---------------------------------------
...[

// Tree
{cFilter:'H240_S70_C140_B90',  key: 'tree_plateau'},
{cFilter:'H240_S70_C140_B90',  key: 'tree_small'},

{cFilter:'H250_S70_C140_B90',  key: 'tree_plateau'},
{cFilter:'H250_S70_C140_B90',  key: 'tree_small'},

// Plante

{cFilter:'H240_C90_S70_B110',  key: 'crops_bambooStageA_NE'},
{cFilter:'H240_C90_S70_B110',  key: 'crops_bambooStageB_NE'},
{cFilter:'H240_C90_S70_B110',  key: 'crops_wheatStageA_NE'},

].map((x, idx) => {return {
    b: [3],  l:{min:0, max:255}, flore:{mod:32, eq:idx, min:0, max:255}, ...x, 
}}),



// ---------------------------------------
// Swamp (4)
// ---------------------------------------
...[
    // Tree
    {cFilter:'H270_S70_C140_B90',  key: 'tree_fat'},
    {cFilter:'H260_S70_C140_B90',  key: 'tree_fat'},
    {cFilter:'H280_S70_C140_B90',  key: 'tree_fat'},


    // Plante
    {cFilter:'H0',  key: 'mushroom_red'},
    {cFilter:'H0',  key: 'mushroom_redGroup'},
    {cFilter:'H0',  key: 'mushroom_redTall'},

    {cFilter:'H30',  key: 'mushroom_red'},
    {cFilter:'H30',  key: 'mushroom_redGroup'},
    {cFilter:'H30',  key: 'mushroom_redTall'},

    {cFilter:'H60',  key: 'mushroom_red'},
    {cFilter:'H60',  key: 'mushroom_redGroup'},
    {cFilter:'H60',  key: 'mushroom_redTall'},

    {cFilter:'H0',  key: 'crops_wheatStageB'},
    {cFilter:'H30',  key: 'crops_wheatStageB'},
    {cFilter:'H60',  key: 'crops_wheatStageB'},

].map((x, idx) => {return {
    b: [4],  l:{min:0, max:255}, flore:{mod:32, eq:idx, min:0, max:255}, ...x, 
}}),



// ---------------------------------------
// Plateau (5)
// ---------------------------------------
...[

    // Tree
    {cFilter:'H315_C160_S60_B60',  key: 'tree_detailed'},
    {cFilter:'H315_C160_S60_B60',  key: 'tree_oak'},
    {cFilter:'H315_C160_S60_B60',  key: 'tree_small_NE'},

    {cFilter:'H325_C160_S60_B60',  key: 'tree_detailed'},
    {cFilter:'H325_C160_S60_B60',  key: 'tree_oak'},
    {cFilter:'H325_C160_S60_B60',  key: 'tree_small_NE'},

    {cFilter:'H305_C160_S60_B60',  key: 'tree_detailed'},
    {cFilter:'H305_C160_S60_B60',  key: 'tree_oak'},
    {cFilter:'H305_C160_S60_B60',  key: 'tree_small_NE'},

    // Plante
    {cFilter:'H0',  key: 'flower_redA'},
    {cFilter:'H0',  key: 'flower_redB'},
    {cFilter:'H0',  key: 'flower_redC'},

].map((x, idx) => {return {
    b: [5],  l:{min:0, max:255}, flore:{mod:32, eq:idx, min:0, max:255}, ...x, 
}}),


// ---------------------------------------
// Rainforest (6)
// ---------------------------------------
...[
    // Tree
    {cFilter:'C120_B90',  key: 'tree_detailed_dark'},
    {cFilter:'C120_B90',  key: 'tree_default_dark'},
    {cFilter:'C120_B90',  key: 'tree_fat_dark'},
    {cFilter:'C120_B90',  key: 'tree_small_dark'},

    {cFilter:'H5_C120_B90',  key: 'tree_detailed_dark'},
    {cFilter:'H5_C120_B90',  key: 'tree_default_dark'},
    {cFilter:'H5_C120_B90',  key: 'tree_fat_dark'},
    {cFilter:'H5_C120_B90',  key: 'tree_small_dark'},

    {cFilter:'H355_C120_B90',  key: 'tree_detailed_dark'},
    {cFilter:'H355_C120_B90',  key: 'tree_default_dark'},
    {cFilter:'H355_C120_B90',  key: 'tree_fat_dark'},
    {cFilter:'H355_C120_B90',  key: 'tree_small_dark'},

    // Plante
    {cFilter:'H30_C120_B90',  key: 'mushroom_red'},
    {cFilter:'H30_C120_B90',  key: 'mushroom_redGroup'},

].map((x, idx) => {return {
    b: [6],  l:{min:0, max:255}, flore:{mod:32, eq:idx, min:0, max:255}, ...x, 
}}),



// ---------------------------------------
// Fertile Steppe (7)
// ---------------------------------------
...[
    // Tree
    {cFilter:'H15_C120_B90',  key: 'tree_simple_dark'},
    {cFilter:'H15_C120_B90',  key: 'tree_tall_dark'},
    {cFilter:'H15_C120_B90',  key: 'tree_pineTallB'},
    {cFilter:'H15_C120_B90',  key: 'tree_pineTallD'},

    {cFilter:'H10_C120_B90',  key: 'tree_simple_dark'},
    {cFilter:'H10_C120_B90',  key: 'tree_tall_dark'},
    {cFilter:'H10_C120_B90',  key: 'tree_pineTallB'},
    {cFilter:'H10_C120_B90',  key: 'tree_pineTallD'},

    {cFilter:'H20_C120_B90',  key: 'tree_simple_dark'},
    {cFilter:'H20_C120_B90',  key: 'tree_tall_dark'},
    {cFilter:'H20_C120_B90',  key: 'tree_pineTallB'},
    {cFilter:'H20_C120_B90',  key: 'tree_pineTallD'},


    // Plante

    {cFilter:'H30_C120_B90',  key: 'plant_bushDetailed'},
    {cFilter:'H30_C120_B90',  key: 'plant_bushLarge'},

].map((x, idx) => {return {
    b: [7],  l:{min:0, max:255}, flore:{mod:32, eq:idx, min:0, max:255}, ...x, 
}}),


// ---------------------------------------
// Tropical Jungle (8)
// ---------------------------------------
...[
    // Tree
    {Filter:'H330_C110_S90_B90',  key: 'tree_default'},
    {Filter:'H330_C110_S90_B90',  key: 'tree_palmDetailedTall'},
    {Filter:'H330_C110_S90_B90',  key: 'tree_palmTall'},
    {Filter:'H330_C110_S90_B90',  key: 'tree_plateau'},
    {Filter:'H330_C110_S90_B90',  key: 'tree_simple'},

    {Filter:'H340_C110_S90_B90',  key: 'tree_default'},
    {Filter:'H340_C110_S90_B90',  key: 'tree_palmDetailedTall'},
    {Filter:'H340_C110_S90_B90',  key: 'tree_palmTall'},
    {Filter:'H340_C110_S90_B90',  key: 'tree_plateau'},
    {Filter:'H340_C110_S90_B90',  key: 'tree_simple'},

    {cFilter:'H320_C110_S90_B90',  key: 'tree_default'},
    {cFilter:'H320_C110_S90_B90',  key: 'tree_palmDetailedTall'},
    {cFilter:'H320_C110_S90_B90',  key: 'tree_palmTall'},
    {cFilter:'H320_C110_S90_B90',  key: 'tree_plateau'},
    {cFilter:'H320_C110_S90_B90',  key: 'tree_simple'},

    //Plante
    {cFilter:'H330_C130_B90',  key: 'crops_bambooStageA'},
    {cFilter:'H330_C130_B90',  key: 'crops_bambooStageB'},

].map((x, idx) => {return {
    b: [8],  l:{min:0, max:255}, flore:{mod:32, eq:idx, min:0, max:255}, ...x, 
}}),



// ---------------------------------------
// Sand Desert (9)
// ---------------------------------------
...[
    // Tree
    {cFilter:'H0_B100',  key: 'cactus_short'},
    {cFilter:'H0_B100',  key: 'cactus_tall'},

    {cFilter:'H15_B100',  key: 'cactus_short'},
    {cFilter:'H15_B100',  key: 'cactus_tall'},

    // Plante
    {cFilter:'H0_B100',  key: 'flower_yellowA'},
    {cFilter:'H0_B100',  key: 'crops_bambooStageA'},
    {cFilter:'H0_B100',  key: 'crops_bambooStageB'},

].map((x, idx) => {return {
    b: [9],  l:{min:0, max:255}, flore:{mod:32, eq:idx, min:0, max:255}, ...x, 
}}),


// ---------------------------------------
// Volcanic (10)
// ---------------------------------------
...[

    // Stone
    {cFilter:'H180_C110_S120_B80_I1',  key: 'stone_tallA'},
    {cFilter:'H180_C110_S120_B80_I1',  key: 'stone_tallB'},
    {cFilter:'H180_C110_S120_B80_I1',  key: 'stone_tallE'},
    {cFilter:'H180_C110_S120_B80_I1',  key: 'stone_tallF'},
    {cFilter:'H180_C110_S120_B80_I1',  key: 'stone_tallH'},
    {cFilter:'H180_C110_S120_B80_I1',  key: 'stone_tallJ'},
    {cFilter:'H180_C110_S120_B80_I1',  key: 'stone_largeD_NE'},
    {cFilter:'H180_C110_S120_B80_I1',  key: 'stone_largeF_NE'},
    

].map((x, idx) => {return {
    b: [10],  l:{min:0, max:255}, flore:{mod:32, eq:idx, min:0, max:255}, ...x, 
}}),

// ---------------------------------------
// ---------------------------------------


].map(x => {
    return ['_NE', '_SE', '_SW', '_NW'].map((d, idx) => {
        const f = x.flore
        const key = x.cFilter ? x.key + d + '#' + x.cFilter : x.key + d 
        return {
            b:x.b, 
            l:x.l, 
            flore:{mod:f.mod*4, eq:f.eq*4 + idx, min:f.min, max:f.max},
            key: key,
        }
    })
}).flat()


