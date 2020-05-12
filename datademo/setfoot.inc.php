<?php
  
  $q=$_GET["id"];

      if ($q=="001") {
      	$num1="91103140304?pwd=WVhWcTQxelpQcEp6VkU3VUNpRlI3Zz09;91103140304?pwd=WVhWcTQxelpQcEp6VkU3VUNpRlI3Zz09";
      	$num2='{"Monday":{"ELA":["assignment"],"Math":["assignment"],"Science":["assignment"]},"Tuesday":{"ELA":["assignment"],"Math":["assignment"],"SEL":["assignment"]},"Wednesday":{"ELA":["assignment"],"Math":["assignment"],"Social Studies":["assignment"]},"Thursday":{"ELA":["assignment"],"Math":["assignment"],"Science":["assignment"]},"Friday":{"ELA":["assignment"],"Math":["assignment"],"STEAM":["assignment"]}}';
    } else {
      	$num1="Warning: Your class configuration may need to be updated.";
      	$num2="{}";
    }
      	echo json_encode(array($num1, $num2));  
?>