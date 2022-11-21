<?php
require("../database.php");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

// all of our endpoints start with /address
// everything else results in a 404 Not Found
if ($uri[4] !== 'address') {
    header("HTTP/1.1 404 Not Found");
    exit();
}

// the user id is, of course, optional and must be a number:
$userId = null;
if (isset($uri[5])) {
    $userId = (int) $uri[5];
}

$addressId = null;
if (isset($uri[6])) {
    $addressId = (int) $uri[6];
}

$requestMethod = $_SERVER["REQUEST_METHOD"];

// pass the request method and user ID to the PersonController and process the HTTP request:
echo addressMethods($db, $requestMethod, $userId, $addressId);

function addressMethods($db, $requestMethod, $userId, $addressId)
{
    switch ($requestMethod) {
        case 'GET':
            if ($userId && $addressId) {
                $response = getUserAddress($db, $addressId);
            } else if ($userId) {
                $response = getAddresses($db, $userId);
            }
            break;
        case 'POST':
            $response = addNewUserAddress($db);
            break;
        case 'PUT':
            $response = updateUserAddress($db, $addressId);
            break;
        case 'DELETE':
            $response = deleteUserAddress($db, $userId);
            break;
        default:
            $response = notFoundResponse();
            break;
    }
    header($response['status_code_header']);
    if ($response['body']) {
        return $response['body'];
    }
}

function getAddresses($db, $id)
{
    //RETRIEVE ALL Addresses
    $allDataQuery = "SELECT 
        s.addr_1, s.addr_2, s.addr_3, s.city, s.town, s.pincode, s.id 
        FROM 
        users u 
        INNER JOIN 
        user_customer_details d 
        ON 
        u.id = d.user_id
        INNER JOIN 
        customer_details s 
        ON 
        d.customer_detail_id = s.id
        WHERE 
        u.id = '$id'";
    $allAddresses = $db->query($allDataQuery);

    //Check if there is rows
    if ($allAddresses->num_rows != 0) {
        $jsonData = array();
        while ($array = mysqli_fetch_assoc($allAddresses)) {
            $jsonData[] = $array;
        }
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($jsonData);
        return $response;
    }
    //If no results 
    else {
        $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
        $response['body'] = "[]";
        return $response;
    }
}

function getUserAddress($db, $addressId)
{
    $addressQuery = "SELECT * FROM customer_details WHERE id = '$addressId'";
    $addressQuery = $db->query($addressQuery);

    //Check if there is rows
    if ($addressQuery->num_rows != 0) {
        $address = mysqli_fetch_assoc($addressQuery);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($address);
        return $response;
    }
    //If no results 
    else {
        $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
        $response['body'] = "[]";
        return $response;
    }

}


function addNewUserAddress($db)
{

    $input = (array) json_decode(file_get_contents('php://input'), TRUE);
    if (!validateAddress($input)) {
        return unprocessableEntityResponse();
    }

    //Add Details
    $address1 = $input['address1'];
    $address2 = $input['address2'];
    $address3 = $input['address3'];
    $pincode = $input["pincode"];
    $city = $input["city"];
    $town = $input["town"];

    //Data Query
    $insert_data = "INSERT INTO 
                `customer_details` (`addr_1`, `addr_2`, `addr_3`, `pincode`, `city`, `town`) 
                VALUES 
                ('$address1', '$address2', '$address3','$pincode','$city','$town')";
    //Validate Insertion
    if ($db->query($insert_data) === true) {

        //Retrieve last added item id
        $retrieve_id = $db->insert_id;

        //Insert Into User Customer Details Table for reference
        $insert_relation = "INSERT INTO `user_customer_details` (`user_id`, `customer_detail_id`) VALUES ('1', '$retrieve_id')";
        if ($db->query($insert_relation)) {
            $response['status_code_header'] = 'HTTP/1.1 201 Created';
            $response['body'] = null;
            return $response;
        }
    }
    return unprocessableEntityResponse();
}


function updateUserAddress($db, $addressId)
{

    $result = findAddress($db, $addressId);
    if (!$result) {
        return notFoundResponse();
    }
    $input = (array) json_decode(file_get_contents('php://input'), TRUE);
    if (!validateAddress($input)) {
        return unprocessableEntityResponse();
    }
    // updateAddress($id, $input);

    //Add Details
    $address1 = $input['address1'];
    $address2 = $input['address2'];
    $address3 = $input['address3'];
    $pincode = $input["pincode"];
    $city = $input["city"];
    $town = $input["town"];

    //Data Query
    $updateQuery = "UPDATE 
            `customer_details` 
            SET 
            `addr_1`= '$address1',`addr_2`='$address2',`addr_3`='$address3', 
            `pincode`='$pincode',`city`='$city',`town`='$town' 
            WHERE 
            id = '$addressId'";
    //Validate Insertion
    if ($db->query($updateQuery) === true) {
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = null;
        return $response;
    } else {
        return unprocessableEntityResponse();
    }
}

function findAddress($db, $addressId)
{
    $findQuery = "SELECT * FROM `customer_details` WHERE id='$addressId'";
    $result = $db->query($findQuery);
    if ($result->num_rows != 0) {
        return mysqli_fetch_assoc($result);
    }
    return null;
}

function validateAddress($input)
{
    if (!isset($input['address1'])) {
        return false;
    }
    if (!isset($input['pincode'])) {
        return false;
    }
    if (!isset($input['city'])) {
        return false;
    }
    if (!isset($input['town'])) {
        return false;
    }
    return true;
}

function deleteUserAddress($db, $id)
{
    $result = findAddress($db, $id);
    if (!$result) {
        notFoundResponse();
    }

    $deleteQuery = "DELETE FROM `customer_details` WHERE id='$id'";
    if ($db->query($deleteQuery) === true) {
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = null;
        return $response;
    } else {
        return unprocessableEntityResponse();
    }
}


function unprocessableEntityResponse()
{
    $response['status_code_header'] = 'HTTP/1.1 422 Unprocessable Entity';
    $response['body'] = json_encode([
        'error' => 'Invalid input'
    ]);
    return $response;
}

function notFoundResponse()
{
    $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
    $response['body'] = null;
    return $response;
}



?>