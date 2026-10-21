/**
 * PAWVIA - CUSTOMER DASHBOARD & AUTH INTERACTIVE SYSTEM
 * Powers the Customer Portal, Admin Portal, Scheduling, Subscription,
 * Addresses, Billing, and Profile settings with localStorage persistence.
 */

// Storage Keys
const USER_KEY = "pawvia_user";
const ADMIN_KEY = "pawvia_admin";

// Initial Demo Data for Alex Morgan
const INITIAL_CUSTOMER_DATA = {
  isLoggedIn: true,
  role: "customer",
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  phone: "(555) 234-8971",
  address: "742 Evergreen Terrace, Springfield, OR 97477",
  plan: {
    id: "PLAN-WEEKLY-2",
    name: "Weekly Scoop & Sanitize",
    frequency: "Weekly (Every Thursday)",
    dogs: 2,
    dogNames: "Charlie (Golden Retriever), Bella (Lab Mix)",
    pricePerVisit: 34,
    monthlyTotal: 136,
    status: "Active", // "Active", "Paused", "Cancelled"
    nextBillingDate: "Nov 01, 2026",
    autoRenew: true,
    features: [
      "Weekly front & back yard pet waste removal",
      "Hospital-grade Bio-Shield equipment sanitization",
      "Timestamped gate-lock photo texted upon completion",
      "Organic peppermint turf odor neutralizer spray",
      "100% satisfaction guarantee or free re-scoop"
    ]
  },
  stats: {
    totalVisitsCompleted: 24,
    wasteDivertedLbs: 385,
    gateLockAccuracy: "100%",
    nextPaymentAmount: "$136.00",
    nextPaymentDate: "Nov 01, 2026"
  },
  upcomingVisits: [
    {
      id: "VIS-1089",
      date: "Thursday, Oct 08, 2026",
      window: "8:00 AM - 11:30 AM",
      technician: "Marcus Ramirez",
      serviceType: "Weekly Scoop & Deodorize",
      address: "742 Evergreen Terrace, Springfield, OR",
      status: "Scheduled"
    },
    {
      id: "VIS-1096",
      date: "Thursday, Oct 15, 2026",
      window: "8:00 AM - 11:30 AM",
      technician: "Marcus Ramirez",
      serviceType: "Weekly Scoop & Deodorize",
      address: "742 Evergreen Terrace, Springfield, OR",
      status: "Scheduled"
    },
    {
      id: "VIS-1103",
      date: "Thursday, Oct 22, 2026",
      window: "8:00 AM - 11:30 AM",
      technician: "Marcus Ramirez",
      serviceType: "Weekly Scoop & Deodorize",
      address: "742 Evergreen Terrace, Springfield, OR",
      status: "Scheduled"
    }
  ],
  serviceHistory: [
    {
      id: "VIS-1082",
      date: "Oct 01, 2026",
      technician: "Marcus Ramirez",
      serviceType: "Weekly Scoop & Deodorize",
      address: "742 Evergreen Terrace",
      status: "Completed",
      notes: "Yard cleared, gate latched & sanitized with Bio-Shield. 2 full buckets hauled away.",
      gateVerified: true,
      rating: 5,
      invoiceId: "INV-9821"
    },
    {
      id: "VIS-1075",
      date: "Sep 24, 2026",
      technician: "Marcus Ramirez",
      serviceType: "Weekly Scoop & Deodorize",
      address: "742 Evergreen Terrace",
      status: "Completed",
      notes: "Lawn thoroughly inspected, 2 full scoops removed. Dogs were happily indoors.",
      gateVerified: true,
      rating: 5,
      invoiceId: "INV-9543"
    },
    {
      id: "VIS-1068",
      date: "Sep 17, 2026",
      technician: "Dave Miller",
      serviceType: "Weekly Scoop & Deodorize",
      address: "742 Evergreen Terrace",
      status: "Completed",
      notes: "Regular cleanup completed. Gates locked with timestamp photo.",
      gateVerified: true,
      rating: 5,
      invoiceId: "INV-9210"
    },
    {
      id: "VIS-1061",
      date: "Sep 10, 2026",
      technician: "Marcus Ramirez",
      serviceType: "Weekly Scoop & Deodorize",
      address: "742 Evergreen Terrace",
      status: "Completed",
      notes: "Double checked south perimeter and fence line.",
      gateVerified: true,
      rating: 5,
      invoiceId: "INV-8954"
    }
  ],
  paymentHistory: [
    {
      id: "INV-9821",
      date: "Oct 01, 2026",
      servicePeriod: "October 2026 (4 Visits)",
      amount: "$136.00",
      status: "Paid",
      card: "Visa ending in 4921"
    },
    {
      id: "INV-9543",
      date: "Sep 01, 2026",
      servicePeriod: "September 2026 (4 Visits)",
      amount: "$136.00",
      status: "Paid",
      card: "Visa ending in 4921"
    },
    {
      id: "INV-9210",
      date: "Aug 01, 2026",
      servicePeriod: "August 2026 (4 Visits)",
      amount: "$136.00",
      status: "Paid",
      card: "Visa ending in 4921"
    },
    {
      id: "INV-8954",
      date: "Jul 01, 2026",
      servicePeriod: "July 2026 (4 Visits)",
      amount: "$136.00",
      status: "Paid",
      card: "Visa ending in 4921"
    }
  ],
  addresses: [
    {
      id: "ADDR-1",
      label: "Primary Residence",
      street: "742 Evergreen Terrace",
      city: "Springfield",
      state: "OR",
      zip: "97477",
      propertyType: "Single Family Home",
      yardSize: "Standard (Up to 1/4 acre)",
      gateLocation: "Right side wooden latch",
      gateCode: "#4192",
      accessNotes: "Beware of Charlie the Golden Retriever. Latch swings inward.",
      isDefault: true
    },
    {
      id: "ADDR-2",
      label: "Rental Property (Cottage)",
      street: "128 Oakridge Lane",
      city: "Springfield",
      state: "OR",
      zip: "97478",
      propertyType: "Townhouse",
      yardSize: "Small (Patio / Courtyard)",
      gateLocation: "Back alley metal gate",
      gateCode: "Keypad *8820",
      accessNotes: "Dogs kept in garage during scoop hours.",
      isDefault: false
    }
  ],
  paymentMethods: [
    {
      id: "CARD-1",
      brand: "Visa",
      last4: "4921",
      expiry: "08/28",
      holder: "Alex Morgan",
      isDefault: true
    },
    {
      id: "CARD-2",
      brand: "Mastercard",
      last4: "8834",
      expiry: "11/27",
      holder: "Alex Morgan",
      isDefault: false
    }
  ],
  notifications: {
    smsGatePhoto: true,
    smsEtaAlert: true,
    emailReceipts: true,
    promoOffers: false
  }
};

