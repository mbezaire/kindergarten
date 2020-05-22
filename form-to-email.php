
<?php
	$email_from = 'support@kinderclassroom.org';

	$email_subject = "New Form submission";

	$email_body = "You have received a new message from the user $visitor_name.\n".
                            "Here is the message:\n $message".


$to = "support@kinderclassroom.org";

$headers = "From: $email_from \r\n";

$headers .= "Reply-To: $visitor_email \r\n";

function IsInjected($str)
{
    $injections = array('(\n+)',
           '(\r+)',
           '(\t+)',
           '(%0A+)',
           '(%0D+)',
           '(%08+)',
           '(%09+)'
           );
               
    $inject = join('|', $injections);
    $inject = "/$inject/i";
    
    if(preg_match($inject,$str))
    {
      return true;
    }
    else
    {
      return false;
    }
}

if(IsInjected($visitor_email))
{
    echo "<br/><br/><h4>Bad email value!</h4>";
    exit;
}

if (!filter_var($visitor_email, FILTER_VALIDATE_EMAIL)) {
  $success = "<br/><br/><h4>Invalid email format</h4>";
} else if (mail($to,$email_subject,$email_body,$headers)){
		$success = "<br/><br/><h4>Your message was submitted.</h4>";
	}else{
		$success = "<br/><br/><h4>Message was not sent; please try again.</h4>";
	}
	echo $success;
?>
