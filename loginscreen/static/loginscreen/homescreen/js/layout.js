$(document).ready(function () {
    console.log("ready boys");
    getAccessibility();

    console.log("LAYOUT.JS FINISHED THEIR DOM READY METHOD");

});

function updateAllUI(data) {
    
    updateUIElement(data.font, "accessibleFont");
    updateUIElement(data.font_size, "bigFont");
    updateUIElement(data.buttons, "medPink");
    updateUIElement(data.buttons, "simpleButton");
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

function getAccessibility() {
    console.log("layout.js get accessibilty called");
    $.ajax({
        url: '/get_layout_accessibility/',
        type: "GET",
        dataType: "json",
        success: function (data) {
            updateAllUI(data) 
            console.log("layout.js get accessibilty called");
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}