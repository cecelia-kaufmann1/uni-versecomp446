var volume_toggle, font_toggle, font_size_toggle, buttons_toggle, colors_toggle;

$(document).ready(function () {
    getAccessibilityInDB();

    $("#volume_toggle").on('click', function() {
        checkVolumeToggle();
    })
    
    $("#font_toggle").on('change', function() {
        font_toggle = convertToNumber($(this).is(':checked'));
        tryNewUI('accessibleFont', font_toggle);
    });

    $("#font_size_toggle").on('change', function() {
        font_size_toggle = convertToNumber($(this).is(':checked'));
        tryNewUI('bigFont', font_size_toggle);
    });

    $("#buttons_toggle").on('change', function() {
        buttons_toggle = convertToNumber($(this).is(':checked'));
        tryNewUI('medPink', buttons_toggle);
        tryNewUI('simpleButton', buttons_toggle);
    });
    
    $("#colors_toggle").on('change', function() {
        colors_toggle = convertToNumber($(this).is(':checked'));
    });

    $("#confirm_button").on('click', function() {
        console.log("AJAX WAS CALLED FOR ACCESSIBILITY");
        updateAccessibilityInDB();
    });

    console.log("SETTINGS.JS FINISHED THEIR DOM READY METHOD");

})

function convertToNumber(toggle) {
    if (toggle){
        return "1";
    }
    else {
        return "0";
    }
}

function tryNewUI(attribute, checked){
    if (checked == "1") {
        $("body").addClass(attribute);
    }
    else {
        $("body").removeClass(attribute);
    }
}
function checkVolumeToggle() {
    if ($("#volume_toggle").attr("src").includes("unmute")) {
        $("#volume_toggle").attr("src", "../static/loginscreen/assets/images/icons/muted.png")
        volume_toggle = '0';
    }
    else {
        $("#volume_toggle").attr("src", "../static/loginscreen/assets/images/icons/unmuted.png")
        volume_toggle = '1';
    }
}

function updateVolumeToggle(data) {
    if (data == '1'){
        $("#volume_toggle").attr("src", "../static/loginscreen/assets/images/icons/unmuted.png")
    }
    else {
        $("#volume_toggle").attr("src", "../static/loginscreen/assets/images/icons/muted.png")
    }
}
function updateUI(data) {
    updateVolumeToggle(data.volume);
    $("#font_toggle").prop('checked', data.font);
    $("#font_size_toggle").prop('checked', data.font_size);
    $("#buttons_toggle").prop('checked', data.buttons);
    $("#colors_toggle").prop('checked', data.colors);
}

function updateVariables(data){
    volume_toggle = convertToNumber(data.volume);
    font_toggle = convertToNumber(data.font);
    font_size_toggle = convertToNumber(data.font_size);
    buttons_toggle = convertToNumber(data.buttons);
    colors_toggle = convertToNumber(data.colors);

    console.log("ALL SETTINGS.JS VARIABLES ARE UPDATED");

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

            updateUI(data);
            updateVariables(data);
            
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

    window.location.href = '/home/';  // Adjust the URL as needed

}