//default mode: front-facing camera
var constraints = { video: { facingMode: "environment"}, audio: false};

//ask for access to the camera (not audio)
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	navigator.mediaDevices.getUserMedia({video:true}).then(function(stream) {
		video.srcObject = stream;
		video.play();
	})
}

//define constants of all the parts that were created
const cameraView = document.querySelector("#camera--view"),
	  cameraOutput = document.querySelector("#camera--output"),
	  cameraSensor = document.querySelector("#camera--sensor"),
	  cameraTrigger = document.querySelector("#camera--trigger")


//access the camera & stream to the cameraView
function cameraStart() {
	navigator.mediaDevices
		.getUserMedia(constraints)
		.then(function(stream) {
		track = stream.getTracks()[0];
		cameraView.srcObject = stream;
	})
	.catch(function(error) {
		console.error("Oops. Something is broken.", error)
	});
}

//take a picture when the button is tapped

cameraTrigger.onclick = function() {
	cameraSensor.width = cameraView.videoWidth;
	cameraSensor.height = cameraView.videoHeight;
	cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
	cameraOutput.src = cameraSensor.toDataURL("image/webp");
	cameraOutput.classList.add("taken");
};


//start the video stream when the window loads
window.addEventListener("load", cameraStart, false);

if ('serviceWorker' in navigator) {
	console.log('CLIENT: service worker registration in progress.');
	navigator.serviceWorker.register( '/camera-app/part-2/sw.js', { scope : ' '}).then(function() {
		console.log('CLIENT: service worker registration complete.');
	}, function() {
		console.log('CLIENT: service worker registration failure.');
	});
}
else {
	console.log('CLIENT: service worker is not supported.');
}