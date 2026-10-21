/**
 * PAWVIA - PET WASTE REMOVAL SERVICE
 * Complete Vanilla JavaScript Functionality
 * Includes: Navigation, Auth & Customer Dashboard (localStorage),
 * Interactive Booking Modal, Zip Code Checker, Pricing Calculator,
 * FAQ Accordion, Blog Search & Modal, Toast System
 */

// --- Default Demo Data for Customer Portal ---
const DEFAULT_USER_DATA = {
  isLoggedIn: true,
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  phone: "(555) 234-8971",
  address: "742 Evergreen Terrace, Springfield, OR 97477",
  gateCode: "Side wooden gate latch (Code #4192) - Beware of Charlie the Golden",
  plan: {
    name: "Weekly Service Plan",
    frequency: "Weekly (Every Thursday)",
    dogs: 2,
    dogNames: "Charlie (Golden Retriever), Bella (Lab Mix)",
    pricePerVisit: 34,
    monthlyTotal: 136,
    status: "Active",
    nextBillingDate: "Nov 01, 2026",
    autoRenew: true
  },
  upcomingVisits: [
    { id: "VIS-1089", date: "Thursday, Oct 08, 2026", window: "8:00 AM - 11:30 AM", technician: "Marcus Ramirez", serviceType: "Weekly Scoop & Deodorize", address: "742 Evergreen Terrace, Springfield, OR", status: "Scheduled" },
    { id: "VIS-1096", date: "Thursday, Oct 15, 2026", window: "8:00 AM - 11:30 AM", technician: "Marcus Ramirez", serviceType: "Weekly Scoop & Deodorize", address: "742 Evergreen Terrace, Springfield, OR", status: "Scheduled" },
    { id: "VIS-1103", date: "Thursday, Oct 22, 2026", window: "8:00 AM - 11:30 AM", technician: "Marcus Ramirez", serviceType: "Weekly Scoop & Deodorize", address: "742 Evergreen Terrace, Springfield, OR", status: "Scheduled" }
  ],
  serviceHistory: [
    { id: "VIS-1082", date: "Oct 01, 2026", technician: "Marcus Ramirez", notes: "Yard cleared, gate latched & sanitized with Bio-Shield.", gateVerified: true },
    { id: "VIS-1075", date: "Sep 24, 2026", technician: "Marcus Ramirez", notes: "Lawn thoroughly inspected, 2 full scoops removed.", gateVerified: true },
    { id: "VIS-1068", date: "Sep 17, 2026", technician: "Dave Miller", notes: "Regular cleanup completed. Dogs were kept inside.", gateVerified: true }
  ],
  paymentHistory: [
    { id: "INV-9821", date: "Oct 01, 2026", servicePeriod: "October 2026 (4 Visits)", amount: "$136.00", status: "Paid", card: "Visa ending in 4921" },
    { id: "INV-9543", date: "Sep 01, 2026", servicePeriod: "September 2026 (4 Visits)", amount: "$136.00", status: "Paid", card: "Visa ending in 4921" },
    { id: "INV-9210", date: "Aug 01, 2026", servicePeriod: "August 2026 (4 Visits)", amount: "$136.00", status: "Paid", card: "Visa ending in 4921" }
  ]
};

// --- Storage Management ---
const USER_STORAGE_KEY = "pawvia_user";

function getStoredUserData() {
  let data = localStorage.getItem(USER_STORAGE_KEY);
  if (!data) {
    // Migration check from legacy key
    const legacy = localStorage.getItem("doody_patrol_user");
    if (legacy) {
      localStorage.setItem(USER_STORAGE_KEY, legacy);
      localStorage.removeItem("doody_patrol_user");
      data = legacy;
    }
  }
  if (!data) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(DEFAULT_USER_DATA));
    return DEFAULT_USER_DATA;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return DEFAULT_USER_DATA;
  }
}

function saveUserData(data) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data));
  updateUIForUser();
}

// --- Toast Notification Helper ---
function showToast(message, type = "info") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  const icon = type === "success" ? "✓ " : type === "error" ? "⚠️ " : "🐾 ";
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// --- DOM Ready Init ---
document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initDashboardNavDropdown();
  initUserDropdown();
  initModals();
  initDashboard();
  initBookingFlow();
  initZipChecker();
  initFaqAccordions();
  initBlogFeatures();
  initEstimators();
  initContactForms();
  updateUIForUser();
});

