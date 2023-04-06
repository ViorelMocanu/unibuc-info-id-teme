$(function() {

	var vc =  $('#voronoiCanvas');
	console.log(vc.outerWidth(), vc.outerHeight());

	window.VoronoiDemo = {
		voronoi: new Voronoi(),
		puncte: [],
		diagrama: null,
		margine: 100,
		canvas: null,
		bbox: {xl:0,xr:800,yt:0,yb:600},

		normalizeazaCoordonate: function(target,e) {
			// diverse browsere au diverse modele de referențiere și calculare a coordonatelor
			if (!e) {e=self.event;}
			var x = 0;
			var y = 0;
			if (e.pageX || e.pageY) {
				x = e.pageX;
				y = e.pageY;
			} else if (e.clientX || e.clientY) {
				x = e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
				y = e.clientY+document.body.scrollTop+document.documentElement.scrollTop;
			}
			return {x:x-target.offsetLeft,y:y-target.offsetTop};
		},

		init: function() {
			var eu = this; // scriere mai ușoară
			this.canvas = document.getElementById('voronoiCanvas'); // element global pentru canvas
			this.canvas.onmousemove = function(e) {
				// atunci când se mișcă mouse-ul se inițializează vectorul de puncte și se normalizează coordonatele
				if (!eu.puncte.length) {return;}
				var punct = eu.puncte[0];
				var mouse = eu.normalizeazaCoordonate(eu.canvas,e);
				punct.x = mouse.x;
				punct.y = mouse.y;
				eu.diagrama = eu.voronoi.compute(eu.puncte,eu.bbox);
				// se randează punctul curent luat din calculul coordonatelor mouse-ului și se reface Voronoi
				eu.randeaza();
			};
			this.canvas.onclick = function(e) {
				// la click stânga se fixează coordonatele și se adaugă punctul fix în diagramă
				var mouse = eu.normalizeazaCoordonate(eu.canvas,e);
				eu.adaugaPunct(mouse.x,mouse.y);
				eu.randeaza();
			};
			this.puncteAleatorii(10,true);
			this.randeaza();
		},

		curataPuncte: function() {
			// trebuie să vedem minim un punct, cel care urmărește cursorul
			this.puncte = [{x:0,y:0}];
			this.diagrama = this.voronoi.compute(this.puncte, this.bbox);
		},

		puncteAleatorii: function(n,clear) {
			if (clear) {this.puncte = [];}
			// toggle-ul boolean de curățare
			var xo = this.margine;
			var dx = this.canvas.width-this.margine*2;
			var yo = this.margine;
			var dy = this.canvas.height-this.margine*2;
			// se iau marginile în calcul pentru definirea câmpului maxim de populare cu puncte
			for (var i=0; i<n; i++) {
				// se adaugă N puncte random în plan
				this.puncte.push({
					x: self.Math.round(xo + self.Math.random()*dx),
					y: self.Math.round(yo + self.Math.random()*dy)
				});
			}
			this.diagrama = this.voronoi.compute(this.puncte, this.bbox);
		},

		adaugaPunct: function(x,y) {
			// se adaugă punctul la coordonatele (x,y)
			this.puncte.push({x:x,y:y});
			this.diagrama = this.voronoi.compute(this.puncte, this.bbox);
		},

		randeaza: function() {
			var desen = this.canvas.getContext('2d');
			// randarea fundalului
			desen.globalAlpha = 1;
			desen.beginPath();
			desen.rect(0,0,this.canvas.width,this.canvas.height);
			desen.fillStyle = '#fefefe';
			desen.fill();
			desen.strokeStyle = '#ccc';
			desen.stroke();
			// stilurile diagramei
			if (!this.diagrama) {return;}
			desen.strokeStyle='#300';
			// randarea muchiilor
			var muchii = this.diagrama.edges,
				nmuchii = muchii.length,
				v;
			if (nmuchii) {
				var muchie;
				desen.beginPath();
				while (nmuchii--) {
					muchie = muchii[nmuchii];
					v = muchie.va;
					desen.moveTo(v.x,v.y);
					v = muchie.vb;
					desen.lineTo(v.x,v.y);
				}
				desen.stroke();
			}
			// câte puncte avem?
			var puncte = this.puncte,
				npuncte = puncte.length;
			if (!npuncte) {return;}
			// evidențierea celulei de sub mouse
			var celula = this.diagrama.cells[this.puncte[0].voronoiId];
			// nu există garanția faptului că va exista o celulă Voronoi pentru toate punctele
			if (celula) {
				var segment = celula.halfedges,
					nsegment = segment.length;
				if (nsegment > 2) {
					v = segment[0].getStartpoint();
					desen.beginPath();
					desen.moveTo(v.x,v.y);
					for (var isegment=0; isegment<nsegment; isegment++) {
						v = segment[isegment].getEndpoint();
						desen.lineTo(v.x,v.y);
					}
					desen.fillStyle = '#00b74f';
					desen.fill();
				}
			}
			// draw sites
			var punct;
			desen.beginPath();
			desen.fillStyle = '#f00';
			while (npuncte--) {
				punct = puncte[npuncte];
				desen.rect(punct.x-2/3,punct.y-2/3,2,2);
			}
			desen.fill();
		}
	};

	// efectele de click pe butoane
	$('.Button').click( function (e) {
		e.preventDefault();
		var h = $(this).attr("href").substring(1);
		var cateNoduri = parseInt($('#voronoiNumberSites').val(),10);
		switch( h ) {
			case "adauga":
				window.VoronoiDemo.puncteAleatorii(cateNoduri,false);
				break;
			case "curata":
				window.VoronoiDemo.curataPuncte();
				break;
			case "regenereaza":
			default:
				window.VoronoiDemo.puncteAleatorii(cateNoduri,true);
				break;
		}
		window.VoronoiDemo.randeaza();
	});

	window.VoronoiDemo.init();

});