(function () {
  const PRODUCT_KEY = "reksona_products_v2";
  const CART_KEY = "reksona_cart_v2";
  const ORDERS_KEY = "reksona_orders_v2";
  const PRICING_MODE_KEY = "reksona_pricing_mode";
  const PRODUCT_CATALOG_KEY = "nexora_catalog_version";
  const PRODUCT_CATALOG_VERSION = "ai-software-activations-v3";


  const pricingModes = {
    standard: { multiplier: 1, label: "شهري" },
  };

  const categoryLabels = {
    ai_activation: "تفعيل أدوات AI",
    software_activation: "تفعيل أدوات السوفتوير",
    business_subscription: "اشتراكات إنتاجية",
    web_design: "تصاميم مواقع",
  };

  const defaultProducts = [
    {
      id: "101",
      title: "تفعيل ChatGPT Plus",
      description: "تفعيل رسمي شهري بسعر 300 جنيه. التسليم خلال 15-60 دقيقة بعد مراجعة الدفع.",
      category: "ai_activation",
      price: 300,
      image: "https://wersm.com/wp-content/uploads/2025/08/wersm-chatGPT-GPT-5.webp",
      fileUrl: "https://example.com/activations/chatgpt-plus",
    },
    {
      id: "102",
      title: "تفعيل Gemini Advanced",
      description: "اشتراك شهري لأدوات Gemini للاستخدام الاحترافي في المحتوى والتحليل.",
      category: "ai_activation",
      price: 280,
      image: "image/store/gemini-advanced.svg",
      fileUrl: "https://example.com/activations/gemini-advanced",
    },
    {
      id: "103",
      title: "تفعيل Claude Pro",
      description: "اشتراك شهري لاستخدام Claude Pro في الكتابة، الشرح، والتحليل المتقدم.",
      category: "ai_activation",
      price: 350,
      image: "image/store/claude-pro.svg",
      fileUrl: "https://example.com/activations/claude-pro",
    },
    {
      id: "201",
      title: "تفعيل Unlock Tool",
      description: "تفعيل شهري لأداة Unlock Tool لخدمات السوفتوير والصيانة.",
      category: "software_activation",
      price: 500,
      image: "https://unlockstool.net/unlocktool/img/logo-01.png",
      fileUrl: "https://example.com/activations/unlock-tool",
    },
    {
      id: "202",
      title: "تفعيل Chimera Tool",
      description: "اشتراك شهري لأداة Chimera Tool لدعم أعمال السوفتوير المتقدمة.",
      category: "software_activation",
      price: 450,
      image: "image/store/chimera-tool.svg",
      fileUrl: "https://example.com/activations/chimera-tool",
    },
    {
      id: "203",
      title: "تفعيل TSM Tool",
      description: "تفعيل شهري لأداة TSM Tool لخدمات الصيانة وعمليات السوفتوير.",
      category: "software_activation",
      price: 420,
      image: "https://tsmtoolpro.org/wp-content/uploads/2024/02/logo-1-1536x514.png",
      fileUrl: "https://example.com/activations/tsm-tool",
    },
    {
      id: "204",
      title: "تفعيل OKXOGEN Tool",
      description: "تفعيل شهري لأداة OKXOGEN Tool لدعم المهام التقنية المتقدمة.",
      category: "software_activation",
      price: 430,
      image: "https://upload.wikimedia.org/wikipedia/commons/8/85/OKX_Logo.svg",
      fileUrl: "https://example.com/activations/okxogen-tool",
    },
    {
      id: "205",
      title: "تفعيل TFM Tool",
      description: "اشتراك شهري لأداة TFM Tool لتسريع أعمال الصيانة والتهيئة.",
      category: "software_activation",
      price: 440,
      image: "https://tfmpro.net/wp-content/uploads/2024/08/cropped-TFM-logo.png",
      fileUrl: "https://example.com/activations/tfm-tool",
    },
    {
      id: "206",
      title: "تفعيل AMT Tool",
      description: "تفعيل شهري لأداة AMT Tool لإدارة مهام السوفتوير بشكل احترافي.",
      category: "software_activation",
      price: 410,
      image: "https://amtdongle.com/wp-content/uploads/2022/03/cropped-logo_1-1.png",
      fileUrl: "https://example.com/activations/amt-tool",
    },
    {
      id: "301",
      title: "تفعيل Canva Pro",
      description: "تفعيل شهري لحساب Canva Pro لتصميمات السوشيال والمحتوى الاحترافي.",
      category: "business_subscription",
      price: 120,
      image: "image/store/canva-pro.svg",
      fileUrl: "https://example.com/activations/canva-pro",
    },
    {
      id: "401",
      title: "تصميم Landing Page احترافية",
      description: "صفحة هبوط مركزة تهدف لتحويل الزوار إلى عملاء. مثالية للمشاريع الجديدة التي تحتاج بداية قوية وتواجد رقمي سريع ومقنع.",
      category: "web_design",
      price: 850,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      fileUrl: "https://example.com/services/landing-page",
    },
    {
      id: "402",
      title: "تصميم موقع شركات (3 صفحات)",
      description: "هوية كاملة لنشاطك التجاري تشمل (الرئيسية، الخدمات، تواصل معنا). تصميم عصري يركز على المصداقية وبناء الثقة مع العملاء.",
      category: "web_design",
      price: 1500,
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=800",
      fileUrl: "https://example.com/services/business-site",
    },
    {
      id: "403",
      title: "متجر المنتج الواحد (Mini Store)",
      description: "نظام بيع رقمي مبسط مخصص لمنتج واحد بمسار شراء سريع وسلس. مناسب للمسوقين وأصحاب المنتجات المميزة.",
      category: "web_design",
      price: 1200,
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800",
      fileUrl: "https://example.com/services/mini-store",
    },
  ];

  let activeCategory = "all";

  function pushEvent(eventName, payload) {
    if (!window.dataLayer) window.dataLayer = [];
    window.dataLayer.push({ event: eventName, ...payload });
  }

  function getProducts() {
    const currentCatalogVersion = localStorage.getItem(PRODUCT_CATALOG_KEY);
    if (currentCatalogVersion !== PRODUCT_CATALOG_VERSION) {
      localStorage.setItem(PRODUCT_KEY, JSON.stringify(defaultProducts));
      localStorage.setItem(PRODUCT_CATALOG_KEY, PRODUCT_CATALOG_VERSION);
      return defaultProducts;
    }

    const raw = localStorage.getItem(PRODUCT_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        return defaultProducts;
      }
    }
    localStorage.setItem(PRODUCT_KEY, JSON.stringify(defaultProducts));
    localStorage.setItem(PRODUCT_CATALOG_KEY, PRODUCT_CATALOG_VERSION);
    return defaultProducts;
  }

  function saveProducts(products) {
    localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
    localStorage.setItem(PRODUCT_CATALOG_KEY, PRODUCT_CATALOG_VERSION);
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

  function getOrders() {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  }

  function saveOrders(orders) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }

  function getPricingMode() {
    const mode = localStorage.getItem(PRICING_MODE_KEY) || "standard";
    return pricingModes[mode] ? mode : "standard";
  }

  function setPricingMode(mode) {
    if (!pricingModes[mode]) return;
    localStorage.setItem(PRICING_MODE_KEY, mode);
  }

  function priceForMode(basePrice, mode) {
    const config = pricingModes[mode] || pricingModes.standard;
    return Math.round(basePrice * config.multiplier);
  }

  function formatPrice(value) {
    return `${Number(value).toLocaleString("en-US")} EGP`;
  }

  function setupLoadingScreen() {
    const loader = document.getElementById("loadingScreen");
    const hide = () => {
      if (loader) loader.classList.add("hidden");
      document.body.classList.add("loaded");
    };
    window.addEventListener("load", () => window.setTimeout(hide, 180));
    window.setTimeout(hide, 900);
  }

  function setupMobileMenu() {
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener("click", () => {
      const expanded = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!expanded));
      mobileMenu.classList.toggle("open");
    });
  }

  function setupNavbarShrink() {
    const navWrap = document.getElementById("navWrap");
    if (!navWrap) return;

    const onScroll = () => {
      navWrap.classList.toggle("shrink", window.scrollY > 30);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function setupPageTransitions() {
    const transition = document.getElementById("pageTransition");
    if (!transition) return;

    document.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;
      const href = link.getAttribute("href") || "";

      if (!href || href.startsWith("#") || link.target === "_blank" || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      if (href.startsWith("http") && !href.includes(window.location.host)) return;

      e.preventDefault();
      transition.classList.add("active");
      document.body.classList.add("is-transitioning");
      setTimeout(() => {
        window.location.href = href;
      }, 240);
    });
  }

  function setupReveal() {
    const targets = document.querySelectorAll(".reveal");
    if (!targets.length) return;
    const hasGsap = typeof window.gsap !== "undefined";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          if (hasGsap) {
            window.gsap.fromTo(
              entry.target,
              { y: 22, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.72, ease: "power3.out" }
            );
          }
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((target) => observer.observe(target));
  }

  function setupParallax() {
    const nodes = [...document.querySelectorAll(".parallax")];
    if (!nodes.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    function update() {
      const y = window.scrollY;
      nodes.forEach((node) => {
        const depth = Number(node.getAttribute("data-depth") || 0.12);
        node.style.transform = `translate3d(0, ${y * depth * -0.14}px, 0)`;
      });
      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });

    update();
  }

  function setupCounters() {
    const counters = [...document.querySelectorAll(".counter")];
    if (!counters.length) return;

    function animateCounter(node) {
      const target = Number(node.getAttribute("data-target") || "0");
      const prefix = node.getAttribute("data-prefix") || "";
      const suffix = node.getAttribute("data-suffix") || "";
      const startTime = performance.now();
      const duration = 1300;

      function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        node.textContent = `${prefix}${Math.floor(target * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.35 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  function setupParticleBackground() {
    const canvas = document.getElementById("particleCanvas");
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles = [];
    let raf;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const amount = Math.min(48, Math.floor(window.innerWidth / 35));
      particles.length = 0;
      for (let i = 0; i < amount; i += 1) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.7 + 0.6,
          alpha: Math.random() * 0.7 + 0.18,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(133, 189, 255, ${p.alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("beforeunload", () => cancelAnimationFrame(raf));
  }

  function setupMicroInteractions() {
    document.querySelectorAll(".btn, .chip, .whatsapp-float").forEach((node) => {
      node.addEventListener("mousemove", (e) => {
        const rect = node.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        node.style.transform = `translateY(-2px) perspective(360px) rotateX(${(0.5 - y) * 5}deg) rotateY(${(x - 0.5) * 5}deg)`;
      });
      node.addEventListener("mouseleave", () => {
        node.style.transform = "translateY(0)";
      });
    });
  }

  function filteredProducts() {
    const products = getProducts();
    if (activeCategory === "all") return products;
    return products.filter((product) => product.category === activeCategory);
  }

  function renderProducts() {
    const grid = document.getElementById("productsGrid");
    if (!grid) return;

    const mode = getPricingMode();
    const products = filteredProducts();

    grid.innerHTML = products
      .map((product) => {
        const finalPrice = priceForMode(product.price, mode);
        const oldPrice = mode === "scale" ? formatPrice(product.price) : "";
        return `
          <article class="product reveal">
            <img class="product-media" src="${product.image}" alt="${product.title}" loading="lazy">
            <div class="product-body">
              <div class="product-head">
                <h3>${product.title}</h3>
                <span class="product-category">${categoryLabels[product.category] || "عام"}</span>
              </div>
              <p>${product.description}</p>
              <div class="price-row">
                <div class="price-wrap">
                  <span class="price">${formatPrice(finalPrice)}</span>
                  ${mode === "scale" ? `<span class="price-old">${oldPrice}</span>` : ""}
                </div>
                <button class="btn btn-sm add-to-cart" data-id="${product.id}" data-mode="${mode}">أضف للسلة</button>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    setupReveal();
  }

  function addToCart(productId, mode) {
    const products = getProducts();
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const unitPrice = priceForMode(product.price, mode);
    const cart = getCart();
    const existing = cart.find((item) => item.id === productId && item.mode === mode);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        mode,
        qty: 1,
        unitPrice,
      });
    }

    saveCart(cart);
    renderCart();
    pushEvent("add_to_cart", {
      item_id: product.id,
      pricing_mode: mode,
      value: unitPrice,
      currency: "EGP",
    });
  }

  function removeFromCart(id, mode) {
    const cart = getCart().filter((item) => !(item.id === id && item.mode === mode));
    saveCart(cart);
    renderCart();
  }

  function renderCart() {
    const itemsWrap = document.getElementById("cartItems");
    const totalEl = document.getElementById("cartTotal");
    if (!itemsWrap || !totalEl) return;

    const cart = getCart();
    if (!cart.length) {
      itemsWrap.textContent = "لا توجد عناصر بعد.";
      totalEl.textContent = "0 EGP";
      return;
    }

    let total = 0;
    itemsWrap.innerHTML = cart
      .map((item) => {
        const lineTotal = item.unitPrice * item.qty;
        total += lineTotal;
        return `
          <div class="cart-item">
            <div>
              <strong>${item.title}</strong>
              <div>${item.qty} x ${formatPrice(item.unitPrice)} (${pricingModes[item.mode]?.label || "شهري"})</div>
            </div>
            <button class="btn btn-ghost btn-sm cart-remove" data-id="${item.id}" data-mode="${item.mode}">حذف</button>
          </div>
        `;
      })
      .join("");

    totalEl.textContent = formatPrice(total);
  }

  function cartPayload() {
    const products = getProducts();
    return getCart()
      .map((item) => {
        const product = products.find((p) => p.id === item.id);
        if (!product) return null;
        return {
          productId: product.id,
          title: product.title,
          mode: item.mode,
          price: item.unitPrice,
          quantity: item.qty,
          currency: "EGP",
          fileUrl: product.fileUrl,
        };
      })
      .filter(Boolean);
  }



  function setupStrategyForm() {
    const form = document.getElementById("strategyForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const lead = {
        source: "strategy_form",
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        business: String(data.get("business") || ""),
        date: String(data.get("date") || ""),
        goal: String(data.get("goal") || ""),
        submittedAt: new Date().toISOString(),
      };

      pushEvent("strategy_call_submit", {
        business_type: lead.business,
      });



      const phoneNumber = "201152628515";
      const formattedDate = lead.date.replace("T", "  |  ");

      const message = `*✨ طلب حجز استشارة إستراتيجية ✨*
*━━━━━━━━━━━━━━━━━━*

👤 *الاسم:* 
${lead.name}

📧 *البريد الإلكتروني:* 
${lead.email}

🏢 *نوع النشاط:* 
${lead.business}

📅 *الموعد المفضل:* 
${formattedDate}

🎯 *الهدف من الجلسة:* 
${lead.goal}

*━━━━━━━━━━━━━━━━━━*
_تم الإرسال عبر مـوقع Nexora_`;

      const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, "_blank");
    });
  }

  function setupTrackingCtas() {
    document.addEventListener("click", (e) => {
      const cta = e.target.closest(".track-cta");
      if (!cta) return;
      const label = cta.getAttribute("data-cta") || "unknown";
      pushEvent("cta_click", { cta_label: label });
    });
  }

  function setupStoreControls() {
    const filters = document.getElementById("categoryFilters");
    const toggle = document.getElementById("priceToggle");

    if (filters) {
      filters.addEventListener("click", (e) => {
        const chip = e.target.closest(".chip");
        if (!chip) return;
        activeCategory = chip.getAttribute("data-category") || "all";
        [...filters.querySelectorAll(".chip")].forEach((node) => {
          node.classList.toggle("active", node === chip);
        });
        renderProducts();
        pushEvent("store_filter", { category: activeCategory });
      });
    }

    if (toggle) {
      const mode = getPricingMode();
      [...toggle.querySelectorAll("button")].forEach((btn) => {
        btn.classList.toggle("active", btn.getAttribute("data-mode") === mode);
      });

      toggle.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-mode]");
        if (!btn) return;
        const mode = btn.getAttribute("data-mode");
        setPricingMode(mode);
        [...toggle.querySelectorAll("button")].forEach((node) => {
          node.classList.toggle("active", node === btn);
        });
        renderProducts();
        pushEvent("pricing_mode_change", { mode });
      });
    }
  }

  function setupProductEvents() {
    document.addEventListener("click", (e) => {
      const addBtn = e.target.closest(".add-to-cart");
      if (addBtn) {
        addToCart(addBtn.getAttribute("data-id"), addBtn.getAttribute("data-mode") || "standard");
        return;
      }

      const removeBtn = e.target.closest(".cart-remove");
      if (removeBtn) {
        removeFromCart(removeBtn.getAttribute("data-id"), removeBtn.getAttribute("data-mode") || "standard");
      }
    });

    const openCheckoutBtn = document.getElementById("openCheckoutBtn");
    function openCheckout() {
      localStorage.setItem("reksona_checkout_pref", "vodafone_cash");
      window.location.href = "checkout.html";
    }

    if (openCheckoutBtn) {
      openCheckoutBtn.addEventListener("click", () => openCheckout());
    }
  }

  function setupPaymentHint() {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "success") {
      alert("تم استلام طلب التحويل وجارٍ مراجعته قبل تفعيل الوصول.");
      localStorage.removeItem(CART_KEY);
      renderCart();
      pushEvent("purchase_success", {});
    }
  }



  setupLoadingScreen();
  setupMobileMenu();
  setupNavbarShrink();
  setupPageTransitions();
  setupReveal();
  setupCounters();
  setupStrategyForm();
  setupTrackingCtas();
  setupPaymentHint();

  if (document.getElementById("productsGrid")) {
    setupStoreControls();
    renderProducts();
    renderCart();
    setupProductEvents();
  }


})();
