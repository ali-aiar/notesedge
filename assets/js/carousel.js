(function () {
  const PAGE_SIZE = 4;
  const tabs = document.querySelectorAll('.filter-tab');
  const allCards = Array.from(document.querySelectorAll('#card-grid .card'));
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const countEl = document.getElementById('carousel-count');
  const navEl = document.getElementById('carousel-nav');

  if (!tabs.length || !allCards.length || !prevBtn || !nextBtn || !countEl || !navEl) {
    return;
  }

  let visible = allCards.slice();
  let page = 0;

  function totalPages() {
    return Math.ceil(visible.length / PAGE_SIZE);
  }

  function goTo(nextPage) {
    page = Math.max(0, Math.min(nextPage, totalPages() - 1));

    allCards.forEach((card) => {
      card.style.display = 'none';
    });

    const start = page * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, visible.length);

    visible.slice(start, end).forEach((card) => {
      card.style.display = '';
    });

    prevBtn.disabled = page === 0;
    nextBtn.disabled = page >= totalPages() - 1;
    prevBtn.classList.toggle('active', page > 0);
    nextBtn.classList.toggle('active', page < totalPages() - 1);

    var tpl = document.body.getAttribute('data-results-summary') || 'Showing %END% of %TOTAL% posts';
    countEl.textContent = tpl.replace('%END%', end).replace('%TOTAL%', visible.length);
    navEl.style.display = 'flex';
  }

  function applyFilter(filter) {
    page = 0;
    visible = filter === 'all'
      ? allCards
      : allCards.filter((card) => (card.dataset.contentType || '').toLowerCase() === filter);
    goTo(0);
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((currentTab) => currentTab.classList.remove('active'));
      tab.classList.add('active');
      applyFilter(tab.dataset.filter || 'all');
    });
  });

  prevBtn.addEventListener('click', () => goTo(page - 1));
  nextBtn.addEventListener('click', () => goTo(page + 1));

  applyFilter('all');
})();