// Initial Demo Data for Admin Portal
const INITIAL_ADMIN_DATA = {
  adminName: "Operations Admin",
  totalCustomers: 142,
  activeSubscriptions: 136,
  weeklyScoopsScheduled: 385,
  biosecurityCompliance: "100%",
  monthlyRevenue: "$18,496",
  customers: [
    { id: "CUST-101", name: "Alex Morgan", email: "alex.morgan@example.com", phone: "(555) 234-8971", plan: "Weekly Scoop & Sanitize", dogs: 2, status: "Active", address: "742 Evergreen Terrace" },
    { id: "CUST-102", name: "Sarah Jenkins", email: "sarah.j@example.com", phone: "(555) 876-1234", plan: "Bi-Weekly Yard Service", dogs: 1, status: "Active", address: "404 Meadow Lane" },
    { id: "CUST-103", name: "David Lee", email: "david.lee@example.com", phone: "(555) 987-4321", plan: "Weekly (3 Dogs)", dogs: 3, status: "Active", address: "912 Pinecrest Blvd" },
    { id: "CUST-104", name: "Emily Zhao", email: "emily.z@example.com", phone: "(555) 345-6789", plan: "Weekly Scoop & Sanitize", dogs: 2, status: "Active", address: "55 Crestview Dr" },
    { id: "CUST-105", name: "Robert Taylor", email: "rtaylor@example.com", phone: "(555) 456-7890", plan: "One-Time Yard Overhaul", dogs: 2, status: "Completed", address: "230 River Road" },
    { id: "CUST-106", name: "Lisa Chen", email: "lisa.chen@example.com", phone: "(555) 567-8901", plan: "Weekly Scoop & Sanitize", dogs: 1, status: "Paused", address: "78 Birch Street" }
  ],
  routes: [
    { id: "ZONE-1", name: "Springfield Central", technician: "Marcus Ramirez", yardsScheduled: 82, capacity: "92%", status: "On Track" },
    { id: "ZONE-2", name: "West Hills & Heights", technician: "Dave Miller", yardsScheduled: 74, capacity: "84%", status: "On Track" },
    { id: "ZONE-3", name: "Oakridge Residential", technician: "Sarah Connor", yardsScheduled: 68, capacity: "78%", status: "On Track" },
    { id: "ZONE-4", name: "North River Valley", technician: "Marcus Ramirez", yardsScheduled: 85, capacity: "95%", status: "Heavy Load" },
    { id: "ZONE-5", name: "Eastside Cul-de-sacs", technician: "Dave Miller", yardsScheduled: 76, capacity: "86%", status: "On Track" }
  ]
};

// --- Storage Accessors ---
function getCustomerData() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) {
    localStorage.setItem(USER_KEY, JSON.stringify(INITIAL_CUSTOMER_DATA));
    return JSON.parse(JSON.stringify(INITIAL_CUSTOMER_DATA));
  }
  try {
    const parsed = JSON.parse(raw);
    // If name is Sarah Jenkins, migrate to Alex Morgan per prompt instructions
    if (parsed.name === "Sarah Jenkins" || !parsed.addresses) {
      const merged = { ...INITIAL_CUSTOMER_DATA, ...parsed, name: "Alex Morgan", email: "alex.morgan@example.com" };
      localStorage.setItem(USER_KEY, JSON.stringify(merged));
      return merged;
    }
    return parsed;
  } catch (e) {
    return JSON.parse(JSON.stringify(INITIAL_CUSTOMER_DATA));
  }
}

function saveCustomerData(data) {
  localStorage.setItem(USER_KEY, JSON.stringify(data));
}

function getAdminData() {
  const raw = localStorage.getItem(ADMIN_KEY);
  if (!raw) {
    localStorage.setItem(ADMIN_KEY, JSON.stringify(INITIAL_ADMIN_DATA));
    return JSON.parse(JSON.stringify(INITIAL_ADMIN_DATA));
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    return JSON.parse(JSON.stringify(INITIAL_ADMIN_DATA));
  }
}

function saveAdminData(data) {
  localStorage.setItem(ADMIN_KEY, JSON.stringify(data));
}

