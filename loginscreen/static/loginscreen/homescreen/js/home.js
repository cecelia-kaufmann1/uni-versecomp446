$(document).ready(function() {
    
    handlePopUpOnLoad();

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

