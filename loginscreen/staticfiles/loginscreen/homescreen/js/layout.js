$(document).ready(function () {
    getAccessibility();
});

function updateAllUI(data) {
    updateUIElement(data.font, "accessibleFont");
    updateUIElement(data.font_size, "bigFont");
    updateUIElement(data.buttons, "medPink");
    updateUIElement(data.buttons, "simpleButton");    
}

function updateUIElement(checked, attribute) {
    if (checked){
        $('body').addClass(attribute);
    }
    else {
        $('body').removeClass(attribute);
    }
}

function getAccessibility() {
    $.ajax({
        url: '/get_layout_accessibility/',
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