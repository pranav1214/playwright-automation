import { Page, expect } from "@playwright/test";
import logger from "../utils/LoggerUtil.ts";
import { error } from "console";
import { lang } from "moment-timezone";

export default class ContactPage {
    private readonly contactLink = "Contacts";
    private readonly newButtonLocator = "New";
    private readonly firstNameTextFieldLocator = "First Name";
    private readonly lastNameTextFieldLocator = "Last Name";
    private readonly saveButtonLocator = "Save";
    private readonly contactFullNameLabelLocator = "//span[@class = 'toastMessage slds-text-heading--small forceActionsText']//div";


    constructor(private page: Page) {}

    async createNewContact(fname: string, lname:string){
        await this.page.getByRole("button", { name: this.newButtonLocator }).click();
        logger.info("New button was clicked");
        await this.page.getByPlaceholder(this.firstNameTextFieldLocator).click();
        await this.page.getByPlaceholder(this.firstNameTextFieldLocator).fill(fname);
        logger.info(`First name was filled as ${fname}`);
        await this.page.getByPlaceholder(this.lastNameTextFieldLocator).click();
        await this.page.getByPlaceholder(this.lastNameTextFieldLocator).fill(lname);
        logger.info(`Last name was filled as ${lname}`);
        await this.page.getByRole("button", { name: this.saveButtonLocator, exact: true }).click().catch(( error ) => {
            logger.error(`Error while saving ${error}`);
            throw error;
        }).then(() => logger.info("Save button was clicked"));
    };

    async expectContactLabelContainsFirstNameAndLastName(fname: string, lname: string) {
        await expect(this.page.locator(this.contactFullNameLabelLocator)).toContainText(`${fname} ${lname}`);
        logger.info(`New contact is visible ${fname} ${lname}`);
        await this.page.getByRole("link", {name: this.contactLink}).click();
    }

}