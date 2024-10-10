# NODE CONVERTER TO OGG FILE.
Option : Convert mp3, wav to ogg file

<hr />

# Linux
You can install FFmpeg via package managers like apt (Debian/Ubuntu) or yum (CentOS/RHEL):
```bash
sudo apt-get install ffmpeg    # For Debian/Ubuntu
sudo yum install ffmpeg        # For CentOS/RHEL
```
# macOS
Using Homebrew:
```bash
brew install ffmpeg
```
# Windows
Download a build from the FFmpeg website and follow the installation instructions.> Install 
```js
https://ffmpeg.org/download.html
*UPDATE: https://www.videohelp.com/software?d=ffmpeg-6.0-full_build.7z
```
# Or
Download FFmpeg with **winget**
```js
winget search ffmpeg
winget install --id=Gyan.FFmpeg.Shared -v "6.0" -e
*UPDATE: https://medium.com/@arhamrumi/step-by-step-guide-how-to-install-ffmpeg-on-windows-and-unleash-your-multimedia-potential-2ecda8ed4cf
```

# How to use this.
Install module to use
```js
npm install fluent-ffmpeg
node convert.js
```
