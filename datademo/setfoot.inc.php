<?php
  
  $q=$_GET["id"];

      if ($q=="001") {
      	$num1="chatlink1;chatlink2;classroomcustomlink";
      	$num2='helpName;helpLink;helpSignup';
    } else {
      	$num1="Warning: Your class configuration may need to be updated.";
      	$num2="{}";
    }
      	echo json_encode(array($num1, $num2));  
?>
