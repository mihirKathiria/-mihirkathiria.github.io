$(document).ready(function() {
    $("#signin_here").click(function(e) {
        var password = $("#signin_pass").val()
        var repass = $("#signin_repass").val()
        if (password.match(repass)) {
            e.preventDefault();
            $.ajax({
                type: "POST",
                url: "php/registration_success.php",
                data: {
                    fullname: $("#signin_fullname").val(),
                    monumber: $("#signin_monumber").val(),
                    email: $("#signin_email").val(),
                    password: $("#signin_pass").val()
                },
                beforeSend: function() {
                    $("#signin_here").html("Please Wait...");
                },
                success: function(response) {
                    if(response.trim()== "Sign in Success :)") window.location = "login.html"
                }
            });
        } else {
            alert("Please Confirm Pasword Or Recheck")
        }
    });
});