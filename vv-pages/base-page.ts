import { Page,expect,Locator } from "@playwright/test";

export abstract class BasePage{

    url: string = 'https://www.visualvest.de/';

    page: Page;

    constructor(page: Page){
        this.page = page;
    }

    get cookieDenyBtn(): Locator {
        return this.page.getByTestId('uc-deny-all-button')
    }
    
    get loadSpinner(): Locator {
        return this.page.locator('.loader-spinner');
    }

    async visit(): Promise<void>{
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

}