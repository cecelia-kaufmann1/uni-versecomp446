var volume_toggle, font_toggle, font_size_toggle, buttons_toggle, colors_toggle;

$(document).ready(function () {
    getAccessibilityInDB();
    $("#volume_toggle").on('change', function() {
        volume_toggle = convertToNumber($(this).is(':checked'));
    });

    $("#font_toggle").on('change', function() {
        font_toggle = convertToNumber($(this).is(':checked'));
    });

    $("#font_size_toggle").on('change', function() {
        font_size_toggle = convertToNumber($(this).is(':checked'));
    });

    $("#buttons_toggle").on('change', function() {
        buttons_toggle = convertToNumber($(this).is(':checked'));
    });
    
    $("#colors_toggle").on('change', function() {
        colors_toggle = convertToNumber($(this).is(':checked'));
    });

    $("#confirm_button").on('click', function() {
        console.log("AJAX WAS CALLED FOR ACCESSIBILITY");
        updateAccessibilityInDB();
    });
})

function convertToNumber(toggle) {
    if (toggle){
        return "1";
    }
    else {
        return "0";
    }
}
function updateUI(data) {

    $("#volume_toggle").prop('checked', data.volume)
    $("#font_toggle").prop('checked', data.font)
    $("#font_size_toggle").prop('checked', data.font_size)
    $("#buttons_toggle").prop('checked', data.buttons)
    $("#colors_toggle").prop('checked', data.colors)


}

function getAccessibilityInDB() {
    console.log("GET ACCESSIBILITY IN DB CALLED");
    $.ajax({
        url: '/get_accessibility/',
        type: "GET",
        dataType: "json",
        success: function (data) {
            // owns = convertStringToArray(data.owns);
            // console.log("VOLUME IS:", data.volume);

            updateUI(data)
            
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}

function updateAccessibilityInDB() {
    $.ajax({
        type: 'POST',
        url: '/update_accessibility/',
        data: {
            volume: volume_toggle,
            
            font: font_toggle,
            font_size: font_size_toggle,
            buttons: buttons_toggle,
            colors: colors_toggle
        }
    })
}