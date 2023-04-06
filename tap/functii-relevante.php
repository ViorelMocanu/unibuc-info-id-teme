<?php

// Problema QuickSort-ului prin recursivitate.
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
				$sep .= '——';	// for every column add 2 dashes to then print below the row
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

?>