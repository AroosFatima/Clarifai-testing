import type { Page } from '@playwright/test';
import { promisify } from 'util';
import { TIMEOUT, UPLOADFILETYPE } from '../helpers/types';

export class CommonActions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForElementAttached(locator: string): Promise<void> {
    await this.page.waitForSelector(locator);
  }

  async waitForElementVisiblity(locator: string, index?: number, timeout?: number): Promise<void> {
    await this.page
      .locator(locator)
      .nth(index || 0)
      .waitFor({ state: 'visible', timeout: timeout || TIMEOUT.SELECTOR_TIMEOUT });
  }

  async waitForIframeElementVisiblity(iframe: string, locator: string, index?: number, timeout?: number): Promise<void> {
    await this.page
      .frameLocator(iframe)
      .locator(locator)
      .nth(index || 0)
      .waitFor({ state: 'visible', timeout: timeout || TIMEOUT.SELECTOR_TIMEOUT });
  }

  async isVisible(locator: string, timeout?: number): Promise<boolean> {
    return this.page.isVisible(locator, { timeout: timeout || TIMEOUT.SELECTOR_TIMEOUT });
  }

  async isMessageDisplayed(message: string): Promise<boolean> {
    return this.isVisible(`text=${message}`);
  }

  async navigateToURL(url: string): Promise<void> {
    await this.page.goto(url, { timeout: TIMEOUT.URL_TIMEOUT });
  }

  async enterPasteElementText(locator: string, text: string): Promise<void> {
    await this.waitForElementAttached(locator);
    await this.page.fill(locator, text);
  }

  async enterTypeElementText(locator: string, text: string): Promise<void> {
    await this.waitForElementAttached(locator);
    await this.page.locator(locator).fill(text);
  }

  async clickElement(locator: string, index?: number, options?: unknown): Promise<void> {
    await this.page
      .locator(locator)
      .nth(index || 0)
      .click(options || { timeout: TIMEOUT.SELECTOR_TIMEOUT });
  }

  async checkBtnElement(locator: string, forceAction = false): Promise<void> {
    await this.waitForElementAttached(locator);
    await this.page.check(locator, { force: forceAction });
  }

  async selectFileToUpload(locator: string, file: UPLOADFILETYPE, index?: number) {
    await this.page
      .locator(locator)
      .nth(index || 0)
      .setInputFiles(file);
  }

  async hoverOnElement(locator: string, index?: number, options?: unknown) {
    await this.page
      .locator(locator)
      .nth(index || 0)
      .hover(options || { timeout: TIMEOUT.SELECTOR_TIMEOUT });
  }

  // eslint-disable-next-line class-methods-use-this
  async waitForTime(time: number): Promise<void> {
    await promisify(setTimeout)(time);
  }

  async verifyURL(select: string) {
    //  checking if we are on specific url
    await this.page.waitForURL(select, {
      waitUntil: 'domcontentloaded',
      timeout: TIMEOUT.URL_TIMEOUT,
    });
  }

  async acceptCookieFunc() {
    try {
      await this.clickElement('#hs-eu-confirmation-button');
      // eslint-disable-next-line no-empty
    } catch {}
  }
}
