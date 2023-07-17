import { expect, test, Page } from '@playwright/test';
import { HomePage } from '../vv-pages/home-page';
import { AnlagevorsclagPage } from '../vv-pages/anlagevorschlag-page';


test.describe('anlage feature file', () => {

    test.only('anlage scenario', async ({ page, context }) => {

        const homePage = new HomePage(page);
        await homePage.visit();

        await homePage.cookieDenyBtn.click();

        const pagePromise = context.waitForEvent('page');

        await homePage.anlagevorschlagBtn.click();

        const newPage = await pagePromise;
        await newPage.waitForLoadState();

        const avPage = new AnlagevorsclagPage(newPage);

        const questionContainer = avPage.questionContainer;
        await expect(questionContainer).toBeVisible();


        let questionTitle = 'Für wen möchtest du anlegen?'
        await expect(avPage.questionTitle).toContainText(questionTitle);
        await avPage.clickCommonBtnByRole('Für mich');

        questionTitle = 'Welcher Altersgruppe gehörst du an?'
        await expect(avPage.questionTitle).toContainText(questionTitle);
        await avPage.clickCommonBtnByRole('18 - 34 Jahre')

        questionTitle = 'Welcher Betrag steht dir monatlich zur freien Verfügung, sobald alle Rechnungen beglichen sind?'
        await expect(avPage.questionTitle).toContainText(questionTitle);
        await avPage.clickCommonBtnByRole('weniger als 100 €');


        questionTitle = 'Wie möchtest du dein frei verfügbares Geld anlegen?'
        await expect(avPage.questionTitle).toContainText(questionTitle);
        await avPage.getButtonByRole('monatlich').click();
        await avPage.numericInput.fill('25');
        await avPage.clickCommonBtnByRole('Weiter');

        questionTitle = 'Wie lange möchtest du dein Geld im Rahmen dieser Geldanlage voraussichtlich anlegen?'
        await expect(avPage.questionTitle).toContainText(questionTitle);
        await avPage.clickCommonBtnByRole('3 bis 5 Jahre')

        questionTitle = 'Willst du bei dieser Geldanlage ein Sparziel erreichen? (optional)'
        await expect(avPage.questionTitle).toContainText(questionTitle);
        await avPage.clickCommonBtnByRole('Überspringen')

        questionTitle = "Bitte nutze die Informationsbroschüre, um dich mit möglichen Chancen und Risiken bei der Geldanlage in Investmentfonds und den Informationen zur Geldanlage in der Vermögensverwaltung vertraut zu machen.";
        await expect(avPage.questionTitle).toContainText(questionTitle);

        const bestätigungCheckbox = avPage.checkbox;
        await expect(bestätigungCheckbox).toBeVisible();
        await bestätigungCheckbox.click();
        await avPage.clickCommonBtnByRole('Weiter')

        questionTitle = "Hast du bereits Geschäfte mit Investmentfonds getätigt oder Vermögens­verwaltungs­dienstleistungen bezogen?";
        await expect(avPage.questionTitle).toContainText(questionTitle);

        const jaButton = newPage.locator('[data-test-id="experience_option_1"]');
        await expect(jaButton).toBeVisible();
        await jaButton.click();
        await expect(jaButton).toBeHidden();

        questionTitle = "Machen dich im Rahmen dieser Geldanlage größere Kursschwankungen mit eventuell zwischenzeitlichen Verlusten nervös?";
        await expect(avPage.questionTitle).toContainText(questionTitle);

        const jaButton2 = newPage.locator('[data-test-id="loss_readiness_option_1"]');
        await expect(jaButton2).toBeVisible();
        await jaButton2.click();
        await expect(jaButton2).toBeHidden();

        questionTitle = "Willst du bei dieser Geldanlage einen hohen Gewinn erwirtschaften und gehst deshalb auch höhere Risiken ein?";
        await expect(avPage.questionTitle).toContainText(questionTitle);

        const jaButton3 = newPage.locator('[data-test-id="risk_readiness_option_1"]');
        await expect(jaButton3).toBeVisible();
        await jaButton3.click();
        await expect(jaButton3).toBeHidden();


        questionTitle = "Beispiel: Du legst ein Portfolio mit 1.000 € an.";
        await expect(avPage.questionTitle).toContainText(questionTitle);
        const strategie1 = avPage.getStrategyBtnByText("Strategie 1");
        await expect(strategie1).toBeVisible();
        await strategie1.click();
        await expect(strategie1).toBeHidden();

        questionTitle = "Deine Antworten auf die Fragen zu deiner Risikoneigung sind widersprüchlich.";
        await expect(avPage.questionTitle).toContainText(questionTitle);
        await avPage.clickCommonBtnByRole('Bestätigen und fortfahren');

        questionTitle = "Wir haben für deine Geldanlage folgendes Chance-/ Risikoprofil ermittelt:";
        await expect(avPage.questionTitle).toContainText(questionTitle);
        await avPage.clickCommonBtnByRole('Weiter');

        questionTitle = "Möchtest du klassisch oder nachhaltig Geld anlegen?";
        await expect(avPage.questionTitle).toContainText(questionTitle);

        const klassischGeldButton = avPage.getNachhaltigKlassichGA("Klassisch");
        await expect(klassischGeldButton).toBeVisible();
        await klassischGeldButton.click();
        await expect(klassischGeldButton).toBeHidden();

        const angebotTitle = "VestFolio 3";
        await expect(avPage.angebotTitle).toContainText(angebotTitle);

        const jetztAnlagenButton = avPage.getButtonByRole("Jetzt anlegen")
        await expect(jetztAnlagenButton).toBeEnabled();

    })

});

