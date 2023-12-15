$(document).ready(function () {
    console.log("ready boys");

    $("#volume_toggle").on('change', function() {
        console.log($(this).is(':checked'));
    });

    $("#font_toggle").on('change', function() {
        console.log($(this).is(':checked'));
    });

    $("#font_size_toggle").on('change', function() {
        console.log($(this).is(':checked'));
    });

    $("#buttons_toggle").on('change', function() {
        console.log($(this).is(':checked'));
    });
    
    $("#colors_toggle").on('change', function() {
        console.log($(this).is(':checked'));
    });

    

})