// --- Toast System ---
function showDashToast(message, type = "success") {
  let container = document.getElementById("dashToastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "dashToastContainer";
    container.className = "dash-toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `dash-toast toast-${type}`;
  const icon = type === "success" ? "✓" : type === "error" ? "⚠️" : "🐾";
  toast.innerHTML = `<span style="font-weight: 800; font-size: 1.1rem;">${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(15px)";
    setTimeout(() => toast.remove(), 250);
  }, 4000);
}

// --- Dashboard Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  // Check if we are on customer dashboard
  if (document.getElementById("customerDashboardRoot")) {
    initCustomerDashboard();
  }

  // Check if we are on admin dashboard
  if (document.getElementById("adminDashboardRoot")) {
    initAdminDashboard();
  }

  // Check if on login / signup
  if (document.getElementById("loginForm")) {
    initLoginPage();
  }

  if (document.getElementById("signupForm")) {
    initSignupPage();
  }

  // General Header Dropdown Support (for pages where main.js might not run)
  initHeaderDropdown();
});

// --- User Account Dropdown Helper ---
function initHeaderDropdown() {
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

  // Sync display name if elements exist
  const cust = getCustomerData();
  const nameEl = document.getElementById("dropdownUserName");
  if (nameEl && cust.name) {
    nameEl.textContent = cust.name;
  }
}

// ==========================================================================
// CUSTOMER DASHBOARD CORE LOGIC
// ==========================================================================
function initCustomerDashboard() {
  const data = getCustomerData();

  // Mobile sidebar drawer
  const toggleBtn = document.getElementById("dashSidebarToggle");
  const sidebar = document.getElementById("dashSidebar");
  const closeSidebarBtn = document.getElementById("dashSidebarClose");

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }
  if (closeSidebarBtn && sidebar) {
    closeSidebarBtn.addEventListener("click", () => {
      sidebar.classList.remove("open");
    });
  }

  // Notification dropdown
  const notifBtn = document.getElementById("dashNotifBtn");
  const notifDropdown = document.getElementById("dashNotifDropdown");
  if (notifBtn && notifDropdown) {
    notifBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      notifDropdown.classList.toggle("open");
    });
    document.addEventListener("click", (e) => {
      if (!notifDropdown.contains(e.target) && !notifBtn.contains(e.target)) {
        notifDropdown.classList.remove("open");
      }
    });
  }

  // Sidebar navigation switching
  const navLinks = document.querySelectorAll(".dash-nav-link[data-dash-tab]");
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetTab = link.getAttribute("data-dash-tab");
      switchDashboardTab(targetTab);

      // On mobile, close sidebar
      if (window.innerWidth <= 1024 && sidebar) {
        sidebar.classList.remove("open");
      }
    });
  });

  // Handle URL hash on load and changes
  const initialHash = window.location.hash.replace("#", "") || "overview";
  switchDashboardTab(initialHash);

  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.replace("#", "") || "overview";
    switchDashboardTab(hash);
  });

  // Render initial dashboard data
  renderCustomerOverview(data);
  renderUpcomingVisits(data);
  renderServiceHistory(data);
  renderSubscription(data);
  renderBilling(data);
  renderAddresses(data);
  renderProfile(data);

  // Setup form handlers
  setupScheduleForm();
  setupProfileForm();
  setupModals();
}

function switchDashboardTab(tabId) {
  const cleanTabId = (tabId || "overview").replace("#", "");

  // Update links
  document.querySelectorAll(".dash-nav-link").forEach(link => {
    if (link.getAttribute("data-dash-tab") === cleanTabId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Update tab sections
  const sections = document.querySelectorAll(".dash-tab-section");
  let found = false;
  sections.forEach(sec => {
    if (sec.id === `tab-${cleanTabId}`) {
      sec.style.display = "block";
      found = true;
    } else {
      sec.style.display = "none";
    }
  });

  if (!found) {
    const overviewSec = document.getElementById("tab-overview");
    if (overviewSec) overviewSec.style.display = "block";
  }

  // Update breadcrumb
  const breadcrumbCurrent = document.getElementById("dashBreadcrumbCurrent");
  if (breadcrumbCurrent) {
    const titles = {
      overview: "Overview",
      schedule: "Schedule Cleanup",
      upcoming: "Upcoming Visits",
      history: "Service History",
      subscription: "My Subscription",
      billing: "Payments & Billing",
      addresses: "My Addresses",
      profile: "Profile Settings"
    };
    breadcrumbCurrent.textContent = titles[cleanTabId] || "Dashboard";
  }

  if (window.location.hash !== `#${cleanTabId}`) {
    history.pushState(null, "", `#${cleanTabId}`);
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Render Overview Cards & Welcome Banner
function renderCustomerOverview(data) {
  // Welcome Text
  const welcomeName = document.getElementById("dashWelcomeName");
  if (welcomeName) welcomeName.textContent = `Welcome back, ${data.name.split(" ")[0]}!`;

  // Upcoming Visit Summary
  const nextVisit = data.upcomingVisits[0];
  const summaryEl = document.getElementById("dashUpcomingSummary");
  if (summaryEl && nextVisit) {
    summaryEl.innerHTML = `Your lawn is in good hands. Your next scheduled yard cleanup is on <strong>${nextVisit.date} (${nextVisit.window})</strong> with technician <strong>${nextVisit.technician}</strong>.`;
  }

  // 1. Next Cleanup Card
  const nextDateEl = document.getElementById("kpiNextCleanupDate");
  const nextTechEl = document.getElementById("kpiNextCleanupTech");
  if (nextDateEl && nextVisit) {
    nextDateEl.textContent = nextVisit.date.replace(/^[A-Za-z]+,\s*/, "");
    nextTechEl.textContent = `${nextVisit.window} • ${nextVisit.technician}`;
  }

  // 2. Active Subscription Card
  const subNameEl = document.getElementById("kpiSubName");
  const subMetaEl = document.getElementById("kpiSubMeta");
  if (subNameEl) {
    subNameEl.textContent = data.plan.name;
    subMetaEl.textContent = `$${data.plan.pricePerVisit}/visit • ${data.plan.dogs} Dogs (${data.plan.status})`;
  }

  // 3. Total Visits Card
  const visitsEl = document.getElementById("kpiTotalVisits");
  const visitsMetaEl = document.getElementById("kpiTotalVisitsMeta");
  if (visitsEl) {
    visitsEl.textContent = `${data.stats.totalVisitsCompleted} Visits`;
    visitsMetaEl.textContent = `${data.stats.wasteDivertedLbs} lbs waste safely diverted`;
  }

  // 4. Next Payment Card
  const paymentEl = document.getElementById("kpiNextPayment");
  const paymentMetaEl = document.getElementById("kpiNextPaymentMeta");
  if (paymentEl) {
    paymentEl.textContent = data.stats.nextPaymentAmount;
    paymentMetaEl.textContent = `Due ${data.stats.nextPaymentDate} (Auto-Pay)`;
  }
}

// Render Upcoming Visits Table
function renderUpcomingVisits(data) {
  const containers = [
    document.getElementById("upcomingVisitsTableBody"),
    document.getElementById("upcomingVisitsTableBody2")
  ].filter(Boolean);
  if (containers.length === 0) return;

  if (data.upcomingVisits.length === 0) {
    const emptyMarkup = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 36px 16px; color: var(--color-forest-muted);">
          <div style="font-size: 2rem; margin-bottom: 8px;">🐾</div>
          <strong>No upcoming yard cleanups scheduled.</strong>
          <p style="margin: 6px 0 14px; font-size: 0.85rem;">Need a fresh scoop? Book a recurring or one-time cleanup below.</p>
          <button type="button" class="btn-dash-sm btn-dash-primary" onclick="switchDashboardTab('schedule')">Schedule a Cleanup</button>
        </td>
      </tr>
    `;
    containers.forEach(c => { c.innerHTML = emptyMarkup; });
    return;
  }

  const visitsMarkup = data.upcomingVisits.map((visit, index) => `
    <tr>
      <td>
        <strong style="color: var(--color-forest-green); font-family: monospace;">${visit.id}</strong>
      </td>
      <td>
        <strong>${visit.date}</strong><br>
        <span style="font-size: 0.78rem; color: var(--color-forest-muted);">${visit.window}</span>
      </td>
      <td>
        <span>${visit.serviceType || (data.plan && data.plan.name) || "Weekly Scoop & Deodorize"}</span>
      </td>
      <td>
        <span style="font-size: 0.82rem; color: var(--color-forest-muted);">${visit.address || data.address || "742 Evergreen Terrace, Springfield, OR"}</span>
      </td>
      <td>
        <span class="badge-status badge-status-${visit.status.toLowerCase()}">${visit.status}</span>
      </td>
      <td>
        <div class="btn-action-group">
          <button type="button" class="btn-dash-sm" onclick="openRescheduleModal(${index})" title="Reschedule Visit">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>
            Reschedule
          </button>
          <button type="button" class="btn-dash-sm btn-dash-danger" onclick="openCancelVisitModal(${index})" title="Cancel Visit">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Cancel
          </button>
        </div>
      </td>
    </tr>
  `).join("");

  containers.forEach(c => { c.innerHTML = visitsMarkup; });
}

// Render Service History Table
function renderServiceHistory(data) {
  const container = document.getElementById("serviceHistoryTableBody");
  if (!container) return;

  container.innerHTML = data.serviceHistory.map(item => `
    <tr>
      <td>
        <strong style="color: var(--color-forest-green); font-family: monospace;">${item.id}</strong>
      </td>
      <td>
        <strong>${item.date}</strong>
      </td>
      <td>
        <span>${item.technician}</span>
      </td>
      <td>
        <p style="margin: 0; font-size: 0.82rem; color: var(--color-forest-text); line-height: 1.35;">${item.notes}</p>
        <span style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.75rem; color: #2E7D32; font-weight: 700; margin-top: 4px;">
          ✓ Gate photo texted &amp; double-checked
        </span>
      </td>
      <td>
        <div style="color: #D4973B; display: flex; gap: 2px;">
          ${"★".repeat(item.rating)}${"☆".repeat(5 - item.rating)}
        </div>
      </td>
      <td>
        <button type="button" class="btn-dash-sm" onclick="openInvoiceModal('${item.invoiceId}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          Receipt
        </button>
      </td>
    </tr>
  `).join("");
}

// Render Subscription Section
function renderSubscription(data) {
  const nameEl = document.getElementById("subPlanName");
  const priceEl = document.getElementById("subPlanPrice");
  const freqEl = document.getElementById("subPlanFreq");
  const renewalEl = document.getElementById("subPlanRenewal");
  const statusEl = document.getElementById("subPlanStatus");
  const dogsEl = document.getElementById("subPlanDogs");

  if (nameEl) nameEl.textContent = data.plan.name;
  if (priceEl) priceEl.textContent = `$${data.plan.pricePerVisit}.00 / visit ($${data.plan.monthlyTotal}.00 / mo)`;
  if (freqEl) freqEl.textContent = data.plan.frequency;
  if (renewalEl) renewalEl.textContent = data.plan.nextBillingDate;
  if (statusEl) {
    statusEl.textContent = data.plan.status;
    statusEl.className = `badge-status badge-status-${data.plan.status.toLowerCase()}`;
  }
  if (dogsEl) dogsEl.textContent = `${data.plan.dogs} Dogs (${data.plan.dogNames})`;

  // Pause button text toggle
  const pauseBtn = document.getElementById("btnPauseSub");
  if (pauseBtn) {
    pauseBtn.textContent = data.plan.status === "Paused" ? "Resume Subscription" : "Pause Subscription";
  }
}

// Render Billing & Payments Table
function renderBilling(data) {
  const container = document.getElementById("paymentsTableBody");
  if (!container) return;

  container.innerHTML = data.paymentHistory.map(pay => `
    <tr>
      <td>
        <strong style="color: var(--color-forest-green); font-family: monospace;">${pay.id}</strong>
      </td>
      <td><strong>${pay.date}</strong></td>
      <td><span>${pay.servicePeriod || (pay.date ? pay.date.split(" ")[0] + " 2026 (4 Visits)" : "Monthly Service (4 Visits)")}</span></td>
      <td><strong>${pay.amount}</strong></td>
      <td><span style="font-size: 0.82rem; color: var(--color-forest-muted);">${pay.card}</span></td>
      <td>
        <span class="badge-status badge-status-completed">Paid</span>
      </td>
      <td>
        <button type="button" class="btn-dash-sm" onclick="openInvoiceModal('${pay.id}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          Invoice
        </button>
      </td>
    </tr>
  `).join("");

  // Saved cards list
  const cardsContainer = document.getElementById("savedPaymentCardsList");
  if (cardsContainer) {
    cardsContainer.innerHTML = data.paymentMethods.map(card => {
      const brandShort = card.brand.slice(0, 4).toUpperCase();
      const defaultBtn = card.isDefault
        ? '<span class="payment-card-default-badge">&#10003; Default</span>'
        : '<button type="button" class="btn-dash-sm" onclick="setDefaultCard(\'' + card.id + '\')">Set Default</button>';
      return '<div class="payment-card-item ' + (card.isDefault ? 'is-default' : '') + '">' +
        '<div class="payment-card-icon">' + brandShort + '</div>' +
        '<div class="payment-card-info">' +
          '<div class="payment-card-number">' + card.brand + ' &bull;&bull;&bull;&bull; ' + card.last4 + '</div>' +
          '<div class="payment-card-meta">Exp ' + card.expiry + ' &nbsp;|&nbsp; ' + card.holder + '</div>' +
        '</div>' +
        defaultBtn +
        '</div>';
    }).join("");
  }

}

// Render Address Cards
function renderAddresses(data) {
  const container = document.getElementById("addressCardsGrid");
  if (!container) return;

  container.innerHTML = data.addresses.map(addr => `
    <div class="dash-address-card ${addr.isDefault ? 'is-default' : ''}">
      ${addr.isDefault ? '<span class="dash-address-badge">Primary Service Yard</span>' : ''}
      <h4 style="margin: 0; font-size: 1.05rem; font-weight: 800; color: var(--color-forest-green);">${addr.label}</h4>
      <p style="margin: 0; font-size: 0.9rem; color: var(--color-forest-text); line-height: 1.4;">
        ${addr.street}<br>
        ${addr.city}, ${addr.state} ${addr.zip}
      </p>
      <div style="font-size: 0.8rem; color: var(--color-forest-muted); display: flex; flex-direction: column; gap: 4px; background: var(--color-warm-cream); padding: 10px; border-radius: 8px;">
        <span><strong>Property:</strong> ${addr.propertyType} (${addr.yardSize})</span>
        <span><strong>Gate Latch:</strong> ${addr.gateLocation}</span>
        <span><strong>Gate Code:</strong> ${addr.gateCode}</span>
        <span><strong>Notes:</strong> ${addr.accessNotes}</span>
      </div>
      <div class="btn-action-group" style="margin-top: auto; padding-top: 10px;">
        <button type="button" class="btn-dash-sm" onclick="openEditAddressModal('${addr.id}')">Edit</button>
        ${!addr.isDefault ? `<button type="button" class="btn-dash-sm" onclick="setDefaultAddress('${addr.id}')">Set Primary</button>` : ''}
        ${!addr.isDefault ? `<button type="button" class="btn-dash-sm btn-dash-danger" onclick="deleteAddress('${addr.id}')">Remove</button>` : ''}
      </div>
    </div>
  `).join("");

  // Also update address selector in Schedule form
  const addrSelect = document.getElementById("schedServiceAddress");
  if (addrSelect) {
    addrSelect.innerHTML = data.addresses.map(addr => `
      <option value="${addr.street}, ${addr.city}, ${addr.state}">${addr.label} - ${addr.street}</option>
    `).join("");
  }
}

// Render Profile Settings
function renderProfile(data) {
  const nameInput = document.getElementById("profileFullName");
  const emailInput = document.getElementById("profileEmail");
  const phoneInput = document.getElementById("profilePhone");
  const gateInput = document.getElementById("profileGateNotes");

  if (nameInput) nameInput.value = data.name;
  if (emailInput) emailInput.value = data.email;
  if (phoneInput) phoneInput.value = data.phone;
  if (gateInput && data.addresses[0]) gateInput.value = data.addresses[0].accessNotes;

  // Checkboxes
  const chkPhoto = document.getElementById("chkSmsPhoto");
  const chkEta = document.getElementById("chkSmsEta");
  const chkEmail = document.getElementById("chkEmailReceipts");
  if (chkPhoto) chkPhoto.checked = !!data.notifications?.smsGatePhoto;
  if (chkEta) chkEta.checked = !!data.notifications?.smsEtaAlert;
  if (chkEmail) chkEmail.checked = !!data.notifications?.emailReceipts;
}

// --- Schedule Cleanup Form Setup ---
function setupScheduleForm() {
  const form = document.getElementById("scheduleCleanupForm");
  if (!form) return;

  // Set min date to tomorrow
  const dateInput = document.getElementById("schedDate");
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split("T")[0];
    dateInput.value = tomorrow.toISOString().split("T")[0];
  }

  // Radio cards interaction
  const radioCards = document.querySelectorAll(".dash-radio-card");
  radioCards.forEach(card => {
    card.addEventListener("click", () => {
      radioCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      const radio = card.querySelector("input[type='radio']");
      if (radio) radio.checked = true;
      updateScheduleEstimate();
    });
  });

  const dogsSelect = document.getElementById("schedDogsCount");
  if (dogsSelect) {
    dogsSelect.addEventListener("change", updateScheduleEstimate);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = getCustomerData();

    const selectedDate = document.getElementById("schedDate").value;
    const selectedWindow = document.getElementById("schedTimeSlot").value;
    const selectedAddr = document.getElementById("schedServiceAddress").value;
    const selectedFreq = form.querySelector("input[name='frequency']:checked")?.value || "Weekly Cleanup";
    const dogs = document.getElementById("schedDogsCount").value;
    const instructions = document.getElementById("schedInstructions").value;

    if (!selectedDate) {
      showDashToast("Please choose a service date.", "error");
      return;
    }

    // Format readable date
    const d = new Date(selectedDate + "T00:00:00");
    const options = { weekday: 'long', month: 'short', day: '2-digit', year: 'numeric' };
    const formattedDate = d.toLocaleDateString('en-US', options);

    const newId = `VIS-${Math.floor(1000 + Math.random() * 9000)}`;
    const newVisit = {
      id: newId,
      date: formattedDate,
      window: selectedWindow,
      technician: "Marcus Ramirez (Assigned)",
      serviceType: `${selectedFreq} (${dogs} Dogs)`,
      address: selectedAddr,
      status: "Scheduled"
    };

    // Insert at beginning of upcoming
    data.upcomingVisits.unshift(newVisit);
    saveCustomerData(data);

    // Refresh UI
    renderCustomerOverview(data);
    renderUpcomingVisits(data);
    showDashToast(`Yard cleanup booked for ${formattedDate}! Visit #${newId} confirmed.`, "success");

    // Switch to Upcoming tab
    switchDashboardTab("upcoming");
  });
}

function updateScheduleEstimate() {
  const card = document.querySelector(".dash-radio-card.active input[type='radio']");
  const freq = card ? card.value : "weekly";
  const dogs = parseInt(document.getElementById("schedDogsCount")?.value || "2", 10);

  let baseRate = 34;
  if (freq === "biweekly") baseRate = 44;
  if (freq === "onetime") baseRate = 79;

  const dogAddon = (dogs - 1) * 8;
  const total = baseRate + (dogs > 1 ? dogAddon : 0);

  const pricePreview = document.getElementById("schedPricePreview");
  if (pricePreview) {
    pricePreview.textContent = `$${total}.00`;
  }
}

// --- Profile Form Setup ---
function setupProfileForm() {
  const form = document.getElementById("profileSettingsForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = getCustomerData();

    data.name = document.getElementById("profileFullName").value.trim() || data.name;
    data.email = document.getElementById("profileEmail").value.trim() || data.email;
    data.phone = document.getElementById("profilePhone").value.trim() || data.phone;

    if (data.addresses[0]) {
      data.addresses[0].accessNotes = document.getElementById("profileGateNotes").value.trim();
    }

    data.notifications = {
      smsGatePhoto: document.getElementById("chkSmsPhoto").checked,
      smsEtaAlert: document.getElementById("chkSmsEta").checked,
      emailReceipts: document.getElementById("chkEmailReceipts").checked,
      promoOffers: false
    };

    saveCustomerData(data);
    renderCustomerOverview(data);
    showDashToast("Profile & gate access settings updated successfully!", "success");
  });
}

