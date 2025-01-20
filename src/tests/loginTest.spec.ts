import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";

test("test", async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername("pranav1214@gmail.com");
    await loginPage.fillPassword("tester@007");

    const homePage = await loginPage.clickLoginButton();
    await homePage.expectServiceTitleToBeVisible();
});