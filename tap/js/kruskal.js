$(function() {
	$('#n').on( "change keyup",
		function () {
			var el = $(this);
			var val = $(this).val();
			if ( val == parseInt(val) ) val = parseInt(val); else return;
			console.log('val = ', val);
			el.parent().removeClass('Error');
			if ( val < 3 || val > 20 ) {
				$('#matriceContainer').empty();
				el.parent().addClass('Error');
				$('#matrice').hide(100);
				$('#rezolvare').hide(100);
			} else {
				var matrice = '';
				for( var i = 0; i < val; i++ ) {
					for ( var j = 0; j < val; j++ ) {
						if ( j == 0 ) {
							matrice += '<li class="MatriceLinie">';
						}
						if ( i == j ) { // diagonala e intotdeauna zero
							matrice += '<label class="Label" for="g-' + i + '-' + j + '"><input class="LabelInput Pret Readonly" id="g-' + i + '-' + j + '" name="' + i + '[]" type="number" min="0" max="1000" step="1" alt="Prețul arcului ' + i + '-' + j + '" value="0" readonly="readonly" tabindex="-1" /></label>';
						} else {
							var subDiagonala = '';
							if ( i > j ) {
								subDiagonala = ' SubDiagonala';
							}
							matrice += '<label class="Label" for="g-' + i + '-' + j + '"><input class="LabelInput Pret' + subDiagonala + '" id="g-' + i + '-' + j + '" name="' + i + '[]" type="number" min="0" max="1000" step="1" alt="Prețul arcului ' + i + '-' + j + '" value="0" tabindex="1" /></label>';
						}
						if ( j == val-1 ) {
							matrice += '</li>';
						}
					}
				}
				$('#matriceContainer').html(matrice);
				$('#matrice').show(1000);
				$('#rezolvare').show(1000);
			}
		}
	);
	$("body").delegate ( ".Pret", "change keyup", function () {
		var el = $(this);
		var v = parseInt($(this).val());
		var idArr = el.attr('id').split('-');
		var i = idArr[1];
		var j = idArr[2];
		$('#g-'+j+'-'+i).val(v).addClass('Pulse');
	}).delegate ( ".Pret", "blur", function () {
		$(this).parents('#matriceContainer').find('.Pulse').removeClass('.Pulse');
	});
});