document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const modalCaption = document.getElementById("modalCaption");
  const closeBtn = document.getElementById("closeModalBtn");
  const galleryImages = document.querySelectorAll(".gallery-img");
  const body = document.body;

  // Function to open modal
  function openModal(img) {
    modalImg.src = img.src;
    modalCaption.textContent = img.alt;
    modal.classList.remove("modal-inactive");
    modal.classList.add("modal-active");
    modal.setAttribute("aria-hidden", "false");
    body.style.overflow = "hidden"; // Prevent background scrolling
    closeBtn.focus(); // Accessibility: Move focus to close button
  }

  // Function to close modal
  function closeModal() {
    modal.classList.remove("modal-active");
    modal.classList.add("modal-inactive");
    modal.setAttribute("aria-hidden", "true");
    body.style.overflow = ""; // Restore scrolling

    // Clear source after animation to prevent flicker next time
    setTimeout(() => {
      modalImg.src = "";
    }, 300);
  }

  // Add click event to all gallery images
  galleryImages.forEach((img) => {
    img.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default if wrapped in link
      openModal(img);
    });

    // Add keyboard support (Enter key) for accessibility
    img.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        openModal(img);
      }
    });

    // Make images focusable
    img.setAttribute("tabindex", "0");
  });

  // Close modal on close button click
  closeBtn.addEventListener("click", closeModal);

  // Close modal on click outside image
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal on Escape key press
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("modal-active")) {
      closeModal();
    }
  });
});
