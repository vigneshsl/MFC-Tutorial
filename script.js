// Get current page filename
function getCurrentPage() {
  return window.location.pathname.split("/").pop() || "index.html";
}

// Load and inject header from external file
async function loadHeader() {
  try {
    const response = await fetch('header.html');
    if (!response.ok) {
      console.warn('Header file not found or server not running');
      return;
    }
    const headerHTML = await response.text();
    const body = document.body;
    
    if (body) {
      // Insert header as first child
      body.insertAdjacentHTML('afterbegin', headerHTML);
      // Highlight active tab after inserting
      highlightActiveTab();
    }
  } catch (error) {
    console.warn('Error loading header (running without server?):', error.message);
    loadHeaderFallback();
  }
}

// Fallback header when fetch fails
function loadHeaderFallback() {
  const headerHTML = `
    <div class="top-nav">
      <div class="container">
        <h1 class="site-title">
          <a href="index.html">MFC Tutorial</a>
        </h1>
        <nav class="top-tabs">
          <a href="mcq.html" class="tab-link">MCQ</a>
          <a href="interview.html" class="tab-link">Interview Questions</a>
        </nav>
        <button class="mobile-menu-btn" onclick="toggleSidebar()">☰</button>
      </div>
      <div class="header-quote">
        <p>கற்றது கைமண் அளவு, கல்லாதது உலகளவு.</p>
      </div>
    </div>
    <div id="google_translate_element"></div>
  `;
  
  const body = document.body;
  if (body) {
    body.insertAdjacentHTML('afterbegin', headerHTML);
    highlightActiveTab();
  }
}

// Highlight active tab based on current page
function highlightActiveTab() {
  const currentPage = getCurrentPage();
  const tabs = document.querySelectorAll(".top-tabs .tab-link");

  tabs.forEach(tab => {
    const href = tab.getAttribute("href");
    const isActive = href === currentPage;
    tab.classList.toggle("active", isActive);
  });
}

// Update footer position based on sidebar presence
function updateFooterPosition() {
  const sidebar = document.querySelector(".sidebar");
  const footer = document.querySelector(".page-footer");
  
  if (footer) {
    if (sidebar && window.innerWidth > 900) {
      footer.style.left = "240px";
      footer.style.width = "calc(100% - 240px)";
    } else {
      footer.style.left = "0";
      footer.style.width = "100%";
    }
  }
}

// Load and inject sidebar from external file
async function loadSidebar() {
  try {
    const response = await fetch('sidebar.html');
    if (!response.ok) {
      console.warn('Sidebar file not found or server not running');
      return;
    }
    const sidebarHTML = await response.text();
    const layoutContainer = document.querySelector('.layout-container');
    
    if (layoutContainer) {
      // Insert sidebar as first child
      layoutContainer.insertAdjacentHTML('afterbegin', sidebarHTML);
      // Highlight active link after inserting
      highlightActiveLink();
      // Update footer position
      updateFooterPosition();
    }
  } catch (error) {
    console.warn('Error loading sidebar (running without server?):', error.message);
    loadSidebarFallback();
  }
}

// Fallback sidebar when fetch fails
function loadSidebarFallback() {
  const sidebarHTML = `
    <nav class="sidebar">
      <a href="index.html">Home</a>
      <a href="overview.html">What is MFC?</a>
      <a href="setup.html">MFC Project Setup</a>
      <a href="wizard-options.html">Wizard Options</a>
      <a href="classes.html">MFC Classes</a>
      <a href="document-view.html">Document/View Architecture</a>
      <a href="ui-elements.html">UI Elements</a>
      <a href="system-support.html">System Support</a>
      <a href="mcq.html">MCQs</a>
      <a href="interview.html">Interview Questions</a>
    </nav>
  `;
  
  const layoutContainer = document.querySelector('.layout-container');
  if (layoutContainer) {
    layoutContainer.insertAdjacentHTML('afterbegin', sidebarHTML);
    highlightActiveLink();
    updateFooterPosition();
  }
}

// Highlight active sidebar link based on current page
function highlightActiveLink() {
  const currentPage = getCurrentPage();
  const links = document.querySelectorAll(".sidebar a");

  links.forEach(link => {
    const href = link.getAttribute("href");
    const isActive = 
      href === currentPage || 
      (currentPage === "" && href === "index.html");
    
    link.classList.toggle("active", isActive);
  });
}

// Show/toggle answer for MCQ questions
function showAnswer(id) {
  const element = document.getElementById(id);
  if (element) {
    element.style.display = element.style.display === "none" ? "block" : "none";
  }
}

// Toggle sidebar open/close on mobile
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar) {
    sidebar.classList.toggle("open");
    // Close sidebar when a link is clicked
    const links = sidebar.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", () => {
        sidebar.classList.remove("open");
      });
    });
  }
}

// Load and inject footer from external file
async function loadFooter() {
  try {
    const response = await fetch('footer.html');
    if (!response.ok) {
      console.warn('Footer file not found or server not running');
      return;
    }
    const footerHTML = await response.text();
    const mainElement = document.querySelector('main.content');
    
    if (mainElement) {
      // Insert footer at the end of main content
      mainElement.insertAdjacentHTML('beforeend', footerHTML);
    }
  } catch (error) {
    console.warn('Error loading footer (running without server?):', error.message);
    loadFooterFallback();
  }
}

// Fallback footer when fetch fails
function loadFooterFallback() {
  const footerHTML = `
    <footer class="page-footer">
      <p class="footer-quote">கற்றது கைமண் அளவு, கல்லாதது உலகளவு.</p>
      <p class="footer-credit">Tutorial Created for: Vignesh S.L.</p>
    </footer>
  `;
  
  const mainElement = document.querySelector('main.content');
  if (mainElement) {
    mainElement.insertAdjacentHTML('beforeend', footerHTML);
  }
}

// Handle window resize to update footer position
window.addEventListener("resize", updateFooterPosition);

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
  loadSidebar();
  loadFooter();
  setTimeout(() => toggleSidebar(), 100);
});

// Highlight active link on page load
window.addEventListener("load", () => {
  highlightActiveLink();
  highlightActiveTab();
});
