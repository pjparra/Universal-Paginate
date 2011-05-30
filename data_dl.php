<?php
	require "class.universal.paginate.helper.php";
	
	$startIndex = !empty($_GET['startIndex'])?$_GET['startIndex']:0;
	$nbItemsByPage = !empty($_GET['nbItemsByPage'])?$_GET['nbItemsByPage']:$_POST['items_by_page'];
	$nbPreloadedPages = !empty($_GET['nbPreloadedPages'])?$_GET['nbPreloadedPages']:0;
	
	sleep(1);
	
	$data = array(
		array(
			'number' => '1',
			'translations' => array(
				array(
					'language' => 'French',
					'term' => 'Un',
				),
				array(
					'language' => 'English',
					'term' => 'One',
				),
			)
		),
		array(
			'number' => '2',
			'translations' => array(
				array(
					'language' => 'French',
					'term' => 'Deux',
				),
				array(
					'language' => 'English',
					'term' => 'Two',
				),
				array(
					'language' => 'Spanish',
					'term' => 'Dos',
				),
			)
		),
		array(
			'number' => '3',
			'translations' => array(
				array(
					'language' => 'French',
					'term' => 'Trois',
				),
				array(
					'language' => 'English',
					'term' => 'Three',
				),
				array(
					'language' => 'Spanish',
					'term' => 'Tres',
				),
			)
		),
		array(
			'number' => '4',
			'translations' => array(
				array(
					'language' => 'English',
					'term' => 'Four',
				),
			)
		),
		array(
			'number' => '5',
			'translations' => array(
				array(
					'language' => 'French',
					'term' => 'Cinq',
				),
			)
		),
		array(
			'number' => '6',
			'translations' => array(
				array(
					'language' => 'Spanish',
					'term' => 'Seis',
				),
			)
		),
		array(
			'number' => '7',
			'translations' => array(
				array(
					'language' => 'French',
					'term' => 'Sept',
				),
				array(
					'language' => 'English',
					'term' => 'Seven',
				),
				array(
					'language' => 'Spanish',
					'term' => 'Siete',
				),
			)
		),
		array(
			'number' => '8',
			'translations' => array(
				array(
					'language' => 'French',
					'term' => 'Huit',
				),
				array(
					'language' => 'Spanish',
					'term' => 'Ocho',
				),
			)
		),
		array(
			'number' => '9',
			'translations' => array(
				array(
					'language' => 'French',
					'term' => 'Neuf',
				),
				array(
					'language' => 'English',
					'term' => 'Nine',
				),
				array(
					'language' => 'Spanish',
					'term' => 'Nueve',
				),
			)
		),
		array(
			'number' => '10',
			'translations' => array(
				array(
					'language' => 'English',
					'term' => 'Ten',
				),
				array(
					'language' => 'Spanish',
					'term' => 'Diez',
				),
			)
		),
		array(
			'number' => '11',
			'translations' => array(
				array(
					'language' => 'French',
					'term' => 'Onze',
				),
				array(
					'language' => 'English',
					'term' => 'Eleven',
				),
				array(
					'language' => 'Spanish',
					'term' => 'Once',
				),
			)
		),
		array(
			'number' => '12',
			'translations' => array(
				array(
					'language' => 'French',
					'term' => 'Douze',
				),
				array(
					'language' => 'English',
					'term' => 'Twelve',
				),
			)
		),
		array(
			'number' => '13',
			'translations' => array(
				array(
					'language' => 'French',
					'term' => 'Treize',
				),
				array(
					'language' => 'English',
					'term' => 'Thirteen',
				),
				array(
					'language' => 'Spanish',
					'term' => 'Trece',
				),
			)
		),
		array(
			'number' => '14',
			'translations' => array(
				array(
					'language' => 'English',
					'term' => 'Fourteen',
				),
			)
		),
		array(
			'number' => '15',
			'translations' => array(
				array(
					'language' => 'French',
					'term' => 'Quinze',
				),
				array(
					'language' => 'English',
					'term' => 'Fifteen',
				),
				array(
					'language' => 'Spanish',
					'term' => 'Quince',
				),
			)
		),
		array(
			'number' => '16',
			'translations' => array(
				array(
					'language' => 'French',
					'term' => 'Seize',
				),
				array(
					'language' => 'Spanish',
					'term' => 'Diecis�is',
				),
			)
		),
		array(
			'number' => '17',
			'translations' => array(
				array(
					'language' => 'French',
					'term' => 'Dix-sept',
				),
				array(
					'language' => 'English',
					'term' => 'Seventeen',
				),
				array(
					'language' => 'Spanish',
					'term' => 'Diecisiete',
				),
			)
		),
		array(
			'number' => '18',
			'translations' => array(
				array(
					'language' => 'French',
					'term' => 'Dix-huit',
				),
				array(
					'language' => 'English',
					'term' => 'Eighteen',
				),
				array(
					'language' => 'Spanish',
					'term' => 'Dieciocho',
				),
			)
		),
		array(
			'number' => '19',
			'translations' => array(
				array(
					'language' => 'French',
					'term' => 'Dix-neuf',
				),
				array(
					'language' => 'English',
					'term' => 'Nineteen',
				),
				array(
					'language' => 'Spanish',
					'term' => 'Diecinueve',
				),
			)
		),
		array(
			'number' => '20',
			'translations' => array(
				array(
					'language' => 'French',
					'term' => 'Vingt',
				),
				array(
					'language' => 'English',
					'term' => 'Twenty',
				),
				array(
					'language' => 'Spanish',
					'term' => 'Veinte',
				),
			)
		),
	);
	
	echo UniversalPaginateHelper::paginate($data, $startIndex, $nbItemsByPage, $nbPreloadedPages);
?>