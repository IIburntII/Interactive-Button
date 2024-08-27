document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('trickyButton');
    const container = document.querySelector('.container');
    let isMoving = false;

    function moveButtonAway(e) {
        if (isMoving) return;

        const rect = button.getBoundingClientRect();
        const buttonX = rect.left + rect.width / 2;
        const buttonY = rect.top + rect.height / 2;
        const dist = Math.hypot(buttonX - e.clientX, buttonY - e.clientY);

        if (dist < 200) {  // Trigger when the mouse/finger is within 200px
            const angle = Math.atan2(e.clientY - buttonY, e.clientX - buttonX);
            let offsetX = rect.left - Math.cos(angle) * 300;  // Move 300px away
            let offsetY = rect.top - Math.sin(angle) * 300;   // Move 300px away

            // Bounce off the edges
            if (offsetX < 0) offsetX = -offsetX;
            if (offsetX + rect.width > window.innerWidth) offsetX = 2 * (window.innerWidth - rect.width) - offsetX;
            if (offsetY < 0) offsetY = -offsetY;
            if (offsetY + rect.height > window.innerHeight) offsetY = 2 * (window.innerHeight - rect.height) - offsetY;

            button.style.transition = "transform 0.5s ease-out";
            button.style.transform = `translate(${offsetX - rect.left}px, ${offsetY - rect.top}px)`;

            isMoving = true;

            // Reset the position after the move
            setTimeout(() => {
                button.style.transition = "none";
                button.style.transform = "none";
                button.style.left = `${offsetX}px`;
                button.style.top = `${offsetY}px`;
                isMoving = false;
            }, 500);
        }
    }

    container.addEventListener('mousemove', moveButtonAway);

    // Mobile touch support
    container.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        moveButtonAway({ clientX: touch.clientX, clientY: touch.clientY });
    });

    window.addEventListener('resize', () => {
        button.style.left = `calc(50% - ${button.offsetWidth / 2}px)`;
        button.style.top = `calc(50% - ${button.offsetHeight / 2}px)`;
    });

    window.dispatchEvent(new Event('resize'));
});
