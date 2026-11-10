(() => {
  'use strict';
  const search = document.querySelector('#search');
  const blocks = [...document.querySelectorAll('main .block')];
  const count = document.querySelector('#resultCount');
  const compact = document.querySelector('#compact');
  const toggler = document.querySelector('#toggleAnswers');
  function filter() {
    const query = search.value.trim().toLocaleLowerCase();
    let matches = 0;
    blocks.forEach(block => {
      const match = !query || block.textContent.toLocaleLowerCase().includes(query);
      block.hidden = !match;
      if (match) matches++;
      const link = document.querySelector('nav a[href="#' + block.id + '"]');
      if (link) link.hidden = !match;
    });
    count.textContent = query ? `找到 ${matches} 个相关章节` : '搜索题型、作家、题号或卡点';
    document.querySelector('#empty').hidden = matches !== 0;
  }
  search.addEventListener('input', filter);
  compact.addEventListener('click', () => {
    const active = document.body.classList.toggle('compact');
    compact.setAttribute('aria-pressed', String(active));
    compact.textContent = active ? '返回完整指南' : '只看考前速查';
    search.value = ''; filter();
  });
  toggler.addEventListener('click', () => {
    const answers = [...document.querySelectorAll('details')];
    const open = answers.some(d => !d.open);
    answers.forEach(d => {d.open = open;});
    toggler.textContent = open ? '收起全部示范答案' : '展开全部示范答案';
  });
  let previous;
  addEventListener('beforeprint', () => {
    previous = {open: [...document.querySelectorAll('details')].map(d => d.open), query:search.value};
    search.value = ''; filter();
    document.querySelectorAll('details').forEach(d => {d.open = true;});
  });
  addEventListener('afterprint', () => {
    if (!previous) return;
    document.querySelectorAll('details').forEach((d,i) => {d.open = previous.open[i];});
    search.value = previous.query; filter(); previous = null;
  });
  document.querySelector('#print').addEventListener('click', () => window.print());
  function revealHash() {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (!target) return;
    if (!target.closest('.quick') && document.body.classList.contains('compact')) compact.click();
    if (target.closest('.block')?.hidden) {search.value = ''; filter();}
    if (target.tagName === 'DETAILS') target.open = true;
    target.scrollIntoView();
  }
  addEventListener('hashchange', revealHash);
  filter();
  if (location.hash) revealHash();
})();
