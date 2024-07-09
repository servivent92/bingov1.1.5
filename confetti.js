//----Efecto de confetti--------------------
document.getElementById('startConfettiButton').addEventListener('click', startConfetti);

function startConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const message = document.getElementById('win-message');
    const colors = ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7', '#a4d4ff', '#55e6c1', '#c9f0ff', '#fcf876', '#9b5de5', '#f15bb5', '#fee440', '#00bbf9', '#00f5d4'];

    // Remove existing confetti and reset message visibility and animation
    while (confettiContainer.firstChild) {
        confettiContainer.removeChild(confettiContainer.firstChild);
    }
    message.style.opacity = 0;
    message.style.animation = 'none';
    void message.offsetWidth; // Trigger reflow to restart the animation

    // Start confetti animation
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
        confetti.style.left = '50vw';
        confetti.style.top = '50vh';
        confetti.style.animationDuration = Math.random() * 2 + 3 + 's';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.opacity = 1;

        // Set random x and y values for explosion effect, ensuring they stay within the screen
        const x = (Math.random() - 0.5) * 100 + 'vw';
        const y = (Math.random() - 0.5) * 100 + 'vh';
        confetti.style.setProperty('--x', x);
        confetti.style.setProperty('--y', y);

        confettiContainer.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }

    // Show the message with animation
    message.style.opacity = 1;
    message.style.animation = 'message-in-out 10s forwards'; // Duration set to 5s for larger display

    // Hide the message after 5 seconds
    setTimeout(() => {
        message.style.opacity = 0;
        message.style.animation = 'none';
    }, 10000); // Change to 5000 milliseconds (5 seconds)

    

    
}


//----------------------------------------------