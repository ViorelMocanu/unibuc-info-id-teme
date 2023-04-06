$(function() {

	window.currentInput = 2;

	function addInput() {
		var input = '<label class="Label QSLabel" for="v' + window.currentInput + '"><span class="LabelText">v[' + window.currentInput + '] = </span><input class="LabelInput" id="v' + window.currentInput + '" name="v[]" type="number" placeholder="item" value="" tabindex="3" /></label>';
		$('#vector').append(input);
		window.currentInput++;
		if ( $('#rezolvare').is(':hidden') && window.currentInput > 3 ) $('#rezolvare').show(1000);
		return;
	}
	
	$('#adauga').click( function () {
		addInput();
	});
	$('body').delegate( '.QSLabel .LabelInput', 'change', function () {
		console.log($(this).attr('id'), $(this).attr('id').replace('v',''), parseInt($(this).attr('id').replace('v','')))
		var id = parseInt($(this).attr('id').replace('v',''));
		if ( $(this).val() != '' && id == window.currentInput - 2 ) addInput();
	});

});