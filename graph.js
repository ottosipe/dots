
var Graph = function() {

	var graph = {};
	var sys = arbor.ParticleSystem(100, 50, 0.2) // create the system with sensible repulsion/stiffness/friction
	//sys.parameters({gravity:true}) // use center-gravity to make the graph settle nicely (ymmv)
	sys.renderer = Renderer("#viewport") // our newly created renderer will have its .init() method called shortly by sys...

	// move this outa here
	this.parseData = function(photos, my_id) {
		for (var i in photos) {
			try {
				var tags = photos[i].tags;
				//this.permute(photos[i].likes.data);
				this.permute(tags.data, my_id);
			} catch (err) {}
		}
		this.render();
	}

	this.permute = function (tags, my_id) {
		for (var j = 0; j < tags.length; ++j) {
			var p1 = tags[j];
			if(!p1.id || p1.id == my_id ) continue;
			for (var k = j+1; k < tags.length; ++k) {
				var p2 = tags[k];
				if(!p1.id || p2.id == my_id) continue;
				this.addLink(p1,p2);
				this.addLink(p2,p1);
			}
		} 
	}

	this.addLink = function(p1, p2) {
		var node = graph[p1.id];
		if (!node) {
			graph[p1.id] = {
				name: p1.name,
				links: {},
				n: 0
			}
		}
		node = graph[p1.id];
		node.links[p2.id] = p2.name;
		node.n++;
	}

	this.addNode = function(id) {
		if(sys.getNode(id)) return;

		var person = graph[id];
		sys.addNode(id, {
			n: person.n,
			name: person.name
		});
	}

	this.render = function() {
		console.log(graph)

		var arr = [];
		for (var i in graph) {
			var person = graph[i];
			for (var j in person.links) {
				arr.push({a:i, b:j});
			}
		}

		var that = this;
		var intv = setInterval(function() {
			if(arr.length) {
				var edge = arr.pop();
				that.addNode(edge.a);
				that.addNode(edge.b);
				sys.addEdge(edge.a, edge.b);
			} else {
				console.log("done")
				clearInterval(intv);
			}
		}, 50);

	}
}