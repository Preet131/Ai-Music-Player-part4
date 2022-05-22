song1 = "";
song2 = "";

lwristX = 0;
lwristY = 0;
rwristX = 0;
rwristY = 0;

lWristScore = 0;

status = "";


function preload() {
    song1 = loadSound("song1.mp3"); // song name = Deewana kar raha hai
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
    if (results > 0) {

    }
    lwristX = results[0].pose.leftWrist.x;
    lwristY = results[0].pose.leftWrist.y;
    rwristX = results[0].pose.rightWrist.x;
    rwristY = results[0].pose.rightWrist.y;
    console.log("Left wrist X - " + lwristX + "Left wrist Y - " + lwristY);
    console.log("Right wrist X - " + rwristX + "Right wrist Y - " + rwristY);
    lWristScore = results[0].pose.keypoints[9].score;
    
}
function draw() {
    image(video, 0, 0, 600, 400);
    fill('red');
    stroke('red');
    status = song1.isPlaying();
    if(lWristScore > 0.2){
        circle(lwrist, lwristY);
        song2.stop();
        if(status == false){
            song1.play();
            document.getElementById("song").innerHTML = "Now Playing - Deewana Kar Raha Hai..."
        }
    }
}


