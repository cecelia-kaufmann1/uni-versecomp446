// -------------------------------------------------
// ------------- Instance Variables ----------------
// -------------------------------------------------
var wearing = [0, 7]; // temporary - this represents the user data of what they are currently wearing

var owns = [1, 7, 5]; // temporary - this represents the user data of what they currently own

var numSparkles; // temporary - this represents the user data of how many sparkles they currently have
var clothes;

var costInCart = 0;
var itemsInCart = [];

var tabOpen = "shop"; // should be either "closet" or "shop"


// fetch json file from: https://stackoverflow.com/questions/7346563/loading-local-json-file
fetch("../static/loginscreen/dressup/json/clothes.json")
    .then(response => response.json())
    .then(json => {

        clothes = json.clothes;
        console.log("json loaded");
        getWearing();
    });

$(document).ready(function () {
    getSparklesNum();
    getColorBlindness();

    listenForSoundEffects();

    let buyItemButton = document.getElementsByClassName("buyItemButton")[0];
    buyItemButton.onclick = purchaseItems;

    updateCartButton();
    // populateOwnedClothes();
   
    console.log("finished ready method");

    let avatarColorsButton = document.getElementById("avatarColorsButton");
    let avatarColorLabel = document.getElementById("colorLabel");
    avatarColorLabel.onclick = function() {
        if (avatarColorsButton.classList.contains("on")) {
            avatarColorsButton.classList.remove("on");
        } else {
            avatarColorsButton.classList.add("on");

        }
    }
    getAvatarColor();
    
    let defaultColor = document.getElementById("default");
    defaultColor.onclick = function() {
        changeAvatarColor("default");
    }
    let red = document.getElementById("red");
    red.onclick = function() {
        changeAvatarColor("red");
    }

    let orange = document.getElementById("orange");
    orange.onclick = function() {
        changeAvatarColor("orange");
    }

    let yellow = document.getElementById("yellow");
    yellow.onclick = function() {
        changeAvatarColor("yellow");
    }

    let green = document.getElementById("green");
    green.onclick = function() {
        changeAvatarColor("green");
    }

    let blue = document.getElementById("blue");
    blue.onclick = function() {
        changeAvatarColor("blue");
    }

    let purple = document.getElementById("purple");
    purple.onclick = function() {
        changeAvatarColor("purple");
    }
    let pink = document.getElementById("pink");
    pink.onclick = function() {
        changeAvatarColor("pink");
    }

    let white = document.getElementById("white");
    white.onclick = function() {
        changeAvatarColor("white");
    }

    let lightbrown = document.getElementById("lightbrown");
    lightbrown.onclick = function() {
        changeAvatarColor("lightbrown");
    }

    let medbrown = document.getElementById("medbrown");
    medbrown.onclick = function() {
        changeAvatarColor("medbrown");
    }

    let brown = document.getElementById("brown");
    brown.onclick = function() {
        changeAvatarColor("brown");
    }

    let black = document.getElementById("black");
    black.onclick = function() {
        changeAvatarColor("black");
    }
})

// ----------------------------------------------------
// -------------------- Debugging ---------------------
// ----------------------------------------------------

function printDebugValues() {
    console.log("owns: " + owns);
    console.log("itemsInCart:" + itemsInCart);
    console.log("costInCart: " + costInCart);
}

// -------------------------------------------------
// -------------------- Visuals --------------------
// -------------------------------------------------

