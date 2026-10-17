(function () {
  const overlay = document.getElementById('search-overlay');
  const modalInput = document.getElementById('search-modal-input');
  const resultsEl = document.getElementById('search-results');
  const emptyEl = document.getElementById('search-empty');
  const closeBtn = document.getElementById('search-close');

  if (!overlay || !modalInput || !resultsEl || !emptyEl || !closeBtn) {
    return;
  }

  const dictEmpty = document.body.dataset.searchEmpty || 'Start typing to search...';
  const dictLoading = document.body.dataset.searchLoading || 'Loading index...';
  const dictNoResults = document.body.dataset.searchNoResults || 'No results for';
  const dictError = document.body.dataset.searchError || 'Could not load search index.';

  let fuse = null;
  let loaded = false;

  document.querySelectorAll('.nav-search input, .search-box').forEach((input) => {
    input.addEventListener('focus', openOverlay);
    input.addEventListener('input', (e) => {
      openOverlay();
      modalInput.value = e.target.value;
      doSearch(e.target.value);
    });
  });

  const navTrigger = document.getElementById('nav-search-trigger');
  if (navTrigger) {
    navTrigger.addEventListener('click', openOverlay);
  }

  function openOverlay() {
    overlay.removeAttribute('aria-hidden');
    overlay.classList.add('open');
    modalInput.focus();

    if (!loaded) {
      loadIndex();
    }
  }

  function closeOverlay() {
    overlay.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('open');
    modalInput.value = '';
    resultsEl.innerHTML = '';
    resultsEl.appendChild(emptyEl);
    emptyEl.textContent = dictEmpty;
  }

  closeBtn.addEventListener('click', closeOverlay);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeOverlay();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeOverlay();
    }

    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openOverlay();
    }
  });

  modalInput.addEventListener('input', (e) => doSearch(e.target.value));

  function loadIndex() {
    loaded = true;

    fetch('/index.json')
      .then((r) => r.json())
      .then((data) => {
        fuse = new Fuse(data, {
          keys: [
            { name: 'title', weight: 0.5 },
            { name: 'tags', weight: 0.3 },
            { name: 'summary', weight: 0.15 },
            { name: 'categories', weight: 0.05 }
          ],
          threshold: 0.35,
          includeMatches: true,
          minMatchCharLength: 2
        });

        if (modalInput.value) {
          doSearch(modalInput.value);
        }
      })
      .catch(() => {
        emptyEl.textContent = dictError;
      });
  }

  function doSearch(query) {
    resultsEl.innerHTML = '';

    if (!query || query.length < 2) {
      emptyEl.textContent = dictEmpty;
      resultsEl.appendChild(emptyEl);
      return;
    }

    if (!fuse) {
      emptyEl.textContent = dictLoading;
      resultsEl.appendChild(emptyEl);
      return;
    }

    const hits = fuse.search(query, { limit: 8 });

    if (!hits.length) {
      emptyEl.textContent = dictNoResults + ' "' + query + '"';
      resultsEl.appendChild(emptyEl);
      return;
    }

    hits.forEach(({ item }) => {
      const el = document.createElement('a');
      el.className = 'search-result-item';
      el.href = item.url;

      const tags = (item.tags || [])
        .slice(0, 3)
        .map((t) => '<span class="tag">#' + t + '</span>')
        .join('');

      el.innerHTML =
        '<div class="sr-title">' + item.title + '</div>' +
        '<div class="sr-meta">' +
          '<span class="sr-date">' + (item.date || '') + '</span>' +
          '<div class="sr-tags">' + tags + '</div>' +
        '</div>' +
        '<div class="sr-summary">' + (item.summary || '').slice(0, 120) + '…</div>';

      resultsEl.appendChild(el);
    });
  }
})();
