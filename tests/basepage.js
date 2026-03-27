// tests/basepage.js
import { expect } from '@playwright/test';

export const form = {
    urls: {
        homePage: 'https://inerg-test.web.app/'
    },
    selectors: {
        body: 'body',
        title: 'h1',
        dropdown: 'select',
        map: '.leaflet-container',
        mapMarker: '.leaflet-marker-icon',
        mapZoomIn: '.leaflet-control-zoom-in',
        mapZoomOut: '.leaflet-control-zoom-out',
        mapAttribution: '.leaflet-control-attribution',
        summaryCards: '.card',
        pieChart: '.js-plotly-plot',
        lineChart: '.js-plotly-plot',
        downloadButton: '[data-title="Download plot as a png"]',
        resultHeading: 'h2',
    }
};

// TS_CT_001 / TS_AUTO_001 - Navigate to the website
export const navigateToWebsite = async (page) => {
    await page.goto(form.urls.homePage, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(2000);
};

// TS_CT_001 - Verify page title is visible and has correct text
export const verifyPageTitle = async (page) => {
    const title = page.locator(form.selectors.title);
    await title.waitFor({ state: 'visible', timeout: 10000 });
    await expect(title).toBeVisible();
    await expect(title).toHaveText(/COVID-19 Tracker - India/i);
};

// TS_CT_002 - Verify title alignment and font family
export const verifyTitleStyle = async (page) => {
    const title = page.locator(form.selectors.title);
    await title.waitFor({ state: 'visible', timeout: 10000 });
    const textAlign = await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        return el ? getComputedStyle(el).textAlign : '';
    }, form.selectors.title);
    const fontFamily = await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        return el ? getComputedStyle(el).fontFamily : '';
    }, form.selectors.title);
    expect(textAlign).toMatch(/center/i);
    expect(fontFamily).toMatch(/Times|Serif|serif/i);
};

// TS_CT_003 - Verify dropdown is visible
export const verifyDropdownVisible = async (page) => {
    const dropdown = page.locator(form.selectors.dropdown);
    await dropdown.waitFor({ state: 'visible', timeout: 10000 });
    await expect(dropdown).toBeVisible();
};

// TS_CT_005 - Verify dropdown opens on click
export const verifyDropdownOpensOnClick = async (page) => {
    const dropdown = page.locator(form.selectors.dropdown);
    await dropdown.waitFor({ state: 'visible', timeout: 10000 });
    await dropdown.click();
    await page.waitForTimeout(1000);
    await expect(dropdown).toBeVisible();
};

// TS_CT_006 - Verify all states are listed in dropdown
export const verifyAllStatesListed = async (page) => {
    const dropdown = page.locator(form.selectors.dropdown);
    await dropdown.waitFor({ state: 'visible', timeout: 10000 });
    const options = await dropdown.locator('option').count();
    expect(options).toBeGreaterThan(0);
};

// TS_CT_008 - Verify state selection
export const verifyStateSelection = async (page, stateName = 'Kerala') => {
    const dropdown = page.locator(form.selectors.dropdown);
    await dropdown.waitFor({ state: 'visible', timeout: 10000 });
    await dropdown.selectOption({ label: stateName });
    await page.waitForTimeout(2000);
    const selectedValue = await dropdown.inputValue();
    expect(selectedValue).toBeTruthy();
};

// TS_CT_010 - Verify map is displayed
export const verifyMapVisible = async (page) => {
    const map = page.locator(form.selectors.map);
    await map.waitFor({ state: 'visible', timeout: 10000 });
    await expect(map).toBeVisible();
};

// TS_CT_012 - Verify marker visibility after state selection
export const verifyMarkerVisible = async (page, stateName = 'Kerala') => {
    const dropdown = page.locator(form.selectors.dropdown);
    await dropdown.selectOption({ label: stateName });
    await page.waitForTimeout(2000);
    const marker = page.locator(form.selectors.mapMarker);
    await marker.waitFor({ state: 'visible', timeout: 10000 });
    await expect(marker).toBeVisible();
};