// --- Modals Setup & Actions ---
let currentRescheduleIndex = -1;
let currentCancelIndex = -1;

function setupModals() {
  // Modal close buttons
  document.querySelectorAll(".dash-modal-close, [data-dash-modal-close]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".dash-modal-overlay").forEach(m => m.classList.remove("open"));
    });
  });

  // Reschedule Form Submit
  const rescheduleForm = document.getElementById("rescheduleForm");
  if (rescheduleForm) {
    rescheduleForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (currentRescheduleIndex === -1) return;
      const data = getCustomerData();
      const newDate = document.getElementById("rescheduleDate").value;
      const newWindow = document.getElementById("rescheduleWindow").value;

      if (!newDate) {
        showDashToast("Please select a date.", "error");
        return;
      }

      const d = new Date(newDate + "T00:00:00");
      const formatted = d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: '2-digit', year: 'numeric' });

      data.upcomingVisits[currentRescheduleIndex].date = formatted;
      data.upcomingVisits[currentRescheduleIndex].window = newWindow;
      data.upcomingVisits[currentRescheduleIndex].status = "Rescheduled";

      saveCustomerData(data);
      renderUpcomingVisits(data);
      renderCustomerOverview(data);

      document.getElementById("rescheduleModal").classList.remove("open");
      showDashToast(`Visit successfully moved to ${formatted} (${newWindow})!`, "success");
    });
  }

  // Cancel Visit Form Submit
  const cancelForm = document.getElementById("cancelVisitForm");
  if (cancelForm) {
    cancelForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (currentCancelIndex === -1) return;
      const data = getCustomerData();
      const visit = data.upcomingVisits[currentCancelIndex];

      data.upcomingVisits.splice(currentCancelIndex, 1);
      saveCustomerData(data);
      renderUpcomingVisits(data);
      renderCustomerOverview(data);

      document.getElementById("cancelVisitModal").classList.remove("open");
      showDashToast(`Scheduled cleanup #${visit.id} has been cancelled.`, "info");
    });
  }

  // Add Address Form Submit
  const addAddrForm = document.getElementById("addAddressForm");
  if (addAddrForm) {
    addAddrForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = getCustomerData();
      const newAddr = {
        id: `ADDR-${Math.floor(10 + Math.random() * 90)}`,
        label: document.getElementById("newAddrLabel").value || "Secondary Yard",
        street: document.getElementById("newAddrStreet").value,
        city: document.getElementById("newAddrCity").value || "Springfield",
        state: document.getElementById("newAddrState").value || "OR",
        zip: document.getElementById("newAddrZip").value || "97477",
        propertyType: document.getElementById("newAddrType").value || "Single Family Home",
        yardSize: "Standard (Up to 1/4 acre)",
        gateLocation: document.getElementById("newAddrGate").value || "Side latch",
        gateCode: document.getElementById("newAddrCode").value || "None",
        accessNotes: document.getElementById("newAddrNotes").value || "Gate unlocks freely.",
        isDefault: false
      };

      data.addresses.push(newAddr);
      saveCustomerData(data);
      renderAddresses(data);

      document.getElementById("addAddressModal").classList.remove("open");
      showDashToast(`New service location "${newAddr.label}" added!`, "success");
    });
  }

  // Add Payment Card Form Submit
  const addCardForm = document.getElementById("addCardForm");
  if (addCardForm) {
    addCardForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = getCustomerData();
      const num = document.getElementById("cardNum").value.replace(/\s+/g, "");
      const last4 = num.slice(-4) || "7712";
      const brand = num.startsWith("4") ? "Visa" : num.startsWith("5") ? "Mastercard" : "Amex";

      const newCard = {
        id: `CARD-${Math.floor(10 + Math.random() * 90)}`,
        brand: brand,
        last4: last4,
        expiry: document.getElementById("cardExp").value || "12/28",
        holder: document.getElementById("cardName").value || data.name,
        isDefault: false
      };

      data.paymentMethods.push(newCard);
      saveCustomerData(data);
      renderBilling(data);

      document.getElementById("addCardModal").classList.remove("open");
      showDashToast(`Payment card ending in ${last4} successfully saved!`, "success");
    });
  }

  // Change Subscription Plan Form Submit
  const changePlanForm = document.getElementById("changePlanForm");
  if (changePlanForm) {
    changePlanForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = getCustomerData();
      const planVal = document.getElementById("selectNewPlan").value;

      if (planVal === "weekly-1") {
        data.plan.name = "Weekly Scoop - 1 Dog";
        data.plan.pricePerVisit = 28;
        data.plan.monthlyTotal = 112;
        data.plan.dogs = 1;
      } else if (planVal === "weekly-2") {
        data.plan.name = "Weekly Scoop & Sanitize - 2 Dogs";
        data.plan.pricePerVisit = 34;
        data.plan.monthlyTotal = 136;
        data.plan.dogs = 2;
      } else if (planVal === "weekly-3") {
        data.plan.name = "Weekly Premium - 3+ Dogs";
        data.plan.pricePerVisit = 42;
        data.plan.monthlyTotal = 168;
        data.plan.dogs = 3;
      } else if (planVal === "biweekly") {
        data.plan.name = "Bi-Weekly Yard Service";
        data.plan.pricePerVisit = 44;
        data.plan.monthlyTotal = 88;
      }

      data.plan.status = "Active";
      saveCustomerData(data);
      renderSubscription(data);
      renderCustomerOverview(data);

      document.getElementById("changePlanModal").classList.remove("open");
      showDashToast(`Subscription updated to "${data.plan.name}"!`, "success");
    });
  }
}

