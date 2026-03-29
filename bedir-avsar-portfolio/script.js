// Feather Icons
feather.replace();

// LOADING SCREEN
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.classList.add('hidden');
    setTimeout(() => {
        loadingScreen.style.display = "none";
    }, 500);
});

// MOBILE MENU
const toggle = document.querySelector(".nav-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

toggle?.addEventListener("click", () => {
    mobileMenu.classList.toggle('active');
    feather.replace();
});

// Close mobile menu when link is clicked
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// LIGHT/DARK MODE
const themeToggle = document.querySelector(".theme-toggle");

themeToggle.addEventListener("click", () => {
    const curr = document.body.getAttribute("data-theme");
    const newTheme = curr === "light" ? "dark" : "light";
    document.body.setAttribute("data-theme", newTheme);
    
    // Update icon
    const icon = themeToggle.querySelector('i');
    icon.setAttribute('data-feather', newTheme === "light" ? "moon" : "sun");
    feather.replace();
});

// CV MODAL
const modal = document.getElementById("cvModal");
const openCV = document.getElementById("openCV");
const closeCV = document.getElementById("closeCV");

openCV.onclick = () => modal.classList.add('show');
closeCV.onclick = () => modal.classList.remove('show');

// Close modal when clicking outside
modal.onclick = (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
};

// GSAP REVEAL
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".reveal").forEach((section) => {
    gsap.to(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
    });
});

// AUTO-FETCH GITHUB REPOS
fetch("https://api.github.com/users/BedirAvsar/repos")
    .then((res) => {
        if (!res.ok) throw new Error('GitHub API error');
        return res.json();
    })
    .then((data) => {
        const container = document.getElementById("github-repos");
        
        if (data.length === 0) {
            container.innerHTML = '<p>No repositories found.</p>';
            return;
        }

        data
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            .slice(0, 6)
            .forEach((repo) => {
                const div = document.createElement("div");
                div.classList.add("repo");
                div.innerHTML = `
                    <h4>${repo.name}</h4>
                    <p>${repo.description || "No description available"}</p>
                    <a href="${repo.html_url}" target="_blank">View on GitHub →</a>
                `;
                container.appendChild(div);
            });
    })
    .catch((error) => {
        console.error('Error fetching repos:', error);
        document.getElementById("github-repos").innerHTML = 
            '<p>Unable to load repositories at this time.</p>';
    });

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});