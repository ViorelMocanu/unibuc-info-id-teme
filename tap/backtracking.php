<?php

// Inițializează variabilele.
$titluRez = '';
$n = 0;
$solutie = '&nbsp;';

// Problema celor N dame: distribuie N dame pe o tablă de șah de NxN spații în așa fel încât să nu se atace una pe alta
class Dame {
	private $tabla = array();
	private $numarDame = 8;
	
	public function __construct($n = 8) {
		$this->numarDame = $n;
		// Umple tabla cu 0-uri
		for($i = 0; $i < $n; $i++) {
			$this->tabla[$i] = array_fill(0, $n, 0);
		}
	}

	function rezolva($dameNr, $row) 	{
		for($col = 0; $col < $this->numarDame; $col++) {
			if($this->permis($row, $col)) {
				// dacă e permis, pune dama în această celulă
				$this->tabla[$row][$col] = 1;
				
				// Dacă e ultima damă sau au fost puse damele anterioare, returnează true
				if(($dameNr === $this->numarDame - 1) || $this->rezolva($dameNr + 1, $row + 1) === true) return true;
				
				// altfel am ajuns prin backtracking aici și trebuie să încercăm să înlocuim regina de aici
				$this->tabla[$row][$col] = 0;
			}
		}
		return false;
	}
	
	function permis($x, $y) {
		$n = $this->numarDame;
		
		// Testează numai pe rândul pe care ești, fiindcă nu există posibilitatea plasării damei curente înaintea celor deja plasate.
		// Rândurile următoare vor fi automat goale.
		for($i = 0; $i < $x; $i++) {
			// Testează coloana să vezi dacă mai e vreo damă pe ea.
			if($this->tabla[$i][$y] === 1) return false;
			
			// Testează diagonalele dinaintea coordonatei curente.
			$tx = $x - 1 - $i;
			$ty = $y - 1 - $i;	// Diagonala \
			if(($ty >= 0) && ($this->tabla[$tx][$ty] === 1)) return false;
			
			$ty = $y + 1 + $i;	// Diagonala /
			if(($ty < $n) && ($this->tabla[$tx][$ty] === 1)) return false;
		}
		return true;
	}
	
	// Afișare rudimentară
	function afiseazaTabla() {
		$sol = '';
		for ( $x = 0; $x < $this->numarDame; $x++ ) $sol .= '——';
		$sol .= "—
";
		for($row=0; $row<$this->numarDame; $row++) {
			$sep = '—';
			for($col=0; $col<$this->numarDame; $col++) {
				$sep .= '——';
				$sol .= '|';
				$cell = $this->tabla[$row][$col];
				if($cell === 1) {
					$sol .= 'Q';
				} else {
					$sol .= ' ';
				}
			}
			$sol .= "|
";
			$sol .= $sep . "
";
		}
		return $sol;
	}
}

// Procesează datele primite din formular.
if ( sizeof($_POST) > 0 && $_POST['n'] > 3 && $_POST['n'] < 18 ) {
	$n = $_POST['n'];
	$dame = new Dame($n);
	$dame->rezolva(0, 0);
	$solutie = $dame->afiseazaTabla();
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
		<title>Backtracking<?=$titluRez;?> - Proiecte TAP</title>
		<script type="text/javascript" src="./js/jquery-2.1.4.min.js"></script>
		<script type="text/javascript" src="./js/backtracking.js"></script>
	</head>
	<body itemscope="itemscope" itemtype="http://schema.org/WebPage" dir="ltr">
		<div class="Framework">
			<h1>Backtracking - Problema damelor</h1>
			<?php if ( $solutie == '&nbsp;' ) : ?>
			<h2>Date de intrare</h2>
			<p></p>
			<form class="Form" id="initializare" action="backtracking.php" method="post">
				<fieldset class="Fieldset">
					<legend class="Legend">Definirea numărului de dame, linii și coloane ale tablei de șah:</legend>
					<label class="Label" for="n">
						<span class="LabelText">Linii/coloane: <em>3 &lt;</em></span>
						<input class="LabelInput" id="n" name="n" type="number" min="4" max="17" step="1" placeholder="dame" value="<?=($n>=4&&$n<=17)?$n:'';?>" maxlength="2" accesskey="n" autofocus="autofocus" tabindex="1" />
						<span class="LabelText"><em>&lt; 18</em></span>
					</label>
				</fieldset>
				<fieldset class="Fieldset Hidden" id="rezolvare">
					<legend class="Legend">Rezolvarea:</legend>
					<button class="Button CTA" id="calculeaza" type="submit" title="Plasează damele pe tabla de șah!" tabindex="3">Rezolvă acum &raquo;</button>
				</fieldset>
			</form>
			<?php else: ?>
			<h2>Rezultatul pentru tabla de șah cu <?=$n;?> linii și colane este:</h2>
			<h3 class="Rezultat"><pre><?=$solutie;?></pre></h3>
			<p class="Concluzie">Puteți să <a class="Button Refresh" id="refresh" href="./backtracking.php" title="Reintroduceți datele pentru problema damelor">reintroduceți datele &#x27f3;</a> sau să <a class="Button Back" id="back" href="./" title="Înapoi la index-ul de proiecte">&laquo; reveniți la indexul de proiecte</a>.</p>
			<?php endif; ?>
			<p class="Copy">Proiect creat de <a href="http://viorel.tel" tabindex="0">Viorel Mocanu</a> pentru examenul de <a href="./"><strong>Tehnici Avansate de Programare</strong></a>.</p>
		</div>
		<?php require_once('analytics.php'); ?>
	</body>
</html>