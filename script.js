// GSAP Slide Animation Function (from right to extreme right)
function slideInCharacter(sceneNumber) {
    const character = document.querySelector('#scene' + sceneNumber + ' .character');
    gsap.killTweensOf(character); // Reset any ongoing animation
    gsap.set(character, { x: '100%', right: 0, bottom: 0 }); // Start off-screen
    gsap.to(character, { x: 10, duration: 1 }); // Slide in
}

// GSAP Fade-in Animation for the Genie
function fadeInGenie(sceneNumber) {
    const genie = document.querySelector('#scene' + sceneNumber + ' .genie');
    gsap.killTweensOf(genie); // Reset any ongoing animation
    gsap.set(genie, { opacity: 0, x: '-100%' }); // Start invisible
    gsap.to(genie, { opacity: 1, x: 10, duration: 1 }); // Fade-in
}

// Typing effect function
function typeDialogue(text, element) {
    element.innerText = ""; // Clear existing text
    element.style.opacity = 1; // Ensure text is visible

    let index = 0;
    if (window.typingTimeout) {
        clearTimeout(window.typingTimeout); // Clear any previous timeouts
    }

    function typeNextCharacter() {
        if (index < text.length) {
            const char = text.charAt(index) === ' ' ? '\u00A0' : text.charAt(index); // Non-breaking space for spaces
            element.innerHTML += char; // Append character
            index++;
            window.typingTimeout = setTimeout(typeNextCharacter, 50); // Set timeout for next character
        }
    }

    typeNextCharacter(); // Start typing process
}

// Array to store the dialogues for each scene
const dialogues = {
    1: ["No matter how hard I try, I just can’t get it. Nothing makes sense anymore..."],
    2: ["Maybe I’m just not cut out for this. No matter how much I study, it feels like I’m going in circles..."],
    3: ["W-Where am I? What just happened?" ],
    4: [
        "GENIE: Welcome, young traveler! You’ve fallen into the Cave of Knowledge. But worry not, for I am here to guide you.", // Genie
        "STUDENT: A genie...? What is this place?", // Student
        "Indeed! I am a genie, but not the kind that grants wishes for riches or fame. I grant something far more valuable—knowledge." // Genie
    ],
    5: [
        "GENIE: You are at a crossroads in your journey. There are three paths before you, each representing a different challenge in your quest for mastery.", // Genie
        "STUDENT: Which path should I take?", // Student
        "GENIE: The first path is Aptitude and Reasoning. Follow this road, and you will learn to think logically, solve puzzles, and master the art of reasoning.", // Genie
        "GENIE: The second path is Java. Here, you will learn how to program and build your skills to unlock the power of code.", // Genie
        "GENIE: The third path is DBMS and SQL. Here, you will delve into the world of databases, learning how to manage and query data to uncover its hidden secrets." // Genie
    ],
    6: [
        "GENIE: But beware, young one. Each path is filled with challenges. However, I will guide you along the way.", // Genie
        "GENIE: So, what will it be? Will you master Aptitude and Reasoning, conquer Java, or unlock the secrets of DBMS and SQL first? The choice is yours." // Genie
    ]
};

// Keep track of the current dialogue index for each scene
const currentDialogueIndex = {};

// Keep track of whether the character has slid in
const characterSlidIn = {};

