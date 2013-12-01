
var Typeahead = function Typeahead() {

	this.list = []; // list of objects like: { name:"", id:"" }
	this.setDataList = function(data) {
		// set the list to a list of name,id pairs
		// then sort it by fullname A-Z 
		this.list = data;
		this.list.sort(function(a,b){
			return a.name > b.name
		});
	}

	this.search = function(key, cb) {
		// given a key, make it lowercase, seperate it into an 
		// array ofdistinct words by spaces and compare it to the 
		// lowercase version of each name, if all sub-keys are
		// present in the name add the pair to the subset returned 
		// to the callback

		// ex: key: "oT S pE" -> keys: ["to","s","pe"]
		// matches	{name:"Otto Sipe", id: "12345"}
		// and  	{name:"Tom Speed", id:"12345"}
		var sublist = [];

		if(key !== "" && key !== " ") {
			for (var i in this.list) {
				var keys = key.toLowerCase().split(" ");
				var str = this.list[i].name.toLowerCase();

				var gate = true;
				for (var j in keys) {
					if(str.indexOf(keys[j]) != -1) {
						gate &= true;
					} else {
						gate = false;
					}
				}
				if(gate) sublist.push(this.list[i]);
			}
		}
		// pass the sublist back to the 
		cb(sublist);
	}
}