(function () {
  const postPage = document.querySelector('.post-page');
  const dictCopy = postPage ? (postPage.dataset.copy || 'copy') : 'copy';
  const dictCopied = postPage ? (postPage.dataset.copied || 'copied!') : 'copied!';

  document.querySelectorAll('.post-body pre').forEach((pre) => {
    const code = pre.querySelector('code');
    const langMatch = code ? code.className.match(/language-(\w+)/) : null;
    const lang = langMatch ? langMatch[1].toUpperCase() : (pre.dataset.lang || 'CODE');

    const wrapper = document.createElement('div');
    wrapper.className = 'code-block';

    const header = document.createElement('div');
    header.className = 'code-block-header';
    header.innerHTML =
      '<div class="code-block-left">' +
        '<div class="code-dots"><span class="cd-r"></span><span class="cd-y"></span><span class="cd-g"></span></div>' +
        '<span class="code-lang">' + lang + '</span>' +
      '</div>' +
      '<button class="code-copy">' + dictCopy + '</button>';

    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(header);
    wrapper.appendChild(pre);

    header.querySelector('.code-copy').addEventListener('click', function () {
      const button = this;
      const text = pre.innerText;

      navigator.clipboard.writeText(text).then(() => {
        button.textContent = dictCopied;
        button.classList.add('code-copy-success');

        setTimeout(() => {
          button.textContent = dictCopy;
          button.classList.remove('code-copy-success');
        }, 2000);
      });
    });
  });
})();
