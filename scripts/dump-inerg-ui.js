const { chromium } = require('playwright');

const URL = 'https://inerg-test.web.app/';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

  await page.goto(URL, { waitUntil: 'domcontentloaded' });

  // Select a state to trigger chart/UI (pick the first non-empty option).
  const dropdown = 'select.data-filter-input';
  const firstOption = await page.locator(`${dropdown} option:not([value=""])`).first().getAttribute('value');
  if (firstOption) {
    await page.selectOption(dropdown, { value: firstOption });
  }

  // Wait for chart / UI to render.
  await page.waitForTimeout(8000);

  const summary = await page.evaluate(() => {
    const pick = (el) => {
      const r = {
        tag: el.tagName.toLowerCase(),
        id: el.id || null,
        name: el.getAttribute('name') || null,
        type: el.getAttribute('type') || null,
        placeholder: el.getAttribute('placeholder') || null,
        ariaLabel: el.getAttribute('aria-label') || null,
        role: el.getAttribute('role') || null,
        text: (el.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 120),
        value: (el.value || '').toString().slice(0, 120),
        className: el.className ? el.className.toString().slice(0, 120) : null,
      };
      return r;
    };

    const btns = Array.from(document.querySelectorAll('button, input[type="button"], input[type="submit"], [role="button"]'));
    const inputs = Array.from(document.querySelectorAll('input, textarea'));
    const selects = Array.from(document.querySelectorAll('select'));

    const plots = Array.from(document.querySelectorAll('.js-plotly-plot, [data-testid*="chart" i], [id*="plot" i]'));

    const importExportText = Array.from(document.querySelectorAll('body *'))
      .map((el) => (el.innerText || '').trim())
      .filter(Boolean)
      .filter((t) => /import|export/i.test(t))
      .slice(0, 20);

    const fileInputs = Array.from(document.querySelectorAll('input[type="file"]')).map(pick);

    const plotDiv = document.querySelector('.js-plotly-plot');
    const plotData = plotDiv && plotDiv.data && plotDiv.data.length ? plotDiv.data.map((d) => ({ name: d.name, y: d.y })) : null;

    return {
      counts: {
        buttons: btns.length,
        inputs: inputs.length,
        selects: selects.length,
        plots: plots.length,
        fileInputs: fileInputs.length,
      },
      buttons: btns.slice(0, 60).map(pick),
      inputs: inputs.slice(0, 80).map(pick),
      selects: selects.slice(0, 20).map(pick),
      plots: plots.slice(0, 10).map((el) => ({
        id: el.id || null,
        className: el.className ? el.className.toString() : null,
      })),
      importExportText,
      fileInputs,
      plotData,
    };
  });

  console.log(JSON.stringify(summary, null, 2));
  await browser.close();
})();

