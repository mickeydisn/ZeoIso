export const META_ResourceList = [
    {
        id: "rsMemoryNote",
        category: "1Raw",
        order: 1,
        icon: "📜",
        name: "Memory Note",
        density: 1
    }, {
        id: "rsBiome",
        category: "1Raw",
        icon: "🌈",
        name: "BiomeData",
        density: 1
    }, {
        id: "rsTime",
        category: "1Raw",
        icon: "⌛️",
        name: "TimeData",
        density: 1
    }, {
        id: "rsTemp",
        category: "1Raw",
        icon: "🌡",
        name: "TimeData",
        density: 1
    }, {
        id: "rsHydro",
        category: "1Raw",
        icon: "💧",
        name: "TimeData",
        density: 1
    }, {
        id: "rsWind",
        category: "1Raw",
        icon: "💨",
        name: "TimeData",
        density: 1
    },
]

export const META_Resource = Object.fromEntries(
    META_ResourceList.map((x, idx) => [x.id, {...x, order:idx}])
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