let data;
let frame = 0;
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
axios
    .get('https://raw.githubusercontent.com/hemisemidemipresent/lcs/main/lcs.txt')
    .then(function (response) {
        data = response.data;
    })
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
        function nextFrame() {
            let framedata = data[frame];
            for (let i = 0; i < framedata.length; i++) {
                let image = imgs[i];
                if (framedata[i]) image.src = './LCI.png';
                else image.src = './LCS.png';
            }
            console.log(frame);
            frame++;
            window.requestAnimationFrame(nextFrame);
        }
        window.requestAnimationFrame(nextFrame);
    });
