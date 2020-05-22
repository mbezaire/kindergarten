<?php


function getMath($Desc,$youTubeLink,$PSLink,$HWLink,$WSDesc) {
	$mymath = '"<p>' . $Desc . '<br/></p><br/><div  style=\"position:relative;padding-top: 56.25%;\"><div class=\"hytPlayerWrap\"><iframe style=\"position:absolute;top:0;left:0;width:100%;height:100%;\" src=\"https://www.youtube.com/embed/' . $youTubeLink . '?rel=0&enablejsapi=1\" frameborder=\"0\" allowfullscreen id=\"currentyoutube\"></iframe></div></div>" , ';
	$mymath .= makeWorksheet($WSDesc,$PSLink) . ', '; //'"<p>Next, do the problem set worksheet. ' . $WSDesc . '<br/><a target=\"_blank\" href=\"' . $PSLink . '\">Problem Set Worksheet</a></p>", ';
	$mymath .= makeWorksheet($WSDesc,$HWLink); //'"Finally, do the homework worksheet. ' . $WSDesc . '<br/><a target=\"_blank\" href=\"'. $HWLink . '\">Homework Worksheet</a>"';	

	return $mymath;

}

function makeMeeting($mmLink, $readLink) {
	$idx = 0;
	$video = '';
	if($mmLink == "" && $readLink == "") {
		 $video .= '"<p>The morning meeting materials are not yet ready. Please check back later.</p>"';
	} else {
		if ($mmLink != "") {
			$video .= makeVideo(" Good morning! Time for our morning meeting:",$mmLink);
			$idx += 1;
		}
		if ($idx>0) {
			$video .= ', ';
		}
		if ($readLink !="") {
			$video .= makeVideo("Lets read aloud:",$readLink);
		} else {
			$video .= '"<p>No regular read-aloud today - would you like to read aloud with someone?</p>"';
		}
	}
	return $video;
}


function makeYouTube($desc,$videoKey) { // other options after frameborder: <!-- allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen-->
	return '"<p>' . $desc . '</p><br/><div  style=\"position:relative;padding-top: 56.25%;\"><div class=\"hytPlayerWrap\"><iframe style=\"position:absolute;top:0;left:0;width:100%;height:100%;\" src=\"https://www.youtube.com/embed/' . $videoKey . '?rel=0&enablejsapi=1\" frameborder=\"0\" allowfullscreen id=\"currentyoutube\"></iframe></div></div>"';
}

function makeVideo($desc,$videoURL) {
	return '"<p>' . $desc . '</p><br/><iframe src=\"' . $videoURL . '/preview\" width=\"640\" height=\"480\" allowfullscreen=\"true\"></iframe>"';
}


function makeWorksheet($desc,$docURL) { 
	return '"<p>' . $desc . ' <a href=\"' . $docURL . '\" target=\"_blank\">Link to worksheet</a></p><br/><iframe src=\"' . $docURL . '/preview\" frameborder=\"0\" width=\"700px\" height=\"910px\" allowfullscreen=\"true\" mozallowfullscreen=\"true\" webkitallowfullscreen=\"true\"></iframe>"'; // <!-- width="960" height="569"   height="450px" -->
}

function makeSlides($desc,$slideURL) { 
	return '"<p>' . $desc . '</p><br/><iframe src=\"' . $slideURL . '/embed?start=false&loop=false&delayms=3000\" frameborder=\"0\" width=\"700px\" height=\"450px\" allowfullscreen=\"true\" mozallowfullscreen=\"true\" webkitallowfullscreen=\"true\"></iframe>"'; // <!-- width="960" height="569" -->
}

function makeText($desc,$slideURL) { 
	return '"' . $desc . '"';
}

function makeTwo($func1,$desc1,$link1,$func2,$desc2,$link2) {
	eval('$output = substr(' . $func1 . '("' . $desc1 . '","' . $link1 . '"),0,-1);');
	$output .= '<br/><br/>';
	eval('$output .= substr(' . $func2 . '("' . $desc2 . '","' . $link2 . '"),1);');
	return $output;
}


function makeThree($maindesc,$func1,$desc1,$link1,$func2,$desc2,$link2,$func3,$desc3,$link3) {
	$output = '"' . $maindesc;
	eval('$output .= substr(' . $func1 . '("' . $desc1 . '","' . $link1 . '"),1,-1);');
	$output .= '<br/><br/>';
	eval('$output .= substr(' . $func2 . '("' . $desc2 . '","' . $link2 . '"),1,-1);');
	$output .= '<br/><br/>';
	eval('$output .= substr(' . $func3 . '("' . $desc3 . '","' . $link3 . '"),1);');

	return $output;
}


