$(document).ready(function () {
    $("#customer_details_here").click(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "php/customer_details.php",
            data: {
                address1: $("#customer_details_address").val(),
                address2: $("#customer_details_address").val(),
                address3: $("#customer_details_address").val(),
                pincode: $("#customer_details_pincode").val(),
                city: $("#customer_details_city").val(),
                town: $("#customer_details_town").val()
            },
            beforeSend: function () {
                $("#customer_details_here").html("Please Wait...");
            },
            success: function (response) {
                alert(response.trim());
            }
        });
    });
});

(function ($) {

    "use strict";

    var fullHeight = function () {

        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function () {
            $('.js-fullheight').css('height', $(window).height());
        });

    };
    fullHeight();

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

})(jQuery);


//Function to retrieve all addresses of customer
function getUserAddresses() {

    //Will need to change to parameter of fun
    var id = 1;
    const url = "php/customer_details.php/address/" + id;
    var toBeReturn;
    $.ajax({
        type: "GET",
        url: url,
        async: false,
        success: function (response) {
            toBeReturn = response;
        }
    });
    return toBeReturn;
}

//Function to show address panel
//Need to add parameter ID
function showAddressPanel() {
    //If there is id then retrieve all addresses
    // var address;
    // var addresses = [];
    // var addresses = [
    //     {
    //         id: "1",
    //         addr_1: "Somewhere",
    //         addr_2: "Somewhere",
    //         addr_3: "Somewhere",
    //         pincode: "12345",
    //         city: "Anand",
    //         town: "Anand"
    //     },
    //     {
    //         id: "2",
    //         addr_1: "Anand",
    //         addr_2: "Anand",
    //         addr_3: "Anand",
    //         pincode: "12345",
    //         city: "Ahmedabad",
    //         town: "Ahmedabad"
    //     }
    // ];

    var addresses = getUserAddresses();

    //Make call for existing addresses
    if (addresses.length > 0) {

        //Prepare SideMenu
        var addressBar;

        //Prepare already existing address bar
        addressBar = "<div class=\"row\">" +
            "<div class=\"col-4\">" +
            "<div class=\"list-group\" id=\"list-tab\" role=\"tablist\">";

        //Buttons for all address to update
        $.each(addresses, function (i) {
            addressBar = addressBar +
                "<a class=\"list-group-item list-group-item-action\" id=\"address_" + addresses[i]['id'] + "\" data-toggle=\"list\"" +
                "href=\"#address" + addresses[i]['id'] + "\" role=\"tab\" aria-controls=\"home\">Address " + (i + 1) + "</a>"
        });

        //Add new address button
        addressBar = addressBar +
            "<a class=\"list-group-item list-group-item-action\" id=\"add_new_address\" data-toggle=\"list\"" +
            "href=\"#addNewAddress\" role=\"tab\" aria-controls=\"settings\">Add New Address</a>"

        //Closing Address bar menu
        addressBar = addressBar + "</div></div>" +
            "<div class=\"col-8\">" +
            "<div class=\"tab-content\" id=\"nav-tabContent\">";

        //Prepare Update Address Form Menu
        $.each(addresses, function (i) {
            if (addresses[i]['addr_1'] == null) addresses[i]['addr_1'] = "";
            if (addresses[i]['addr_2'] == null) addresses[i]['addr_2'] = "";
            if (addresses[i]['addr_3'] == null) addresses[i]['addr_3'] = "";
            if (addresses[i]['pincode'] == null) addresses[i]['pincode'] = "";
            if (addresses[i]['city'] == null) addresses[i]['city'] = "";
            if (addresses[i]['town'] == null) addresses[i]['town'] = "";
            addressBar = addressBar +
                "<div class=\"tab-pane fade\" id=\"address" + addresses[i]['id'] + "\" role=\"tabpanel\"" +
                "aria-labelledby=\"#address" + addresses[i]['id'] + "\">" +
                "<div class=\"tab-content\" id=\"nav-tabContent\">" +
                "<div class=\"row\">" +
                "<div class=\"row mt-3\">" +
                "<div class=\"col-md-12\"><label class=\"labels\">Address Line 1</label><input " +
                "type=\"text\" class=\"form-control register_addr_1\" placeholder=\"Enter address line 1\"" +
                "value=\"" + addresses[i]['addr_1'] + "\">" +
                "</div>" +
                "<div class=\"col-md-12\"><label class=\"labels\">Address Line 2</label><input " +
                "type=\"text\" class=\"form-control register_addr_2\" placeholder=\"Enter address line 2\"" +
                "value=\"" + addresses[i]['addr_2'] + "\">" +
                "</div>" +
                "<div class=\"col-md-12\"><label class=\"labels\">Address Line 3</label><input " +
                "type=\"text\" class=\"form-control register_addr_3\" placeholder=\"Enter address line 3\"" +
                "value=\"" + addresses[i]['addr_3'] + "\">" +
                "</div>" +
                "</div>" +
                "<div class=\"row mt-3\">" +
                "<div class=\"col\"><label class=\"labels\">Pincode</label><input type=\"text\"" +
                "class=\"form-control register_pincode\" placeholder=\" Enter Pincode\" value=\"" + addresses[i]['pincode'] + "\"></div>" +
                "<div class=\"col\"><label class=\"labels\">City</label><input type=\"text\"" +
                "class=\"form-control register_city\" value=\"" + addresses[i]['city'] + "\" placeholder=\"Enter City\"></div>" +
                "<div class=\"col\"><label class=\"labels\">Town</label><input type=\"text\"" +
                "class=\"form-control register_town\" value=\"" + addresses[i]['town'] + "\" placeholder=\"Enter Town\"></div>" +
                "</div>" +
                "<div class=\"mt-5 text-center\"><button class=\"btn btn-primary profile-button\"" +
                "type=\"button\" onclick=\"updateAddress("+ addresses[i]['id'] +")\">Save Address</button></div>" +
                "</div>" +
                "</div>" +
                "</div>";
        });

        //Add new address form
        addressBar = addressBar +
            "<div class=\"tab-pane fade show active\" id=\"addNewAddress\" role=\"tabpanel\"" +
            "aria-labelledby=\"add_new_address\">" +
            "<div class=\"tab-content\" id=\"nav-tabContent\">" +
            "<div class=\"row\">" +
            "<div class=\"row mt-3\">" +
            "<div class=\"col-md-12\"><label class=\"labels\">Address Line 1</label><input " +
            "type=\"text\" class=\"form-control register_addr_1\" placeholder=\"Enter Address Line 1\"" +
            "value=\"\" name=\"address1\">" +
            "</div>" +
            "<div class=\"col-md-12\"><label class=\"labels\">Address Line 2</label><input " +
            "type=\"text\" class=\"form-control register_addr_2\" placeholder=\"Enter Address Line 2\"" +
            "value=\"\" name=\"address2\">" +
            "</div>" +
            "<div class=\"col-md-12\"><label class=\"labels\">Address Line 3</label><input " +
            "type=\"text\" class=\"form-control register_addr_3\" placeholder=\"Enter Address Line 3\"" +
            "value=\"\" name=\"address3\">" +
            "</div>" +
            "</div>" +
            "<div class=\"row mt-3\">" +
            "<div class=\"col\"><label class=\"labels\">Pincode</label><input type=\"text\"" +
            "class=\"form-control register_pincode\" placeholder=\"Enter Pincode\" value=\"\" name=\"pincode\"></div>" +
            "<div class=\"col\"><label class=\"labels\">City</label><input type=\"text\"" +
            "class=\"form-control register_city\" value=\"\" placeholder=\"Enter City\" name=\"city\"></div>" +
            "<div class=\"col\"><label class=\"labels\">Town</label><input type=\"text\"" +
            "class=\"form-control register_town\" value=\"\" placeholder=\"Enter Town\" name=\"town\"></div>" +
            "</div>" +
            "<div class=\"mt-5 text-center\"><button class=\"btn btn-primary profile-button\"" +
            "type=\"button\" onclick =\"addNewAddress()\">Save Address</button></div>" +
            "</div>" +
            "</div>" +
            "</div>";

        //Close form side menu
        addressBar = addressBar + "</div></div>";

        //Add to current panel
        $("#showPanels").html(addressBar);

        //Show first address form
        var firstAddress = "#address_" + addresses[0]['id'];
        $(firstAddress).trigger('click');


    } else {
        //Prepare SideMenu
        var addressBar;

        //Prepare already existing address bar
        addressBar = "<div class=\"row\">" +
            "<div class=\"col-4\">" +
            "<div class=\"list-group\" id=\"list-tab\" role=\"tablist\">";

        //Add new address button
        addressBar = addressBar +
            "<a class=\"list-group-item list-group-item-action\" id=\"add_new_address\" data-toggle=\"list\"" +
            "href=\"#addNewAddress\" role=\"tab\" aria-controls=\"settings\">Add New Address</a>"

        //Closing Address bar menu
        addressBar = addressBar + "</div></div>" +
            "<div class=\"col-8\">" +
            "<div class=\"tab-content\" id=\"nav-tabContent\">";

        //Add new address form
        addressBar = addressBar +
            "<div class=\"tab-pane fade show active\" id=\"addNewAddress\" role=\"tabpanel\"" +
            "aria-labelledby=\"add_new_address\">" +
            "<div class=\"tab-content\" id=\"nav-tabContent\">" +
            "<div class=\"row\">" +
            "<div class=\"row mt-3\">" +
            "<div class=\"col-md-12\"><label class=\"labels\">Address Line 1</label><input " +
            "type=\"text\" class=\"form-control register_addr_1\" placeholder=\"Enter Address Line 1\"" +
            "value=\"\" name=\"address1\">" +
            "</div>" +
            "<div class=\"col-md-12\"><label class=\"labels\">Address Line 2</label><input " +
            "type=\"text\" class=\"form-control register_addr_2\" placeholder=\"Enter Address Line 2\"" +
            "value=\"\" name=\"address2\">" +
            "</div>" +
            "<div class=\"col-md-12\"><label class=\"labels\">Address Line 3</label><input " +
            "type=\"text\" class=\"form-control register_addr_3\" placeholder=\"Enter Address Line 3\"" +
            "value=\"\" name=\"address3\">" +
            "</div>" +
            "</div>" +
            "<div class=\"row mt-3\">" +
            "<div class=\"col\"><label class=\"labels\">Pincode</label><input type=\"text\"" +
            "class=\"form-control register_pincode\" placeholder=\"Enter Pincode\" value=\"\" name=\"pincode\"></div>" +
            "<div class=\"col\"><label class=\"labels\">City</label><input type=\"text\"" +
            "class=\"form-control register_city\" value=\"\" placeholder=\"Enter City\" name=\"city\"></div>" +
            "<div class=\"col\"><label class=\"labels\">Town</label><input type=\"text\"" +
            "class=\"form-control register_town\" value=\"\" placeholder=\"Enter Town\" name=\"town\"></div>" +
            "</div>" +
            "<div class=\"mt-5 text-center\"><button class=\"btn btn-primary profile-button\"" +
            "type=\"button\" onclick =\"addNewAddress()\">Save Address</button></div>" +
            "</div>" +
            "</div>" +
            "</div>";

        //Close form side menu
        addressBar = addressBar + "</div></div>";

        //Add to current panel
        $("#showPanels").html(addressBar);

    }

    // $("#showPanels").html(addresses);
}

