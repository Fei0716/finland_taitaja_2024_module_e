<?php
session_start();

// Generate CAPTCHA if not set
if (!isset($_SESSION['total'])) {
    $_SESSION['randomNo1'] = mt_rand(0, 9);
    $_SESSION['randomNo2'] = mt_rand(0, 9);
    $_SESSION['total'] = $_SESSION['randomNo1'] + $_SESSION['randomNo2'];
}

$error = ''; // Initialize $error

// Check CAPTCHA and process form
if ($_SERVER['REQUEST_METHOD'] === "POST") {
    if ($_POST['captcha'] != $_SESSION['total']) {
        $error = 'Captcha Is Invalid';
    } else {
        $error = 'No Error';

        // Collect form data
        $name = htmlspecialchars($_POST['name']);
        $email = htmlspecialchars($_POST['email']);
        $game_name = htmlspecialchars($_POST['game_name']);
        $date_time = htmlspecialchars($_POST['date_time']);
        $game_suggestions = htmlspecialchars($_POST['game_suggestions']);

        // Format the message
        $message = "Name: $name\n";
        $message .= "Email: $email\n";
        $message .= "Suggested Game Name: $game_name\n";
        $message .= "Date and Time: $date_time\n";
        $message .= "Game Suggestions: $game_suggestions\n";

        // Email parameters
        $recipient = "info@webkehitys.fi";
        $subject = "Feedback for Upcoming Game Event";
        $headers = "From: $name <$email>\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        // Send email
        if (mail($recipient, $subject, $message, $headers)) {
            $error = 'Feedback sent successfully';
        } else {
            $error = 'Failed to send feedback';
        }

        // Clear CAPTCHA session data
        unset($_SESSION['total'], $_SESSION['randomNo1'], $_SESSION['randomNo2']);
    }
}
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

<form method="post" action="#">
    <h1>Feedback Form</h1>
    <?php
    if ($error) {
        echo $error;
    }
    ?>
    <div>
        <label for="name">Name</label>
        <input type="text" name="name" id="name" required>
    </div>
    <div>
        <label for="email">Email</label>
        <input type="email" name="email" id="email" required>
    </div>
    <div>
        <label for="game_name">Suggest a name for the game event</label>
        <input type="text" name="game_name" id="game_name" required>
    </div>
    <div>
        <label for="date_time">Date and Time</label>
        <input type="datetime-local" name="date_time" id="date_time" required>
    </div>
    <div>
        <label for="game_suggestions">Which games should be played at the event?</label>
        <input type="text" name="game_suggestions" id="game_suggestions" required>
    </div>
    <div>
        <label for="captcha">Solve This: <?= $_SESSION['randomNo1']?> + <?= $_SESSION['randomNo2']?></label>
        <input type="number" name="captcha" id="captcha" required>
    </div>
    <div>
        <button type="submit">Submit</button>
    </div>
</form>
</body>
</html>
