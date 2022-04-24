let data;
let imgs = makeImgs();
function makeImgs() {
    let imgs = [];
    for (let x = 0; x < 30; x++) {
        for (let y = 0; y < 23; y++) {
            let img = document.createElement('img');
            img.id = `${x},${y}`;
            img.src = './LCS.png';

            body.appendChild(img);
            imgs.push(img);
        }
    }
    return imgs;
}
function download() {
    axios
        .get('https://raw.githubusercontent.com/hemisemidemipresent/lcs/main/lcs.txt')
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

const FRAMES_PER_SECOND = 30; // Valid values are 60,30,20,15,10...
// set the mim time to render the next frame
const FRAME_MIN_TIME = (1000 / 60) * (60 / FRAMES_PER_SECOND) - (1000 / 60) * 0.5;
let lastFrameTime = 0; // the last frame time
let frame = 2700;

function nextFrame(time) {
    if (time - lastFrameTime < FRAME_MIN_TIME) {
        //skip the frame if the call is too early
        requestAnimationFrame(nextFrame);
        return; // return as there is nothing to do
    }
    lastFrameTime = time; // remember the time of the rendered frame

    // render the frame

    let framedata = data[frame];
    for (let i = 0; i < framedata.length; i++) {
        let image = imgs[i];
        if (framedata[i]) image.src = './LCI.png';
        else image.src = './LCS.png';
    }
    frame++;

    requestAnimationFrame(nextFrame); // get next farme
}
function play() {
    document.getElementById('play').style.visibility = 'hidden';

    window.requestAnimationFrame(nextFrame);
}
