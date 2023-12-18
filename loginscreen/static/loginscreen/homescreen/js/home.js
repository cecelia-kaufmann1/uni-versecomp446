$(document).ready(function() {
    getFirstLoginData();
    handlePopUpOnLoad();

    $("#confirm_button").on("click", function() {
      postFirstLogin();
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