function addNewAddress() {

    var data = {
        'address1': $('#nav-tabContent .active #nav-tabContent .register_addr_1').val(),
        'address2': $('#nav-tabContent .active #nav-tabContent .register_addr_2').val(),
        'address3': $('#nav-tabContent .active #nav-tabContent .register_addr_3').val(),
        'pincode': $('#nav-tabContent .active #nav-tabContent .register_pincode').val(),
        'city': $('#nav-tabContent .active #nav-tabContent .register_city').val(),
        'town': $('#nav-tabContent .active #nav-tabContent .register_town').val()
    }

    $.ajax({
        type: "POST",
        url: "php/customer_details.php/address",
        async: false,
        data: JSON.stringify(data),
        contentType: "application/json"
    });

    showAddressPanel();
}

function updateAddress(id) {

    var data = {
        'address1': $('#nav-tabContent .active #nav-tabContent .register_addr_1').val(),
        'address2': $('#nav-tabContent .active #nav-tabContent .register_addr_2').val(),
        'address3': $('#nav-tabContent .active #nav-tabContent .register_addr_3').val(),
        'pincode': $('#nav-tabContent .active #nav-tabContent .register_pincode').val(),
        'city': $('#nav-tabContent .active #nav-tabContent .register_city').val(),
        'town': $('#nav-tabContent .active #nav-tabContent .register_town').val()
    }
    const url = "php/customer_details.php/address/1/" + id;

    $.ajax({
        type: "PUT",
        url: url,
        async: false,
        data: JSON.stringify(data),
        contentType: "application/json"
    });

    showAddressPanel();
}

