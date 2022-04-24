let data;
let imgs = makeImgs();
let video = document.getElementById('video');
function makeImgs() {
    let imgs = [];
    for (let x = 0; x < 30; x++) {
        for (let y = 0; y < 23; y++) {
            let img = document.createElement('img');
            img.src = './assets/LCS.png';
            body.appendChild(img);
            imgs.push(img);
        }
    }
    return imgs;
}
function download() {
    axios
        .get('https://raw.githubusercontent.com/hemisemidemipresent/lcs/main/data/lcs-15fps.txt')
        .then(function (response) {
            data = response.data;
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            document.getElementById('download').style.visibility = 'hidden';
            document.getElementById('play').style.visibility = 'visible';
            document.getElementById('body').style.visibility = 'visible';
        });
}

const FRAMES_PER_SECOND = 15; // Valid values are 60,30,20,15,10...
// set the mim time to render the next frame
const FRAME_MIN_TIME = (1000 / 60) * (60 / FRAMES_PER_SECOND) - (1000 / 60) * 0.5;
let lastFrameTime = 0; // the last frame time
let frame = 0;

function nextFrame(time) {
    if (time - lastFrameTime < FRAME_MIN_TIME) {
        //skip the frame if the call is too early
        requestAnimationFrame(nextFrame);
        return; // return as there is nothing to do
    }
    lastFrameTime = time; // remember the time of the rendered frame

    // render the frame

    let framedata = data[frame];
    if (!framedata) {
        frame = 0;
        document.getElementById('play').style.visibility = 'visible';
        return;
    }
    for (let i = 0; i < framedata.length; i++) {
        let image = imgs[i];
        if (framedata[i] > 200 && image.src != 'assets/LCI.png') image.src = 'assets/LCI.png';
        else if (framedata[i] <= 200 && image.src != 'assets/LCS.png') image.src = 'assets/LCS.png';
    }
    frame++;

    requestAnimationFrame(nextFrame); // get next farme
}
function play() {
    document.getElementById('play').style.visibility = 'hidden';
    video.play();
    window.requestAnimationFrame(nextFrame);
}
