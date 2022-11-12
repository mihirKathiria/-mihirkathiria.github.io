<?php
    require("../database.php");

    $fullname = $_POST["fullname"];
    $monumber = $_POST["monumber"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    $insert_data = "INSERT INTO `users`(`full_name`, `email`, `ph_number`, `password`) 
    VALUES ('$fullname','$email','$monumber','$password')";

    if($db->query($insert_data)){
        echo "Sign in Success :)";
    }
    else{
        echo "Sign in failed !";
    }
?>