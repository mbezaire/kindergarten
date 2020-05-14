<?php

$link = mysqli_connect("servername", "username","password", "database");

if (!$link) {
//    echo "Error: Unable to connect to MySQL." . PHP_EOL;
//    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
//    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}
$counter = 0;
$weekday = 'Wednesday';

if ($stmt = mysqli_prepare($link, "SELECT subject, title, description FROM `Sheet1` WHERE `weekday`=?")) {

    /* bind parameters for markers */
    mysqli_stmt_bind_param($stmt, "s", $weekday);

    /* execute query */
    mysqli_stmt_execute($stmt);

    /* bind result variables */
    mysqli_stmt_bind_result($stmt, $subject, $title, $description);

    /* fetch value */
    while(mysqli_stmt_fetch($stmt)) {
	    $counter = $counter + 1;
    	 printf("%s\'s %s has task %s: %s\n", $weekday,  $subject, $title, $description);
	 }
    /* close statement */
    mysqli_stmt_close($stmt);
}

mysqli_close($link);

?>