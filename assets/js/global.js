tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#2D6A4F",
        "forest-green": "#1A4332",
        "saffron-yellow": "#FFD166",
        "border-green": "#2D6A4F",
        "background-light": "#F8F9FA",
      },
      fontFamily: {
        serif: ['"Noto Serif Bengali"', "serif"],
        body: ['"Noto Serif Bengali"', "serif"],
      },
    },
  },
};

// Function to load HTML components
async function loadComponent(elementId, filePath) {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        const response = await fetch(filePath);
        if (response.ok) {
            const content = await response.text();
            element.innerHTML = content;
        } else {
            console.error(`Error loading ${filePath}: ${response.statusText}`);
        }
    } catch (error) {
        console.error(`Fetch error: ${error}`);
    }
}

// মোবাইল মেনু টগল ফাংশন
function setupMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const toggleIcon = document.getElementById('toggle-icon');

    // ইভেন্ট লিসেনার যোগ করার আগে চেক করে নেওয়া
    if (toggleBtn && mobileMenu && toggleIcon) {
        toggleBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.toggle('hidden');
            
            // আইকন পরিবর্তন logic
            if (isHidden) {
                toggleIcon.classList.remove('fa-xmark');
                toggleIcon.classList.add('fa-bars-staggered');
            } else {
                toggleIcon.classList.remove('fa-bars-staggered');
                toggleIcon.classList.add('fa-xmark');
            }
        });
    }
}

// একটিভ লিঙ্ক সেট করার ফাংশন
function setActiveNavLink() {
    // বর্তমান পাথ ক্লিন করা (যেমন: /features.html থেকে features.html)
    let currentPath = window.location.pathname.split("/").pop();
    if (currentPath === "" || currentPath === "/") currentPath = "index.html";

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (!href) return;
        
        const linkPath = href.split("/").pop();

        if (linkPath === currentPath) {
            link.classList.add("text-primary", "border-primary");
            link.classList.remove("text-forest-green", "border-transparent");
        } else {
            link.classList.remove("text-primary", "border-primary");
            link.classList.add("text-forest-green", "border-transparent");
        }
    });
}

// DOMContentLoaded ইভেন্ট
document.addEventListener("DOMContentLoaded", async () => {
    // পাথ অনুযায়ী কম্পোনেন্ট লোড করা
    await loadComponent("main-header", "components/header.html");
    await loadComponent("main-footer", "components/footer.html");

    // কম্পোনেন্ট লোড হওয়ার পর ফাংশন কল করা
    setupMobileMenu();
    setActiveNavLink();
});