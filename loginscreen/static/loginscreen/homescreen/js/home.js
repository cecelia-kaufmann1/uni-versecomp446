$(document).ready(function() {
    window.localStorage.setItem('audio-enabled', '1');
    document.querySelector('body').click();
    playAudio();

    $(".popupExitButton").on('click', function() {
        $('#blurb').css('display','none')
    });
    
    var waterfall = new Audio('../static/loginscreen/assets/sounds/waterfall.wav');
    waterfall.loop= true; 
    waterfall.volume = 0.2;
    waterfall.play();
    
})


function playAudio() {
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
    
            request.open('GET', '../static/loginscreen/assets/sounds/Little_Apprentice.wav', true);
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
