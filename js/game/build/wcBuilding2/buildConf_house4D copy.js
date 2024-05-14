

const House5 = [
            
    // X - null
    {
        face: ['X', null, null, null], weight:0, colorT: [0, 20, 0]
    }, {
        face: ['X', 'X', null, null], weight:0, colorT: [0, 30, 0]
    }, {
        face: ['X', null, 'X', null], weight:0, colorT: [0, 30, 0]
    }, {
        face: ['X', 'X', 'X', null], weight:0, colorT: [0, 40, 0]
    }, 
    // == X ===
    {
        face: ['X', 'X', 'X', 'X'], weight:0, colorT: [0, 50, 0]
    }, 
    /// O - Bi
    {
        face: ['Bo', 'X', 'X', 'X'], weight:0, colorT: [0, 50, 20]
    }, {
        face: ['Bo', 'Bo', 'X', 'X'], weight:0, colorT: [0, 50, 30]
    }, 
    /// O - Bi
    { 
        face: ['0', 'Bi', 'Bi', 'Bi'], weight:0, colorT: [0, 50, 50]
    }, { 
        face: ['Br', 'Bl', 'Bi', 'Bi'], weight:0, color: [128, 128, 128]
    }, {
        face: ['Br', '0', 'Bl', 'Bi'], weight:0, color: [128, 128, 128]
    }, 
    {
        face: ['0', '0', 'Bl', 'Br'], weight:0, color: [128, 128, 128]
    }, 
    // == 0 ===
    {
        face: ['0', '0', '0', '0'], weight:0, color: [192, 192, 192]
    }, 
    // -- 
    {
        face: ['Wo', 'Cl', 'Ci', 'Cr'], weight:0, color: [128, 128, 128]
    }, {
        face: ['Wo', 'Wo', 'Cl', 'Cr'], weight:0, color: [128, 128, 128]
    }, {
        face: ['Ci', 'Ci', 'Cr', 'Cl'], weight:0, color: [128, 128, 128]
    }, 

    // ---------------
    //  Wall => Inside House 
    {
        face: ['Wr', 'Wl', 'Wi', 'Wi'], weight: .4, color: [128, 128, 128]
    },
    {
        face: ['Wr', 'A', 'Wl', 'Wi'], weight: 8, color: [0, 0, 0]
    },
    {
        face: ['A', 'A', 'Wlx', 'Wrx'], weight: 5, color: [0, 0, 0]
    }, 
    {
        face: ['Wr', 'Ao', 'Wl', 'Wi'], weight: 10, color: [0, 0, 0]
    },
    {
        face: ['Ai', 'Ai', 'Ai', 'Ai'], weight: 40, color: [0, 0, 0]
    },   
    {
        face: ['Wl', 'Wr', 'Ai', 'Ai'], weight: 20, color: [128, 128, 128]
    },

]