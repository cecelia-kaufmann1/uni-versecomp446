$(document).ready(function() {
    getFirstLoginData();
    handlePopUpOnLoad();

    $("#confirm_button").on("click", function() {
      // postFirstLogin();
      hideFirstLoginUI();
    });

    $("#gif").on('click', function() {
      window.localStorage.setItem('popup-on', '1');
      $('#blurb').css('display','block');
    });

    $(".popupExitButton").on('click', function() {
        $('#blurb').css('display','none');
        window.localStorage.setItem('popup-on', '0');
    });
    
    $("#tree").on('click', function() {
        $('#p_uni').addClass("rotate_p_uni");
        setTimeout(
                function() 
                {
                  //do something special
                  console.log("FINISHED ANIMATION");
                  $('#p_uni').addClass("animate_p_uni");
                  
                  playNoise('../static/loginscreen/assets/sounds/camera_shutter.m4a', 1)
                }, 500);
        setTimeout(
                function() 
                {
                  $('#p_uni').removeClass("animate_p_uni");
                  $('#p_uni').removeClass("rotate_p_uni");
                  $('#p_uni').addClass("rotate_back_p_uni");
                }, 1000);
        setTimeout(
                function() 
                {
                //   $('#p_uni').removeClass("animate_p_uni");
                  $('#p_uni').removeClass("rotate_back_p_uni")
                }, 1500);
    });
 
})

function hideFirstLoginUI() {
  $("#login_welcome").css("display", "none");
}
function handleFirstLoginUI() {
  $("#login_welcome").css("display", "block");
}

function handlePopUpOnLoad() {
  if (window.localStorage.getItem('popup-on')) {
    console.log("pop up currently does exist" + window.localStorage.getItem('popup-on'));
    if (window.localStorage.getItem('popup-on') == '1'){
      $('#blurb').css('display','block');
    }
    else {
      $('#blurb').css('display','none');
    }
  }
  else {
    window.localStorage.setItem('popup-on', '1');
  }
}

function getFirstLoginData() {
  $.ajax({
      url: '/get_first_login/',
      type: "GET",
      dataType: "json",
      success: function (data) {
        if (data.first_login) {
          handleFirstLoginUI();
          postFirstLogin();
        }
        else {
          hideFirstLoginUI();
        }
      },
      error: function (error) {
          console.log(`Error ${error}`);
      }
  });
}

// save the given color to the database
function postFirstLogin() {
  // first, get the number of sparkles that the user currently has
  $.ajax({
      type: 'POST',
      url: '/update_first_login/',
      data: {
          first_login: "0",
      },
  })
}


// ------- Dress up avatar -------- //
var wearing =[];
var owns=[];
var color="default";

// fetch json file from: https://stackoverflow.com/questions/7346563/loading-local-json-file
fetch("../static/loginscreen/dressup/json/clothes.json")
    .then(response => response.json())
    .then(json => {

        clothes = json.clothes;
        console.log("json loaded");
        getWearing();
    });

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
          } else {
              owns = convertStringToArray(data.owns);
          }
          setUpAvatar();
      },
      error: function (error) {
          console.log(`Error ${error}`);
      }
  });
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

// put on clothes
function setUpAvatar() {
     
    getAvatarColor();
  // put on each item that user is currently wearing
   for (let i = 0; i < wearing.length; i++) {
      
      let id = wearing[i];
      console.log(id);
      let item = clothes[wearing[i]].name;
      let itemType = clothes[wearing[i]].type;
      putOn(item, itemType, id);
     
  }
}


function changeAvatarColor(color) {
  console.log("new color: ", color);
  let avatarImage = document.getElementById("uni");
  avatarImage.style.backgroundImage = "url('../static/loginscreen/assets/vectorArt/" + color + ".png')";
}


// put on the clothing item
function putOn(item, itemType, id) {

  const clothing = document.createElement("img");
  const avatar = document.getElementById("uni");
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


  if (userOwnsItem(id)) {
    avatar.appendChild(clothing);
    avatar.classList.add(itemType);
  }
  

  
 
 
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

// Return true if the user currently owns the item
function userOwnsItem(id) {
  // convert a string to a number using the + sign: https://www.freecodecamp.org/news/how-to-convert-a-string-to-a-number-in-javascript/#:~:text=(quantity))%3B-,How%20to%20convert%20a%20string%20to%20a%20number%20in%20JavaScript,will%20go%20before%20the%20operand.&text=We%20can%20also%20use%20the,into%20a%20floating%20point%20number.
  return owns.includes(+id);
}

