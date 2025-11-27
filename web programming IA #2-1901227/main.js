// js/main.js

// ====== CONFIG: SET YOUR WHATSAPP NUMBER HERE ======
/**
 * WhatsApp number in international format, digits only.
 * Example for Jamaica: +1 (876) 555-1234  →  "18765551234"
 */
const WHATSAPP_NUMBER = "18764647213"; // <- your business WhatsApp
// ===================================================

// Auto-fill year in footer (works on all pages)
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ====== TEMPLATE SELECTION (TEMPLATES PAGE + ORDER PAGE) ======
const templateCards = document.querySelectorAll(".template-card");
const templateInput = document.getElementById("template");
const selectedTemplateLabel = document.getElementById("selected-template-label");

if (templateCards.length > 0) {
  templateCards.forEach((card) => {
    card.addEventListener("click", () => {
      const name =
        card.dataset.template ||
        card.querySelector(".template-name").innerText;

      // Remove selection from all, then mark this one
      templateCards.forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");

      // Update input on order page (if it exists)
      if (templateInput) {
        templateInput.value = name + " flyer";
        templateInput.focus();
      }

      // Update label text under templates (on order page)
      if (selectedTemplateLabel) {
        selectedTemplateLabel.textContent = name;
      }
    });
  });
}

// ====== ORDER FORM → WHATSAPP SEND ======
const orderForm = document.getElementById("order-form");

if (orderForm) {
  orderForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    const phone = document.getElementById("phone")?.value.trim() || "";
    const template = document.getElementById("template")?.value.trim() || "";
    const size = document.getElementById("size")?.value || "";
    const quantity = document.getElementById("quantity")?.value.trim() || "";
    const details = document.getElementById("details")?.value.trim() || "";

    if (!name || !email) {
      alert("Please fill in at least your name and email before sending.");
      return;
    }

    const lines = [
      "New Davinchi Dezigns flyer order request:",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone / WhatsApp: ${phone}` : "Phone / WhatsApp: (not provided)",
      template ? `Selected template: ${template}` : "Selected template: (not specified)",
      "",
      `Flyer size: ${size || "Not specified"}`,
      `Quantity: ${quantity || "Not specified"}`,
      "",
      "Event / promo details:",
      details || "(No extra details provided)"
    ];

    const message = encodeURIComponent(lines.join("\n"));

    if (!WHATSAPP_NUMBER) {
      alert(
        "WhatsApp number is not configured.\n\n" 
      );
      return;
    }

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    // Open WhatsApp chat (web or app)
    window.open(waUrl, "_blank");
  });
}