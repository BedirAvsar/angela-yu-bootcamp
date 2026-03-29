document.addEventListener('DOMContentLoaded', () => {
    
    const textElement = document.getElementById('typing-text');
    const titles = ["Junior Software Engineer", "Mechanical Engineer", "Backend Developer"];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            textElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentTitle.length) {
            typeSpeed = 2000; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }
    
    typeEffect();
});