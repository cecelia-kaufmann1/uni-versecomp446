$(document).ready(function() {
    console.log("GOING TO TRY AND PLAY SONG");
    // playBackgroundMusic('../loginscreen/assets/sounds/friday_afternoon.wav');
    
})


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
