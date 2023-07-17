import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class AnlagevorsclagPage extends BasePage {

    url: string = "https://geldanlage.visualvest.de/questions/new-depot?preserveData=%E2%9C%93";

    //webElements:

    get questionContainer(): Locator {
        return this.page.locator("app-question-content-container");
    }

    get questionTitle(): Locator {
        return this.page.locator('[data-test-id="question-container-container-title"]');
    }

    getButtonByRole(btnName: string): Locator {
        return this.page.getByRole('button', { name: btnName, exact: true })
    }

    get numericInput(): Locator {
        return this.page.locator("[inputmode='numeric']");
    }

    get checkbox() {
        return this.page.locator('[data-test-id="checkbox"]');
    }

    getStrategyBtnByText(text: string): Locator {
        return this.page.locator(`app-investment-strategy-option .button:has-text("${text}")`);
    }

    getNachhaltigKlassichGA(text: string): Locator {
        return this.page.locator(`app-nhpa-selection-box-with-icon:has-text("${text}")`)
            .getByRole('button', { name: "Wählen", exact: true });
    }

    get angebotTitle() {
        return this.page.locator(".selected-portfolio");
    }

    //action methods

    async clickCommonBtnByRole(btnName: string): Promise<void> {
        //const btn = this.page.getByRole('button', { name: btnName });
        const btn = this.getButtonByRole(btnName);
        await btn.scrollIntoViewIfNeeded();
        await btn.click();
        await expect(this.questionTitle).toHaveCount(1);
        await expect(btn).toBeHidden();
    }
}