// Modal open triggers
function openRescheduleModal(index) {
  currentRescheduleIndex = index;
  const data = getCustomerData();
  const visit = data.upcomingVisits[index];
  const infoEl = document.getElementById("rescheduleVisitInfo");
  if (infoEl) {
    infoEl.textContent = `Rescheduling Visit #${visit.id} (Currently: ${visit.date})`;
  }
  const modal = document.getElementById("rescheduleModal");
  if (modal) modal.classList.add("open");
}

function openCancelVisitModal(index) {
  currentCancelIndex = index;
  const data = getCustomerData();
  const visit = data.upcomingVisits[index];
  const infoEl = document.getElementById("cancelVisitInfo");
  if (infoEl) {
    infoEl.textContent = `Are you sure you want to cancel visit #${visit.id} on ${visit.date}? There is zero cancellation fee up to 2 hours prior to arrival.`;
  }
  const modal = document.getElementById("cancelVisitModal");
  if (modal) modal.classList.add("open");
}

function openInvoiceModal(invoiceId) {
  const data = getCustomerData();
  const payment = data.paymentHistory.find(p => p.id === invoiceId) || {
    id: invoiceId,
    date: "Oct 01, 2026",
    servicePeriod: "October 2026 Services",
    amount: "$136.00",
    status: "Paid",
    card: "Visa ending in 4921"
  };

  const bodyEl = document.getElementById("invoiceModalBody");
  if (bodyEl) {
    bodyEl.innerHTML = `
      <div style="background: white; padding: 24px; border: 1.5px solid var(--color-border); border-radius: 14px; font-family: sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid var(--color-sage-soft); padding-bottom: 16px; margin-bottom: 20px;">
          <div>
            <h2 style="margin: 0; color: var(--color-forest-green); font-size: 1.4rem;">Pawvia LLC</h2>
            <p style="margin: 4px 0; font-size: 0.85rem; color: var(--color-forest-muted);">Hospital-Grade Yard Hygiene &amp; Waste Removal</p>
            <p style="margin: 2px 0; font-size: 0.8rem; color: var(--color-forest-muted);">420 Clean Lawn Way, Springfield • (888) 555-POOP</p>
          </div>
          <div style="text-align: right;">
            <span class="badge-status badge-status-completed" style="font-size: 0.85rem;">PAID RECEIPT</span>
            <p style="margin: 6px 0 0; font-weight: 800; font-family: monospace; font-size: 1.05rem;">${payment.id}</p>
            <p style="margin: 2px 0 0; font-size: 0.82rem; color: var(--color-forest-muted);">${payment.date}</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; font-size: 0.88rem;">
          <div>
            <strong style="color: var(--color-forest-green);">Billed To:</strong>
            <p style="margin: 4px 0;">${data.name}<br>${data.address}<br>${data.email}</p>
          </div>
          <div>
            <strong style="color: var(--color-forest-green);">Payment Details:</strong>
            <p style="margin: 4px 0;">Method: ${payment.card}<br>Coverage: ${payment.servicePeriod}<br>Gate Lock: 100% Guaranteed</p>
          </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem; margin-bottom: 20px;">
          <thead>
            <tr style="background: var(--color-warm-cream); border-bottom: 1px solid var(--color-border); text-align: left;">
              <th style="padding: 10px;">Description</th>
              <th style="padding: 10px; text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--color-border);">
              <td style="padding: 12px 10px;">
                <strong>${data.plan.name}</strong><br>
                <span style="font-size: 0.78rem; color: var(--color-forest-muted);">4 weekly scoops, Bio-Shield yard sanitize, mint deodorizer</span>
              </td>
              <td style="padding: 12px 10px; text-align: right; font-weight: 700;">${payment.amount}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td style="padding: 12px 10px; font-weight: 800; font-size: 1rem;">Total Paid</td>
              <td style="padding: 12px 10px; text-align: right; font-weight: 800; font-size: 1.15rem; color: var(--color-forest-green);">${payment.amount}</td>
            </tr>
          </tfoot>
        </table>

        <div style="border-top: 1px dashed var(--color-border); padding-top: 14px; text-align: center; font-size: 0.78rem; color: var(--color-forest-muted);">
          Thank you for choosing Pawvia! Your dog waste was hauled safely and treated with eco-friendly biodegradable methods.
        </div>
      </div>
    `;
  }

  const modal = document.getElementById("invoiceModal");
  if (modal) modal.classList.add("open");
}

