import * as calc from "../fixtures/mainPage.json"

before(() => {
    cy.visit(Cypress.config().baseUrl)
})

beforeEach(() => {
    cy.get(calc.clear).click()
})

describe('Alexey Ben`s home assignment from fireblocks. I found three possible ways to validate the result of the equations and decided to show all of them', () => {
    it('Validation of mathematical  formula: "4 + 1 = 5" ', function () {
        const expectedResult = 4 + 1
        inputFormulaWithInterception(["four", "plus", "one"], {
            requestType: "POST",
            requestUrl: "/calc",
            expectedResult
        })
    });


    it('Validation of mathematical  formula: "12 - 6 = 6" with the second possible way - double click on the equal sign', function () {
        const expectedResult = 12 - 6
        inputFormula(["one", "two", "minus", "six"], true)
        cy.get(calc.result).invoke('attr', 'title').should("equal", expectedResult.toString())
    });

    it('Validation of mathematical  formula: "(14 - 2) * 2 != 20" with the third option of validation', function () {
        const expectedResult = 20
        inputFormula(["left_bracket", "one", "four", "minus", "two", "right_bracket", "multiply", "two"])
        selectFromListOfElement({element: calc.history_dropdown, index: 1}).click()
        cy.get(calc.history_frame_result).invoke('attr', 'title').should("not.equal", expectedResult.toString())
    });

    it(' Validation of mathematical  formula:"sin(30) = 0.5"', function () {
        const expectedResult = Math.round(Math.sin(30 * Math.PI / 180.0) * 10) / 10
        inputFormula(["sinus", "three", "zero", "right_bracket"], true)
        cy.get(calc.result).invoke('attr', 'title').should("equal", expectedResult.toString())
    });

    it('Validation of history - will validate more than 4 options in history dropdown because of my solutions', function () {
        selectFromListOfElement({element: calc.history_dropdown, index: 1}).click()
        cy.get(calc.history_frame_result).should('have.length.at.least', 4)
    });

    const selectFromListOfElement = ({element, index}) => {
        return cy.get(element).eq(index)
    }

    // no need to provide the equal sign as part of the formula array.
    const inputFormula = (formula, doubleClickOnEqual = false) => {
        for (let i = 0; i < formula.length; i++) {
            cy.get(calc[formula[i]]).click()
        }
        doubleClickOnEqual ? cy.get(calc.equal).dblclick() : cy.get(calc.equal).click()
    }

    // no need to provide the equal sign as part of the formula array.
    const inputFormulaWithInterception = (formula, {requestType, requestUrl, expectedResult}) => {
        for (let i = 0; i < formula.length; i++) {
            cy.get(calc[formula[i]]).click()
        }
        cy.intercept(requestType, Cypress.config().baseUrl + requestUrl).as('getRoute');
        cy.get(calc.equal).click()
        cy.wait('@getRoute').then(interception => {
            const data = interception.response.body
            cy.wrap(data['results']['0']['out']).should('include', expectedResult)
        })
    }
})