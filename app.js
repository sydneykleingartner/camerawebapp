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


//access the camera & stream to the camera view
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

//query String for the URL of the overlay image
//String url = Request.QueryString("pic")
/*function getImgURL() {
	var urlParams = new URLSearchParams(window.location.search);
	//get rid of ? at start of string
	urlParams = urlParams.substring(1);
}*/


//maybe this will help?
/* console.log(urlParams.has('post')); //true
console.log(urlParams.get('action')); //"edit"
console.log(urlParams.getAll('action')); //["edit"]
console.log(urlParams.toString()); //"?http://projectrephoto.com/entryImage/37/1539/20120930_122255.jpg?rotatedAt1559660109472"
console.log(urlParams.append('active', '1')); */

//start the video stream when the window loads
window.addEventListener("load", cameraStart, false);

if ('serviceWorker' in navigator) {
	console.log('CLIENT: service worker registration in progress.');
	navigator.serviceWorker.register( 'app.js', { scope : ' '}).then(function() {
		console.log('CLIENT: service worker registration complete.');
	}, function() {
		console.log('CLIENT: service worker registration failure.');
	});
}
else {
	console.log('CLIENT: service worker is not supported.');
}