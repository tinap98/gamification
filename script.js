// GSAP Slide Animation Function (from right to extreme right)
function slideInCharacter(sceneNumber) {
    const character = document.querySelector('#scene' + sceneNumber + ' .character');

    // Reset any ongoing animation for the character
    gsap.killTweensOf(character);

    // Move the character off-screen initially (right side)
    gsap.set(character, { x: '100%', right: 0, bottom: 0 });

    // Slide the character into view and stop at the extreme right
    gsap.to(character, {
        x: 10, // Character will stop at the extreme right of the screen
        duration: 1
    });
}

// GSAP Fade-in Animation for the Genie
function fadeInGenie(sceneNumber) {
    const genie = document.querySelector('#scene' + sceneNumber + ' .genie');

    // Reset any ongoing animation for the genie
    gsap.killTweensOf(genie);

    // Ensure genie starts invisible on the extreme left
    gsap.set(genie, { opacity: 0, x: '-100%' });

    // Fade-in and move the genie slightly from the left
    gsap.to(genie, {
        opacity: 1,
        x: 10, // Genie will appear on the extreme left side of the screen
        duration: 1
    });
}

// Typing effect function with reset for the previous text
function typeDialogue(text, element) {
    // Clear existing text and cancel any ongoing typing
    element.innerText = ""; // Clear any existing text instantly
    let typingInProgress = false; // Ensure that typing is only done once per call

    // Ensure the footer text is visible
    element.style.opacity = 1;

    let index = 0;

    // Clear any previous timeouts if they exist
    if (window.typingTimeout) {
        clearTimeout(window.typingTimeout);
    }

    function typeNextCharacter() {
        if (index < text.length) {
            const char = text.charAt(index) === ' ' ? '\u00A0' : text.charAt(index); // Non-breaking space for spaces
            element.innerHTML += char; // Append the character

            index++;

            // Set timeout for the next character
            window.typingTimeout = setTimeout(typeNextCharacter, 100);
        }
    }

    // Start the typing process
    typeNextCharacter();
}

// Handle scene transitions and play sounds accordingly
function nextScene(sceneNumber) {
    // Hide all scenes
    var scenes = document.querySelectorAll('.scene');
    scenes.forEach(scene => {
        scene.classList.remove('visible');
    });

    // Show the next scene
    document.getElementById('scene' + sceneNumber).classList.add('visible');

    // Stop all sounds initially
    stopAllSounds();

    // Play specific sounds depending on the scene
    if (sceneNumber === 2) {
        rainSound.play(); // Play rain sound when walking home
    } else if (sceneNumber === 3) {
        afterFallSound.play(); // Play fall sound in the pit
    } else if (sceneNumber === 4) {
        magicSound.play(); // Play magic sound when the genie appears
        fadeInGenie(4);    // Genie appears in scene 4
    } else if (sceneNumber === 5) {
        fadeInGenie(5);    // Genie appears in scene 5
    } else if (sceneNumber === 6) {
        sadSound.play(); // Play sad sound at the end
        fadeInGenie(6);    // Genie appears in scene 6
    }

    // Trigger slide-in animation for the new scene
    slideInCharacter(sceneNumber);

    // Update the dialogue in the footer
    const dialogues = [
        "Oh nooo, what happened?",  // Scene 1
        "I better get going...",   // Scene 2
        "Oh no, I fell!",          // Scene 3
        "A genie?!",               // Scene 4
        "Which path should I take?",// Scene 5
        "I'll choose wisely."       // Scene 6
    ];

    typeDialogue(dialogues[sceneNumber - 1], document.getElementById('footer-dialogue'));
}

// Go to the previous scene
function prevScene(sceneNumber) {
    // Hide all scenes
    var scenes = document.querySelectorAll('.scene');
    scenes.forEach(scene => {
        scene.classList.remove('visible');
    });

    // Show the previous scene
    document.getElementById('scene' + sceneNumber).classList.add('visible');

    // Stop all sounds initially
    stopAllSounds();

    // Update the dialogue in the footer
    const dialogues = [
        "Oh nooo, what happened?",  // Scene 1
        "I better get going...",   // Scene 2
        "Oh no, I fell!",          // Scene 3
        "A genie?!",               // Scene 4
        "Which path should I take?",// Scene 5
        "I'll choose wisely."       // Scene 6
    ];

    typeDialogue(dialogues[sceneNumber - 1], document.getElementById('footer-dialogue'));
}

// Stop all sounds
function stopAllSounds() {
    rainSound.pause();
    magicSound.pause();
    afterFallSound.pause();
    selectSound.pause();
    sadSound.pause();

    // Reset the currentTime so that audio can be replayed from the start
    rainSound.currentTime = 0;
    magicSound.currentTime = 0;
    afterFallSound.currentTime = 0;
    selectSound.currentTime = 0;
    sadSound.currentTime = 0;
}

// Restart the story
function restart() {
    nextScene(1);
}

// Initialize the first scene with the animation when the page loads
window.onload = function() {
    slideInCharacter(1); // Start with the character sliding in on scene 1
    typeDialogue("Oh no, what happened?", document.getElementById('footer-dialogue')); // Initial dialogue
};
