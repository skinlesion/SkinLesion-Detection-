console.clear();

// The video
let video;
// For displaying the label
let label = "waiting..."
// The classifier
let classifier
let modelURL = './model/'

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
  createCanvas(640, 520);
  
  // Create the video
  const cameraSelect = document.getElementById('camera-select');
  video = createCapture({
    video: {
      facingMode: cameraSelect.value
    }
  });
  video.hide();

  // STEP 2: Start classifying
  classifyVideo();

  // Add an event listener to the camera selection list to switch between front and rear cameras
  cameraSelect.addEventListener('change', () => {
    video = createCapture({
      video: {
        facingMode: cameraSelect.value
      }
    });
    video.hide();
    classifyVideo();
  });
}

// STEP 2 classify the videeo!
function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background(0);

  // Draw the video
  image(video, 0, 0);

  // STEP 4: Draw the label
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 16);
  
}

// STEP 3: Get the classification!
function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again!
  label = results[0].label;
  classifyVideo();
}
