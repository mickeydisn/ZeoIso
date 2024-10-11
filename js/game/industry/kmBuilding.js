

export const META_BuildingList = [
    // rbHydro
    {
        bId: "rbHydro",
        name: "Hydro analyser",
        icone: "💧",
        cityNodeType : "LabNode",
        cost: { rsMemoryNote: 10 },
        inputs: {},
        outputs: { rsHydro: 1 },
        energyInput: 1,
        rate: 1,
        minable: true,
        productionRateModifier: 0,
        consumptionRateModifier: 0,
        description: "",
        unlockConditions: () => true,
    },
    // rbWind
    {
        bId: "rbWind",
        name: "Wind analyser",
        icone: "💨",
        cityNodeType : "LabNode",
        cost: { rsMemoryNote: 10 },
        inputs: {},
        outputs: { rsWind: 1 },
        energyInput: 1,
        rate: 1,
        minable: true,
        productionRateModifier: 0,
        consumptionRateModifier: 0,
        description: "",
        unlockConditions: () => true,
    },    
    // rbTemp
    {
        bId: "rbTemp",
        name: "Temperature analyser",
        icone: "🌡",
        cityNodeType : "LabNode",
        cost: { rsMemoryNote: 10 },
        inputs: {},
        outputs: { rsTemp: 1 },
        energyInput: 1,
        rate: 1,
        minable: true,
        productionRateModifier: 0,
        consumptionRateModifier: 0,
        description: "",
        unlockConditions: () => true,
    }, 
    // rbBiome
    {
        bId: "rbBiome",
        name: "Biome analyser",
        icone: "🌈",
        cityNodeType : "LabNode",
        cost: { rsMemoryNote: 10 },
        inputs: {rsTemp: 1 , rsHydro: 1 },
        outputs: { rsBiome: 1 },
        energyInput: 1,
        rate: 1,
        minable: true,
        productionRateModifier: 0,
        consumptionRateModifier: 0,
        description: "",
        unlockConditions: () => true,
    },
    // rbTime
    {
        bId: "rbTime",
        name: "Time analyser",
        icone: "⌛️",
        cityNodeType : "LabNode",
        cost: { rsMemoryNote: 10 },
        inputs: { rsWind: 5 },
        outputs: { rsTime: 1 },
        energyInput: 1,
        rate: 1,
        minable: true,
        productionRateModifier: 0,
        consumptionRateModifier: 0,
        description: "",
        unlockConditions: () => true,
    },
    // rbTime
    {
        bId: "rbMemoryNote",
        name: "Memory Note",
        icone: "📜",
        cityNodeType : "HouseNode",
        cost: { rsMemoryNote: 10 },
        inputs: {  rsTime: 1, rsBiome: 2 },
        outputs: { rsMemoryNote: 1 },
        energyInput: 1,
        rate: 1,
        minable: true,
        productionRateModifier: 0,
        consumptionRateModifier: 0,
        description: "",
        unlockConditions: () => true,
    },

].map((x, idx) => {return {
    ...x,
    order:idx,
    cost: Object.entries(x.cost).map(([k, v]) => {return {itemId:k, count:v}}),
    inputs: Object.entries(x.inputs).map(([k, v]) => {return {itemId:k, count:v}}),
    outputs: Object.entries(x.outputs).map(([k, v]) => {return {itemId:k, count:v}}),
}})

export const META_Building = Object.fromEntries(
    META_BuildingList.map(x => {
        return [x.bId, x]
    })
)

/*
    ⛺️🔬🪦  📦

    🌈⌛️🌡💧💨

    📜🔖📃📄📈📂📕📗📘📙📚🗃
    🧷📏📐🖌✏️🔍🖍

    ⚒🛠⛏⚙️⛓🔩🧲🔌
    💡💾💿🔭📡
    📞📷🎥📺💻⌨️🖲🕹🗜

    🚰🪣🪥🧽🧼🩸💉🦠🧬🧪

    ===
    🏠⛪️🏢🛖
    🔧🔨🪓
    ⭐️💎🪙
    🧨💣⚰️
    🔑🗝🛎🚪🪑🛌🧸🎁🎈

    🎨🧩🎯🥇🥈🥉🎖🔮🏮
*/