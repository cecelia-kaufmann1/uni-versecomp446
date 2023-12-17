var audio_on = true;
$(document).ready(function() {
    console.log("AUDIO PLAYER IS PRESENT FOR PAGE : " + window.location.href);
    getAudioPreference();
    // if (audio_on) {
    //     getAudioForPage(window.location.href);
    // }
})

function getAudioPreference() {
    $.ajax({
        url: '/get_audio_preference/',
        type: "GET",
        dataType: "json",
        success: function (data) {
           
            audio_on = data.audio_preference;
            console.log("THE PREFERENCE FOR VOLUME IS:" + audio_on);
            if (audio_on) {
                getAudioForPage(window.location.href);
            }
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}

function getAudioForPage(link) {
    if (link.includes("home")){
        console.log("LINK INCLUDES HOME");
        playBackgroundMusic('../static/loginscreen/assets/sounds/Little_Apprentice.wav');
        playSecondaryAudio('../static/loginscreen/assets/sounds/waterfall.wav');
    }
    else if (link.includes("chatroom")){
        playBackgroundMusic('../static/loginscreen/assets/sounds/friday_afternoon.wav');
    }
    else if (link.includes("dressup")){
        playBackgroundMusic('../static/loginscreen/assets/sounds/monday_morning.wav');
    }

}

function playNoise(path, volume) {
    if (audio_on) {
        var noise = new Audio(path);
        noise.volume = volume;
        noise.play();
    }
    
}

function playSecondaryAudio(path) {
    var audio = new Audio(path);
        audio.loop= true; 
        audio.volume = 0.2;
        audio.play();
}
function playBackgroundMusic(path) {
    // code is from: https://stackoverflow.com/questions/60427633/how-to-ask-audio-autoplay-permission-in-the-browsersafari-with-javascript
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(() => {
        const source = audioContext.createBufferSource();
        source.addEventListener('ended', () => {
            source.stop();
            audioContext.close();
        });

        const request = new XMLHttpRequest();

        request.open('GET', path, true);
        // request.open('GET', '../static/loginscreen/assets/sounds/waterfall.wav', true);
        request.responseType = 'arraybuffer';
        request.onload = () => {
            audioContext.decodeAudioData(
                request.response,
                (buffer) => {
                    source.buffer = buffer;
                    source.loop = true;

                    var gainNode = audioContext.createGain();
                    gainNode.gain.value = 0.3; // 10 %
                    gainNode.connect(audioContext.destination);
                    
                    // now instead of connecting to aCtx.destination, connect to the gainNode
                    source.connect(gainNode)

                    
                    source.start();
                },
                (e) => {
                    console.log('Error with decoding audio data' + e.message);
                });
        }

        request.send();
    })
    .catch(reason => console.error(`Audio permissions denied: ${reason}`));
}

// code from: https://stackoverflow.com/questions/43386277/how-to-control-the-sound-volume-of-audio-buffer-audiocontext
