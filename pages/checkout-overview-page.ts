import { expect, Locator, Page } from '@playwright/test';

export class CheckoutOverviewPage {
    readonly page: Page;
    readonly finishButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.finishButton = this.page.getByRole('button', { name: 'Finish' });
    }

    async finishPurchase() {
        await this.finishButton.click();
    }

};