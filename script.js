// GSAP Slide Animation Function (from right to extreme right)
function slideInCharacter(sceneNumber) {
    const character = document.querySelector('#scene' + sceneNumber + ' .character');

    // Move the character off-screen initially (right side)
    gsap.set(character, { x: '100%', right: 0, bottom: 0 });

    // Slide the character into view and stop at the extreme right
    gsap.to(character, {
        x: 10, // Character will stop at the extreme right of the screen
        duration: 1
    });
}

// Typing effect function
function typeDialogue(text, element) {
    element.innerText = ""; // Clear existing text
    element.style.opacity = 1; // Make the text visible

    let index = 0; // Initialize index for the current character

    function typeNextCharacter() {
        if (index < text.length) {
            const char = text.charAt(index) === ' ' ? '\u00A0' : text.charAt(index); // Replace space with non-breaking space
            element.innerHTML += char; // Use innerHTML to maintain spaces
            index++;
            setTimeout(typeNextCharacter, 100); // Delay for the next character
        }
    }

    typeNextCharacter(); // Start the typing effect
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
    } else if (sceneNumber === 6) {
        sadSound.play(); // Play sad sound at the end
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
        "Oh no, what happened?",  // Scene 1
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
