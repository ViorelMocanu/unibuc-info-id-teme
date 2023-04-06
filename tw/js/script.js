$(function() {

	// meniul principal
	$('.MeniuItem .Button').click( function (e) {
		e.preventDefault();
		var activElement = $(this);
		var activ = activElement.attr('href').substring(1);
		// se manipulează containerele cu ID-ul identic cu hash-ul ancorei din meniu
		if ( $('#'+activ).is(':visible') ) return;
		// animație de ascundere
		$('.Proiect:visible').hide(500, function () {
			// callback care schimbă clasele și animează afișarea proiectului corect
			$('.MeniuItem').removeClass('Active');
			$('.Proiect').removeClass('Active');
			activElement.parent().addClass('Active');
			$('#'+activ).show(500).addClass('Active');
		});
	});

	// formularul de teste auto
	window.intrebareaCurenta = 1;
	window.intrebariCorecte = 0;
	window.intrebariTotale = 0;
	window.intrebariTotale = $('.Enunt').length;
	// obiectul cu vectori de răspunsuri corecte, care ar putea veni dintr-o bază de date, laolaltă cu întrebările
	var raspunsuri = {
		'intrebare-1': ['c'],
		'intrebare-2': ['b'],
		'intrebare-3': ['a'],
		'intrebare-4': ['b'],
		'intrebare-5': ['a','b'],
		'intrebare-6': ['b'],
		'intrebare-7': ['c'],
		'intrebare-8': ['a'],
		'intrebare-9': ['a','b'],
		'intrebare-10': ['b'],
		'intrebare-11': ['b'],
		'intrebare-12': ['b'],
		'intrebare-13': ['b'],
		'intrebare-14': ['c'],
		'intrebare-15': ['c'],
		'intrebare-16': ['a'],
		'intrebare-17': ['a'],
		'intrebare-18': ['c'],
		'intrebare-19': ['a','c'],
		'intrebare-20': ['a'],
		'intrebare-21': ['a'],
		'intrebare-22': ['b'],
		'intrebare-23': ['a','b','c'],
		'intrebare-24': ['b'],
		'intrebare-25': ['b'],
		'intrebare-26': ['b']
	};
	// click-ul pe butonul de "întrebare următoare"
	$('#auto .Next').click( function (e) {
		e.preventDefault();
		var intrebareBifata = false;
		if ( $('#fieldset-'+window.intrebareaCurenta+' .Checked').length < 1 ) {
			alert('Trebuie să bifezi cel puțin un răspuns!');
			return;
		}
		if ( window.intrebareaCurenta == window.intrebariTotale ) return;
		$('#fieldset-'+window.intrebareaCurenta).hide(500, function () {
			if ( window.intrebareaCurenta == 1 ) $('.Back').show(500);
			window.intrebareaCurenta += 1;
			if ( window.intrebareaCurenta >= window.intrebariTotale ) {
				window.intrebareaCurenta = window.intrebariTotale;
				$('.FinalContainer').show(500);
				$('.Next').hide(100);
			}
			$('#fieldset-'+window.intrebareaCurenta).show(500)
			$('.Progres').html(window.intrebareaCurenta+'/'+window.intrebariTotale).css('width',parseFloat(window.intrebareaCurenta*100/window.intrebariTotale).toFixed(3)+'%');
		});
	});
	// click-ul pe butonul de "întrebare precedentă"
	$('#auto .Back').click( function (e) {
		e.preventDefault();
		if ( window.intrebareaCurenta == 1 ) return;
		$('#fieldset-'+window.intrebareaCurenta).hide(500, function () {
			if ( window.intrebareaCurenta == window.intrebariTotale ) {
				$('.Next').show(500);
				$('.FinalContainer').hide(500);
			}
			window.intrebareaCurenta -= 1;
			if ( window.intrebareaCurenta <= 1 ) {
				window.intrebareaCurenta = 1;
				$('.Back').hide(100);
			}
			$('#fieldset-'+window.intrebareaCurenta).show(500)
			$('.Progres').html(window.intrebareaCurenta+'/'+window.intrebariTotale).css('width',parseFloat(window.intrebareaCurenta*100/window.intrebariTotale).toFixed(3)+'%');
		});
	});
	// click-ul pe răspunsul din fiecare întrebare
	$('.Checkbox').change( function (e) {
		if ( $(this).is(':checked') ) {
			$(this).parent().addClass('Checked');
		} else {
			$(this).parent().removeClass('Checked');
		}
	});
	// funcție utilitară care transformă un vector într-un obiect serializat
	$.fn.serializeObject = function() {
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};
	// trimiterea formularului cu răspunsurile
	$('#autoForm').submit( function(e) {
		e.preventDefault();
		var obiect = $(this).serializeObject();
		// iterație prin toate răspunsurile
		for ( var i = 1; i <= window.intrebariTotale; i++ ) {
			var corect = false;
			if (($(obiect['intrebare-'+i]).not(raspunsuri['intrebare-'+i]).length === 0 &&
					 $(raspunsuri['intrebare-'+i]).not(obiect['intrebare-'+i]).length === 0) ||
					( obiect['intrebare-'+i] == raspunsuri['intrebare-'+i][0] && raspunsuri['intrebare-'+i].length == 1) ) {
				// dacă vectorul de răspunsuri de la întrebarea curentă e identic cu vectorul de răspunsuri corecte
				window.intrebariCorecte += 1;
				corect = true;
			}
			if ( typeof(obiect['intrebare-'+i]) !== 'undefined' ) {
				// dacă există răspuns la întrebarea curentă
				if (obiect['intrebare-' + i].length > 1)
					// dacă există mai mult de un răspuns bifat
					$.each(obiect['intrebare-' + i], function (index, value) {
						// se consideră inițial răspunsul greșit
						$('#intrebare-' + i + '-' + value).parent().addClass('Gresit');
					});
				else {
					// dacă există un sigur răspuns bifat, el se consideră automat greșit
					$('#intrebare-' + i + '-' + obiect['intrebare-' + i]).parent().addClass('Gresit');
				}
			}
			var clasa = 'Ratat';
			if ( raspunsuri['intrebare-'+i].length > 1 ) {
				// dacă există mai mult de un răspuns la întrebarea curentă
				$.each(raspunsuri['intrebare-'+i], function (index, value) {
					// dacă răspunsul a fost bifat și este și în vectorul de răspunsuri corecte ale întrebării curente, el e schimbat din greșit în corect
					if ( $('#intrebare-'+i+'-'+value).parent().hasClass('Gresit') ) clasa = 'Corect';
					// dacă răspunsul curent este în vectorul de răspunsuri corecte ale întrebării curente și nu a fost bifat el este marcat ca fiind ratat
					$('#intrebare-'+i+'-'+value).parent().removeClass('Gresit').addClass(clasa);
				});
			} else {
				// dacă există un singur răspuns la întrebarea curentă și a fost bifat, e marcat ca fiind corect
				if ( $('#intrebare-'+i+'-'+raspunsuri['intrebare-'+i]).parent().hasClass('Gresit') ) clasa = 'Corect';
				// dacă nu a fost bifat, e marcat ca fiind ratat
				$('#intrebare-'+i+'-'+raspunsuri['intrebare-'+i]).parent().removeClass('Gresit').addClass(clasa);
			}
		}
		// se ascund toate câmpurile formularului
		$('.Form fieldset').hide();
		$('.Enunt').each( function () {
			// se afișează doar întrebările care au răspunsuri ratate sau greșite
			if ( $(this).find('.Ratat,.Gresit').length > 0 ) $(this).show(100);
		});
		// se calculează procentul de întrebări corecte
		var procentCorect = parseFloat( window.intrebariCorecte * 100 / window.intrebariTotale).toFixed(2);
		// minim 22 / 26 = 84.61%
		if ( procentCorect >= 84 ) {
			$('#auto-titlu').html('Testul auto a fost promovat cu '+(window.intrebariTotale - window.intrebariCorecte)+' greșeli! Felicitări!');
		} else {
			$('#auto-titlu').html('Testul auto a fost picat cu '+(window.intrebariTotale - window.intrebariCorecte)+' greșeli:').addClass('Error');
		}
		// se updatează progresul
		$('.Progres').html(procentCorect+'%').css('width',procentCorect+'%').parent().addClass('Final');
		// se marchează răspunsurile ca fiind read only
		$('.Checkbox').prop('readonly', true).parent().click( function () { return false; });
	});

	// spanzuratoarea
	window.litereAlese = [];
	// valoarea maximă este 6, moment în care jocul se termină cu jucătorul pierzând
	window.omIntreg = 0;
	// vectorul de litere al cuvântului corect, care ar putea veni dintr-o bază de date
	var cuvant = ['i','n','f','o','r','m','a','t','i','c','a'];
	// se ascultă fiecare eveniment de key press pe tastatură
	$('body').keypress(function (e) {
		// se acceptă doar litere mari și mici
		var regex = new RegExp("^[a-zA-Z]+$");
		// se transformă codul tastei în literă mică
		var litera = String.fromCharCode(!e.charCode ? e.which : e.charCode).toLowerCase();
		// dacă s-a tastat o literă și nu s-a terminat jocul
		if (regex.test(litera) && window.omIntreg < 6) {
			// dacă litera nu e în vectorul de litere tastate deja
			if ( window.litereAlese.indexOf(litera) < 0 ) {
				// se adaugă litera în vectorul de litere tastate deja
				window.litereAlese.push(litera);
				var clasaBuna = '';
				// dacă litera e în cuvântul soluție
				if ( cuvant.indexOf(litera) >= 0 ) {
					clasaBuna = ' Buna';
					$('.SpanzuInput').each( function (e) {
						var key = $(this).attr('id').replace('litera-','');
						if ( cuvant[key] == litera ) {
							// se completează litera în toate input-urile în care ar trebui să apară pentru a constitui cuvântul
							$(this).prop('disabled', false).val(litera).prop('readonly', true).addClass('filled');
						}
					});
				}
				// se afișează litera tastată
				$('.SpanzuLitere').append('<li class="SpanzuLitera'+clasaBuna+'">'+litera+'</li>');
				// se incrementează counter-ul de eroare dacă litera nu a fost corectă
				if ( clasaBuna == '' ) window.omIntreg++;
				// se schimbă src-ul pozei ca să reflecte numărul de greșeli la care s-a ajuns
				$('#spanzu').attr('src','img/spanzu-'+window.omIntreg+'.png');
				// dacă s-a atins numărul maxim de greșeli
				if ( window.omIntreg >= 6 ) {
					window.omIntreg = 6;
					// se afișează sfârșitul de joc pierdut și se iese din funcția watcher
					$('#spanzuratoarea').append('<h2 class="Error">Tocmai ai fost „spânzurat”!</h2>');
					$('#spanzuForm').hide(500);
					return true;
				}
				var goale = $('.SpanzuInput').filter(function() {
					return this.value === "";
				});
				// dacă s-au umplut toate input-urile goale
				if (!goale.length || goale.length < 0) {
					// se afișează sfârșitul de joc câștigat
					$('#spanzuratoarea').append('<h2>Felicitări! Ai găsit cuvântul fără să fii „spânzurat”!</h2>');
					$('.SpanzuCanvas').hide(500);
				}
			}
			return true;
		}
		e.preventDefault();
		return false;
	});

	// animație
	var canvas;
	var stage;
	var tweens;
	var activeCount;
	// am ales să fie 25 de cercuri animate
	var circleCount = 25;
	var text;
	// funcția de inițializare a canvas-ului cu elementele care trebuiesc animate
	function init() {
		canvas = document.getElementById("testCanvas");
		// se crează obiectul în interiorul obiectului canvas din DOM
		stage = new createjs.Stage(canvas);
		stage.enableDOMEvents(true);
		tweens = [];
		// se ascultă evenimente de mouseover la fiecare 10 milisecunde
		stage.enableMouseOver(10);
		// se ascultă și evenimente de touch
		createjs.Touch.enable(stage);

		for (var i = 0; i < circleCount; i++) {
			// se desenează fiecare cerc în parte și se plasează în canvas
			var circle = new createjs.Shape();
			// se definește stilul cercului
			circle.graphics.setStrokeStyle(15);
			circle.graphics.beginStroke("#115830");
			circle.graphics.drawCircle(0, 0, (i + 1) * 4);
			circle.alpha = 1 - i * 0.02;
			// se plasează cercul într-un punct random al canvas-ului
			circle.x = Math.random() * 550;
			circle.y = Math.random() * 400;
			circle.compositeOperation = "lighter";
			// se crează animația de tween
			var tween = createjs.Tween.get(circle).to({x: 275, y: 200}, (0.5 + i * 0.04) * 1500, createjs.Ease.bounceOut).call(tweenComplete);
			tweens.push({tween: tween, ref: circle});
			stage.addChild(circle);
		}
		activeCount = circleCount;
		stage.addEventListener("stagemouseup", handleMouseUp);

		// se adaugă textul inițial
		text = new createjs.Text("Click oriunde pentru animație", "24px Arial", "#ccc");
		text.x = 450;
		text.y = 200;
		stage.addChild(text);

		createjs.Ticker.addEventListener("tick", tick);
	}
	// callback pentru watcher-ul de mouse up
	function handleMouseUp(event) {
		if (text) {
			// se scoate textul dacă există
			stage.removeChild(text);
			text = null;
		}
		for (var i = 0; i < circleCount; i++) {
			var ref = tweens[i].ref;
			var tween = tweens[i].tween;
			// se animează fiecare cerc în parte folosind coordonatele click-ului pe canvas
			createjs.Tween.get(ref, {override: true}).to({x: stage.mouseX, y: stage.mouseY}, (0.5 + i * 0.04) * 1500, createjs.Ease.bounceOut).call(tweenComplete);
		}
		activeCount = circleCount;
	}
	// funcție utilitară pentru terminarea tween-ului
	function tweenComplete() {
		activeCount--;
	}
	// callback de animație iterativă
	function tick(event) {
		if (activeCount) {
			stage.update(event);
		}
	}
	init();
});