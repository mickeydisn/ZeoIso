

var ItemFactory = [
      Item().init({name : 'Tree1'  , color :[0, 128, 0, 255]}),
      Item().init({name : 'Tree2'  , color :[64, 128, 64, 255]}),
      Item().init({name : 'Tree2'  , color :[96, 192, 96, 255]}),
      Item().init({name : 'Rock1'  , color :[64, 64, 64, 255]}),
      Item().init({name : 'Rock2'  , color :[32, 32, 32, 255]}),
      Item().init({name : 'Rock3'  , color :[0, 0, 0, 255]}),
      Item().init({name : 'Ore1'   , color :[255, 0, 0, 255]}),
      Item().init({name : 'Ore2'   , color :[255, 128, 0, 255]}),
      Item().init({name : 'Ore3'   , color :[255, 255, 0, 255]}),
      Item().init({name : 'Trach1' , color :[192, 192, 192, 255]}),
      Item().init({name : 'Trach2' , color :[192, 192, 192, 255]}),
      Item().init({name : 'Trach3' , color :[220, 220, 220, 255]}),
]


function Item (data={}) {
	this.data = {
		name : name,
		color: [255, 255, 255, 255],
	};
	this.data = Object.assign(data, this.data);
}

Item.prototype = {

	init : function (data) {
		this.data = Object.assign(data, this.data);
		return this;
	}

}