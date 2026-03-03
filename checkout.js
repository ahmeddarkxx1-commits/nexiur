(function () {
  const PRODUCT_KEY = "reksona_products_v2";
  const CART_KEY = "reksona_cart_v2";
  const GMAIL_RECEIVER = "ahmeddarkxx1@gmail.com";
  let VODAFONE_NUMBER = "01152628515";
  const WHATSAPP_NUMBER = "201152628515";
  let customQrPath = "";

  const form = document.getElementById("gmailProofForm");
  const errorBox = document.getElementById("checkoutError");
  const itemsWrap = document.getElementById("checkoutItems");
  const summaryTotal = document.getElementById("summaryTotal");
  const exactAmount = document.getElementById("exactAmount");
  const qrImage = document.getElementById("vodafoneQr");
  const orderIdField = document.getElementById("orderIdField");
  const amountField = document.getElementById("amountField");
  const mailSubject = document.getElementById("mailSubject");
  const successOverlay = document.getElementById("successOverlay");
  const closeSuccessBtn = document.getElementById("closeSuccessBtn");

  function getProducts() {
    const raw = localStorage.getItem(PRODUCT_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  }

  function getCart() {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function formatMoney(value) {
    return `${Number(value).toLocaleString("en-US")} EGP`;
  }

  function showError(message) {
    errorBox.textContent = message;
    errorBox.classList.add("show");
  }

  function clearError() {
    errorBox.textContent = "";
    errorBox.classList.remove("show");
  }

  function subtotalEgp() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + Number(item.unitPrice || 0) * Number(item.qty || 1), 0);
  }

  function cartItemsPayload() {
    const cart = getCart();
    return cart.map((item) => ({
      productId: Number(item.id),
      quantity: Number(item.qty || 1),
      priceEgp: Number(item.unitPrice || 0),
    }));
  }

  function renderSummary() {
    const cart = getCart();
    const products = getProducts();
    const total = subtotalEgp();

    if (!cart.length) {
      itemsWrap.textContent = "لا توجد عناصر في السلة.";
    } else {
      itemsWrap.innerHTML = cart
        .map((item) => {
          const p = products.find((product) => String(product.id) === String(item.id));
          const title = p ? p.title || p.name : item.title;
          return `<div class=\"cart-item\"><div><strong>${title}</strong><div>${item.qty} x ${formatMoney(item.unitPrice)}</div></div></div>`;
        })
        .join("");
    }

    summaryTotal.textContent = formatMoney(total);
    exactAmount.textContent = formatMoney(total);
    amountField.value = formatMoney(total);

    if (customQrPath) {
      qrImage.src = customQrPath;
    } else {
      const qrPayload = encodeURIComponent(`Vodafone Cash: ${VODAFONE_NUMBER} | Amount: ${total} EGP`);
      qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${qrPayload}`;
    }
  }

  function validImage(file) {
    return Boolean(file && file.type && file.type.startsWith("image/"));
  }

  function validate() {
    const name = document.getElementById("customerName").value.trim();
    const transferMobile = document.getElementById("transferMobile").value.trim();
    const last3Digits = document.getElementById("last3Digits").value.trim();
    const proofInput = document.getElementById("paymentProof");

    if (!name || !transferMobile || !last3Digits) {
      showError("يرجى استكمال جميع الحقول المطلوبة.");
      return false;
    }

    if (!/^\d{3}$/.test(last3Digits)) {
      showError("آخر 3 أرقام يجب أن تكون 3 أرقام صحيحة.");
      return false;
    }

    if (!proofInput.files || !proofInput.files[0]) {
      showError("يرجى رفع صورة إيصال الدفع.");
      return false;
    }

    if (!validImage(proofInput.files[0])) {
      showError("مسموح فقط برفع ملفات الصور.");
      return false;
    }

    if (GMAIL_RECEIVER === "yourgmail@gmail.com") {
      showError("ضع بريدك الجيميل الحقيقي داخل checkout.js في المتغير GMAIL_RECEIVER.");
      return false;
    }

    clearError();
    return true;
  }

  function setupFormAction() {
    form.action = `https://formsubmit.co/${encodeURIComponent(GMAIL_RECEIVER)}`;
  }



  function prepareOrderId() {
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`;
    orderIdField.value = orderId;
    mailSubject.value = `Nexora Vodafone Cash Proof - ${orderId}`;
    return orderId;
  }



  async function sendToGmail(orderId) {
    const gmailFd = new FormData(form);
    gmailFd.set("order_id", orderId);
    gmailFd.set("total_amount", formatMoney(subtotalEgp()));
    try {
      await fetch(form.action, {
        method: "POST",
        body: gmailFd,
        mode: "no-cors",
      });
      return true;
    } catch (e) {
      // Gmail/FormSubmit failure should not block order creation.
      return false;
    }
  }

  function openWhatsAppOrder(orderId) {
    const name = document.getElementById("customerName").value.trim();
    const transferMobile = document.getElementById("transferMobile").value.trim();
    const last3Digits = document.getElementById("last3Digits").value.trim();
    const cart = getCart();

    let itemsText = "";
    cart.forEach((item) => {
      itemsText += `- ${item.title} (${item.qty} x ${formatMoney(item.unitPrice)})\n`;
    });

    const message = `*🛒 طلب شراء جديد - Nexora 🛒*
*━━━━━━━━━━━━━━━━━━*

🆔 *رقم الطلب:* 
${orderId}

👤 *العميل:* 
${name}

📱 *رقم التحويل:* 
${transferMobile}

🔢 *آخر 3 أرقام المحولة:* 
${last3Digits}

📦 *الطلبات:*
${itemsText}

💰 *الإجمالي المطلوب:* 
*${formatMoney(subtotalEgp())}*

*━━━━━━━━━━━━━━━━━━*
_يرجى إرسال صورة إيصال الدفع هنا للتفعيل_`;

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  }

  function setupInteractions() {
    const proofInput = document.getElementById("paymentProof");

    proofInput.addEventListener("change", () => {
      const file = proofInput.files && proofInput.files[0];
      if (file && !validImage(file)) {
        proofInput.value = "";
        showError("صيغة الملف غير مدعومة. ارفع صورة فقط.");
      } else {
        clearError();
      }
    });

    form.addEventListener("input", clearError);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!validate()) return;

      try {
        const orderId = prepareOrderId();
        const gmailOk = await sendToGmail(orderId);
        openWhatsAppOrder(orderId);
        saveCart([]);
        renderSummary();
        successOverlay.hidden = false;
        if (!gmailOk) {
          clearError();
        }
      } catch (error) {
        if (String(error.message || "").includes("Failed to fetch")) {
          showError("تعذر الاتصال بالخادم. تأكد أن السيرفر يعمل على localhost:8080 ثم أعد المحاولة.");
        } else {
          showError("تعذر إرسال الطلب حاليًا. حاول مرة أخرى.");
        }
      }
    });

    closeSuccessBtn.addEventListener("click", () => {
      window.location.href = "index.html#store";
    });
  }

  if (!form) return;

  successOverlay.hidden = true;
  document.getElementById("vodafoneNumber").textContent = VODAFONE_NUMBER;
  renderSummary();
  setupFormAction();
  renderSummary();
  setupInteractions();
})();
