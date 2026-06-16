/* ============================================================
   Stop Price Calculator — calculator.js
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     State
  ---------------------------------------------------------- */
  let safeline = 90;
  let debounceTimer = null;

  /* ----------------------------------------------------------
     DOM refs
  ---------------------------------------------------------- */
  const costBaseEl     = document.getElementById('costBase');
  const currentPriceEl = document.getElementById('currentPrice');
  const numSharesEl    = document.getElementById('numShares');
  const sliderEl       = document.getElementById('safelineSlider');
  const sliderValEl    = document.getElementById('sliderVal');
  const resultCard     = document.getElementById('resultCard');
  const resultPriceEl  = document.getElementById('resultPrice');
  const rCostEl        = document.getElementById('rCost');
  const rCurrentEl     = document.getElementById('rCurrent');
  const rSafeEl        = document.getElementById('rSafe');
  const rSharesEl      = document.getElementById('rShares');
  const rGainEl        = document.getElementById('rGain');
  const rTrailingEl    = document.getElementById('rTrailing');
  const resetBtn       = document.getElementById('resetBtn');
  const presetBtns     = document.querySelectorAll('.preset-btn');

  /* ----------------------------------------------------------
     Safeline helpers
  ---------------------------------------------------------- */
  function setSafeline(val) {
    safeline = parseInt(val, 10);
    sliderEl.value = safeline;
    sliderValEl.textContent = safeline + '%';
    presetBtns.forEach(function (btn) {
      btn.classList.toggle('active', parseInt(btn.dataset.val, 10) === safeline);
    });
    calculate();
  }

  /* ----------------------------------------------------------
     Flash animation on update
  ---------------------------------------------------------- */
  function flashUpdate() {
    var els = [resultPriceEl].concat(Array.from(document.querySelectorAll('.stat-val')));
    els.forEach(function (el) { el.classList.add('updating'); });
    setTimeout(function () {
      els.forEach(function (el) { el.classList.remove('updating'); });
    }, 120);
  }

  /* ----------------------------------------------------------
     Core calculation
     Formula: stop = ((current - cost) * safeline%) + cost
  ---------------------------------------------------------- */
  function calculate() {
    var cost    = parseFloat(costBaseEl.value);
    var current = parseFloat(currentPriceEl.value);
    var sharesRaw = numSharesEl.value.trim();
    var shares  = (sharesRaw === '' || isNaN(parseFloat(sharesRaw))) ? 1 : parseFloat(sharesRaw);

    if (isNaN(cost) || isNaN(current) || cost <= 0 || current <= 0) {
      resultCard.classList.remove('show');
      return;
    }

    var stop         = ((current - cost) * (safeline / 100)) + cost;
    var gainPerShare = stop - cost;
    var gainTotal    = gainPerShare * shares;
    var gainPct      = (gainPerShare / cost) * 100;

    flashUpdate();

    resultPriceEl.textContent = '$' + stop.toFixed(2);
    rCostEl.textContent       = '$' + cost.toFixed(2);
    rCurrentEl.textContent    = '$' + current.toFixed(2);
    rSafeEl.textContent       = safeline + '%';
    rSharesEl.textContent     = shares.toLocaleString();

    var sign        = gainTotal >= 0 ? '+' : '';
    var sharesLabel = shares !== 1 ? ' \u00d7 ' + shares.toLocaleString() + ' shares' : '';
    rGainEl.textContent = sign + '$' + gainTotal.toFixed(2) + ' (' + gainPct.toFixed(1) + '%' + sharesLabel + ')';
    rGainEl.className   = 'stat-val ' + (gainTotal >= 0 ? 'green' : 'red');

    var trailingPct = (current - stop) / current * 100;
    rTrailingEl.textContent = trailingPct.toFixed(2) + '% below current price';

    resultCard.classList.add('show');
  }

  /* ----------------------------------------------------------
     Debounced input handler
  ---------------------------------------------------------- */
  function onInput() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(calculate, 120);
  }

  /* ----------------------------------------------------------
     Reset
  ---------------------------------------------------------- */
  function resetAll() {
    costBaseEl.value     = '';
    currentPriceEl.value = '';
    numSharesEl.value    = '';
    resultCard.classList.remove('show');
    setSafeline(90);
  }

  /* ----------------------------------------------------------
     Event listeners
  ---------------------------------------------------------- */
  costBaseEl.addEventListener('input', onInput);
  currentPriceEl.addEventListener('input', onInput);
  numSharesEl.addEventListener('input', onInput);

  sliderEl.addEventListener('input', function () {
    setSafeline(sliderEl.value);
  });

  presetBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setSafeline(btn.dataset.val);
    });
  });

  resetBtn.addEventListener('click', resetAll);

  /* ----------------------------------------------------------
     Init
  ---------------------------------------------------------- */
  setSafeline(90);

})();
