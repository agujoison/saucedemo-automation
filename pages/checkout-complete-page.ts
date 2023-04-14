import { expect, Locator, Page } from '@playwright/test';

export class CheckoutCompletePage {
    readonly page: Page;
    readonly thankYouMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.thankYouMessage = this.page.locator('.complete-header');
    }
};