// TS_CT_014 - Verify zoom controls on map
export const verifyMapZoomControls = async (page) => {
    const zoomIn = page.locator(form.selectors.mapZoomIn);
    const zoomOut = page.locator(form.selectors.mapZoomOut);
    await expect(zoomIn).toBeVisible();
    await expect(zoomOut).toBeVisible();
    await zoomIn.click();
    await page.waitForTimeout(500);
    await zoomOut.click();
    await page.waitForTimeout(500);
};

// TS_CT_016 - Verify map attribution text
export const verifyMapAttribution = async (page) => {
    const attribution = page.locator(form.selectors.mapAttribution);
    await attribution.waitFor({ state: 'visible', timeout: 10000 });
    await expect(attribution).toBeVisible();
};

// TS_CT_017 - Verify data display on state selection
export const verifyDataOnStateSelection = async (page, stateName = 'Kerala') => {
    const dropdown = page.locator(form.selectors.dropdown);
    await dropdown.selectOption({ label: stateName });
    await page.waitForTimeout(2000);
    const cards = page.locator(form.selectors.summaryCards);
    await expect(cards.first()).toBeVisible();
};

// TS_CT_018 - Verify result section heading updates
export const verifyResultHeading = async (page, stateName = 'Kerala') => {
    const dropdown = page.locator(form.selectors.dropdown);
    await dropdown.selectOption({ label: stateName });
    await page.waitForTimeout(2000);
    const heading = page.locator(form.selectors.resultHeading);
    await expect(heading).toBeVisible();
    await expect(heading).toContainText(new RegExp(stateName, 'i'));
};

// TS_CT_031 - Verify summary cards are displayed after state selection
export const verifySummaryCards = async (page, stateName = 'Kerala') => {
    const dropdown = page.locator(form.selectors.dropdown);
    await dropdown.selectOption({ label: stateName });
    await page.waitForTimeout(2000);
    const cards = page.locator(form.selectors.summaryCards);
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
        await expect(cards.nth(i)).toBeVisible();
    }
};

// TS_CT_034 - Verify pie chart is displayed
export const verifyPieChartVisible = async (page, stateName = 'Kerala') => {
    const dropdown = page.locator(form.selectors.dropdown);
    await dropdown.selectOption({ label: stateName });
    await page.waitForTimeout(3000);
    const chart = page.locator(form.selectors.pieChart).first();
    await chart.waitFor({ state: 'visible', timeout: 10000 });
    await expect(chart).toBeVisible();
};

// TS_CT_038 - Verify map section is displayed after state selection
export const verifyMapAfterStateSelection = async (page, stateName = 'Kerala') => {
    const dropdown = page.locator(form.selectors.dropdown);
    await dropdown.selectOption({ label: stateName });
    await page.waitForTimeout(2000);
    const map = page.locator(form.selectors.map);
    await expect(map).toBeVisible();
};

// TS_CT_041 - Verify map zoom controls after state selection
export const verifyMapZoomAfterSelection = async (page, stateName = 'Kerala') => {
    const dropdown = page.locator(form.selectors.dropdown);
    await dropdown.selectOption({ label: stateName });
    await page.waitForTimeout(2000);
    const zoomIn = page.locator(form.selectors.mapZoomIn);
    const zoomOut = page.locator(form.selectors.mapZoomOut);
    await zoomIn.click();
    await page.waitForTimeout(500);
    await zoomOut.click();
    await page.waitForTimeout(500);
    await expect(zoomIn).toBeVisible();
    await expect(zoomOut).toBeVisible();
};

// TS_CT_050 - Verify download button on chart
export const verifyDownloadButton = async (page, stateName = 'Kerala') => {
    const dropdown = page.locator(form.selectors.dropdown);
    await dropdown.selectOption({ label: stateName });
    await page.waitForTimeout(3000);
    const chart = page.locator(form.selectors.pieChart).first();
    await chart.hover();
    await page.waitForTimeout(1000);
    const downloadBtn = page.locator(form.selectors.downloadButton).first();
    await expect(downloadBtn).toBeVisible();
};