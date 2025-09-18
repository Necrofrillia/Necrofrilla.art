// Simple lightbox with keyboard navigation
document.addEventListener('DOMContentLoaded', () => {
  const figures = Array.from(document.querySelectorAll('#galleryGrid figure'));
  const lightbox = document.getElementById('lightbox');
  const lbImage = document.getElementById('lb-image');
  const lbCaption = document.getElementById('lb-caption');
  const btnClose = document.querySelector('.lb-close');
  const btnPrev = document.querySelector('.lb-prev');
  const btnNext = document.querySelector('.lb-next');
  const yearSpan = document.getElementById('year');

  yearSpan.textContent = new Date().getFullYear();

  let index = -1;

  function openAt(i){
    const fig = figures[i];
    if(!fig) return;
    const full = fig.dataset.full || fig.querySelector('img').src;
    const title = fig.dataset.title || fig.querySelector('figcaption')?.textContent || '';
    lbImage.src = full;
    lbImage.alt = fig.querySelector('img').alt || title;
    lbCaption.textContent = title;
    lightbox.setAttribute('aria-hidden','false');
    index = i;
    // focus for keyboard
    btnClose.focus();
  }

  function closeLB(){
    lightbox.setAttribute('aria-hidden','true');
    lbImage.src = '';
    index = -1;
  }

  function prev(){
    if(index <= 0) index = figures.length - 1;
    else index--;
    openAt(index);
  }
  function next(){
    if(index >= figures.length - 1) index = 0;
    else index++;
    openAt(index);
  }

  figures.forEach((fig, i) => {
    fig.addEventListener('click', () => openAt(i));
    fig.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openAt(i); }
    });
  });

  btnClose.addEventListener('click', closeLB);
  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);

  // keyboard
  window.addEventListener('keydown', e => {
    if (lightbox.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') closeLB();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
  });

  // click outside image to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLB();
  });
});
