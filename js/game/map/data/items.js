const B_ALL = [
     "-6", "-7", "-8", "-9", "-10",
     "-1", "-2", "-3", "-4", "-5", 
      "1",  "2",  "3",  "4",  "5", 
      "6",  "7",  "8",  "9",  "10"
]

export const GAME_FLORE_ITEMS = [
    {b: B_ALL, l:{min:0, max:255}, flore:{mod:64, eq:0, min:0, max:255}, cFilter:'H75',  key: 'tree_detailed_dark'},
    {b: B_ALL, l:{min:0, max:255}, flore:{mod:64, eq:1, min:0, max:255}, cFilter:'H90',  key: 'tree_blocks'},
    {b: B_ALL, l:{min:0, max:255}, flore:{mod:64, eq:2, min:0, max:255}, cFilter:'H115',  key: 'tree_detailed_dark'},
    {b: B_ALL, l:{min:0, max:255}, flore:{mod:64, eq:3, min:0, max:255}, cFilter:'H120',  key: 'tree_blocks'},
    {b: B_ALL, l:{min:0, max:255}, flore:{mod:64, eq:4, min:0, max:255}, cFilter:'H45',  key: 'tree_oak_dark'},
    {b: B_ALL, l:{min:0, max:255}, flore:{mod:64, eq:5, min:0, max:255}, cFilter:'H30',  key: 'tree_oak_dark'},
    {b: B_ALL, l:{min:0, max:255}, flore:{mod:64, eq:6, min:0, max:255}, cFilter:'H75',  key: 'tree_blocks'},
].map(x => {
    return ['_NE', '_SE', '_SW', '_NW'].map((d, idx) => {
        const f = x.flore
        const key = x.cFilter ? x.key + d + '#' + x.cFilter : x.key + d 
        return {b:x.b, l:x.l, flore:{mod:f.mod*4, eq:f.eq*4 + idx, min:f.min, max:f.max}, key: key}
    })
}).flat()

