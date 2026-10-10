// Music Elite - Fase 1: Interações básicas
document.addEventListener('DOMContentLoaded', () => {
  console.log('Music Elite Fase 1 carregada.');

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Simple header scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  // Placeholder for future player or interactive features
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = '#d4af37';
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = '#2a2a2a';
    });
  });
});