// put on clothes, and populate shop/closet. Used when the screen is first loaded
function setUpScreen() {
     
    
    // put on each item that user is currently wearing
     for (let i = 0; i < wearing.length; i++) {
        
        let id = wearing[i];
        console.log(id);
        let item = clothes[wearing[i]].name;
        let itemType = clothes[wearing[i]].type;
        putOn(item, itemType, id);
       
    }
    if (tabOpen == "shop") {
        populateShop();
    } else {
        populateOwnedClothes();
    }
}
// Gets the Django sparkles number 
function getSparklesNum() {
    $.ajax({
        url: '/get_sparkles/',
        type: "GET",
        dataType: "json",
        success: function (data) {
            currentSparklesInDB = data.sparkles;
            // calculate what the new sparkle value should be
            numSparkles = currentSparklesInDB;
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}

// Fill the 'My Clothes' section with owned clothes
function populateOwnedClothes() {
    let closet = document.getElementById("closet");
    closet.style.backgroundColor = "#A28654";
    closet.replaceChildren();
    for (let i = 0; i < owns.length; i++) {
        let id = owns[i];

        let item = clothes[owns[i]].name;
        let itemType = clothes[owns[i]].type;
        let clothingItemBox = createClothingItemBox(item, itemType, id);
        closet.appendChild(clothingItemBox);
    }


    highlightMyClothesTab();

}

// Fill the 'Shop' section with unowned clothes
function populateShop() {
    let closet = document.getElementById("closet");
    closet.style.backgroundColor = "#78633E";
    closet.replaceChildren();
    for (let i = 0; i < clothes.length; i++) {
        let itemIsOwned = false;
        for (let j = 0; j < owns.length; j++) {
            if (owns[j] == i) {
                itemIsOwned = true;
            }
        }
        if (!itemIsOwned) {
            let id = i;
            let item = clothes[i].name;
            let itemType = clothes[i].type;
            let price = clothes[i].price;
            let clothingItemBox = createShopItemBox(item, itemType, price, id);
            closet.appendChild(clothingItemBox);
        }
    }

    highlightShopTab();
   
}

// highlight the shop tab on the side of the closet
function highlightShopTab() {
    let myClothesTab = document.getElementById("myClothes");
    
    let shopTab = document.getElementById("shop");
    

    shopTab.style.zIndex = 2;
    myClothesTab.style.zIndex = 0;
    shopTab.style.borderBottomWidth = 0;
    myClothesTab.style.borderBottomWidth = "5px";
    tabOpen = "shop";
}

// highlight the my clothes tab on the side of the closet
function highlightMyClothesTab() {
    console.log('HI highlightMyClothes');
    let myClothesTab = document.getElementById("myClothes");
    
    let shopTab = document.getElementById("shop");
   

    shopTab.style.zIndex = 0;
    myClothesTab.style.zIndex = 1;
    myClothesTab.style.borderBottomWidth = 0;
    shopTab.style.borderBottomWidth = "5px";
    tabOpen = "closet";
}

// Create a box that holds a clothing item for the closet
function createClothingItemBox(item, itemType, id) {
    const itemBox = document.createElement("div");
    itemBox.classList.add("clothingItemBorder");
    const clothingItem = document.createElement("div");
    clothingItem.classList.add("clothingItem");
    itemBox.appendChild(clothingItem);
    clothingItem.id = item;

    itemBox.onclick = function () {
        clickClosetItem(item, itemType, id);
        playNoise('../static/loginscreen/assets/sounds/equip.wav', 1);
    }

    if (isWearing(id)) {
        clothingItem.style.backgroundColor = "#957a4c";
    }

    
    return itemBox;
}

// create a clothing item box, but it has a price on it and works differently than items that you already own (unfinished)
function createShopItemBox(item, itemType, itemPrice, id) {
    let baseClothingBox = createClothingItemBox(item, itemType, id);
    const price = document.createElement("p");
    price.innerHTML = itemPrice;
    price.classList.add("price");

    if (numSparkles >= itemPrice) {
        price.classList.add("canAfford");
    } else {
        price.classList.add("cannotAfford");
    }
    baseClothingBox.appendChild(price);

    baseClothingBox.classList.add("shopItemBox");

    return baseClothingBox;
}

// put on the clothing item
function putOn(item, itemType, id) {
    removeIfWearing(itemType);

    const clothing = document.createElement("img");
    const avatar = document.getElementById("avatar");
    clothing.id = itemType;
    clothing.classList.add("wornClothing");
    clothing.setAttribute("src", "../static/loginscreen/assets/images/clothes/" + item + ".png");
    clothing.setAttribute("itemName", item);
    clothing.setAttribute("itemID", id);
    
    if (itemType == "feet" || itemType == "eyeliner"){ // make sure that feet are behind other clothes
        clothing.style.zIndex = 0;
    } else {
        clothing.style.zIndex = 1;
    }
  
    avatar.appendChild(clothing);
    avatar.classList.add(itemType);

    if (!isWearing(id) ) {
        console.log("not wearing");
        if (!userOwnsItem) {
            
        } else {
            wearing.push(id);
            saveWearingToDB();
        }
    } 
    if (!userOwnsItem(id)) {
        costInCart += clothes[id].price;
        itemsInCart.push(id);
        updateCartButton();
    } 
}

// Visually update the purchase button
function updateCartButton() {
    const buyItemButton = document.getElementsByClassName("buyItemButton")[0];
   
    buyItemButton.innerHTML = "Purchase for: " + costInCart;
    
    const cartItemsContainer = document.getElementsByClassName("cartVerticalContainer")[0];
    if (costInCart == 0) {
        buyItemButton.style.visibility = "hidden";
        cartItemsContainer.style.visibility = "hidden";
    } else if (costInCart > numSparkles) {
        buyItemButton.style.visibility = "visible";
        cartItemsContainer.style.visibility = "visible";
        buyItemButton.classList.add("disabled");
    } else {
        buyItemButton.style.visibility = "visible";
        cartItemsContainer.style.visibility = "visible";
        buyItemButton.classList.remove("disabled");
    }
    updateInCartItems();
}

// Display the items that are in the cart
function updateInCartItems() {
    const cartItemsContainer = document.getElementsByClassName("cartItemsContainer")[0];
    const cartVerticalContainer = document.getElementsByClassName("cartVerticalContainer")[0];

    cartItemsContainer.replaceChildren();
    for (let i = 0; i < itemsInCart.length; i++) {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cartItem");
        let id = itemsInCart[i];
        let item = clothes[id].name;
        cartItem.id = item;
        cartItemsContainer.appendChild(cartItem);
    }
}

// Remove the given type of clothing
function remove(itemType) {
    const itemToRemove = document.getElementById(itemType);
    const avatar = document.getElementById("avatar");

    avatar.removeChild(itemToRemove);
    avatar.classList.remove(itemType);
    itemToRemove.remove();

    let item = itemToRemove.getAttribute("itemName");
    let id = itemToRemove.getAttribute("itemID");

    if (!userOwnsItem(id)) {
        costInCart -= clothes[id].price;
        itemsInCart = removeValueFromArray(itemsInCart, id);
        updateCartButton();
    }

    wearing = removeValueFromArray(wearing, id);
    saveWearingToDB();
}

// Remove clothing if avatar is already wearing that type/category of clothing
function removeIfWearing(itemType) {
    const avatar = document.getElementById("avatar");
    const eyeType = ["eyeliner", "monocletype", "glassestype"]
    const hatType = ["headphonestype","earringtype", "icecreamhorn", "carrothorn", "tophattype", "partyhattype", "cap", "backcap"];
    if (avatar.classList.contains(itemType)) {
        remove(itemType);
    } else if (itemType == "bottom" && avatar.classList.contains("skirt")) {
        remove("skirt");
    } else if (itemType == "skirt" && avatar.classList.contains("bottom")) {
        remove("bottom");
    } else if (eyeType.includes(itemType)){
        for (let i = 0; i < eyeType.length; i++){
            if(avatar.classList.contains(eyeType[i])) {
                remove(eyeType[i]);
                break;
            }
        }
    } else if (hatType.includes(itemType)){
        for (let i = 0; i < hatType.length; i++){
            if(avatar.classList.contains(hatType[i])) {
                remove(hatType[i]);
                break;
            }
        }
    }    
}

function changeAvatarColor(color) {
    console.log("new color: ", color);
    let avatarImage = document.getElementById("unicornImage");
    avatarImage.setAttribute("src", "../static/loginscreen/assets/vectorArt/"+color+".png");
    saveColorToDatabase(color);
}
// ----------------------------------------------
// -------------------- Data --------------------
// ----------------------------------------------

// 
function clickClosetItem(item, itemType, id) {
     // if player is already wearing that item, then remove it
     if (isWearing(id)){
        remove(itemType);
    } else {
        putOn(item, itemType, id);
    }

    if (tabOpen == "shop"){
        populateShop();
    } else {
        populateOwnedClothes();
    }
}
// Buy items if they can be afforded
function purchaseItems() {
    if (costInCart <= numSparkles) {
        for (let i = 0; i < itemsInCart.length; i++) {
            owns.push(itemsInCart[i]);
           
        }
        
        console.log("Purchased item(s), calculating..." + numSparkles + "-" + costInCart);
        numSparkles = numSparkles - costInCart;
        console.log("numSparkles is now: " + numSparkles)
        updateSparklesInDB();

        saveOwnsToDB();
        playNoise('../static/loginscreen/assets/sounds/purchase.mp3', 0.5);
        
        costInCart = 0;
        itemsInCart = [];
        updateCartButton();

        if (tabOpen == "shop") {
            populateShop();
        } else {
            populateOwnedClothes();
        }
        printDebugValues();
        
    }

}

// Return true if the user is currently wearing the item
function isWearing(id) {
    return wearing.includes(id);
}

// Return true if the user currently owns the item
function userOwnsItem(id) {
    // convert a string to a number using the + sign: https://www.freecodecamp.org/news/how-to-convert-a-string-to-a-number-in-javascript/#:~:text=(quantity))%3B-,How%20to%20convert%20a%20string%20to%20a%20number%20in%20JavaScript,will%20go%20before%20the%20operand.&text=We%20can%20also%20use%20the,into%20a%20floating%20point%20number.
    return owns.includes(+id);
}

// Given a name, return the id for that clothing item
function getIdFromName(name) {
    return "not implemented";
}

// ----------------------------------------------------------
// -------------------- Helper functions --------------------
// ----------------------------------------------------------

// Given an array and a value, remove all instances of that value from the array and return a new array
function removeValueFromArray(array, value) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] != value) {
            newArray.push(array[i]);
        }
    }
    return newArray;
}

