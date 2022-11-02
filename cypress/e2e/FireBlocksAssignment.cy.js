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
        cy.get(calc.numbers.four).click()
        cy.get(calc.operators.plus).click()
        cy.get(calc.numbers.one).click()
        cy.intercept('POST', Cypress.config().baseUrl + "/calc").as('getRoute');
        cy.get(calc.operators.equal).click()
        cy.wait('@getRoute').then(interception => {
            const data = interception.response.body
            cy.wrap(data['results']['0']['out']).should('include', expectedResult)
        })
    });


    it('Validation of mathematical  formula: "12 - 6 = 6" with the second possible way - double click on the equal sign', function () {
        const expectedResult = 12 - 6
        cy.get(calc.numbers.one).click()
        cy.get(calc.numbers.two).click()
        cy.get(calc.operators.minus).click()
        cy.get(calc.numbers.six).click()
        cy.get(calc.operators.equal).dblclick()
        cy.get(calc.result).invoke('attr', 'title').should("equal", expectedResult.toString())
    });

    it('Validation of mathematical  formula: "(14 - 2) * 2 != 20" with the third option of validation', function () {
        const expectedResult = 20
        cy.get(calc.left_bracket).click()
        cy.get(calc.numbers.one).click()
        cy.get(calc.numbers.four).click()
        cy.get(calc.operators.minus).click()
        cy.get(calc.numbers.two).click()
        cy.get(calc.right_bracket).click()
        cy.get(calc.operators.multiply).click()
        cy.get(calc.numbers.two).click()
        cy.get(calc.operators.equal).click()
        selectFromListOfElement({element : calc.history.history_dropdown , index: 1}).click()
        cy.get(calc.history.history_frame_result).invoke('attr' , 'title').should("not.equal", expectedResult.toString())

    });

    it(' Validation of mathematical  formula:"sin(30) = 0.5"', function () {
        const expectedResult = Math.round(Math.sin(30 * Math.PI / 180.0)*10)/10
        cy.get(calc.sinus).click()
        cy.get(calc.numbers.three).click()
        cy.get(calc.numbers.zero).click()
        cy.get(calc.right_bracket).click()
        cy.get(calc.operators.equal).dblclick()
        cy.get(calc.result).invoke('attr', 'title').should("equal", expectedResult.toString())
    });

    it('Validation of history - will validate more than 4 options in history dropdown because of my solutions', function () {
        selectFromListOfElement({element : calc.history.history_dropdown , index: 1}).click()
        cy.get(calc.history.history_frame_result).should('have.length.at.least' , 4)

    });


    const selectFromListOfElement = ({element , index}) => {
         return cy.get(element).eq(index)
    }
})