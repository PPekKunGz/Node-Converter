const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

// Directory containing input WAV and MP3 files
const inputDir = 'Eventsounds.input'; // Change this to your directory path

// Output directory for converted OGG files
const outputDir = 'Eventsounds.output'; // Change this to your directory path

// Check if the output directory exists, if not, create it
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Get a list of files in the input directory
fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Filter files with .wav or .mp3 extensions
  const audioFiles = files.filter((file) => {
    return file.endsWith('.wav') || file.endsWith('.mp3');
  });

  // Convert each audio file to OGG format
  audioFiles.forEach((file) => {
    const inputFile = path.join(inputDir, file);
    const outputFileName = `${path.parse(file).name}.convert.ogg`;
    const outputFile = path.join(outputDir, outputFileName);

    ffmpeg(inputFile)
      .outputOptions('-c:a libvorbis') // Set the audio codec to libvorbis (OGG)
      .toFormat('ogg') // Set the output format to OGG
      .on('end', () => {
        console.log(`Conversion of ${file} finished`);
      })
      .on('error', (err) => {
        console.error(`Error converting ${file}:`, err);
      })
      .save(outputFile);
  });
});
