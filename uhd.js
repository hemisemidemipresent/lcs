let data;
let video = document.getElementById('video');
const imageSize = 8;
const pixelWidth = 120,
    pixelHeight = 92;

let lcs = new Image(),
    lci = new Image();
let lcsScaled, lciScaled;
let ctx = null;
lcs.src = 'assets/LCS.png';
lci.src = 'assets/LCI.png';

lcs.onload = function () {
    lcsScaled = document.createElement('canvas');
    lcsScaled.width = imageSize;
    lcsScaled.height = imageSize;
    lcsScaled.getContext('2d').drawImage(lcs, 0, 0, imageSize, imageSize);
    makeImgs();
};

lci.onload = function () {
    lciScaled = document.createElement('canvas');
    lciScaled.width = imageSize;
    lciScaled.height = imageSize;
    lciScaled.getContext('2d').drawImage(lci, 0, 0, imageSize, imageSize);
};

function makeImgs() {
    let canvas = document.createElement('canvas');
    canvas.width = pixelWidth * imageSize;
    canvas.height = pixelHeight * imageSize;
    ctx = canvas.getContext('2d');
    for (let x = 0; x < pixelWidth; x++) {
        for (let y = 0; y < pixelHeight; y++) {
            ctx.drawImage(lcsScaled, x * imageSize, y * imageSize);
        }
    }
    body.appendChild(canvas);
}
function download() {
    axios
        .get('https://raw.githubusercontent.com/hemisemidemipresent/lcs/main/data/lcs-uhd.txt')
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

const FRAME_SKIP = 1;
const FRAMES_PER_SECOND = 30; // Valid values are 60,30,20,15,10...
// 6x slower than normal
// set the mim time to render the next frame
const FRAME_MIN_TIME = (1000 / 60) * (60 / FRAMES_PER_SECOND) - (1000 / 60) * 0.5;
let lastFrameTime = 0; // the last frame time
let frame = 0;

function nextFrame(time) {
    console.log(frame);
    if (time - lastFrameTime < FRAME_MIN_TIME) {
        //skip the frame if the call is too early
        requestAnimationFrame(nextFrame);
        return; // return as there is nothing to do
    }
    lastFrameTime = time; // remember the time of the rendered frame

    // render the frame

    let cFrameData = data[frame];
    let lFrameData = frame > FRAME_SKIP ? data[frame - FRAME_SKIP] : null;
    for (let i = 0; i < cFrameData.length; i++) {
        if ((lFrameData == null && cFrameData[i] < 200) || cFrameData[i] === lFrameData[i]) continue;
        let x = i % pixelWidth;
        let y = Math.floor(i / pixelWidth);
        ctx.clearRect(x * imageSize, y * imageSize, imageSize, imageSize);
        if (cFrameData[i] > 200) {
            // draw LCI
            ctx.drawImage(lciScaled, x * imageSize, y * imageSize);
        } else {
            // draw LCS
            ctx.drawImage(lcsScaled, x * imageSize, y * imageSize);
        }
    }
    frame += FRAME_SKIP;

    requestAnimationFrame(nextFrame); // get next frame
}
function play() {
    document.getElementById('play').style.visibility = 'hidden';
    video.play();
    window.requestAnimationFrame(nextFrame);
}