// --- Header, Navigation & Sticky Behavior ---
function initHeader() {
  const header = document.querySelector(".site-header");
  const mobileToggle = document.getElementById("mobileNavToggle");
  const mobileDrawer = document.getElementById("mobileNavDrawer");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  });

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.toggle("open");
      mobileToggle.classList.toggle("active", isOpen);
      mobileToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Close on link or button click inside drawer (except dropdown toggles)
    mobileDrawer.querySelectorAll("a, button:not(.mobile-nav-dropdown-btn)").forEach(item => {
      item.addEventListener("click", () => {
        mobileToggle.classList.remove("active");
        mobileDrawer.classList.remove("open");
        mobileToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    // Close when clicking outside drawer
    document.addEventListener("click", (e) => {
      if (
        mobileDrawer.classList.contains("open") &&
        !mobileDrawer.contains(e.target) &&
        !mobileToggle.contains(e.target)
      ) {
        mobileToggle.classList.remove("active");
        mobileDrawer.classList.remove("open");
        mobileToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  // Highlight current nav link
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link, .mobile-nav-links a").forEach(link => {
    const href = link.getAttribute("href");
    if (href && (href === currentPath || (currentPath === "" && href === "index.html"))) {
      link.classList.add("active");
    }
  });

  if (currentPath === "dashboard.html" || currentPath === "admin-dashboard.html") {
    document.querySelectorAll(".nav-dropdown-btn, .mobile-nav-dropdown-btn").forEach(btn => {
      btn.classList.add("active");
    });
  }
}

// --- Navigation Dashboard Dropdown ---
function initDashboardNavDropdown() {
  const dashDropdownWrappers = document.querySelectorAll(".nav-item-dropdown");

  dashDropdownWrappers.forEach(wrapper => {
    const btn = wrapper.querySelector(".nav-dropdown-btn");
    const menu = wrapper.querySelector(".nav-dropdown-menu");
    if (!btn || !menu) return;

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = menu.classList.contains("open");

      // Close user dropdown if open
      const userDropdown = document.getElementById("userDropdown");
      const userBtn = document.getElementById("userMenuBtn");
      if (userDropdown) userDropdown.classList.remove("open");
      if (userBtn) {
        userBtn.classList.remove("active");
        userBtn.setAttribute("aria-expanded", "false");
      }

      // Close any other nav dropdowns
      document.querySelectorAll(".nav-dropdown-menu").forEach(m => {
        if (m !== menu) m.classList.remove("open");
      });
      document.querySelectorAll(".nav-dropdown-btn").forEach(b => {
        if (b !== btn) {
          b.classList.remove("active-open");
          b.setAttribute("aria-expanded", "false");
        }
      });

      menu.classList.toggle("open", !isOpen);
      btn.classList.toggle("active-open", !isOpen);
      btn.setAttribute("aria-expanded", !isOpen ? "true" : "false");
    });
  });

  // Mobile nav dropdown
  const mobileDashWrappers = document.querySelectorAll(".mobile-nav-dropdown");
  mobileDashWrappers.forEach(wrapper => {
    const btn = wrapper.querySelector(".mobile-nav-dropdown-btn");
    const menu = wrapper.querySelector(".mobile-nav-dropdown-menu");
    if (!btn || !menu) return;

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = menu.classList.contains("open");
      menu.classList.toggle("open", !isOpen);
      btn.classList.toggle("active-open", !isOpen);
      btn.setAttribute("aria-expanded", !isOpen ? "true" : "false");
    });
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    dashDropdownWrappers.forEach(wrapper => {
      const btn = wrapper.querySelector(".nav-dropdown-btn");
      const menu = wrapper.querySelector(".nav-dropdown-menu");
      if (menu && menu.classList.contains("open")) {
        if (!wrapper.contains(e.target)) {
          menu.classList.remove("open");
          if (btn) {
            btn.classList.remove("active-open");
            btn.setAttribute("aria-expanded", "false");
          }
        }
      }
    });
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      dashDropdownWrappers.forEach(wrapper => {
        const btn = wrapper.querySelector(".nav-dropdown-btn");
        const menu = wrapper.querySelector(".nav-dropdown-menu");
        if (menu && menu.classList.contains("open")) {
          menu.classList.remove("open");
          if (btn) {
            btn.classList.remove("active-open");
            btn.setAttribute("aria-expanded", "false");
            btn.focus();
          }
        }
      });
    }
  });

  // Also when userMenuBtn is clicked, close nav dashboard dropdown
  const userBtn = document.getElementById("userMenuBtn");
  if (userBtn) {
    userBtn.addEventListener("click", () => {
      dashDropdownWrappers.forEach(wrapper => {
        const btn = wrapper.querySelector(".nav-dropdown-btn");
        const menu = wrapper.querySelector(".nav-dropdown-menu");
        if (menu) menu.classList.remove("open");
        if (btn) {
          btn.classList.remove("active-open");
          btn.setAttribute("aria-expanded", "false");
        }
      });
    });
  }
}

