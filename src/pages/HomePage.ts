import { Page, expect } from "@playwright/test";
import logger from "../utils/LoggerUtil.ts";

export default class HomePage {

    private readonly serviceTitleLocator = "Service";
    private readonly menuClick = ".slds-icon-waffle";
    private readonly serviceMenu = "(//div[@class = 'slds-size_small'])[1][1]";

    constructor(private page: Page) {

    }

    async expectServiceTitleToBeVisible() {
        await this.page.locator(this.menuClick).click();
        await this.page.locator(this.serviceMenu).click();
        await expect(this.page.getByTitle(this.serviceTitleLocator)).toBeVisible({ 
            timeout: 15000,
        }).catch((error) => {
            logger.error(`Error clicking login button: ${error}`);
            throw error;
        }).then(() => logger.info("Service title is visible"));
    }
}