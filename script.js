function nextScene(sceneNumber) {
    // Stop the rain sound and play the next scene sound if applicable
    if (sceneNumber === 2) {
        document.getElementById('rainSound').play(); // Play rain sound on scene 2
    } else if (sceneNumber === 3) {
        document.getElementById('afterFallSound').play(); // Play fall sound on scene 3
    } else if (sceneNumber === 4) {
        document.getElementById('magicSound').play(); // Play magic sound on scene 4
    } else if (sceneNumber === 5) {
        document.getElementById('selectSound').play(); // Play select sound on scene 5
    }

    // Hide all scenes
    document.querySelectorAll('.scene').forEach(scene => scene.classList.remove('visible'));

    // Show the next scene
    document.getElementById(`scene${sceneNumber}`).classList.add('visible');
}

function restart() {
    // Restart the journey back to scene 1
    nextScene(1);
    document.getElementById('rainSound').pause();
    document.getElementById('rainSound').currentTime = 0; // Reset sound to the beginning
}
