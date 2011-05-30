<?php
class UniversalPaginateHelper
{
	public static function paginate($data, $startIndex, $nbItemsByPage, $nbPreloadedPages)
	{
		$nbTotalItems = count($data);
		if ($startIndex >= $nbTotalItems) {
			$startIndex = floor(($nbTotalItems-1)/$nbItemsByPage) * $nbItemsByPage;
		}
		$finalData = array();
		for ($i = -$nbPreloadedPages; $i <= $nbPreloadedPages; ++$i) {
			if ($startIndex+$i*$nbPreloadedPages >= 0 && $startIndex+$i*$nbPreloadedPages <= $nbTotalItems) {
				$finalData["$i"] = array_slice($data, $startIndex+$i*$nbItemsByPage, $nbItemsByPage);
			}    		
		}
		
		return  json_encode(array('startIndex' => $startIndex, 'nbItemsByPage' => $nbItemsByPage, 'nbTotalItems' => $nbTotalItems, 'data' => $finalData));
	}
}