// Handle scene transitions and play sounds accordingly
function nextScene(sceneNumber) {
    var scenes = document.querySelectorAll('.scene');
    scenes.forEach(scene => {
        scene.classList.remove('visible'); // Hide all scenes
    });

    document.getElementById('scene' + sceneNumber).classList.add('visible'); // Show the next scene
    stopAllSounds(); // Stop all sounds

    // Play specific sounds depending on the scene
    switch (sceneNumber) {
        case 2: 
            rainSound.play(); 
            if (!characterSlidIn[sceneNumber]) {
                slideInCharacter(sceneNumber); // Slide-in animation for the character
                characterSlidIn[sceneNumber] = true; // Mark as slid in
            }
            break; // Only animate on the first dialogue
        case 3: 
            afterFallSound.play(); 
            if (!characterSlidIn[sceneNumber]) {
                slideInCharacter(sceneNumber); // Slide-in animation for the character
                characterSlidIn[sceneNumber] = true; // Mark as slid in
            }
            break; // Only animate on the first dialogue
        case 4:
            if (!characterSlidIn[sceneNumber]) {
                magicSound.play(); // Play magic sound
                fadeInGenie(4); // Genie appears (animate only on first dialogue)
                slideInCharacter(sceneNumber); // Slide-in animation
                characterSlidIn[sceneNumber] = true; // Mark as slid in
            }
            break; // Do not animate if already settled in
        case 5:
            if (!characterSlidIn[sceneNumber]) {
                fadeInGenie(5); // Genie appears
                slideInCharacter(sceneNumber); // Slide-in animation for the character
                characterSlidIn[sceneNumber] = true; // Mark as slid in
            }
            break; // Only animate on the first dialogue
        case 6: 
            sadSound.play(); 
            if (!characterSlidIn[sceneNumber]) {
                fadeInGenie(6); // Genie appears
                slideInCharacter(sceneNumber); // Slide-in animation for the character
                characterSlidIn[sceneNumber] = true; // Mark as slid in
            }
            break; // Only animate on the first dialogue
    }

    // Initialize dialogue index for the current scene if not already set
    if (!currentDialogueIndex[sceneNumber]) {
        currentDialogueIndex[sceneNumber] = 0; // Start with the first dialogue
    }

    // Type the dialogue for the current scene based on the index
    typeDialogue(dialogues[sceneNumber][currentDialogueIndex[sceneNumber]], document.getElementById('footer-dialogue')); // Update dialogue
}

// Go to the previous scene
function prevScene(sceneNumber) {
    var scenes = document.querySelectorAll('.scene');
    scenes.forEach(scene => {
        scene.classList.remove('visible'); // Hide all scenes
    });

    document.getElementById('scene' + sceneNumber).classList.add('visible'); // Show the previous scene
    stopAllSounds(); // Stop all sounds

    // Reset dialogue index for the previous scene
    currentDialogueIndex[sceneNumber] = 0; // Reset dialogue index
    typeDialogue(dialogues[sceneNumber][currentDialogueIndex[sceneNumber]], document.getElementById('footer-dialogue')); // Update dialogue
    
    // Slide in character only if not already slid in
    if (!characterSlidIn[sceneNumber]) {
        slideInCharacter(sceneNumber); // Slide-in animation for character
        characterSlidIn[sceneNumber] = true; // Mark as slid in
    }
}

// Stop all sounds
function stopAllSounds() {
    rainSound.pause(); rainSound.currentTime = 0;
    magicSound.pause(); magicSound.currentTime = 0;
    afterFallSound.pause(); afterFallSound.currentTime = 0;
    selectSound.pause(); selectSound.currentTime = 0;
    sadSound.pause(); sadSound.currentTime = 0;
}

// Restart the story
function restart() {
    nextScene(1); // Reset to first scene
}

// Initialize the first scene with the animation when the page loads
window.onload = function() {
    slideInCharacter(1); // Start with the character sliding in
    currentDialogueIndex[1] = 0; // Set initial dialogue index
    typeDialogue(dialogues[1][0], document.getElementById('footer-dialogue')); // Initial dialogue
};

// Handle click event to advance the scene
window.addEventListener('click', function() {
    const visibleScene = document.querySelector('.scene.visible');
    let currentSceneNumber = parseInt(visibleScene.id.replace('scene', ''));

    // Check if there are more dialogues for the current scene
    if (currentDialogueIndex[currentSceneNumber] < dialogues[currentSceneNumber].length - 1) {
        currentDialogueIndex[currentSceneNumber]++; // Move to the next dialogue
    } else {
        // If it's the last dialogue, advance to the next scene
        currentSceneNumber++;
        if (currentSceneNumber > Object.keys(dialogues).length) {
            currentSceneNumber = 1; // Reset to first scene if we exceed the number of scenes
        }
        currentDialogueIndex[currentSceneNumber] = 0; // Reset dialogue index for the new scene
    }

    typeDialogue(dialogues[currentSceneNumber][currentDialogueIndex[currentSceneNumber]], document.getElementById('footer-dialogue')); // Type the dialogue
    nextScene(currentSceneNumber); // Move to the next scene
});

// Add event listener for the single Previous button
document.querySelectorAll('.prev-button').forEach((button) => {
    button.addEventListener('click', function() {
        const visibleScene = document.querySelector('.scene.visible');
        let currentSceneNumber = parseInt(visibleScene.id.replace('scene', ''));
        currentSceneNumber--; // Go to the previous scene
        if (currentSceneNumber < 1) {
            currentSceneNumber = 1; // Prevent going below the first scene
        }
        prevScene(currentSceneNumber); // Move to the previous scene
    });
});
