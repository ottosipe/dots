
var Graph = function(view) {

	var graph = {};
	var numPeople = 0;
	var sys = arbor.ParticleSystem(100, 50, 0.2); // create the system with sensible repulsion/stiffness/friction
	sys.parameters({gravity:true}); // use center-gravity to make the graph settle nicely (ymmv)
	sys.renderer = Renderer("#viewport", view); // our newly created renderer will have its .init() method called shortly by sys...

	this.stop = function() {
		sys.stop();
		sys.eachNode(function(node, pt){ 
			sys.pruneNode(node);
		});
		graph = {};
	}

	this.parseData = function(photos) {
		for (var i in photos) {
			try {
				var tags = photos[i].tags;
				//this.permute(photos[i].likes.data);
				this.permute(tags.data);
			} catch (err) {}
		}
		this.render();
		colors.next(); // move to next color
		view.setPeople(numPeople)
	}

	this.permute = function (tags) {
		for (var j = 0; j < tags.length; ++j) {
			var p1 = tags[j];
			if(!p1.id) continue;
			for (var k = j+1; k < tags.length; ++k) {
				var p2 = tags[k];
				if(!p1.id) continue;
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
			numPeople++;
		}
		node = graph[p1.id];
		node.links[p2.id] = p2.name;
		node.n++;
	}

	this.addNode = function(id) {
		if(sys.getNode(id)) return;
		var person = graph[id];
		var node = sys.addNode(id, {
			n: person.n,
			id: id,
			name: person.name
		});
		node.mass = person.n;
	}

	this.render = function() {
		for (var i in graph) {
			var person = graph[i];
			//if(person.n < 5) continue;
			this.addNode(i);
			for (var j in person.links) {
				this.addNode(j);
				sys.addEdge(i, j, {color: colors.get()});
			}
		}
	}
}