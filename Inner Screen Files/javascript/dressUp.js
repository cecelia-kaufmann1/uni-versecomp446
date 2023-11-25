

var wearing = [1, 7]; // temporary - this represents the user data of what they are currently wearing

var owns = [1, 7, 5]; // temporary - this represents the user data of what they currently own

var numSparkles = 10; // temporary - this represents the user data of how many sparkles they currently have
var clothes;

var costInCart = 0;
var itemsInCart = [];

var tabOpen = "closet"; // should be either "closet" or "shop"


// fetch json file from: https://stackoverflow.com/questions/7346563/loading-local-json-file
fetch("../clothes.json")
    .then(response => response.json())
    .then(json => {

        clothes = json.clothes;
        // put on each item that user is currently wearing
        for (let i = 0; i < wearing.length; i++) {
            let id = wearing[i];
            let item = clothes[wearing[i]].name;
            let itemType = clothes[wearing[i]].type;

            putOn(item, itemType, id);
        }
        if (tabOpen == "shop") {
            populateShop();
        } else {
            populateOwnedClothes();
        }
    });

$(document).ready(function () {
    console.log("ready");
    updateSparklesLabel();

    let buyItemButton = document.getElementsByClassName("buyItemButton")[0];
    buyItemButton.onclick = purchaseItems;

    updateCartButton();
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

// Visually update the label at top of screen that shows how many sparkles the user has
function updateSparklesLabel() {
    let numSparklesElement = document.getElementsByClassName("numSparkles")[0];
    numSparklesElement.innerHTML = "Sparkles: <br> " + numSparkles;
}

// Fill the 'My Clothes' section with owned clothes
function populateOwnedClothes() {
    let closet = document.getElementById("closet");
    closet.style.backgroundColor = "white";
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
    closet.style.backgroundColor = "lightgray";
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
    

    shopTab.style.zIndex = 1;
    myClothesTab.style.zIndex = 0;
    shopTab.style.borderBottomWidth = 0;
    myClothesTab.style.borderBottomWidth = "5px";
    tabOpen = "shop";
}

// highlight the my clothes tab on the side of the closet
function highlightMyClothesTab() {
    
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
    }

    if (isWearing(id)) {
        clothingItem.style.backgroundColor = "lightgray";
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
    clothing.setAttribute("src", "../../assets/images/clothes/" + item + ".png");
    clothing.setAttribute("itemName", item);
    clothing.setAttribute("itemID", id);
    avatar.appendChild(clothing);
    avatar.classList.add(itemType);

    if (!isWearing(id)) {
        wearing.push(id);
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
    
    const cartItemsContainer = document.getElementsByClassName("cartItemsContainer")[0];
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
    cartItemsContainer.replaceChildren();
    const inCartLabel = document.createElement("p");
    inCartLabel.innerHTML = "In Cart: ";
    cartItemsContainer.appendChild(inCartLabel);
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
}

// Remove clothing if avatar is already wearing that type/category of clothing
function removeIfWearing(itemType) {
    const avatar = document.getElementById("avatar");
    if (avatar.classList.contains(itemType)) {
        remove(itemType);
    } else if (itemType == "bottom" && avatar.classList.contains("skirt")) {
        remove("skirt");
    } else if (itemType == "skirt" && avatar.classList.contains("bottom")) {
        remove("bottom");
    }
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
        numSparkles -= costInCart;
        costInCart = 0;
        itemsInCart = [];
        updateCartButton();
        updateSparklesLabel();

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