function openChangePlanModal() {
  const modal = document.getElementById("changePlanModal");
  if (modal) modal.classList.add("open");
}

function openAddAddressModal() {
  const modal = document.getElementById("addAddressModal");
  if (modal) modal.classList.add("open");
}

function openAddCardModal() {
  const modal = document.getElementById("addCardModal");
  if (modal) modal.classList.add("open");
}

function togglePauseSubscription() {
  const data = getCustomerData();
  if (data.plan.status === "Active") {
    data.plan.status = "Paused";
    showDashToast("Subscription paused for 30 days. No charges will occur.", "info");
  } else {
    data.plan.status = "Active";
    showDashToast("Subscription reactivated! Your scoops are back on schedule.", "success");
  }
  saveCustomerData(data);
  renderSubscription(data);
  renderCustomerOverview(data);
}

function setDefaultAddress(addrId) {
  const data = getCustomerData();
  data.addresses.forEach(a => a.isDefault = (a.id === addrId));
  saveCustomerData(data);
  renderAddresses(data);
  showDashToast("Default service location updated!", "success");
}

function deleteAddress(addrId) {
  const data = getCustomerData();
  data.addresses = data.addresses.filter(a => a.id !== addrId);
  saveCustomerData(data);
  renderAddresses(data);
  showDashToast("Address removed.", "info");
}

