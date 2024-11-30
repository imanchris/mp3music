 // Variables
const audio = document.querySelector('.song'); // Get the audio element
const playButton = document.querySelector('#playsong'); // Get the play/pause button
const playIcon = document.querySelector('#playsong .fa-play'); // Play icon
const pauseIcon = document.querySelector('#playsong .fa-pause'); // Pause icon
const startTimeDisplay = document.querySelector('#start'); // Start time display
const endTimeDisplay = document.querySelector('#end'); // End time display
const progressBar = document.querySelector('.linechild'); // Progress bar element
const backwardButton = document.querySelector('.fa-backward-step'); // Backward button
const forwardButton = document.querySelector('.fa-forward-step'); // Forward button

// Play/Pause functionality
playButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline-block';
    } else {
        audio.pause();
        playIcon.style.display = 'inline-block';
        pauseIcon.style.display = 'none';
    }
});

// Update progress bar and time display
audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime; // Current playback time
    const duration = audio.duration; // Total song duration
    
    // Update progress bar
    const progress = (currentTime / duration) * 100;
    progressBar.style.width = progress + '%';
    
    // Update time displays
    startTimeDisplay.textContent = formatTime(currentTime);
    endTimeDisplay.textContent = formatTime(duration);
});

// Function to format time in MM:SS format
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Forward button functionality (skip 10 seconds forward)
forwardButton.addEventListener('click', () => {
    audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
});

// Backward button functionality (skip 10 seconds backward)
backwardButton.addEventListener('click', () => {
    audio.currentTime = Math.max(audio.currentTime - 10, 0);
});

// Optional: Automatically restart song when it finishes
audio.addEventListener('ended', () => {
    audio.currentTime = 0;
    playIcon.style.display = 'inline-block';
    pauseIcon.style.display = 'none';
});