// --- User Dropdown & Auth Modal ---
function initUserDropdown() {
  const userBtn = document.getElementById("userMenuBtn");
  const dropdown = document.getElementById("userDropdown");

  if (userBtn && dropdown) {
    userBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("open");
      userBtn.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target) && !userBtn.contains(e.target)) {
        dropdown.classList.remove("open");
        userBtn.classList.remove("active");
      }
    });
  }

  // Dropdown actions
  document.querySelectorAll("[data-auth-action]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      dropdown?.classList.remove("open");
      const action = btn.getAttribute("data-auth-action");

      if (action === "login") {
        openAuthModal("login");
      } else if (action === "signup") {
        openAuthModal("signup");
      } else if (action === "dashboard") {
        openDashboardModal();
      } else if (action === "logout") {
        const user = getStoredUserData();
        user.isLoggedIn = false;
        saveUserData(user);
        showToast("You have been signed out of your account.");
      }
    });
  });
}

// --- Modal Helper Functions ---
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
}

function initModals() {
  // Close buttons
  document.querySelectorAll(".modal-close-btn, [data-modal-close]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const modal = btn.closest(".modal-overlay");
      if (modal) {
        modal.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  });

  // Click outside dialog to close
  document.querySelectorAll(".modal-overlay").forEach(modal => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  });

  // Auth modal tab switching
  const tabLogin = document.getElementById("authTabLogin");
  const tabSignup = document.getElementById("authTabSignup");
  const formLogin = document.getElementById("authFormLogin");
  const formSignup = document.getElementById("authFormSignup");

  if (tabLogin && tabSignup) {
    tabLogin.addEventListener("click", () => {
      tabLogin.classList.add("active");
      tabSignup.classList.remove("active");
      formLogin.style.display = "block";
      formSignup.style.display = "none";
    });

    tabSignup.addEventListener("click", () => {
      tabSignup.classList.add("active");
      tabLogin.classList.remove("active");
      formLogin.style.display = "none";
      formSignup.style.display = "block";
    });
  }

  // Quick Demo fill buttons
  const demoFillBtn = document.getElementById("demoFillBtn");
  if (demoFillBtn) {
    demoFillBtn.addEventListener("click", () => {
      document.getElementById("loginEmail").value = "sarah.jenkins@example.com";
      document.getElementById("loginPassword").value = "password123";
      showToast("Demo credentials filled!");
    });
  }

  // Handle Login submission
  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = getStoredUserData();
      user.isLoggedIn = true;
      saveUserData(user);
      closeModal("authModal");
      showToast(`Welcome back, ${user.name}!`);
      openDashboardModal();
    });
  }

  // Handle Signup submission
  if (formSignup) {
    formSignup.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("signupName")?.value || "Valued Customer";
      const email = document.getElementById("signupEmail")?.value || "customer@example.com";
      const phone = document.getElementById("signupPhone")?.value || "(555) 000-0000";

      const user = getStoredUserData();
      user.isLoggedIn = true;
      user.name = name;
      user.email = email;
      user.phone = phone;
      saveUserData(user);
      closeModal("authModal");
      showToast(`Account created! Welcome to Pawvia, ${name}!`, "success");
      openDashboardModal();
    });
  }
}

function openAuthModal(mode = "login") {
  const tabLogin = document.getElementById("authTabLogin");
  const tabSignup = document.getElementById("authTabSignup");
  const formLogin = document.getElementById("authFormLogin");
  const formSignup = document.getElementById("authFormSignup");

  if (mode === "login") {
    tabLogin?.classList.add("active");
    tabSignup?.classList.remove("active");
    if (formLogin) formLogin.style.display = "block";
    if (formSignup) formSignup.style.display = "none";
  } else {
    tabSignup?.classList.add("active");
    tabLogin?.classList.remove("active");
    if (formLogin) formLogin.style.display = "none";
    if (formSignup) formSignup.style.display = "block";
  }

  openModal("authModal");
}

function updateUIForUser() {
  const user = getStoredUserData();
  const userNameDisplay = document.getElementById("dropdownUserName");
  const userStatusDisplay = document.getElementById("dropdownUserStatus");
  const loginOption = document.getElementById("menuItemLogin");
  const signupOption = document.getElementById("menuItemSignup");
  const logoutOption = document.getElementById("menuItemLogout");

  if (userNameDisplay) {
    userNameDisplay.textContent = user.isLoggedIn ? user.name : "Guest Visitor";
  }

  if (userStatusDisplay) {
    userStatusDisplay.innerHTML = user.isLoggedIn
      ? `<span class="status-dot"></span> Active Customer`
      : `<span>Log in to access your yard portal</span>`;
  }

  if (loginOption && signupOption && logoutOption) {
    loginOption.style.display = user.isLoggedIn ? "none" : "flex";
    signupOption.style.display = user.isLoggedIn ? "none" : "flex";
    logoutOption.style.display = user.isLoggedIn ? "flex" : "none";
  }

  document.querySelectorAll("#userDropdown .dropdown-divider").forEach(divider => {
    divider.style.display = "none";
  });

  const avatarPlaceholder = document.querySelector(".btn-user-account .user-avatar-placeholder");
  if (avatarPlaceholder) {
    if (user.isLoggedIn && user.name) {
      const initials = user.name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
      avatarPlaceholder.textContent = initials;
    } else {
      avatarPlaceholder.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
    }
  }

  // Synchronize Mobile Menu User Account Card
  const mobileUserName = document.getElementById("mobileUserName");
  const mobileUserStatus = document.getElementById("mobileUserStatus");
  const mobileUserAvatar = document.getElementById("mobileUserAvatar");
  const mobileLoginBtn = document.getElementById("mobileLoginBtn");
  const mobileSignupBtn = document.getElementById("mobileSignupBtn");
  const mobileLogoutBtn = document.getElementById("mobileLogoutBtn");

  if (mobileUserName) {
    mobileUserName.textContent = user.isLoggedIn ? user.name : "Guest Visitor";
  }

  if (mobileUserStatus) {
    mobileUserStatus.innerHTML = user.isLoggedIn
      ? `<span class="status-dot"></span> Active Customer`
      : `<span>Sign in to manage your yard</span>`;
  }

  if (mobileUserAvatar) {
    if (user.isLoggedIn && user.name) {
      const initials = user.name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
      mobileUserAvatar.textContent = initials;
    } else {
      mobileUserAvatar.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
    }
  }

  if (mobileLoginBtn && mobileSignupBtn && mobileLogoutBtn) {
    mobileLoginBtn.style.display = user.isLoggedIn ? "none" : "inline-flex";
    mobileSignupBtn.style.display = user.isLoggedIn ? "none" : "inline-flex";
    mobileLogoutBtn.style.display = user.isLoggedIn ? "inline-flex" : "none";
  }
}

