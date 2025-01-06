$(document).ready(function () {
    $('#next_button').on('click', function() {
        goToSignUp();
    })

    $('#back_to_cg').on('click', function() {
        goToCG();
    })

     // Add click event for the "Sign Up" button
     $('#account_button').on('click', function() {
        submitFormAndRedirect();
    });

})

// On click to go to Sign Up
function goToSignUp() {
    $('#community_guidelines').css('display', 'none');
    $('#form').css('display', 'block');
}

function goToCG() {
    $('#community_guidelines').css('display', 'block');
        $('#form').css('display', 'none');
}

// Function to submit the form and redirect to login
function submitFormAndRedirect() {
    $('#form').submit();
    window.location.href = '/';  // Adjust the URL as needed
}