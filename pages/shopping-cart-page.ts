import { expect, Locator, Page } from '@playwright/test';

export class ShoppingCartPage {
    readonly page: Page;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = this.page.getByRole('button', { name: 'Checkout' });
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }

};