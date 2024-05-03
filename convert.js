const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");

// Directory containing input WAV and MP3 files
const inputDir = "Eventsounds.input"; // Change this to your directory path

// Output directory for converted OGG files
const outputDir = "Eventsounds.output"; // Change this to your directory path

// Check if the output directory exists, if not, create it
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Get a list of files in the input directory
fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  // Filter files with .wav or .mp3 extensions
  const audioFiles = files.filter((file) => {
    return file.endsWith(".wav") || file.endsWith(".mp3");
  });

  // Convert each audio file to OGG format
  var index = 1;
  audioFiles.forEach((file) => {
    const inputFile = path.join(inputDir, file);
    // const outputFileName = `${path.parse(file).name}_music_sound.ogg`;
    const outputFileName = `life_${index}_music_sound.ogg`;
    const outputFile = path.join(outputDir, outputFileName);
    index++;

    ffmpeg.ffprobe(inputFile, (err, metadata) => {
      if (err) {
        console.error(`Error getting duration for ${file}:`, err);
        return;
      }

      const durationInSeconds = metadata.format.duration;

      // Perform the conversion with the obtained duration information
      ffmpeg(inputFile)
        .outputOptions("-c:a libvorbis") // Set the audio codec to libvorbis (OGG)
        .outputOption("-ac", 1) // Set to mono
        .outputOption("-ar", 44100) // Sample Rate to 44.1 kHz
        .toFormat("ogg") // Set the output format to OGG
        .on("end", () => {
          console.log(
            `Conversion of ${file} finished | ${outputFile} | Duration: ${
              (durationInSeconds + 5) * 20
            } Ticks*20 - Second/20`
          );
        })
        .on("error", (err) => {
          console.error(`Error converting ${file}:`, err);
        })
        .save(outputFile);
    });

    // ffmpeg(inputFile)
    //   .outputOptions("-c:a libvorbis") // Set the audio codec to libvorbis (OGG)
    //   .outputOption("-ac", 1) // Set to mono
    //   .outputOption("-ar", 44100) // Sample Rate to 44.1 kHz
    //   .toFormat("ogg") // Set the output format to OGG
    //   .on("end", () => {
    //     console.log(`Conversion of ${file} finished | ${}`);

    //   })
    //   .on("error", (err) => {
    //     console.error(`Error converting ${file}:`, err);
    //   })
    //   .save(outputFile);
  });
});
