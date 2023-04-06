<?php

// inițializez variabilele
$titluRez = '';
$n = 0;
$V = array();
$solutie = '&nbsp;';
$vectorString = '';

function quicksort($array) {
	if(count($array) < 2) return $array;

	$left = $right = array();

	reset($array);
	$pivot_key = key($array);
	$pivot = array_shift($array);

	foreach($array as $k => $v) {
		if($v < $pivot) $left[$k] = $v;
		else $right[$k] = $v;
	}

	return array_merge( quicksort($left), array($pivot_key => $pivot), quicksort($right) );
}

// procesează datele primite din formular
if ( sizeof($_POST) > 0 ) {
	$V = $_POST['v'];
	foreach ($V as $i => $c) {
		if ( $c == '' ) unset($V[$i]);
		else $vectorString .= "$c, ";
	}
	$V = quicksort($V);
	$solutie = '';
	foreach ($V as $i => $c) {
		$solutie .= "v[$i] = $c<br />";
	}
	$titluRez = ' - Rezultat';
}

?><!DOCTYPE html>
<html lang="ro-RO" prefix="og: http://ogp.me/ns#">
	<head>
		<meta charset="utf-8" />
		<meta name="Application-Name" content="Proiecte TAP" />
		<meta name="apple-mobile-web-app-title" content="Proiecte TAP">
		<meta name="Author" content="http://viorel.tel" />
		<meta name="HandheldFriendly" content="true" />
		<meta name="Robots" content="index, follow" />
		<meta name="viewport" content="initial-scale=1, maximum-scale=1" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black" />
		<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
		<link rel="stylesheet" type="text/css" href="./css/style.css" />
		<title>Algoritmul Quicksort<?=$titluRez;?> - Proiecte TAP</title>
		<script type="text/javascript" src="./js/jquery-2.1.4.min.js"></script>
		<script type="text/javascript" src="./js/quicksort.js"></script>
	</head>
	<body itemscope="itemscope" itemtype="http://schema.org/WebPage" dir="ltr">
		<div class="Framework">
			<h1>Algoritmul Quicksort</h1>
			<?php if ( $solutie == '&nbsp;' ) : ?>
			<h2>Date de intrare</h2>
			<p>Vă rugăm, introduceți vectorul dorit (ultimul element va fi întotdeauna gol, datorită funcționalității formularului de auto-adăugare de itemi):</p>
			<form class="Form" id="initializare" action="quicksort.php" method="post">
				<fieldset class="Fieldset">
					<legend class="Legend">Elementele vectorului:</legend>
					<label class="Label QSLabel" for="v0">
						<span class="LabelText">v[0] = </span>
						<input class="LabelInput" id="v0" name="v[]" type="number" placeholder="item" value="" accesskey="n" autofocus="autofocus" tabindex="1" />
					</label>
					<label class="Label QSLabel" for="v1">
						<span class="LabelText">v[1] = </span>
						<input class="LabelInput" id="v1" name="v[]" type="number" placeholder="item" value="" tabindex="2" />
					</label>
					<div class="Vector" id="vector"></div>
					<a class="Button QSAdauga" id="adauga" href="#" title="Adaugă element gol în vector">Adaugă +</a>
				</fieldset>
				<fieldset class="Fieldset Hidden" id="rezolvare">
					<legend class="Legend">Rezolvarea:</legend>
					<button class="Button CTA" id="calculeaza" type="submit" title="Calculează arborele parțial de cost minim!" tabindex="4">Rezolvă acum &raquo;</button>
				</fieldset>
			</form>
			<?php else: ?>
			<h2>Rezultatul pentru vectorul <?=$vectorString;?>soluția este:</h2>
			<h3 class="Rezultat"><?=$solutie;?></h3>
			<p class="Concluzie">Puteți să <a class="Button Refresh" id="refresh" href="./quicksort.php" title="Reintroduceți vectorul pentru sortarea Quicksort">reintroduceți vectorul &#x27f3;</a> sau să <a class="Button Back" id="back" href="./" title="Înapoi la index-ul de proiecte">&laquo; reveniți la indexul de proiecte</a>.</p>
			<?php endif; ?>
			<p class="Copy">Proiect creat de <a href="http://viorel.tel" tabindex="0">Viorel Mocanu</a> pentru examenul de <a href="./"><strong>Tehnici Avansate de Programare</strong></a>.</p>
		</div>
		<?php require_once('analytics.php'); ?>
	</body>
</html>