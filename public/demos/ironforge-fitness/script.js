const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.navbar nav');
const navLinks = document.querySelectorAll('.navbar nav a');
const toast = document.getElementById('toast');

menuBtn?.addEventListener('click', () => {
  nav.classList.toggle('mobile-open');
  menuBtn.textContent = nav.classList.contains('mobile-open') ? '✕' : '☰';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('mobile-open');
    menuBtn.textContent = '☰';
  });
});

document.querySelectorAll('[data-plan]').forEach(btn => {
  btn.addEventListener('click', () => {
    toast.textContent = `${btn.dataset.plan} membership selected — we'll contact you soon!`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    nav.classList.remove('mobile-open');
    menuBtn.textContent = '☰';
  }
});
