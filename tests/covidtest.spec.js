// tests/covidtest.spec.js
import { test, expect } from '@playwright/test';
import {
  form,
  navigateToWebsite,
  verifyPageTitle,
  verifyTitleStyle,
  verifyDropdownVisible,
  verifyDropdownOpensOnClick,
  verifyAllStatesListed,
  verifyStateSelection,
  verifyMapVisible,
  verifyMarkerVisible,
  verifyMapZoomControls,
  verifyMapAttribution,
  verifyDataOnStateSelection,
  verifyResultHeading,
  verifySummaryCards,
  verifyPieChartVisible,
  verifyMapAfterStateSelection,
  verifyMapZoomAfterSelection,
  verifyDownloadButton,
} from './basepage.js';

let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  // Navigate only once at the beginning
  await navigateToWebsite(page);
});

test.afterAll(async () => {
  await page.close();
});

test.afterEach(async () => {
  // Add 2 second delay between each test case
  await page.waitForTimeout(2000);
});

test.describe.configure({ mode: 'serial' });

test.describe('COVID-19 Tracker Tests', () => {

  // TS_CT_001 - Verify page title is displayed
  test('TS_CT_001 - Verify page title is displayed', async () => {
    test.setTimeout(60_000);
    await navigateToWebsite(page);
    await verifyPageTitle(page);
  });

  // TS_CT_002 - Verify title alignment and font
  test('TS_CT_002 - Verify title alignment and font', async () => {
    test.setTimeout(60_000);
    await navigateToWebsite(page);
    await verifyTitleStyle(page);
  });

  // TS_CT_003 - Verify dropdown is visible
  test('TS_CT_003 - Verify dropdown is visible', async () => {
    test.setTimeout(60_000);
    await navigateToWebsite(page);
    await verifyDropdownVisible(page);
  });

  // TS_CT_005 - Verify dropdown opens on click
  test('TS_CT_005 - Verify dropdown opens on click', async () => {
    test.setTimeout(60_000);
    await navigateToWebsite(page);
    await verifyDropdownOpensOnClick(page);
  });

  // TS_CT_006 - Verify all states are listed
  test('TS_CT_006 - Verify all states are listed', async () => {
    test.setTimeout(60_000);
    await navigateToWebsite(page);
    await verifyAllStatesListed(page);
  });

  // TS_CT_008 - Verify state selection
  test('TS_CT_008 - Verify state selection', async () => {
    test.setTimeout(60_000);
    await navigateToWebsite(page);
    await verifyStateSelection(page, 'Kerala');
  });

  // TS_CT_010 - Verify map is displayed
  test('TS_CT_010 - Verify map is displayed', async () => {
    test.setTimeout(60_000);
    await navigateToWebsite(page);
    await verifyMapVisible(page);
  });

  // TS_CT_012 - Verify marker visibility after state selection
  test('TS_CT_012 - Verify marker visibility after state selection', async () => {
    test.setTimeout(60_000);
    await navigateToWebsite(page);
    await verifyMarkerVisible(page, 'Kerala');
  });

  // TS_CT_014 - Verify zoom controls on map
  test('TS_CT_014 - Verify zoom controls on map', async () => {
    test.setTimeout(60_000);
    await navigateToWebsite(page);
    await verifyMapZoomControls(page);
  });

  // TS_CT_016 - Verify map attribution text
  test('TS_CT_016 - Verify map attribution text', async () => {
    test.setTimeout(60_000);
    await navigateToWebsite(page);
    await verifyMapAttribution(page);
  });

  // TS_CT_017 - Verify data display on state selection
  test('TS_CT_017 - Verify data display on state selection', async () => {
    test.setTimeout(60_000);
    await navigateToWebsite(page);
    await verifyDataOnStateSelection(page, 'Kerala');
  });

  // TS_CT_018 - Verify result section heading updates
  test('TS_CT_018 - Verify result section heading updates', async () => {
    test.setTimeout(60_000);
    await navigateToWebsite(page);
    await verifyResultHeading(page, 'Kerala');
  });

  // TS_CT_031 - Verify summary cards are displayed
  test('TS_CT_031 - Verify summary cards are displayed', async () => {
    test.setTimeout(60_000);
    await navigateToWebsite(page);
    await verifySummaryCards(page, 'Kerala');
  });

  // TS_CT_034 - Verify pie chart is displayed
  test('TS_CT_034 - Verify pie chart is displayed', async () => {
    test.setTimeout(60_000);
    await navigateToWebsite(page);
    await verifyPieChartVisible(page, 'Kerala');
  });

  // TS_CT_038 - Verify map section is displayed after state selection
  test('TS_CT_038 - Verify map section is displayed after state selection', async () => {
    test.setTimeout(60_000);
    await navigateToWebsite(page);
    await verifyMapAfterStateSelection(page, 'Kerala');
  });

  // TS_CT_041 - Verify map zoom controls after state selection
  test('TS_CT_041 - Verify map zoom controls after state selection', async ({ page }) => {
    test.setTimeout(60_000);
    await navigateToWebsite(page);
    await verifyMapZoomAfterSelection(page, 'Kerala');
  });

  // TS_CT_050 - Verify download button on chart
  test('TS_CT_050 - Verify download button on chart', async ({ page }) => {
    test.setTimeout(60_000);
    await navigateToWebsite(page);
    await verifyDownloadButton(page, 'Kerala');
  });

});