<?php
   $db = new mysqli("localhost","root","","grocery_shop");
   if($db->connect_error){
       die("Database Not found");
   }
?>