// --- Customer Dashboard Portal ---
function openDashboardModal() {
  const user = getStoredUserData();
  if (!user.isLoggedIn) {
    openAuthModal("login");
    showToast("Please sign in to access your customer dashboard.");
    return;
  }
  populateDashboardUI();
  openModal("dashboardModal");
}

function initDashboard() {
  // Sidebar tab switching
  document.querySelectorAll(".dash-nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".dash-nav-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".dash-content-pane").forEach(pane => pane.classList.remove("active"));

      btn.classList.add("active");
      const targetPane = document.getElementById(btn.getAttribute("data-dash-target"));
      if (targetPane) targetPane.classList.add("active");
    });
  });

  // Address edit save form
  const addressForm = document.getElementById("dashAddressForm");
  if (addressForm) {
    addressForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = getStoredUserData();
      user.address = document.getElementById("dashInputAddress").value;
      user.gateCode = document.getElementById("dashInputGate").value;
      user.phone = document.getElementById("dashInputPhone").value;
      saveUserData(user);
      showToast("Service address & gate instructions updated!", "success");
    });
  }

  // Pause / Resume plan toggle
  const planToggleBtn = document.getElementById("dashTogglePlanBtn");
  if (planToggleBtn) {
    planToggleBtn.addEventListener("click", () => {
      const user = getStoredUserData();
      if (user.plan.status === "Active") {
        user.plan.status = "Paused";
        planToggleBtn.textContent = "Resume Service";
        planToggleBtn.classList.remove("btn-secondary");
        planToggleBtn.classList.add("btn-primary");
        showToast("Service plan paused. No visits will be dispatched.", "info");
      } else {
        user.plan.status = "Active";
        planToggleBtn.textContent = "Pause Service";
        planToggleBtn.classList.remove("btn-primary");
        planToggleBtn.classList.add("btn-secondary");
        showToast("Service plan resumed! Your next visit is confirmed.", "success");
      }
      saveUserData(user);
      populateDashboardUI();
    });
  }

  // Dashboard One-time purchase trigger
  const requestExtraCleanBtn = document.getElementById("dashOrderOneTimeBtn");
  if (requestExtraCleanBtn) {
    requestExtraCleanBtn.addEventListener("click", () => {
      closeModal("dashboardModal");
      openBookingModal("One-Time Yard Cleanup");
    });
  }

  // Reset Demo button
  const resetDemoBtn = document.getElementById("dashResetDemoBtn");
  if (resetDemoBtn) {
    resetDemoBtn.addEventListener("click", () => {
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.removeItem("doody_patrol_user");
      location.reload();
    });
  }
}

