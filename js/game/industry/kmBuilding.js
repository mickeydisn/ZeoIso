export const META_BuildingList = [
    {
        id: "rbBiome",
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
        id: "rbTime",
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
].map((x, idx) => {return {
    ...x,
    order:idx,
    cost: Object.entries(x.cost).map(([k, v]) => {return {itemId:k, cost:v}}),
    inputs: Object.entries(x.inputs).map(([k, v]) => {return {itemId:k, cost:v}}),
    outputs: Object.entries(x.outputs).map(([k, v]) => {return {itemId:k, cost:v}}),
}})

export const META_Building = Object.fromEntries(
    META_BuildingList.map(x => {
        return [x.id, x]
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