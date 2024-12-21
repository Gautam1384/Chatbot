let btn = document.querySelector(".microphone-button");
let recognition = null; // Global recognition variable
let isMicrophoneOn = false;

// Initialize Speech Recognition
const initializeRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            console.log("Speech recognition started...");
        };

        recognition.onresult = (event) => {
            if (event.results.length > 0) {
                let spokenText = event.results[0][0].transcript.toLowerCase().trim();
                console.log("Recognized Text:", spokenText);
                handleCommands(spokenText); // Pass recognized text for processing
            }
        };

        recognition.onerror = (error) => {
            console.error("Speech Recognition Error:", error.error);
            speakFunc("I'm sorry, I couldn't hear you clearly. Please try again.");
        };

        recognition.onend = () => {
            console.log("Speech recognition ended.");
        };
    } else {
        alert("Your browser does not support voice input!");
    }
};

// Speak Function
const speakFunc = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.2;
    utterance.lang = 'en-HI';
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
    console.log("Bot Response:", text);
};

// Greeting Function
const greetingFunc = () => {
    let hour = new Date().getHours();
    if (hour >= 0 && hour < 12) return "Good Morning Sir!";
    if (hour >= 12 && hour < 16) return "Good Afternoon Sir!";
    return "Good Evening Sir!";
};

// Handle User Commands
const handleCommands = (command) => {
    console.log("Processing Command:", command);

    const greetings = ["hi", "hello", "hey"];
    if (greetings.includes(command)) {
        let greeting = greetingFunc();
       speakFunc('Hello! ${greeting} How can I help You?');
    } else {
        speakFunc("I'm sorry, I didn't understand that. Can you please repeat?");
    }
};

// Start Voice Input
const startVoiceInput = () => {
    if (recognition && !isMicrophoneOn) {
        recognition.start();
        isMicrophoneOn = true;
        console.log("Voice input started.");
    } else {
        console.error("Speech Recognition is not initialized or already running.");
    }
};

// Stop Voice Input
const stopVoiceInput = () => {
    if (recognition && isMicrophoneOn) {
        recognition.stop();
        isMicrophoneOn = false;
        console.log("Voice input stopped.");
    }
};

// Button Event Listeners
btn.onmousedown = () => {
    btn.innerHTML = '<i class="fa-solid fa-microphone-lines"></i>';
    speakFunc("Microphone is now on. You can speak.");
    startVoiceInput();
};

btn.onmouseup = () => {
    btn.innerHTML = '<i class="fa-solid fa-microphone-slash"></i>';
    speakFunc("Microphone is now off.");
    stopVoiceInput();
};

// Initialize Speech Recognition on Page Load
window.onload = () => {
    initializeRecognition();
};