// Uses ajax to update the number of sparkles in the database
function updateSparklesInDB() {
    $.ajax({
        type: 'POST',
        url: '/update_sparkles/',
        data: {
            sparkles: numSparkles
        },
        success: function(data) {
            // the success will automatically update the number of sparkles for user end of site
            // let numSparklesElement = document.getElementsByClassName("numSparkles")[0];
            // numSparklesElement.innerHTML = "Sparkles: " + data;
            console.log("new sparkles", $("#sparkles_status"));
            $("#sparkles_status").text(data);
           
        }
    })

}

// get the user's wearing info and update the global var wearing to match it 
function getWearing() {
    // first, get the number of sparkles that the user currently has
    $.ajax({
        url: '/get_wearing/',
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (!data.wearing) {
                wearing = [];
                saveWearingToDB();
            } else {
                wearing = convertStringToArray(data.wearing);
            }
            
            
            getOwns();
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}

// save the current value of wearing (as a char string) to the database
function saveWearingToDB() {
    // first, get the number of sparkles that the user currently has
    let wearingAsString = convertArrayToString(wearing);
    $.ajax({
        type: 'POST',
        url: '/update_wearing/',
        data: {
            wearing: wearingAsString
        },
        success: function(data) {
            console.log("posted wearing: ", data);
        }, error: function (error) {
            console.log(`Error ${error}`);
        }
    })
}

// get the user's wearing info and update the global var wearing to match it 
function getOwns() {
    // first, get the number of sparkles that the user currently has
    $.ajax({
        url: '/get_owns/',
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (!data.owns) {
                owns = [];
                saveOwnsToDB();
            } else {
                owns = convertStringToArray(data.owns);
            }
            setUpScreen();
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}

// save the current value of wearing (as a char string) to the database
function saveOwnsToDB() {
    // first, get the number of sparkles that the user currently has
    console.log("conversion started");
    let ownsAsString = convertArrayToString(owns);
    
    $.ajax({
        type: 'POST',
        url: '/update_owns/',
        data: {
            
            owns: ownsAsString
        },
        success: function(data) {
            console.log("ajax success");
            console.log("posted owns: ", data);
            console.log("saving owns as ", ownsAsString);
        }
    })
}

// save the given color to the database
function saveColorToDatabase(color) {
    // first, get the number of sparkles that the user currently has
    $.ajax({
        type: 'POST',
        url: '/update_color/',
        data: {
            color: color
        },
        success: function(data) {
            console.log("posted color: ", data);
        }
    })
}

// get the user's color info from database
function getAvatarColor() {
    // first, get the number of sparkles that the user currently has
    $.ajax({
        url: '/get_color/',
        type: "GET",
        dataType: "json",
        success: function (data) {
           
            let color;
            if (!data.color) {
                color = "default";
                saveColorToDatabase(color);
            } else {
                color = data.color;
            }
            
            console.log("got color from db: ", data.color);
            changeAvatarColor(color);
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}




// used to turn a character string into an array of integers. the array is used to represent what the user is wearing or owns. the format of the array is integer comma integer comma integer comma. ex: "1,2,3,4,"
// got help for this method from https://builtin.com/software-engineering-perspectives/split-string-javascript
function convertStringToArray(str) {
    let newArray = [];
    if (str !== "null") {
        str = str.slice(0, str.length-1); // take off final comma
    
    newArray = str.split(",");
    
    for (let i = 0; i < newArray.length; i++) {
        newArray[i] = parseInt(newArray[i]);
    }
    } else {
        console.log("twas null");
        // keep it as an empty array
    }
    
    return newArray;
}

// given an array, convert it to a character field of elements separated by commas. ex: [1,2,3,4] -> '1,2,3,4,'
function convertArrayToString(arr) {
    let newStr = "";
    for (let i = 0; i < arr.length; i++) {
        newStr += arr[i] + ",";
    }
    if (arr.length == 0) {
        newStr = "null"; // empty array = 'null' string
    }
    console.log("conversion finsihes");

    return newStr;
}

function getColorBlindness() {
    $.ajax({
        url: '/get_colorblindness/',
        type: "GET",
        dataType: "json",
        success: function (data) {
            console.log("got colorblindess " + data.colors)
            if (data.colors) {
                $(".colorName").css('display', 'block');
            }
            else {
                $(".colorName").css('display', 'none');
            }
            
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}

function listenForSoundEffects() {
    $("#avatarColorsButton").on('click', function() {
        playNoise('../static/loginscreen/assets/sounds/draw_pull_out.wav', 1);
    })

    $(".tab").on('click', function() {
        playNoise('../static/loginscreen/assets/sounds/tick.wav', 1);
    })
}

