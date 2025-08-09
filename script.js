// Portfolio Script
const GH_USER = 'Ruan191';
const repoCountEl = document.getElementById('repoCount');
const followersEl = document.getElementById('followers');
const yearEl = document.getElementById('year');
const liveStatus = document.getElementById('liveStatus');
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');

yearEl.textContent = new Date().getFullYear();

// Progressive enhancement check
if ('fetch' in window) {
  fetchProfileData();
} else {
  liveStatus.textContent = 'Upgrade browser for dynamic data';
}

function fetchProfileData() {
  fetch(`https://api.github.com/users/${GH_USER}`)
    .then(async (userRes) => {
      if (!userRes.ok) throw new Error('GitHub API error');
      const user = await userRes.json();
      repoCountEl.textContent = user.public_repos;
      followersEl.textContent = user.followers;
      liveStatus.textContent = 'Profile loaded';
      liveStatus.classList.add('ready');
    })
    .catch(err => {
      console.error(err);
      liveStatus.textContent = 'Offline fallback';
      // Set fallback values
      repoCountEl.textContent = '20+';
      followersEl.textContent = '10+';
    });
}

function renderRepos(repos) {
  // Function removed - projects section no longer exists
}

function renderFallbackRepos() {
  // Function removed - projects section no longer exists
}

function populateLanguageFilter(repos) {
  // Function removed - projects section no longer exists
}

function filterProjects() {
  // Function removed - projects section no longer exists
}

function escapeHtml(str){
  return str && str.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
}

// Theme Toggle
const root = document.documentElement;
if (localStorage.getItem('theme') === 'light') {
  root.classList.add('light');
  themeToggle.textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
  const isLight = root.classList.toggle('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeToggle.textContent = isLight ? '🌙' : '☀️';
});

// Back to top button
window.addEventListener('scroll', () => {
  backToTop.style.opacity = window.scrollY > 600 ? 1 : 0;
});
backToTop.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

// Mobile nav
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

// Experience section animations
function animateExperienceSection() {
  const experienceCards = document.querySelectorAll('.experience-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.1 });
  
  experienceCards.forEach(card => {
    observer.observe(card);
  });
}

// Fetch side project repository stats
function fetchSideProjectStats() {
  const sideProjectRepos = ['CommandLine', 'MyRepo', 'Hostify_Public', 'Discord-bot'];
  
  sideProjectRepos.forEach(repo => {
    fetch(`https://api.github.com/repos/${GH_USER}/${repo}`)
      .then(response => {
        if (!response.ok) throw new Error('Repo not found');
        return response.json();
      })
      .then(data => {
        // Update stars
        const starElements = document.querySelectorAll(`[data-repo="${repo}"]:not([data-type])`);
        starElements.forEach(el => {
          el.textContent = data.stargazers_count || '0';
        });
        
        // Update forks
        const forkElements = document.querySelectorAll(`[data-repo="${repo}"][data-type="forks"]`);
        forkElements.forEach(el => {
          el.textContent = data.forks_count || '0';
        });
      })
      .catch(err => {
        console.warn(`Could not fetch stats for ${repo}:`, err);
        // Set fallback values
        const starElements = document.querySelectorAll(`[data-repo="${repo}"]:not([data-type])`);
        const forkElements = document.querySelectorAll(`[data-repo="${repo}"][data-type="forks"]`);
        starElements.forEach(el => el.textContent = '0');
        forkElements.forEach(el => el.textContent = '0');
      });
  });
}

// Animate side project cards
function animateSideProjects() {
  const sideProjectCards = document.querySelectorAll('.side-project-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.1 });
  
  sideProjectCards.forEach(card => {
    observer.observe(card);
  });
}

// Initialize side projects functionality
function initializeSideProjects() {
  fetchSideProjectStats();
  animateSideProjects();
}

// Initialize experience animations when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    animateExperienceSection();
    initializeSideProjects();
  });
} else {
  animateExperienceSection();
  initializeSideProjects();
}

// Accessibility: trap focus when nav open (simple version)
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded','false');
    navToggle.focus();
  }
});
