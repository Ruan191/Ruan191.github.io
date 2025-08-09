// Portfolio Script
const GH_USER = 'Ruan191';
const projectGrid = document.getElementById('projectGrid');
const repoCountEl = document.getElementById('repoCount');
const followersEl = document.getElementById('followers');
const yearEl = document.getElementById('year');
const liveStatus = document.getElementById('liveStatus');
const searchInput = document.getElementById('projectSearch');
const languageFilter = document.getElementById('languageFilter');
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');
const videoGrid = document.getElementById('videoGrid');

yearEl.textContent = new Date().getFullYear();

// Progressive enhancement check
if ('fetch' in window) {
  fetchProfileAndRepos();
} else {
  liveStatus.textContent = 'Upgrade browser for dynamic data';
}

function fetchProfileAndRepos() {
  Promise.all([
    fetch(`https://api.github.com/users/${GH_USER}`),
    fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated`)
  ])
    .then(async ([userRes, reposRes]) => {
      if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error');
      const user = await userRes.json();
      const repos = (await reposRes.json())
        .filter(r => !r.fork)
        .sort((a,b) => (b.stargazers_count + b.watchers_count) - (a.stargazers_count + a.watchers_count));
      repoCountEl.textContent = repos.length;
      followersEl.textContent = user.followers;
      liveStatus.textContent = 'Profile loaded';
      liveStatus.classList.add('ready');
      renderRepos(repos);
      populateLanguageFilter(repos);
    })
    .catch(err => {
      console.error(err);
      liveStatus.textContent = 'Offline fallback';
      renderFallbackRepos();
    });
}

function renderRepos(repos) {
  projectGrid.innerHTML = '';
  repos.slice(0, 12).forEach(repo => {
    const card = document.createElement('article');
    card.className = 'project-card fade-in';
    card.dataset.language = repo.language || 'Other';
    card.innerHTML = `
      <h3>${repo.name}</h3>
      <p>${escapeHtml(repo.description) || 'No description provided.'}</p>
      <div class="project-meta">
        <span>${repo.language || 'Other'}</span>
        <span>★ ${repo.stargazers_count}</span>
        <span>Forks ${repo.forks_count}</span>
        <span>Updated ${new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>
      <div class="project-links">
        <a href="${repo.html_url}" target="_blank" rel="noopener">Repo</a>
        ${repo.homepage ? `<a class="secondary" href="${repo.homepage}" target="_blank" rel="noopener">Live</a>` : ''}
      </div>`;
    projectGrid.appendChild(card);
  });
}

function renderFallbackRepos() {
  const fallback = [
    { name: 'CommandLine', description: 'Advanced CLI experience in C#', language: 'C#', stargazers_count: 2, forks_count: 0, updated_at: new Date(), html_url: 'https://github.com/Ruan191/CommandLine' },
    { name: 'VisualConsole', description: 'Visual console experiments', language: 'C#', stargazers_count: 1, forks_count: 0, updated_at: new Date(), html_url: 'https://github.com/Ruan191/VisualConsole' },
    { name: 'Discord-bot', description: 'Auto moderation with leveling system', language: 'JavaScript', stargazers_count: 1, forks_count: 0, updated_at: new Date(), html_url: 'https://github.com/Ruan191/Discord-bot' },
    { name: '3D-TicTacToe', description: 'Experiment in 3D game logic & UI', language: 'C#', stargazers_count: 0, forks_count: 0, updated_at: new Date(), html_url: 'https://github.com/Ruan191/3D-TicTacToe' }
  ];
  renderRepos(fallback);
}

function populateLanguageFilter(repos) {
  const langs = Array.from(new Set(repos.map(r => r.language).filter(Boolean))).sort();
  langs.forEach(l => {
    const opt = document.createElement('option');
    opt.value = l; opt.textContent = l; languageFilter.appendChild(opt);
  });
}

searchInput?.addEventListener('input', filterProjects);
languageFilter?.addEventListener('change', filterProjects);

function filterProjects() {
  const q = searchInput.value.toLowerCase();
  const lang = languageFilter.value;
  [...projectGrid.children].forEach(card => {
    const name = card.querySelector('h3').textContent.toLowerCase();
    const matchQ = name.includes(q);
    const matchLang = !lang || card.dataset.language === lang;
    card.style.display = (matchQ && matchLang) ? '' : 'none';
  });
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

// Videos (manual selection for now). Replace video IDs as you want.
const videoIds = [
  'UWlgHnozv38', // Sanctuary Shattered Sun Survival Sandbox
  'HKG84YcsluM', // Guard Gameplay
  '0XKLtVQqb2w', // Replay System Unity
  'cNQ27ZvsT3M', // Chosen Gameplay
  'vqji8xsskkI', // EDA Gameplay
  'sOuE7Lvvrak'  // AI Talking Cat
];

videoIds.forEach(id => {
  const card = document.createElement('a');
  card.href = `https://www.youtube.com/watch?v=${id}`;
  card.target = '_blank';
  card.rel = 'noopener';
  card.className = 'video-card fade-in';
  card.innerHTML = `
    <img class="video-thumb" loading="lazy" src="https://img.youtube.com/vi/${id}/mqdefault.jpg" alt="YouTube thumbnail" />
    <h3>Video</h3>
    <p class="video-meta"><span>YouTube</span><span>Watch →</span></p>`;
  videoGrid.appendChild(card);
});

// Accessibility: trap focus when nav open (simple version)
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded','false');
    navToggle.focus();
  }
});
