$(document).ready(function () {

    $('#next_button').on('click', function() {
        goToSignUp();
    })

    $('#back_to_cg').on('click', function() {
        goToCG();
    })

})

function goToSignUp() {
    $('#community_guidelines').css('display', 'none');
    $('#form').css('display', 'block');
}

function goToCG() {
    $('#community_guidelines').css('display', 'block');
        $('#form').css('display', 'none');
}