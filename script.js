// Variables to store timer, running status, start time, and lap counter
let timer; // holds the interval timer
let isRunning = false; // indicates if the stopwatch is running
let startTime; // stores the starting time of the stopwatch
let lapCounter = 1; // counts the number of laps

// Function to start or stop the stopwatch
function startStop() {
    if (isRunning) {
        // If the stopwatch is running, stop it
        clearInterval(timer);
        document.getElementById("startStop").innerText = "Start"; // Change button text to 'Start'
    } else {
        // If the stopwatch is not running, start it
        // Calculate the start time, considering lap times if available
        startTime = new Date().getTime() - (lapCounter === 1 ? 0 : lapCounter - 1) * 1000;
        timer = setInterval(updateDisplay, 10); // Update display every 10 milliseconds
        document.getElementById("startStop").innerText = "Stop"; // Change button text to 'Stop'
    }
    isRunning = !isRunning; // Toggle running status
}

// Function to reset the stopwatch
function reset() {
    clearInterval(timer); // Clear the interval timer
    document.getElementById("display").innerText = "00:00:00"; // Reset display to '00:00:00'
    document.getElementById("startStop").innerText = "Start"; // Reset button text to 'Start'
    document.getElementById("laps").innerHTML = ""; // Clear lap times list
    isRunning = false; // Set running status to false
    lapCounter = 1; // Reset lap counter
}

// Function to record a lap time
function recordLap() {
    if (isRunning) {
        // If the stopwatch is running, record lap time
        let lapTime = new Date().getTime() - startTime; // Calculate lap time
        let formattedTime = formatTime(lapTime); // Format lap time
        let lapItem = document.createElement("li"); // Create a new list item
        lapItem.innerText = `Lap ${lapCounter}: ${formattedTime}`; // Set list item text
        document.getElementById("laps").appendChild(lapItem); // Add list item to laps list
        lapCounter++; // Increment lap counter
    }
}

// Function to update the stopwatch display
function updateDisplay() {
    let currentTime = new Date().getTime(); // Get current time
    let elapsedTime = currentTime - startTime; // Calculate elapsed time
    let formattedTime = formatTime(elapsedTime); // Format elapsed time
    document.getElementById("display").innerText = formattedTime; // Update display with formatted time
}

// Function to format time in minutes, seconds, and milliseconds
function formatTime(time) {
    let date = new Date(time); // Create a new date object from time in milliseconds
    let minutes = date.getMinutes().toString().padStart(2, '0'); // Get minutes and pad with leading zeros
    let seconds = date.getSeconds().toString().padStart(2, '0'); // Get seconds and pad with leading zeros
    let milliseconds = date.getMilliseconds().toString().padStart(3, '0'); // Get milliseconds and pad with leading zeros
    return `${minutes}:${seconds}:${milliseconds}`; // Return formatted time as a string
}
