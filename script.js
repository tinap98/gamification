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
};
