/**
 * Cub Scouts Pack 505 - Main Interactive Scripts
 * Lightweight vanilla JavaScript (<10KB)
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initRankExplorer();
  initCampingChecklist();
  initFaqAccordion();
  initContactForm();
  initBackToTop();
  highlightActiveNav();
});

/* ==========================================================================
   Mobile Menu & Dropdowns
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.main-nav');
  const dropdownTriggers = document.querySelectorAll('.nav-item.has-dropdown > .nav-link');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      const newExpanded = !isExpanded;
      toggle.setAttribute('aria-expanded', newExpanded);
      toggle.classList.toggle('active', newExpanded);
      nav.classList.toggle('active', newExpanded);
      document.body.classList.toggle('nav-open', newExpanded);
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('active')) {
        nav.classList.remove('active');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
        toggle.focus();
      }
    });

    // Close nav when clicking standard links or in-page anchors on mobile
    const allNavLinks = nav.querySelectorAll('a');
    allNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // If this is the dropdown toggle header itself, let dropdown click handler handle it
        if (window.innerWidth <= 768 && link.closest('.nav-item.has-dropdown') && link.classList.contains('nav-link')) {
          return;
        }
        if (window.innerWidth <= 768 && nav.classList.contains('active')) {
          nav.classList.remove('active');
          toggle.classList.remove('active');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('nav-open');
        }
      });
    });
  }

  // Mobile dropdown click expand
  dropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const parent = trigger.parentElement;
        parent.classList.toggle('open-mobile');
      }
    });
  });
}

/* ==========================================================================
   Rank Explorer Tabs (Lion, Tiger, Wolf, Bear, Webelos, Arrow of Light)
   ========================================================================== */
function initRankExplorer() {
  const tabList = document.querySelector('.rank-nav-list, .rank-tabs');
  const tabBtns = document.querySelectorAll('.rank-nav-item, .rank-tab-btn');
  const panels = document.querySelectorAll('.rank-content-panel');

  if (!tabBtns.length) return;

  // Initialize ARIA roles & attributes
  if (tabList) {
    tabList.setAttribute('role', 'tablist');
    tabList.setAttribute('aria-label', 'Cub Scout Ranks by Grade');
  }

  tabBtns.forEach((btn, index) => {
    const targetRank = btn.getAttribute('data-rank');
    const isActive = btn.classList.contains('active');
    
    btn.setAttribute('role', 'tab');
    btn.setAttribute('id', `tab-${targetRank}`);
    btn.setAttribute('aria-controls', `rank-${targetRank}`);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    btn.setAttribute('tabindex', isActive ? '0' : '-1');

    btn.addEventListener('click', () => {
      activateTab(btn, targetRank);
    });

    // Keyboard navigation (Arrow Down, Arrow Up, Arrow Right, Arrow Left, Home, End)
    btn.addEventListener('keydown', (e) => {
      let targetIndex = index;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        targetIndex = (index + 1) % tabBtns.length;
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        targetIndex = (index - 1 + tabBtns.length) % tabBtns.length;
      } else if (e.key === 'Home') {
        targetIndex = 0;
      } else if (e.key === 'End') {
        targetIndex = tabBtns.length - 1;
      } else {
        return;
      }
      e.preventDefault();
      const nextBtn = tabBtns[targetIndex];
      const nextRank = nextBtn.getAttribute('data-rank');
      nextBtn.focus();
      activateTab(nextBtn, nextRank);
    });
  });

  panels.forEach(panel => {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('tabindex', '0');
    const rankId = panel.id.replace('rank-', '');
    panel.setAttribute('aria-labelledby', `tab-${rankId}`);
  });

  function activateTab(activeBtn, targetRank) {
    tabBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
      b.setAttribute('tabindex', '-1');
    });
    panels.forEach(p => p.classList.remove('active'));

    activeBtn.classList.add('active');
    activeBtn.setAttribute('aria-selected', 'true');
    activeBtn.setAttribute('tabindex', '0');

    const targetPanel = document.getElementById(`rank-${targetRank}`);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }
  }
}

/* ==========================================================================
   Interactive Camping Checklist (with localStorage & Progress Bar)
   ========================================================================== */
