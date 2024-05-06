

const DEFAULT_CITY_PARAM =  {
    mainRoad : {
        count : 30,
        color : "#000000",
        length: 14,
        size : 5,

        alphaStep : 16,
        powerIter : 20,
        powerCost : 1,

        lvlDeviationCount: 4,
        lvlDefviationAlpha: 2,        
    },
    crossingRoad : {
        color : "#000000",
        length: 14,
        size : 6,

        alphaStep : 4,
        powerCondition :10,
        powerIter : 10,
        powerCost : -6,

        lvlDeviationCount: 2,
        lvlDefviationAlpha: 2,        
    },
    subRoad : {
        count : 0,
        color : "#000000",
        length: 14,
        size : 2,
        alphaStep : 4,
        powerCondition : 5,
        powerCost : 1,
        powerIter : 1,
        lvlDeviationCount: 2,
        lvlDefviationAlpha: 2,        
    },
    connectRoad : {
        count : 0,
        color : "#000000",
        length: 16,
        size : 1,

        alphaStep : 4,
        // betaSetp : [...Array(16).keys()].map(x => 360 / 16 * x),
        // powerCondition : 5,
        powerCost : 1,
        powerIter : 1,
        lvlDeviationCount: 0,
        lvlDefviationAlpha: 0,        
    },
}
