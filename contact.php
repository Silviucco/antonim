<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

	$fname = $_POST['fname'];
    $femail =$_POST['femail'];
    $fphone =$_POST['fphone'];
	$fsubject =$_POST['fsubject'];
    $fmesage =$_POST['fmesage'];

    $created_at = time();
	$attachmentUploadDir = "uploads/";
	$targetDir = $attachmentUploadDir;
	$fileName = $created_at.'-'.basename($_FILES["fdoc"]["name"]);
	$targetFilePath = $targetDir . $fileName;
	$type = $_FILES["fdoc"]["type"];
	if(move_uploaded_file($_FILES["fdoc"]["tmp_name"], $targetFilePath)){

		$file = file_get_contents($targetFilePath);
		$encoded_file = chunk_split(base64_encode($file));

		$attachments[] = array(
			'name' => $fileName, // Set File Name
			'data' => $encoded_file, // File Data
			'type' => $type, // Type
			'encoding' => 'base64' // Content-Transfer-Encoding
		);

		$email = 'baga eamilu aici';
		$text = 'Name: '. $fname . "\r\n".
				'Email: '. $femail ."\r\n".
				'Phone: '. $fphone ."\r\n".
				'Message: '. $fmesage ."\r\n";

			if(!$email || !$text) {
				return false;
			}

		$headers   = array();
		$headers[] = "To: {$email}";
		$headers[] = "From: {$femail}";
		$headers[] = "X-Mailer: PHP/".phpversion();

		$headers[] = "MIME-Version: 1.0";

		if(!empty($attachments)) {
			$boundary = md5(time());
			$headers[] = "Content-type: multipart/mixed;boundary=\"".$boundary."\"";
		} else {
			$headers[] = "Content-type: text/html; charset=UTF-8";
		}

		$message = $text;

		if(!empty($attachments)) {
			$output   = array();
			$output[] = "--".$boundary;
			$output[] = "Content-type: text/html; charset=\"utf-8\"";
			$output[] = "Content-Transfer-Encoding: 8bit";
			$output[] = "";
			$output[] = $message;
			$output[] = "";
			foreach($attachments as $attachment) {
				$output[] = "--".$boundary;
				$output[] = "Content-Type: ".$attachment['type']."; name=\"".$attachment['name']."\";";
				if(isset($attachment['encoding'])) {
					$output[] = "Content-Transfer-Encoding: " . $attachment['encoding'];
				}
				$output[] = "Content-Disposition: attachment;";
				$output[] = "";
				$output[] = $attachment['data'];
				$output[] = "";
			}
			return mail($email, $fsubject, implode("\r\n", $output), implode("\r\n", $headers));
		} else {
			return mail($email, $fsubject, $message, implode("\r\n", $headers));
		}
	}
}
?>