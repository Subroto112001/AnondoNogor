let allImages = [];
let currentIndex = 0;
const limit = 16;
const container = document.getElementById("gallery-container");
const btn = document.getElementById("load-more-btn");
const spinner = document.getElementById("spinner");
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const closeModal = document.getElementById("close-modal");

// ১. লেআউট ফেচ (Header/Footer)
async function loadLayout() {
  try {
    const head = await fetch("header.html");
    if (head.ok)
      document.getElementById("main-header").innerHTML = await head.text();
    const foot = await fetch("footer.html");
    if (foot.ok)
      document.getElementById("main-footer").innerHTML = await foot.text();
  } catch (e) {
    console.log("Header/Footer missing");
  }
}

// ২. গ্যালারি ডেটা ফেচ এবং রেন্ডার
async function initGallery() {
  try {
    const res = await fetch("images.json");
    allImages = await res.json();
    renderNextBatch();
  } catch (e) {
    console.error("JSON Error:", e);
  }
}

function renderNextBatch() {
  spinner.classList.add("fa-spin");
  const nextSet = allImages.slice(currentIndex, currentIndex + limit);

  nextSet.forEach((img) => {
    const item = document.createElement("div");
    item.className =
      "masonry-item group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg";
    item.innerHTML = `
                    <img alt="${img.alt}" class="w-full h-auto transition-transform duration-700 group-hover:scale-110" src="${img.src}" loading="lazy" />
                    <div class="absolute inset-0 bg-forest-green/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                        <div class="text-white">
                            <span class="text-[10px] font-bold text-saffron-yellow uppercase tracking-widest">${img.zone}</span>
                            <h4 class="font-bold text-xl uppercase">${img.title}</h4>
                        </div>
                    </div>
                `;
    // মোডাল ওপেন ইভেন্ট
    item.addEventListener("click", () => {
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden"; // স্ক্রলিং বন্ধ
    });
    container.appendChild(item);
  });

  currentIndex += limit;
  spinner.classList.remove("fa-spin");
  if (currentIndex >= allImages.length) btn.style.display = "none";
}

// মোডাল বন্ধ করার লজিক
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  document.body.style.overflow = "auto"; // স্ক্রলিং চালু
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal.click();
});

btn.addEventListener("click", renderNextBatch);

window.addEventListener("DOMContentLoaded", () => {
  loadLayout();
  initGallery();
});
