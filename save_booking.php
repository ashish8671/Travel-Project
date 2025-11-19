<?php
$servername = "localhost";
$username = "root";
$password = "ashish@0805";  // replace with your real password
$dbname = "sikkim_travel";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Enable error display (for debugging)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Get values from form
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $firstName = $_POST['firstName'];
  $lastName = $_POST['lastName'];
  $email = $_POST['email'];
  $contact = $_POST['contact'];
  $destination = $_POST['destination'];
  $dates = $_POST['dates'];
  $message = $_POST['message'];

  $sql = "INSERT INTO bookings (name, email, phone, destination, travel_date)
          VALUES (CONCAT('$firstName', ' ', '$lastName'), '$email', '$contact', '$destination', '$dates')";

  if ($conn->query($sql) === TRUE) {
    echo "✅ Booking saved successfully!";
  } else {
    echo "❌ Error: " . $conn->error;
  }
} else {
  echo "Invalid request method.";
}

$conn->close();
?>