function makeCombo($maindesc,$func1,$desc1,$link1,$func2,$desc2,$link2) {
	$output = '"' . $maindesc;
	$output .= '<br/><br/>';
	eval('$output .= substr(' . $func1 . '("' . $desc1 . '","' . $link1 . '"),1,-1);');
	$output .= '<br/><br/>';
	eval('$output .= substr(' . $func2 . '("' . $desc2 . '","' . $link2 . '"),1);');
	return $output;
}


function makeOr($maindesc,$func1,$desc1,$link1,$func2,$desc2,$link2) {
	$output = '"' . $maindesc;
	$output .= '<br/><br/>';
	eval('$output .= substr(' . $func1 . '("' . $desc1 . '","' . $link1 . '"),1,-1);');
	$output .= '<br/>' . 'OR' . '<br/>';
	eval('$output .= substr(' . $func2 . '("' . $desc2 . '","' . $link2 . '"),1);');
	return $output;
}

  $q=$_GET["id"];

if ($q=="googlecoursenumber") {
	
$link = mysqli_connect("servername", "username","password", "database");


if (!$link) {
    $num1 = "Error: Unable to connect to MySQL." . PHP_EOL;
    $num1 .= "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    $num1 .= "Debugging error: " . mysqli_connect_error() . PHP_EOL;
	//echo $num1; //json_encode(array($num1, $num2));  
    exit;
}


$num2='{';
$num1='Subject keys = ';
$alldays = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
foreach ($alldays as $wcount => $weekday) {

   if($wcount>0) { 
   	 $num2 .= ','; 
   }
	
	
	$subjectstack = [];//array();
	$subjkeystack = [];//array();
	
	//print_r($subjectstack);
	
	if ($stmt = mysqli_prepare($link, "SELECT subject, subj_key FROM `shsubject` WHERE `weekday`=?")) {
	
		 $num2 .= '"' . $weekday . '":{';
	    // bind parameters for markers 
	    mysqli_stmt_bind_param($stmt, "s", $weekday);
	
	    // execute query 
	    mysqli_stmt_execute($stmt);
	
	    // bind result variables 
	    mysqli_stmt_bind_result($stmt, $subject, $subj_key);
		 //mysqli_store_result($stmt);
		// For each subject ...
	    while(mysqli_stmt_fetch($stmt)) {		
			array_push($subjectstack, $subject);
			array_push($subjkeystack, $subj_key);
		}
		
		
		//}
		 	 
	    /* close statement */
	  mysqli_stmt_close($stmt);
	  
	}
	$num1 .= count($subjectstack);
	$counter = 0;
	for ($i=0, $len=count($subjectstack); $i<$len; $i++) {
		      $counter = $counter + 1;
		      if($counter>1) { 
		      	 $num2 .= ','; 
		      }
		      $num2 .= '"' . $subjectstack[$i]  . '":[';  
	
				// For each task in subject ... SELECT title, description FROM `shtask` WHERE `subj_key`=?  ORDER BY `task_key`
				if ($tskst = mysqli_prepare($link, "SELECT title, description FROM `shtask` WHERE `subj_key`=?   ORDER BY `task_key`")) {
					$tcount = 0;
	    			mysqli_stmt_bind_param($tskst, "s", $subjkeystack[$i]);
	    			mysqli_stmt_execute($tskst);								
	    			mysqli_stmt_bind_result($tskst, $title, $description);				
		 			mysqli_store_result($tskst);
		 			
	    			while(mysqli_stmt_fetch($tskst)) {		
				      $tcount = $tcount + 1;
				      if($tcount>1) { 
				      	 $num2 .= ','; 
				      }
				      if($description[0]=='\'' || $description[0]=='"' || $description[0]=='“' || $description[0]=='”') {  // “”
				      $num2 .=  $description ;  

					   } else {
					   	eval('$num2 .=  ' . $description . ';');
					   } 	
	    			}
				$num1 .= '"' . $subjkeystack[$i] . ': ' . $tcount . '",';
				} else {
					$num1 .= mysqli_stmt_error( $tskst ) ;
				}
	    		mysqli_stmt_close($tskst);
			   $num2 .= ']'; 
	}
	$num2 .= '}'; 
}
$num2 .= '}'; 
mysqli_close($link);
    } else {
      	$num1="Warning: Your class configuration may need to be updated.";
      	$num2="{}";
    }

echo json_encode(array($num1, $num2));  


?>