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
]

export const META_Building = Object.fromEntries(
    META_BuildingList.map((x, idx) => [x.id, {...x, order:idx}])
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