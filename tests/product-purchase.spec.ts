import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { InventoryPage } from '../pages/inventory-page';
import { ShoppingCartPage } from '../pages/shopping-cart-page';
import { CheckoutPage } from '../pages/checkout-page';
import { CheckoutOverviewPage } from '../pages/checkout-overview-page';
import { CheckoutCompletePage } from '../pages/checkout-complete-page';

let users = new Map<string, string>([
  ["standard", "standard_user"],
  ["locked", "locked_out_user"],
  ["problem", "problem_user"],
  ["performance_glitch", "performance_glitch_user"]
]);
const ITEMS = [
  'Sauce Labs Backpack',
  'Sauce Labs Bike Light',
  'Sauce Labs Bolt T-Shirt',
  'Sauce Labs Fleece Jacket',
  'Sauce Labs Onesie',
  'Test.allTheThings() T-Shirt (Red)'
];
const PASSWORD = 'secret_sauce';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
});

test.describe('Swag Labs', () => {
  test('should allow me to purchase a product as logged in user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginWithCredentials(users.get('standard'), PASSWORD);
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemByName(ITEMS[0]);
    await inventoryPage.goToShoppingCart();
    const shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.goToCheckout();
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.enterPersonalInformation('Agustin', 'Joison', '32766');
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await checkoutOverviewPage.finishPurchase();
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await expect(checkoutCompletePage.thankYouMessage).toHaveText('Thank you for your order!');
  });
});