function populateDashboardUI() {
  const user = getStoredUserData();

  // Profile Header
  const title = document.getElementById("dashWelcomeTitle");
  if (title) title.textContent = `Welcome back, ${user.name}!`;

  // Plan Details Tab
  const planName = document.getElementById("dashPlanName");
  const planFreq = document.getElementById("dashPlanFreq");
  const planDogs = document.getElementById("dashPlanDogs");
  const planRate = document.getElementById("dashPlanRate");
  const planStatus = document.getElementById("dashPlanStatus");
  const planNextBill = document.getElementById("dashPlanNextBill");

  if (planName) planName.textContent = user.plan.name;
  if (planFreq) planFreq.textContent = user.plan.frequency;
  if (planDogs) planDogs.textContent = `${user.plan.dogs} Dogs (${user.plan.dogNames})`;
  if (planRate) planRate.textContent = `$${user.plan.pricePerVisit} / visit ($${user.plan.monthlyTotal}/mo)`;
  if (planStatus) {
    planStatus.textContent = user.plan.status;
    planStatus.className = `badge ${user.plan.status === 'Active' ? 'badge-green' : 'badge-dark'}`;
  }
  if (planNextBill) planNextBill.textContent = user.plan.nextBillingDate;

  // Address inputs
  const inputAddr = document.getElementById("dashInputAddress");
  const inputGate = document.getElementById("dashInputGate");
  const inputPhone = document.getElementById("dashInputPhone");

  if (inputAddr) inputAddr.value = user.address;
  if (inputGate) inputGate.value = user.gateCode;
  if (inputPhone) inputPhone.value = user.phone;

  // Upcoming Visits Table
  const upcomingTableBody = document.getElementById("dashUpcomingTableBody");
  if (upcomingTableBody) {
    if (user.upcomingVisits.length === 0) {
      upcomingTableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:20px;">No scheduled visits. Book a cleanup below!</td></tr>`;
    } else {
      upcomingTableBody.innerHTML = user.upcomingVisits.map(v => `
        <tr>
          <td><strong>${v.date}</strong></td>
          <td>${v.window}</td>
          <td>${v.technician}</td>
          <td><span class="badge badge-green">${v.status}</span></td>
        </tr>
      `).join("");
    }
  }

  // Service History Table
  const historyTableBody = document.getElementById("dashHistoryTableBody");
  if (historyTableBody) {
    historyTableBody.innerHTML = user.serviceHistory.map(h => `
      <tr>
        <td><strong>${h.date}</strong></td>
        <td>${h.technician}</td>
        <td>${h.notes}</td>
        <td><span class="badge badge-green">✓ Gate Verified</span></td>
      </tr>
    `).join("");
  }

  // Payment History Table
  const paymentTableBody = document.getElementById("dashPaymentTableBody");
  if (paymentTableBody) {
    paymentTableBody.innerHTML = user.paymentHistory.map(p => `
      <tr>
        <td><strong>${p.id}</strong></td>
        <td>${p.date}</td>
        <td>${p.card}</td>
        <td><strong>${p.amount}</strong></td>
        <td><span class="badge badge-green">${p.status}</span></td>
      </tr>
    `).join("");
  }
}

// --- Universal Booking Modal & Estimator Flow ---
function openBookingModal(defaultService = "Weekly Pet Waste Removal") {
  const modal = document.getElementById("bookingModal");
  if (!modal) return;

  const serviceSelect = document.getElementById("bookServiceSelect");
  if (serviceSelect) {
    for (let opt of serviceSelect.options) {
      if (opt.text.toLowerCase().includes(defaultService.toLowerCase()) || opt.value.toLowerCase().includes(defaultService.toLowerCase())) {
        opt.selected = true;
        break;
      }
    }
  }

  updateBookingPriceEstimate();
  openModal("bookingModal");
}

function initBookingFlow() {
  // All "Book Now", "Book a Cleanup" trigger buttons
  document.querySelectorAll("[data-trigger-booking]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const service = btn.getAttribute("data-service-name") || "Weekly Pet Waste Removal";
      openBookingModal(service);
    });
  });

  const bookForm = document.getElementById("unifiedBookingForm");
  const dogCountSelect = document.getElementById("bookDogsSelect");
  const frequencySelect = document.getElementById("bookServiceSelect");
  const yardSizeSelect = document.getElementById("bookYardSelect");

  [dogCountSelect, frequencySelect, yardSizeSelect].forEach(elem => {
    if (elem) {
      elem.addEventListener("change", updateBookingPriceEstimate);
    }
  });

  if (bookForm) {
    bookForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("bookName").value;
      const service = frequencySelect.value;
      const dogs = dogCountSelect.value;
      const date = document.getElementById("bookDate").value || "Next Available Slot (Thursday)";
      const address = document.getElementById("bookAddress").value;

      // Add to user data
      const user = getStoredUserData();
      user.isLoggedIn = true;
      user.name = name || user.name;
      user.address = address || user.address;

      const newVisit = {
        id: `VIS-${Math.floor(1000 + Math.random() * 9000)}`,
        date: date,
        window: "8:00 AM - 12:00 PM",
        technician: "Marcus Ramirez",
        status: "Confirmed"
      };

      user.upcomingVisits.unshift(newVisit);
      saveUserData(user);

      closeModal("bookingModal");
      bookForm.reset();

      showToast(`Cleanup confirmed for ${name}! Added to your customer portal.`, "success");
      setTimeout(() => {
        openDashboardModal();
      }, 700);
    });
  }
}

