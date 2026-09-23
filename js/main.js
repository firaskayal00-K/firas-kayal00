// Mobile nav toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("nav-open");
      toggle.classList.toggle("open");
    });
  }

  // Newsletter forms: prevent real submit, give lightweight feedback
  document.querySelectorAll("[data-newsletter-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector("button");
      const input = form.querySelector("input");
      if (!input.value.trim()) return;
      const original = btn.textContent;
      btn.textContent = "Subscribed!";
      form.reset();
      setTimeout(() => (btn.textContent = original), 2000);
    });
  });

  // Add to cart feedback
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const cartCounts = document.querySelectorAll("[data-cart-count]");
      cartCounts.forEach((el) => {
        el.textContent = String(Number(el.textContent) + 1);
      });
      const original = btn.textContent;
      btn.textContent = "Added ✓";
      setTimeout(() => (btn.textContent = original), 1200);
    });
  });

  // Shop page: filter products by ?category= from the URL
  const productsGrid = document.getElementById("productsGrid");
  if (productsGrid) {
    const categoryLabels = {
      audio: "Audio",
      wearables: "Wearables",
      "smart-home": "Smart Home",
      accessories: "Accessories",
      gaming: "Gaming",
    };
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");

    if (category) {
      const cards = productsGrid.querySelectorAll(".product-card");
      let visibleCount = 0;
      cards.forEach((card) => {
        const matches = card.dataset.category === category;
        card.style.display = matches ? "" : "none";
        if (matches) visibleCount++;
      });

      const banner = document.getElementById("filterBanner");
      const bannerLabel = document.getElementById("filterBannerLabel");
      const emptyState = document.getElementById("filterEmpty");
      const label = categoryLabels[category] || category;

      if (banner && bannerLabel) {
        bannerLabel.textContent = label;
        banner.hidden = false;
      }
      if (emptyState) {
        emptyState.hidden = visibleCount > 0;
      }
    }
  }
});