function setDefaultCard(cardId) {
  const data = getCustomerData();
  data.paymentMethods.forEach(c => c.isDefault = (c.id === cardId));
  saveCustomerData(data);
  renderBilling(data);
  showDashToast("Default card updated!", "success");
}

// ==========================================================================
// ADMIN DASHBOARD CORE LOGIC
// ==========================================================================
function initAdminDashboard() {
  const adminData = getAdminData();
  const customerData = getCustomerData();

  // Mobile sidebar drawer
  const toggleBtn = document.getElementById("adminSidebarToggle");
  const closeBtn = document.getElementById("adminSidebarClose");
  const sidebar = document.getElementById("adminSidebar");
  const overlay = document.getElementById("adminSidebarOverlay");

  function openSidebar() {
    if (sidebar) sidebar.classList.add("open");
    if (overlay) overlay.classList.add("active");
  }

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove("open");
    if (overlay) overlay.classList.remove("active");
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      if (sidebar && sidebar.classList.contains("open")) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeSidebar);
  }

  if (overlay) {
    overlay.addEventListener("click", closeSidebar);
  }

  // Navigation switching
  const navLinks = document.querySelectorAll(".admin-nav-link[data-admin-tab]");
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetTab = link.getAttribute("data-admin-tab");
      switchAdminTab(targetTab);
      closeSidebar();
    });
  });

  // Handle URL hash changes
  window.addEventListener("hashchange", () => {
    const newHash = window.location.hash.replace("#", "");
    if (newHash && ["admin-overview", "admin-dispatch", "admin-customers", "admin-routes"].includes(newHash)) {
      switchAdminTab(newHash);
    }
  });

  const initialHash = window.location.hash.replace("#", "") || "admin-overview";
  switchAdminTab(initialHash);

  renderAdminOverview(adminData);
  renderAdminBookings(customerData);
  renderAdminCustomers(adminData);
  renderAdminRoutes(adminData);
}

function switchAdminTab(tabId) {
  const validTabs = {
    "admin-overview": "Operations Overview",
    "admin-dispatch": "Dispatch & Bookings",
    "admin-customers": "Customer Accounts",
    "admin-routes": "Routes & Service Zones"
  };

  const activeTab = validTabs[tabId] ? tabId : "admin-overview";

  // 1. Update Active State on Sidebar Links
  document.querySelectorAll(".admin-nav-link").forEach(link => {
    const linkTab = link.getAttribute("data-admin-tab");
    if (linkTab === activeTab) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });

  // 2. Hide all tab sections, show ONLY the target section
  document.querySelectorAll(".admin-tab-section").forEach(sec => {
    if (sec.id === `tab-${activeTab}`) {
      sec.style.display = "block";
    } else {
      sec.style.display = "none";
    }
  });

  // 3. Update Breadcrumb Title
  const breadcrumbCurrent = document.getElementById("adminBreadcrumbCurrent");
  if (breadcrumbCurrent) {
    breadcrumbCurrent.textContent = validTabs[activeTab];
  }

  // 4. Update hash in address bar without jumps
  if (window.location.hash !== `#${activeTab}`) {
    if (history.replaceState) {
      history.replaceState(null, "", `#${activeTab}`);
    } else {
      window.location.hash = `#${activeTab}`;
    }
  }

  // 5. Close mobile drawer if open
  const sidebar = document.getElementById("adminSidebar");
  const overlay = document.getElementById("adminSidebarOverlay");
  if (sidebar && sidebar.classList.contains("open")) {
    sidebar.classList.remove("open");
  }
  if (overlay && overlay.classList.contains("active")) {
    overlay.classList.remove("active");
  }

  // 6. Smooth scroll to top of content
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderAdminOverview(data) {
  const elCust = document.getElementById("adminKpiCustomers");
  const elVisits = document.getElementById("adminKpiVisits");
  const elMrr = document.getElementById("adminKpiMrr");
  const elBio = document.getElementById("adminKpiBiosecurity");

  if (elCust) elCust.textContent = data.totalCustomers;
  if (elVisits) elVisits.textContent = data.weeklyScoopsScheduled;
  if (elMrr) elMrr.textContent = data.monthlyRevenue;
  if (elBio) elBio.textContent = data.biosecurityCompliance;
}

function renderAdminBookings(customerData) {
  const container = document.getElementById("adminBookingsTableBody");
  if (!container) return;

  const bookings = [
    ...customerData.upcomingVisits.map(v => ({ ...v, customer: customerData.name, phone: customerData.phone })),
    { id: "VIS-1070", customer: "Sarah Jenkins", date: "Thursday, Oct 08, 2026", window: "9:00 AM - 12:00 PM", technician: "Dave Miller", serviceType: "Bi-Weekly Scoop", address: "404 Meadow Lane", status: "Scheduled" },
    { id: "VIS-1071", customer: "David Lee", date: "Friday, Oct 09, 2026", window: "8:00 AM - 11:30 AM", technician: "Marcus Ramirez", serviceType: "Weekly (3 Dogs)", address: "912 Pinecrest Blvd", status: "Scheduled" },
    { id: "VIS-1072", customer: "Emily Zhao", date: "Friday, Oct 09, 2026", window: "1:00 PM - 4:00 PM", technician: "Sarah Connor", serviceType: "Weekly Scoop & Sanitize", address: "55 Crestview Dr", status: "Scheduled" }
  ];

  container.innerHTML = bookings.map((b, idx) => `
    <tr>
      <td><strong>${b.id}</strong></td>
      <td>
        <strong>${b.customer}</strong><br>
        <span style="font-size: 0.78rem; color: var(--color-forest-muted);">${b.address}</span>
      </td>
      <td>
        <span>${b.date}</span><br>
        <span style="font-size: 0.78rem; color: var(--color-forest-muted);">${b.window}</span>
      </td>
      <td>
        <span style="font-weight: 600;">${b.technician}</span>
      </td>
      <td>
        <span class="badge-status badge-status-${b.status.toLowerCase()}">${b.status}</span>
      </td>
      <td>
        <div class="btn-action-group">
          <button type="button" class="btn-dash-sm" onclick="adminMarkComplete('${b.id}')">✓ Mark Done</button>
          <button type="button" class="btn-dash-sm" onclick="adminReassignTech('${b.id}')">Reassign</button>
        </div>
      </td>
    </tr>
  `).join("");
}

function renderAdminCustomers(data) {
  const container = document.getElementById("adminCustomersTableBody");
  if (!container) return;

  container.innerHTML = data.customers.map(c => `
    <tr>
      <td><strong>${c.id}</strong></td>
      <td>
        <strong>${c.name}</strong><br>
        <span style="font-size: 0.78rem; color: var(--color-forest-muted);">${c.email}</span>
      </td>
      <td><span>${c.phone}</span></td>
      <td><span>${c.plan}</span></td>
      <td><span>${c.dogs} Dog${c.dogs > 1 ? 's' : ''}</span></td>
      <td>
        <span class="badge-status badge-status-${c.status.toLowerCase()}">${c.status}</span>
      </td>
      <td>
        <button type="button" class="btn-dash-sm" onclick="showDashToast('Viewing customer profile: ${c.name}', 'info')">View Details</button>
      </td>
    </tr>
  `).join("");
}

function renderAdminRoutes(data) {
  const container = document.getElementById("adminRoutesTableBody");
  if (!container) return;

  container.innerHTML = data.routes.map(r => `
    <tr>
      <td><strong>${r.id}</strong></td>
      <td><strong>${r.name}</strong></td>
      <td><span>${r.technician}</span></td>
      <td><strong>${r.yardsScheduled} yards</strong></td>
      <td>
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="flex: 1; height: 8px; background: #E0E0E0; border-radius: 4px; overflow: hidden; width: 80px;">
            <div style="height: 100%; width: ${r.capacity}; background: var(--color-forest-green);"></div>
          </div>
          <span style="font-size: 0.8rem; font-weight: 700;">${r.capacity}</span>
        </div>
      </td>
      <td>
        <span class="badge-status badge-status-active">${r.status}</span>
      </td>
    </tr>
  `).join("");
}

function adminMarkComplete(visitId) {
  showDashToast(`Visit #${visitId} marked completed & photo proof verified!`, "success");
}

function adminReassignTech(visitId) {
  showDashToast(`Reassigned scooper for visit #${visitId}. Updated route sheet.`, "info");
}

// ==========================================================================
// AUTH PAGES (LOGIN & SIGNUP)
// ==========================================================================
function setupPasswordToggle(btnId, inputId) {
  const btn = document.getElementById(btnId);
  const input = document.getElementById(inputId);
  if (!btn || !input) return;

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const isPwd = input.getAttribute("type") === "password";
    input.setAttribute("type", isPwd ? "text" : "password");

    const eyeOpen = btn.querySelector(".eye-open");
    const eyeClosed = btn.querySelector(".eye-closed");
    if (eyeOpen && eyeClosed) {
      eyeOpen.style.display = isPwd ? "none" : "block";
      eyeClosed.style.display = isPwd ? "block" : "none";
    }
    btn.setAttribute("aria-label", isPwd ? "Hide password" : "Show password");
    btn.setAttribute("title", isPwd ? "Hide password" : "Show password");
  });
}

