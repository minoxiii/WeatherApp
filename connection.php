<?php
$serverName = "localhost";
$userName= "root";
$password = "";
$conn = mysqli_connect($serverName, $userName, $password);
if ($conn){
    echo "Connection Successful <br>";
}
else {
    echo "Failed to connect".mysqli_connect_error();
}

$createDatabase = "CREATE DATABASE IF NOT EXISTS prototype2";
if (mysqli_query($conn, $createDatabase)) {
    echo "Database Created or already Exists <br>";
} else {
    echo "Failed to create database <br>" . mysqli_connect_error();
}

// Select the created database
mysqli_select_db($conn, 'prototype2');

$createTable = "CREATE TABLE IF NOT EXISTS weather ( 
       humidity FLOAT NOT NULL,
       wind FLOAT NOT NULL,
       pressure FLOAT NOT NULL
   );";
   if (mysqli_query($conn, $createTable)) {
       echo "Table Created or already Exists <br>";
   } else {
       echo "Failed to create database <br>" . mysqli_connect_error();
   }
   
if (isset($_GET['q'])){
    $cityName = $_GET['q'];
    echo $cityName;
} else {
    $cityName = "North East Lincolnshire";
}

$selectAllData = "SELECT * FROM weather where city = '$cityName' ";
$result = mysqli_query($conn, $selectAllData);
if (mysqli_num_rows($result) == 0) {
    $url = "https://api.openweathermap.org/data/2.5/weather?q=NorthEastLincolnshire&appid=ba791b84cedde7a962a247256f519444";
    $response = file_get_contents($url);
if ($response === FALSE) {
    echo "Error: Unable to fetch data from the API.";
} else {
    echo $response;
}

    if ($response === FALSE) {
        die("Failed to fetch data from API.");
    }

    $data = json_decode($response, true);

    $humidity = $data['main']['humidity'];
    $wind = $data['wind']['speed'];
    $pressure = $data['main']['pressure'];

    $insertData = "INSERT INTO weather (city, humidity, wind, pressure) 
                       VALUES ('$cityName', '$humidity', '$wind', '$pressure')";

        if (mysqli_query($conn, $insertData)) {
            echo "Data inserted successfully!";
        } else {
            echo "Failed to insert data: " . mysqli_error($conn);
        }
    }

?>