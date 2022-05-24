song1 = "";
song2 = "";

lwristX = 0;
lwristY = 0;
rwristX = 0;
rwristY = 0;

lWristScore = 0;

status = "";


function preload() {
    song1 = loadSound("song1.mp3"); // song name = Peaky Blinders
    song2 = loadSound("song2.mp3");// song name = Heat Waves
}
function setup() {
    canvas = createCanvas(600, 400);
    background('white');
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotposes);
    
}

function modelLoaded() {
    console.log('Model Is Initialized!');
}

function gotposes(results) {
    console.log(results)
    if (results.length > 0) {
        lwristX = results[0].pose.leftWrist.x;
        lwristY = results[0].pose.leftWrist.y;
        rwristX = results[0].pose.rightWrist.x;
        rwristY = results[0].pose.rightWrist.y;
        lWristScore = results[0].pose.keypoints[9].score-0.000100;
        rWristScore = results[0].pose.keypoints[10].score;
    }

    
}
function draw() {
    image(video, 0, 0, 600, 400);
    fill('red');
    stroke('red');
    statussong1 = song1.isPlaying();
    console.log("Song 1 - "+statussong1+"Song 2 - "+statussong2);
    console.log((lWristScore).toFixed(5)+", "+ (rWristScore).toFixed(5));
    if(lWristScore > 0.1){
        circle(lwristX, lwristY, 100);
        song2.stop();
        if(statussong1 == false){
            song1.play();
            document.getElementById("song").innerHTML = "Now Playing - Peaky Blinders BGM..."
        }
    }


