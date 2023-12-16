$(document).ready(function () {
    console.log("ready boys");
    getAccessibilityInDB();

})

function updateUI(data) {
    if ((data.font_size)) {
        // $("body").addClass("bigFont");
        // $("body").css("fontSize", "120%");
        $('body').attr('id', 'bigFont');

        console.log("CHANGED FONT SIZE: BIG");
    }
    else {
        $("body").removeClass("bigFont");
        console.log("CHANGED FONT SIZE: NORMAL");
    }
    
}

function getAccessibilityInDB() {
    console.log("layout.js get accessibilty called");
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