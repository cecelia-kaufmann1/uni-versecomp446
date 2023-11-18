

function putOn(item, itemType) {
    removeIfWearing(itemType);
    const clothing = document.createElement("img");
    const avatar = document.getElementById("avatar");
    // clothing.classList.add(itemType);
    clothing.id = itemType;
    clothing.setAttribute("src", "../../assets/images/clothes/" + item + ".png");
    avatar.appendChild(clothing);
    avatar.classList.add(itemType);
    console.log("added item");
    console.log(avatar.classList);
    // <img class= "bottom" src="../../assets/images/clothes/bottom1.png">
}



function remove(itemType) {
    const itemToRemove = document.getElementById(itemType);
    const avatar = document.getElementById("avatar");

    avatar.removeChild(itemToRemove);
    avatar.classList.remove(itemType);
    itemToRemove.remove();
}

function removeIfWearing(itemType) {
    const avatar = document.getElementById("avatar");
    if (avatar.classList.contains(itemType)) {
        remove(itemType);
    }

}