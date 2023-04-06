<?php

// inițializez variabilele
$titluRez = '';
$n = 0;
$G = array();
$solutie = '&nbsp;';

function Kruskal(&$G) {
	$len = count($G);
 
	// 1. T este graful temporar, și vom modifica graful G pentru a păstra doar arborele parțial de cost minim
	$T = array();
 
	// 2. Crearea unor arbori liniari (vectori / seturi) din fiecare linie
	$S = array();
	foreach (array_keys($G) as $k) {
		$S[$k] = array($k);
	}
 
	// 3. Sortarea muchiilor
	$costuri = array();
	for ($i = 0; $i < $len; $i++) {
		for ($j = 0; $j < $i; $j++) {
			if (!$G[$i][$j]) continue;
			$costuri[$i . ' ' . $j] = $G[$i][$j];
		}
	}
	asort($costuri);
 
	foreach ($costuri as $k => $w) {
		list($i, $j) = explode(' ', $k);
		$iSet = gaseste_set($S, $i);
		$jSet = gaseste_set($S, $j);
		if ($iSet != $jSet) {
			$T[] = "($i, $j)";
			uneste_seturi($S, $iSet, $jSet);
		}
	}
 
	return $T;
}
 
function gaseste_set(&$set, $index) {
	foreach ($set as $k => $v) {
		if (in_array($index, $v)) {
			return $k;
		}
	}
	return false;
}
 
function uneste_seturi(&$set, $i, $j) {
	$a = $set[$i];
	$b = $set[$j];
	unset($set[$i], $set[$j]);
	$set[] = array_merge($a, $b);
}

// procesează datele primite din formular
if ( sizeof($_POST) > 2 ) {
	$G = $_POST;
	$n = $G['n'];
	unset($G['n']);
	$mst = Kruskal($G);
	$solutie = 'Muchiile: ';
	foreach ($mst as $v) {
		$solutie .= $v . ', ';
	}
	$solutie .= 'sunt arborele parțial de cost minim al grafului.';
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
		<title>Algoritmul lui Kruskal<?=$titluRez;?> - Proiecte TAP</title>
		<script type="text/javascript" src="./js/jquery-2.1.4.min.js"></script>
		<script type="text/javascript" src="./js/kruskal.js"></script>
	</head>
	<body itemscope="itemscope" itemtype="http://schema.org/WebPage" dir="ltr">
		<div class="Framework">
			<h1>Algoritmul lui Kruskal</h1>
			<?php if ( $solutie == '&nbsp;' ) : ?>
			<h2>Date de intrare</h2>
			<p>Ca date de intrare folosim o variabilă care determină câte noduri are graful, valoarea acestei variabile definind și mărimea matricei de costuri, care dublează și ca matrice de existență a drumurilor (presupunând că drumurile au valoare minimă de 1, și un drum de valoare 0 este inexistent). Vă rugăm, introduceți variabilele:</p>
			<form class="Form" id="initializare" action="kruskal.php" method="post">
				<fieldset class="Fieldset">
					<legend class="Legend">Definirea numărului de noduri în graf, deci a matricii de noduri:</legend>
					<label class="Label" for="n">
						<span class="LabelText">Noduri: <em>2 &lt;</em></span>
						<input class="LabelInput" id="n" name="n" type="number" min="3" max="20" step="1" placeholder="noduri" value="<?=($n>=3)?$n:'';?>" maxlength="2" accesskey="n" autofocus="autofocus" tabindex="1" />
						<span class="LabelText"><em>&lt; 21</em></span>
					</label>
				</fieldset>
				<fieldset class="Fieldset Hidden" id="matrice">
					<legend class="Legend">Definirea matricii de costuri:</legend>
					<ol class="MatriceContainer" id="matriceContainer">&nbsp;</ol>
				</fieldset>
				<fieldset class="Fieldset Hidden" id="rezolvare">
					<legend class="Legend">Rezolvarea:</legend>
					<button class="Button CTA" id="calculeaza" type="submit" title="Calculează arborele parțial de cost minim!" tabindex="3">Rezolvă acum &raquo;</button>
				</fieldset>
			</form>
			<?php else: ?>
			<h2>Rezultatul pentru graful cu <?=$n;?> noduri este:</h2>
			<h3 class="Rezultat"><?=$solutie;?></h3>
			<p class="Concluzie">Puteți să <a class="Button Refresh" id="refresh" href="./kruskal.php" title="Reintroduceți datele pentru algoritmul Kruskal și refaceți calculele">reintroduceți datele &#x27f3;</a> sau să <a class="Button Back" id="back" href="./" title="Înapoi la index-ul de proiecte">&laquo; reveniți la indexul de proiecte</a>.</p>
			<?php endif; ?>
			<p class="Copy">Proiect creat de <a href="http://viorel.tel" tabindex="0">Viorel Mocanu</a> pentru examenul de <a href="./"><strong>Tehnici Avansate de Programare</strong></a>.</p>
		</div>
		<?php require_once('analytics.php'); ?>
	</body>
</html>