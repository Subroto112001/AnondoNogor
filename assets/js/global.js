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
        oswald: ['"Noto Serif Bengali"', "serif"],
      },
    },
  },
};
/**
 * আনন্দনগর - Universal Global JS
 * Noto Serif Bengali Font Applied via Configuration
 */

// ১. কম্পোনেন্ট লোড করার মূল ফাংশন
async function loadComponent(elementId, filePath) {
  const element = document.getElementById(elementId);
  if (!element) return false;

  try {
    const response = await fetch(filePath);
    if (response.ok) {
      const content = await response.text();
      element.innerHTML = content;
      return true;
    } else {
      console.error(`Error loading ${filePath}: ${response.statusText}`);
      return false;
    }
  } catch (error) {
    console.error(`Fetch error: ${error}`);
    return false;
  }
}

// ২. কল বাটনের স্মার্ট লজিক (Mobile vs Desktop)
function setupCallButton() {
  // হেডার এবং পেজ কন্টেন্টের সব কল বাটনকে সিলেক্ট করা
  const callButtons = document.querySelectorAll('[ id="call-button"]');
  const phoneNumber = "+8801700000000"; // আপনার নম্বরটি এখানে দিন

  const isMobile = () =>
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  callButtons.forEach((btn) => {
    btn.onclick = (e) => {
      if (isMobile()) {
        e.preventDefault();
        window.location.href = `tel:${phoneNumber}`;
      } else {
        // ডেস্কটপে ডিফল্ট href অনুযায়ী contact.html#phone-section এ চলে যাবে
        console.log("Desktop view: Routing to contact page section.");
      }
    };
  });
}

// ৩. মোবাইল মেনু টগল লজিক
function setupMobileMenu() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const toggleIcon = document.getElementById("toggle-icon");

  if (toggleBtn && mobileMenu && toggleIcon) {
    toggleBtn.onclick = () => {
      const isHidden = mobileMenu.classList.toggle("hidden");
      if (isHidden) {
        toggleIcon.classList.replace("fa-xmark", "fa-bars-staggered");
      } else {
        toggleIcon.classList.replace("fa-bars-staggered", "fa-xmark");
      }
    };
  }
}

// ৪. মেনু আইটেম হাইলাইট (Active Link)
function setActiveNavLink() {
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
    }
  });
}

// ৫. মাস্টার ইনিশিয়ালাইজার (সব একসাথে রান হবে)
document.addEventListener("DOMContentLoaded", async () => {
  // কম্পোনেন্টগুলো লোড হওয়ার জন্য অপেক্ষা করবে
  const headerStatus = await loadComponent(
    "main-header",
    "components/header.html"
  );
  const footerStatus = await loadComponent(
    "main-footer",
    "components/footer.html"
  );

  // হেডার লোড হওয়ার পর তার ভেতরের ফাংশনগুলো রান করবে
  if (headerStatus) {
    setupMobileMenu();
    setActiveNavLink();
  }

  // পেজে আগে থেকে থাকা বা নতুন আসা সব কল বাটন সেটআপ করবে
  setupCallButton();
});
