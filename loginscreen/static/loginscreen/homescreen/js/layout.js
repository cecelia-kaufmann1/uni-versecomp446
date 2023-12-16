$(document).ready(function () {
    console.log("ready boys");
    getAccessibilityInDB();

    console.log("LAYOUT.JS FINISHED THEIR DOM READY METHOD");

})

function updateAllUI(data) {
    
    updateUIElement(data.font, "accessibleFont");
    updateUIElement(data.font_size, "bigFont");
    updateUIElement(data.button, "medPink");
    console.log("updateAllUI is called");
    
}

function updateUIElement(checked, attribute) {
    if (checked){
        $('body').addClass(attribute);
        console.log("ADDED CLASS " + attribute);
    }
    else {
        $('body').removeClass(attribute);
        console.log("REMOVED CLASS " + attribute);
    }
}

function getAccessibilityInDB() {
    console.log("layout.js get accessibilty called");
    $.ajax({
        url: '/get_accessibility/',
        type: "GET",
        dataType: "json",
        success: function (data) {
            updateAllUI(data) 
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}