function updateBookingPriceEstimate() {
  const dogs = parseInt(document.getElementById("bookDogsSelect")?.value || "1");
  const service = document.getElementById("bookServiceSelect")?.value || "weekly";
  const yard = document.getElementById("bookYardSelect")?.value || "standard";
  const display = document.getElementById("bookEstimateDisplay");

  let base = 19;
  if (service === "biweekly") base = 29;
  if (service === "onetime") base = 69;
  if (service === "commercial") base = 99;

  // Extra dog adjustment ($5/dog)
  const extraDogs = Math.max(0, dogs - 1);
  let total = base + (extraDogs * 6);

  if (yard === "large") total += 8;
  if (yard === "acreage") total += 20;

  if (display) {
    display.textContent = `$${total}${service === 'onetime' ? ' flat rate' : '/visit'}`;
  }
}

// --- Home 2 Quick Quote Estimator ---
function initEstimators() {
  const estimatorWrap = document.getElementById("home2Estimator");
  if (!estimatorWrap) return;

  let dogs = 1;
  let freq = "weekly";
  let size = "standard";

  const dogBtns = estimatorWrap.querySelectorAll("[data-dogs]");
  const freqBtns = estimatorWrap.querySelectorAll("[data-freq]");
  const priceDisplay = document.getElementById("estimatorTotal");
  const quickBookBtn = document.getElementById("estimatorBookBtn");

  function recalc() {
    let rate = 19;
    if (freq === "biweekly") rate = 29;
    if (freq === "onetime") rate = 69;

    const extra = Math.max(0, dogs - 1) * 6;
    const finalRate = rate + extra;

    if (priceDisplay) {
      priceDisplay.textContent = `$${finalRate}`;
      const period = document.getElementById("estimatorPeriod");
      if (period) {
        period.textContent = freq === "onetime" ? "one-time clean" : freq === "biweekly" ? "/every 2 wks" : "/weekly visit";
      }
    }
  }

  dogBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      dogBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      dogs = parseInt(btn.getAttribute("data-dogs"));
      recalc();
    });
  });

  freqBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      freqBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      freq = btn.getAttribute("data-freq");
      recalc();
    });
  });

  if (quickBookBtn) {
    quickBookBtn.addEventListener("click", () => {
      openBookingModal(freq === "weekly" ? "Weekly Pet Waste Removal" : freq === "biweekly" ? "Bi-Weekly Pet Waste Removal" : "One-Time Yard Cleanup");
    });
  }

  recalc();
}

// --- Interactive Zip Code Checker ---
function initZipChecker() {
  const form = document.getElementById("zipCheckerForm");
  const input = document.getElementById("zipInput");
  const result = document.getElementById("zipResult");

  if (!form || !input || !result) return;

  const validZipPrefixes = ["100", "902", "941", "981", "303", "750", "331", "606", "802", "974", "770", "850", "921"];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const zip = input.value.trim();

    if (!zip || zip.length < 5) {
      result.className = "zip-result-message error";
      result.textContent = "Please enter a valid 5-digit zip code.";
      return;
    }

    result.innerHTML = `<span style="color: var(--color-grey-400);">Checking route availability for ${zip}...</span>`;

    setTimeout(() => {
      const match = validZipPrefixes.some(prefix => zip.startsWith(prefix));
      if (match || zip.length === 5) {
        result.className = "zip-result-message success";
        result.innerHTML = `✓ Great news! <strong>${zip} is in our primary coverage zone.</strong> Technicians service your neighborhood twice weekly. <a href="#" data-trigger-booking style="text-decoration:underline; font-weight:bold; margin-left:6px;">Book Service Now →</a>`;
        // Attach listener to newly injected book link
        result.querySelector("a")?.addEventListener("click", (e) => {
          e.preventDefault();
          openBookingModal();
        });
      } else {
        result.className = "zip-result-message error";
        result.textContent = `Zip code ${zip} is currently on our waitlist. Contact us to request custom route dispatch!`;
      }
    }, 350);
  });
}

// --- FAQ Accordions ---
function initFaqAccordions() {
  document.querySelectorAll(".faq-item").forEach(item => {
    const btn = item.querySelector(".faq-question-btn");
    if (btn) {
      btn.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        // Close other items in the same container
        const parent = item.closest(".faq-accordion");
        if (parent) {
          parent.querySelectorAll(".faq-item").forEach(other => other.classList.remove("active"));
        }

        if (!isActive) {
          item.classList.add("active");
        }
      });
    }
  });
}

