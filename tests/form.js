// tests/basepage.js
export class BasePage {
  constructor(page) {
    this.page = page;
    this.url = 'https://inerg-test.web.app/';
    this.titleSelector = 'h1';
  }

  // TS_AUTO_001 - Verify website launches successfully
  // Navigates to the COVID-19 Tracker website
  async navigateToWebsite() {
    await this.page.goto(this.url);
  }

  // TS_AUTO_002 - Verify page title is displayed
  // Returns the h1 title locator to assert visibility and text content
  async titleElement() {
    return await this.page.locator(this.titleSelector);
  }

  // TS_AUTO_003 - Verify title alignment and font
  // Returns the computed text-align style of the title element
  async getTitleTextAlign() {
    return await this.page.evaluate((sel) => {
      const el = document.querySelector(sel);
      return el ? getComputedStyle(el).textAlign : '';
    }, this.titleSelector);
  }

  // TS_AUTO_003 - Verify title alignment and font
  // Returns the computed font-family style of the title element
  async getTitleFontFamily() {
    return await this.page.evaluate((sel) => {
      const el = document.querySelector(sel);
      return el ? getComputedStyle(el).fontFamily : '';
    }, this.titleSelector);
  }
}