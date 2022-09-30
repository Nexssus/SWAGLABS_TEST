const webdriver = require('selenium-webdriver');
const { By, Key, until } = require('selenium-webdriver')

const chai = require('chai');
const { it } = require('mocha');
const assert = chai.assert;
const expect = chai.expect;

describe('swagLabs', function() {
    let driver;

    before(function() {
        driver = new webdriver.Builder().forBrowser('chrome').build();
    });

    after(async function() {
        await driver.quit();
    });

    beforeEach(async function() {
        // Pokrece se pre svakog testa
    });

    afterEach(async function() {
        // Pokrece se nakon svakog testa
    });

    it("Verify hompage is open", async function(){
        await driver.get('https://www.saucedemo.com/');
        expect(await driver.getCurrentUrl()).to.eq('https://www.saucedemo.com/');
    });

    it("Login with standard_user", async function(){
        const user = await driver.findElement(By.id('user-name'));
        user.sendKeys('standard_user');
        const password = await driver.findElement(By.id('password'));
        password.sendKeys('secret_sauce'); 
        const loginButton = await driver.findElement(By.id('login-button'));
        await loginButton.click();
        expect(await driver.getCurrentUrl()).to.eq('https://www.saucedemo.com/inventory.html');       
    });

    it("View first product before purchasing", async function(){
        const product1 = await driver.findElement(By.linkText('Sauce Labs Backpack'));
        await product1.click();
        expect(await driver.getCurrentUrl('https://www.saucedemo.com/inventory-item.html?id=4'));
        await driver.sleep(3000);
        const backTP = await driver.findElement(By.id('back-to-products'));
        await backTP.click();
        expect(await driver.getCurrentUrl()).to.eq('https://www.saucedemo.com/inventory.html');
        await driver.sleep(3000);
    });

    it("View second product before purchasing", async function(){
        const product2 = await driver.findElement(By.linkText('Sauce Labs Bolt T-Shirt'));
        await product2.click();
        expect(await driver.getCurrentUrl()).to.eq('https://www.saucedemo.com/inventory-item.html?id=1');
        await driver.sleep(3000);
        const backTP = await driver.findElement(By.id('back-to-products'));
        await backTP.click();
        expect(await driver.getCurrentUrl()).to.eq('https://www.saucedemo.com/inventory.html');
        await driver.sleep(3000);
    });

    it("View third product before purchasing", async function(){
        const product3 = await driver.findElement(By.linkText('Sauce Labs Onesie'));
        await product3.click();
        expect(await driver.getCurrentUrl()).to.eq('https://www.saucedemo.com/inventory-item.html?id=2');
        await driver.sleep(3000);
        const backTP = await driver.findElement(By.id('back-to-products'));
        await backTP.click();
        expect(await driver.getCurrentUrl()).to.eq('https://www.saucedemo.com/inventory.html');
        await driver.sleep(3000);
    });

    it("View fourth product before purchasing", async function(){
        const product4 = await driver.findElement(By.linkText('Sauce Labs Bike Light'));
        await product4.click();
        expect(await driver.getCurrentUrl()).to.eq('https://www.saucedemo.com/inventory-item.html?id=0');
        await driver.sleep(3000);
        const backTP = await driver.findElement(By.id('back-to-products'));
        await backTP.click();
        expect(await driver.getCurrentUrl()).to.eq('https://www.saucedemo.com/inventory.html');
        await driver.sleep(3000);
    });

    it("View fifth product before purchasing", async function(){
        const product5 = await driver.findElement(By.linkText('Sauce Labs Fleece Jacket'));
        await product5.click();
        expect(await driver.getCurrentUrl()).to.eq('https://www.saucedemo.com/inventory-item.html?id=5');
        await driver.sleep(3000);
        const backTP = await driver.findElement(By.id('back-to-products'));
        await backTP.click();
        expect(await driver.getCurrentUrl()).to.eq('https://www.saucedemo.com/inventory.html');
        await driver.sleep(3000);
    });

    it("View sixth product before purchasing", async function(){
        const product6 = await driver.findElement(By.linkText('Test.allTheThings() T-Shirt (Red)'));
        await product6.click();
        expect(await driver.getCurrentUrl()).to.eq('https://www.saucedemo.com/inventory-item.html?id=3');
        await driver.sleep(3000);
        const backTP = await driver.findElement(By.id('back-to-products'));
        await backTP.click();
        expect(await driver.getCurrentUrl()).to.eq('https://www.saucedemo.com/inventory.html');
        await driver.sleep(3000);
    });

    it("Add products to the cart", async function(){
        const product1 = await driver.findElement(By.id('add-to-cart-sauce-labs-backpack'));
        await product1.click();
        expect(await driver.findElement(By.id('remove-sauce-labs-backpack')).getText()).to.contain('REMOVE');
        await driver.sleep(3000);

        const product4 = await driver.findElement(By.id('add-to-cart-sauce-labs-bike-light'));
        await product4.click();
        expect(await driver.findElement(By.id('remove-sauce-labs-bike-light')).getText()).to.contain('REMOVE');
        await driver.sleep(3000);

        const product6 = await driver.findElement(By.id('add-to-cart-test.allthethings()-t-shirt-(red)'));
        await product6.click();
        expect(await driver.findElement(By.id('remove-test.allthethings()-t-shirt-(red)')).getText()).to.contain('REMOVE');
        await driver.sleep(3000);
    });

    it("View shopping cart", async function(){
        const cart = await driver.findElement(By.className('shopping_cart_link'));
        await cart.click();
        expect(await driver.findElement(By.className('title')).getText()).to.contain('YOUR CART');
        await driver.sleep(3000);
    });

    it("Remove item from shopping cart and add another item", async function(){
        const remove = await driver.findElement(By.id('remove-test.allthethings()-t-shirt-(red)'));
        await remove.click();
        const buttonContinueShopping = await driver.findElement(By.id('continue-shopping'));
        await buttonContinueShopping.click();
        expect(await driver.findElement(By.id('add-to-cart-test.allthethings()-t-shirt-(red)')).getText()).
            to.contain('ADD TO CART');
            await driver.sleep(3000);

        const product3 = await driver.findElement(By.id('add-to-cart-sauce-labs-onesie'));
        await product3.click();
        expect(await driver.findElement(By.id('remove-sauce-labs-onesie')).getText()).to.contain('REMOVE');
        await driver.sleep(3000);
    });

    it("View shopping cart", async function(){
        const cart = await driver.findElement(By.className('shopping_cart_link'));
        await cart.click();
        expect(await driver.findElement(By.className('title')).getText()).to.contain('YOUR CART');
        await driver.sleep(3000);
    });

    it("Proceed to checkout, try cancel button", async function(){
        const checkout = await driver.findElement(By.id('checkout'));
        await checkout.click();
        expect(await driver.findElement(By.className('title')).getText()).to .contain('CHECKOUT: YOUR INFORMATION');
        await driver.sleep(3000);

        const cancelBtn = await driver.findElement(By.id('cancel'));
        await cancelBtn.click();
        expect(await driver.findElement(By.className('title')).getText()).to.contain('YOUR CART');
        await driver.sleep(3000);
    });

    it("Fill in the form to buy an items", async function(){
        const checkout = await driver.findElement(By.id('checkout'));
        await checkout.click();
        expect(await driver.findElement(By.className('title')).getText()).to .contain('CHECKOUT: YOUR INFORMATION');
        await driver.sleep(3000);

        const firstName = await driver.findElement(By.id('first-name'));
        firstName.sendKeys('Negovan');
        const lastName = await driver.findElement(By.id('last-name'));
        lastName.sendKeys('Milenkovic');
        const zipCode = await driver.findElement(By.id('postal-code'));
        zipCode.sendKeys('11060');
        const buttonContinue = await driver.findElement(By.id('continue'));
        await buttonContinue.click();
        expect(await driver.findElement(By.className('title')).getText()).to.contain('CHECKOUT: OVERVIEW');
        await driver.sleep(3000);

    });

    it("End of purchase", async function(){
        const finish = await driver.findElement(By.id('finish'));
        await finish.click();
        expect(await driver.findElement(By.className('title')).getText()).to.contain('CHECKOUT: COMPLETE!');
        await driver.sleep(3000);
    })

});    