function wait(delayInMS) {
  return new Promise((resolve) => setTimeout(resolve, delayInMS));
}
function startRecording(stream, lengthInMS) {
  let recorder = new MediaRecorder(stream);
  let data = [];

  recorder.ondataavailable = (event) => data.push(event.data);
  recorder.start();

  let stopped = new Promise((resolve, reject) => {
    recorder.onstop = resolve;
    recorder.onerror = (event) => reject(event.name);
  });

  let recorded = wait(lengthInMS).then(() => {
    if (recorder.state === "recording") {
      recorder.stop();
    }
  });

  return Promise.all([stopped, recorded]).then(() => data);
}

window.navigator.mediaDevices
  .getDisplayMedia({
    video: {
      displaySurface: "browser",
    },
    audio: true,
    preferCurrentTab: true,
  })
  .then(async (stream) => {
    const recordedChunks = await startRecording(stream, 60000);

    let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
    let recording = document.createElement("video");
    recording.src = URL.createObjectURL(recordedBlob);
    const downloadButton = document.createElement("a");
    downloadButton.href = recording.src;
    downloadButton.download = "video.webm";
    downloadButton.click();
  });
