<?php
   $db = new mysqli("localhost","root","","grocery_shop_dev");
   if($db->connect_error){
       die("Database Not found");
   }
?>