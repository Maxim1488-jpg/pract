<?php
session_start();

if (isset($_POST["login"], $_POST["password"])) {
    require "vendor/autoload.php";

    $db = new \Photos\DB();
    $user_id = $db->check_user($_POST["login"], $_POST["password"]);

    if ($user_id) {    
        $_SESSION["user_id"] = $user_id;
        header("Location: user.php");
        exit();
    } else {  
        header("Location: index.php?error=login");
        exit();
    }
}