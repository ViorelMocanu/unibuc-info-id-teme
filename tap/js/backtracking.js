$(function() {
	$('#n').on( "change keyup",
		function () {
			var el = $(this);
			var val = $(this).val();
			if ( val == parseInt(val) ) val = parseInt(val); else return;
			console.log('val = ', val);
			el.parent().removeClass('Error');
			if ( val < 4 || val > 17 ) {
				el.parent().addClass('Error');
				$('#rezolvare').hide(100);
			} else {
				$('#rezolvare').show(1000);
			}
		}
	);
});