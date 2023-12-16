$(document).ready(function () {
    console.log("ready boys");
    getAccessibilityInDB();

})

function updateUI(data) {
    if ((data.font_size).is(':checked')) {
        $("body").addClass("bigFont");
    }
    else {
        $("body").removeClass("bigFont");
    }
    
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