function setupSocialAuth(btnGoogleId, btnAppleId) {
  const btnGoogle = document.getElementById(btnGoogleId);
  const btnApple = document.getElementById(btnAppleId);

  if (btnGoogle) {
    btnGoogle.addEventListener("click", (e) => {
      e.preventDefault();
      btnGoogle.style.opacity = "0.7";
      btnGoogle.querySelector("span").textContent = "Connecting...";
      setTimeout(() => {
        const user = getCustomerData();
        user.isLoggedIn = true;
        saveCustomerData(user);
        window.location.href = "dashboard.html";
      }, 450);
    });
  }

  if (btnApple) {
    btnApple.addEventListener("click", (e) => {
      e.preventDefault();
      btnApple.style.opacity = "0.7";
      btnApple.querySelector("span").textContent = "Connecting...";
      setTimeout(() => {
        const user = getCustomerData();
        user.isLoggedIn = true;
        saveCustomerData(user);
        window.location.href = "dashboard.html";
      }, 450);
    });
  }
}

function initLoginPage() {
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("loginEmail");
  const pwdInput = document.getElementById("loginPassword");

  // Keep fields empty on initial load
  if (emailInput) emailInput.value = "";
  if (pwdInput) pwdInput.value = "";

  // Password visibility toggle
  setupPasswordToggle("togglePassword", "loginPassword");

  // Social Auth Buttons (Google & Apple)
  setupSocialAuth("btnGoogleLogin", "btnAppleLogin");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = (emailInput?.value || "").trim().toLowerCase();
      const pwd = pwdInput?.value || "";
      const btn = form.querySelector("button[type='submit']");
      if (btn) btn.innerHTML = "Signing in...";

      setTimeout(() => {
        if (email.includes("admin") || pwd.toLowerCase().includes("admin")) {
          window.location.href = "admin-dashboard.html";
        } else {
          const user = getCustomerData();
          user.isLoggedIn = true;
          if (email) user.email = email;
          saveCustomerData(user);
          window.location.href = "dashboard.html";
        }
      }, 400);
    });
  }
}

function initSignupPage() {
  const form = document.getElementById("signupForm");
  const pwdInput = document.getElementById("signupPassword");

  // Keep password field empty on initial load
  if (pwdInput) pwdInput.value = "";

  // Password visibility toggle
  setupPasswordToggle("toggleSignupPassword", "signupPassword");

  // Social Auth Buttons (Google & Apple)
  setupSocialAuth("btnGoogleSignup", "btnAppleSignup");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("signupName")?.value || "New Customer";
      const email = document.getElementById("signupEmail")?.value || "customer@example.com";
      const phone = document.getElementById("signupPhone")?.value || "(555) 000-0000";
      const street = document.getElementById("signupStreet")?.value || "100 Clean Yard Way";
      const dogs = parseInt(document.getElementById("signupDogs")?.value || "2", 10);
      const freq = document.getElementById("signupPlan")?.value || "Weekly Scoop & Sanitize";

      const data = getCustomerData();
      data.name = name;
      data.email = email;
      data.phone = phone;
      data.address = `${street}, Springfield, OR`;
      data.plan.dogs = dogs;
      data.plan.name = freq;
      data.isLoggedIn = true;

      saveCustomerData(data);

      const btn = form.querySelector("button[type='submit']");
      if (btn) btn.innerHTML = "Creating your account...";

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 450);
    });
  }
}
