export const META_BuildingList = [
    {
        bId: "rbBiome",
        name: "Biome analyser",
        category : "Basics",
        cost: { rsMemoryNote: 10 },
        inputs: {},
        outputs: { rsBiome: 1 },
        energyInput: 1,
        rate: 1,
        minable: true,
        productionRateModifier: 0,
        consumptionRateModifier: 0,
        description: "",
        unlockConditions: () => true,
    },
    {
        bId: "rbTime",
        name: "Time analyser",
        category : "Basics",
        cost: { rsMemoryNote: 10 },
        inputs: {},
        outputs: { rsTime: 1 },
        energyInput: 1,
        rate: 1,
        minable: true,
        productionRateModifier: 0,
        consumptionRateModifier: 0,
        description: "",
        unlockConditions: () => true,
    },
    {
        bId: "rbHydro",
        name: "Hydro analyser",
        category : "Basics",
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
    {
        bId: "rbTemp",
        name: "Temperature analyser",
        category : "Basics",
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