function initCampingChecklist() {
  const checklist = document.getElementById('camping-checklist');
  if (!checklist) return;

  const storageKey = 'pack505_camping_checklist';
  const checkboxes = checklist.querySelectorAll('input[type="checkbox"]');
  const progressBar = document.getElementById('checklist-progress');
  const progressText = document.getElementById('checklist-count');
  const resetBtn = document.getElementById('reset-checklist-btn');

  // Load saved state
  let savedState = {};
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) savedState = JSON.parse(raw);
  } catch (e) {
    console.error('Could not load checklist state:', e);
  }

  // Apply state
  checkboxes.forEach(cb => {
    const id = cb.id;
    if (savedState[id]) {
      cb.checked = true;
      cb.closest('.checklist-item')?.classList.add('checked');
    }

    cb.addEventListener('change', () => {
      savedState[id] = cb.checked;
      cb.closest('.checklist-item')?.classList.toggle('checked', cb.checked);
      try {
        localStorage.setItem(storageKey, JSON.stringify(savedState));
      } catch (e) {}
      updateProgress();
    });
  });

  // Reset button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to uncheck all items?')) {
        savedState = {};
        try {
          localStorage.removeItem(storageKey);
        } catch (e) {}
        checkboxes.forEach(cb => {
          cb.checked = false;
          cb.closest('.checklist-item')?.classList.remove('checked');
        });
        updateProgress();
      }
    });
  }

  function updateProgress() {
    const total = checkboxes.length;
    let checkedCount = 0;
    checkboxes.forEach(cb => {
      if (cb.checked) checkedCount++;
    });

    const percent = total > 0 ? Math.round((checkedCount / total) * 100) : 0;
    if (progressBar) progressBar.style.width = `${percent}%`;
    if (progressText) progressText.textContent = `${checkedCount} of ${total} items packed (${percent}%)`;
  }

  updateProgress();
}

/* ==========================================================================
   FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item, index) => {
    const questionBtn = item.querySelector('.faq-question');
    const answerDiv = item.querySelector('.faq-answer');

    if (questionBtn && answerDiv) {
      const answerId = answerDiv.id || `faq-answer-${index + 1}`;
      answerDiv.id = answerId;
      questionBtn.setAttribute('aria-controls', answerId);
      
      const isOpen = item.classList.contains('open');
      questionBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      questionBtn.addEventListener('click', () => {
        const currentlyOpen = item.classList.contains('open');
        const willOpen = !currentlyOpen;
        
        const container = item.closest('.faq-accordion');
        if (container && container.getAttribute('data-single-open') === 'true') {
          container.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('open');
            i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
          });
        }

        item.classList.toggle('open', willOpen);
        questionBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      });
    }
  });
}

/* ==========================================================================
   Inquiry / Contact Form
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('pack-contact-form');
  const alertBox = document.getElementById('form-alert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const parentName = form.querySelector('#parent-name')?.value.trim() || '';
    const email = form.querySelector('#parent-email')?.value.trim() || '';
    const phone = form.querySelector('#parent-phone')?.value.trim() || '';
    const scoutGrade = form.querySelector('#scout-grade')?.value || '';
    const school = form.querySelector('#scout-school')?.value.trim() || '';
    const comments = form.querySelector('#comments')?.value.trim() || '';

    if (!parentName || !email) {
      if (alertBox) {
        alertBox.className = 'form-alert error';
        alertBox.innerHTML = '<strong>Please provide your name and email address.</strong>';
        alertBox.style.display = 'block';
      }
      return;
    }

    // Compose mailto link as a reliable, direct client-side fallback
    const subject = encodeURIComponent(`Pack 505 Inquiry: ${parentName} (Grade: ${scoutGrade})`);
    const bodyText = encodeURIComponent(
      `Hello Pack 505 Leaders,\n\nI am interested in learning more about Cub Scouts Pack 505 for my family!\n\n` +
      `Parent/Guardian Name: ${parentName}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n` +
      `Scout Grade: ${scoutGrade}\n` +
      `School: ${school}\n\n` +
      `Questions / Notes:\n${comments}\n\n` +
      `Thank you!`
    );

    const mailtoUrl = `mailto:packleaders@houstonpack505.org?subject=${subject}&body=${bodyText}`;

    if (alertBox) {
      alertBox.className = 'form-alert success';
      alertBox.innerHTML = `
        <div style="background-color: #ecfdf5; border: 1px solid #10b981; color: #065f46; padding: 1.25rem; border-radius: 8px; margin-top: 1rem;">
          <h4 style="color: #065f46; margin-bottom: 0.5rem;">🎉 Thank you, ${parentName}!</h4>
          <p style="margin-bottom: 0.75rem;">We're opening your email client to send this message directly to our Pack Leadership team.</p>
          <a href="${mailtoUrl}" class="btn btn-navy btn-sm" style="display: inline-block;">Open Email to Send Message</a>
        </div>
      `;
      alertBox.style.display = 'block';
    }

    // Trigger mail client
    window.location.href = mailtoUrl;
  });
}

/* ==========================================================================
   Back To Top Button
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   Highlight Active Navigation Link
   ========================================================================== */
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      const parentDropdown = link.closest('.nav-item.has-dropdown');
      if (parentDropdown) {
        parentDropdown.querySelector('.nav-link')?.classList.add('active');
      }
    }
  });
}
