

var wearing = [4, 7]; // temporary - this represents the user data of what they are currently wearing

var owns = [0, 3, 4, 6, 7]; // temporary - this represents the user data of what they currently own
var clothes;

// fetch json file from: https://stackoverflow.com/questions/7346563/loading-local-json-file
fetch("../clothes.json")
    .then(response => response.json())
    .then(json => {

        clothes = json.clothes;
        for (let i = 0; i < wearing.length; i++) {
            let id = wearing[i];
            let item = clothes[wearing[i]].name;
            let itemType = clothes[wearing[i]].type;
            // console.log("Wearing id: " + id + " = " + item);
            putOn(item, itemType);
        }
        populateOwnedClothes();
    });

$(document).ready(function () {
        console.log("ready");
})

// Fill the 'My Clothes' section with owned clothes
function populateOwnedClothes() {
    let closet = document.getElementById("closet");
    closet.replaceChildren();
    for (let i = 0; i < owns.length; i++) {
        let id = owns[i];
        let item = clothes[owns[i]].name;
        let itemType = clothes[owns[i]].type;
        // console.log("Owns id: " + id + " = " + item);
        let clothingItemBox = createClothingItemBox(id, item, itemType);
        closet.appendChild(clothingItemBox);
    }

    // highlight the my clothes tab
    let myClothesTab = document.getElementById("myClothes");
    myClothesTab.classList.add("highlighted");
    let shopTab = document.getElementById("shop");
    shopTab.classList.remove("highlighted");
   
}

// Fill the 'Shop' section with unowned clothes
function populateShop() {
    let closet = document.getElementById("closet");
    closet.replaceChildren();
    for (let i = 0; i < clothes.length; i++) {
        let itemIsOwned = false;
        for (let j = 0; j < owns.length; j++) {
            if (owns[j] == i) {
                itemIsOwned = true;
            }
        }
        if (!itemIsOwned) {
            // console.log(i + " is not already owned");
            let id = owns[i];
            let item = clothes[i].name;
            let itemType = clothes[i].type;
            
            let clothingItemBox = createClothingItemBox(item, itemType);
            closet.appendChild(clothingItemBox);
        }
    }

    // highlight the shop tab
    let myClothesTab = document.getElementById("myClothes");
    myClothesTab.classList.remove("highlighted");
    let shopTab = document.getElementById("shop");
    shopTab.classList.add("highlighted");
}

// create a box that holds a clothing item for the closet
function createClothingItemBox(id, item, itemType) {
    const itemBox = document.createElement("div");
    itemBox.classList.add("clothingItemBorder");
    const clothingItem = document.createElement("div");
    clothingItem.classList.add("clothingItem");
    itemBox.appendChild(clothingItem);
    clothingItem.id = item;
    // if (isWearing(id)) {
    //     clothingItem.classList.add("highlighted");
    // }
    clothingItem.onclick = function () {
        putOn(item, itemType);
    }
    return itemBox;
}

// return true if the avatar is wearing the clothing of the given id
function isWearing(id){
    return wearing.includes(id);
}

// put on the clothing item
function putOn(item, itemType) {
    // console.log(clothes);
    removeIfWearing(itemType);
    const clothing = document.createElement("img");
    const avatar = document.getElementById("avatar");
    clothing.id = itemType;
    clothing.classList.add("wornClothing");
    clothing.setAttribute("src", "../../assets/images/clothes/" + item + ".png");
    avatar.appendChild(clothing);
    avatar.classList.add(itemType);
}

// remove the given type of clothing
function remove(itemType) {
    const itemToRemove = document.getElementById(itemType);
    const avatar = document.getElementById("avatar");

    avatar.removeChild(itemToRemove);
    avatar.classList.remove(itemType);
    itemToRemove.remove();
}

// remove clothing if avatar is already wearing that type of clothing
function removeIfWearing(itemType) {
    const avatar = document.getElementById("avatar");
    if (avatar.classList.contains(itemType)) {
        remove(itemType);
    }
}
