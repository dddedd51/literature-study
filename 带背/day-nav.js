(function () {
  // 切换资料后仍能返回最初打开带背的计划日期。
  var params = new URLSearchParams(location.search);
  if (params.get('from') !== 'plan') return;
  var origin = new URLSearchParams({ from: 'plan' });
  var day = params.get('d');
  if (day && /^\d+$/.test(day)) origin.set('d', day);
  document.querySelectorAll('.day-nav a[rel]').forEach(function (link) {
    var target = new URL(link.getAttribute('href'), location.href);
    target.search = origin.toString();
    link.href = target.href;
  });
})();