// --- Blog Search, Filter & Reading Modal ---
const BLOG_POSTS_DATA = [
  {
    id: 1,
    category: "hygiene",
    title: "The Hidden Parasites in Dog Waste: Why Prompt Removal Protects Your Family",
    date: "Sep 28, 2026",
    readTime: "5 min read",
    author: "Dr. Elena Vance, DVM",
    image: "assets/tech-scooping-lawn.jpg",
    excerpt: "Dog waste is not fertilizer. In fact, a single gram can contain over 23 million coliform bacteria, hookworms, and parvovirus.",
    fullContent: `
      <p>Many dog owners mistakenly believe that leaving dog waste to naturally decompose on their lawn acts as a harmless organic fertilizer. In reality, canine waste contains dangerously high levels of nitrogen and acidity that burn grass roots, along with a toxic microbial load.</p>
      <h4>What Lurks in Uncollected Waste?</h4>
      <p>The EPA classifies pet waste in the same high-risk non-point source pollution category as toxic chemicals and oil runoff. A single gram of canine feces contains up to 23 million fecal coliform bacteria, roundworms, tapeworms, and Giardia cysts that can persist in your soil for over 18 months.</p>
      <h4>Family & Child Safety in Your Backyard</h4>
      <p>When children play barefoot on turf where pet waste has disintegrated into the grass mat, parasite larvae can transfer via skin contact or incidental hand-to-mouth exposure. Regular weekly or bi-weekly removal breaks the reproduction cycle of soil-borne parasites.</p>
      <h4>Our Disinfection Protocol</h4>
      <p>At Pawvia, we don't just pick up visible droppings. Every tool, scooper shoe, and bin is treated with hospital-grade, pet-safe antimicrobial solution between every single yard to prevent cross-contamination.</p>
    `
  },
  {
    id: 2,
    category: "lawn",
    title: "Why Dog Poop Kills Your Grass (And How to Revive Burn Spots)",
    date: "Sep 20, 2026",
    readTime: "4 min read",
    author: "Marcus Ramirez, Lead Yard Tech",
    image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=800&q=80",
    excerpt: "Learn the chemistry behind lawn burn, why prompt waste pickup prevents dead patches, and how to restore lush green turf.",
    fullContent: `
      <p>Have you noticed yellowing circles with dark green rings across your backyard? That is nitrogen scorching. Because dogs consume protein-rich diets, their waste deposits concentrated nitrogen and acidic salts that dehydrate grass root systems.</p>
      <h4>Immediate Action: 24-48 Hour Window</h4>
      <p>Leaving deposits on your lawn for more than 48 hours allows the acidic salts to leach directly into the soil bed. Removing the waste within this window prevents irreparable grass mortality.</p>
      <h4>Reviving Dead Lawn Spots</h4>
      <p>Once waste is scooped, flush the area deeply with clean water to dilute soil salinity. Lightly rake the dead thatch, spread an enzymatic deodorizer, and overseed with hardy Kentucky Bluegrass or Tall Fescue blend in late autumn or spring.</p>
    `
  },
  {
    id: 3,
    category: "seasonal",
    title: "Autumn Yard Prep: Finding Droppings Hidden Beneath Fallen Leaves",
    date: "Sep 15, 2026",
    readTime: "4 min read",
    author: "Claire Sterling, Operations",
    image: "assets/pet-waste-equipment.jpg",
    excerpt: "When the leaves fall, dog waste becomes a hidden minefield. Discover our grid-search technique for pristine autumn yards.",
    fullContent: `
      <p>Autumn brings crisp mornings and beautiful golden foliage, but for dog owners, leaves create the perfect camouflage for lawn waste. Stepping into a pile hidden under maple leaves is an experience nobody wants before their morning commute.</p>
      <h4>The Multi-Pass Grid Technique</h4>
      <p>Professional scooping teams employ a systematic horizontal and vertical grid sweep. Rather than wandering randomly, walking 4-foot corridor strips ensures 100% coverage, even beneath heavy leaf layers.</p>
      <h4>Winter Preparation</h4>
      <p>Clearing waste before the first winter frost or snow is critical. Pet waste frozen beneath snow thaws in spring as a liquefied, foul slurry that ruins soil aeration and breeds mold.</p>
    `
  },
  {
    id: 4,
    category: "petcare",
    title: "Responsible Pet Ownership: How Clean Yards Prevent Canine Re-infection",
    date: "Sep 05, 2026",
    readTime: "3 min read",
    author: "Dave Miller, Field Specialist",
    image: "assets/clean-lawn-family.jpg",
    excerpt: "Dogs naturally inspect and sniff waste. Discover how a sanitary yard prevents repeat vet visits for tapeworms and stomach bugs.",
    fullContent: `
      <p>Dogs are curious by nature. When past deposits remain in the yard, dogs frequently investigate, step in, or even ingest remnants (coprophagia). This creates a recurring re-infection loop of Giardia and Coccidia.</p>
      <h4>Peace of Mind for Pet Parents</h4>
      <p>Routine yard maintenance eliminates stress. You can let your dogs outside to play without constantly standing at the back door shouting or inspecting their paws before they hop onto your sofa.</p>
    `
  },
  {
    id: 5,
    category: "hygiene",
    title: "Eco-Friendly Pet Waste Disposal: Landfills, Composting & Bioplastics",
    date: "Aug 29, 2026",
    readTime: "5 min read",
    author: "Elena Vance, DVM",
    image: "assets/waste-station-hoa.jpg",
    excerpt: "How Pawvia handles waste responsibly using certified heavy-duty biodegradable liners and municipal approved channels.",
    fullContent: `
      <p>Over 10 million tons of dog waste are produced in the United States every year. Standard petroleum plastic bags preserve pet waste inside landfills for over 500 years without decomposing.</p>
      <h4>Our Green Commitment</h4>
      <p>Pawvia utilizes plant-based cornstarch liners that break down safely in regulated commercial composting and waste-to-energy conversion facilities. We never dispose of pet waste into storm drains or standard municipal recycling.</p>
    `
  },
  {
    id: 6,
    category: "lawn",
    title: "Turf Deodorization: Eliminating Odors on Natural Grass and Artificial Turf",
    date: "Aug 18, 2026",
    readTime: "4 min read",
    author: "Marcus Ramirez, Lead Yard Tech",
    image: "assets/lawn-deodorizing-spray.jpg",
    excerpt: "Hot summer weather can make backyards unbearable. How organic enzyme treatments dissolve odor-causing uric crystals.",
    fullContent: `
      <p>Artificial grass is wonderful for low-maintenance living, but unlike natural soil that possesses microscopic drainage microbes, synthetic turf traps uric acid crystals in the sub-base layer.</p>
      <h4>How Enzymatic Sprays Work</h4>
      <p>Our Bio-Shield enzymatic formula consumes bacteria and uric crystals on contact, converting ammonia into harmless water and carbon dioxide. It is 100% non-toxic, organic, and safe for dogs to walk on immediately after application.</p>
    `
  }
];

