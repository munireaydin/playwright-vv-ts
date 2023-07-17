import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class HomePage extends BasePage{

    url: string = 'https://www.visualvest.de/'

    // Web Elments
   

    get anlagevorschlagBtn(): Locator {
        return this.page.locator('//a[@headline=\'Kostenlos loslegen\']');
    }
}