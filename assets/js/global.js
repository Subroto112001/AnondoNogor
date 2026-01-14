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

// script to load header and footer
// Function to load HTML components
async function loadComponent(elementId, filePath) {
  const element = document.getElementById(elementId);
  if (!element) return; // Exit if the ID doesn't exist on this page

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

function setActiveNavLink() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href").split("/").pop();

    if (linkPath === currentPath) {
      // একটিভ কালার এবং বর্ডার যোগ করা হচ্ছে
      link.classList.add("text-primary", "border-primary");
      link.classList.remove("text-forest-green", "border-transparent");
    } else {
      // অন্য লিঙ্কগুলো থেকে একটিভ ক্লাস সরানো হচ্ছে
      link.classList.remove("text-primary", "border-primary");
      link.classList.add("text-forest-green", "border-transparent");
    }
  });
}

// DOMContentLoaded ইভেন্টে পরিবর্তন
document.addEventListener("DOMContentLoaded", async () => {
  // হেডার লোড হওয়া পর্যন্ত অপেক্ষা করতে await ব্যবহার করা হয়েছে
  await loadComponent("main-header", "components/header.html");
  await loadComponent("main-footer", "components/footer.html");

  // হেডার লোড হওয়ার পর একটিভ লিঙ্ক সেট করা হচ্ছে
  setActiveNavLink();
});