function initBlogFeatures() {
  const container = document.getElementById("blogCardsContainer");
  const filterTabs = document.querySelectorAll(".filter-tab");
  const searchInput = document.getElementById("blogSearchInput");

  if (!container) return;

  function renderBlog(posts) {
    if (posts.length === 0) {
      container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 48px;"><p>No articles found matching your criteria. Try another keyword!</p></div>`;
      return;
    }

    container.innerHTML = posts.map(post => `
      <article class="blog-card" data-post-id="${post.id}">
        <div class="blog-card-img">
          <img src="${post.image}" alt="${post.title}" loading="lazy">
        </div>
        <div class="blog-card-body">
          <div class="blog-meta-top">
            <span class="badge badge-dark" style="font-size:0.7rem; padding:3px 10px;">${post.category.toUpperCase()}</span>
            <span>${post.readTime}</span>
          </div>
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <div class="blog-read-more">Read Full Guide <span>→</span></div>
        </div>
      </article>
    `).join("");

    // Attach click for reader modal
    container.querySelectorAll(".blog-card").forEach(card => {
      card.addEventListener("click", () => {
        const id = parseInt(card.getAttribute("data-post-id"));
        openBlogModal(id);
      });
    });
  }

  // Initial render
  renderBlog(BLOG_POSTS_DATA);

  // Tab Filtering
  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      filterTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const category = tab.getAttribute("data-filter");

      const query = (searchInput?.value || "").toLowerCase().trim();
      let filtered = BLOG_POSTS_DATA;

      if (category !== "all") {
        filtered = filtered.filter(p => p.category === category);
      }
      if (query) {
        filtered = filtered.filter(p => p.title.toLowerCase().includes(query) || p.excerpt.toLowerCase().includes(query));
      }
      renderBlog(filtered);
    });
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      const activeTab = document.querySelector(".filter-tab.active")?.getAttribute("data-filter") || "all";

      let filtered = BLOG_POSTS_DATA;
      if (activeTab !== "all") {
        filtered = filtered.filter(p => p.category === activeTab);
      }
      if (query) {
        filtered = filtered.filter(p => p.title.toLowerCase().includes(query) || p.excerpt.toLowerCase().includes(query));
      }
      renderBlog(filtered);
    });
  }
}

function openBlogModal(postId) {
  const post = BLOG_POSTS_DATA.find(p => p.id === postId);
  if (!post) return;

  const modal = document.getElementById("blogArticleModal");
  if (!modal) return;

  document.getElementById("blogModalCategory").textContent = post.category.toUpperCase();
  document.getElementById("blogModalDate").textContent = `${post.date} • ${post.readTime} • By ${post.author}`;
  document.getElementById("blogModalTitle").textContent = post.title;
  document.getElementById("blogModalImage").src = post.image;
  document.getElementById("blogModalBody").innerHTML = post.fullContent;

  openModal("blogArticleModal");
}

// --- Contact Form Submission ---
function initContactForms() {
  const contactForm = document.getElementById("mainContactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("contactName")?.value || "Customer";
      const service = document.getElementById("contactService")?.value || "Pet Waste Removal";

      showToast(`Thank you, ${name}! Your inquiry for ${service} has been received. Our route coordinator will call you within 2 hours.`, "success");
      contactForm.reset();
    });
  }

  // Newsletter subscribe forms
  document.querySelectorAll(".newsletter-form").forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.querySelector("input[type='email']")?.value;
      showToast(`Thank you! ${email} has been subscribed to yard hygiene updates.`, "success");
      form.reset();
    });
  });
}
