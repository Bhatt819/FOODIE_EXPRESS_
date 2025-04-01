<?php
$servername = "localhost";
$username = "root"; // Change if needed
$password = ""; // Add your password if necessary
$dbname = "billingDB";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $full_name = $_POST["name"];
    $mobile = $_POST["mobile"];
    $landmark = $_POST["landmark"];
    $pincode = $_POST["pincode"];
    $city = $_POST["city"];
    $state = $_POST["state"];
    $order_total = 1000.00; // Replace with the actual cart total from frontend

    $sql = "INSERT INTO billingDetails (full_name, mobile, landmark, pincode, city, state, order_total)
            VALUES ('$full_name', '$mobile', '$landmark', '$pincode', '$city', '$state', '$order_total')";

    if ($conn->query($sql) === TRUE) {
        echo "Record saved successfully!";
        // Redirect to payment page or show confirmation
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
