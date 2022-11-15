import * as mainPage from "../pages/MainPage";

const mp = mainPage
before(() => {
    cy.intercept("POST", Cypress.config().baseUrl + "/calc").as('getRoute');
    cy.visit(Cypress.config().baseUrl)
})

beforeEach(() => {
    mp.clear()
})

describe('I found three possible ways to validate the result of the equations and decided to show all of them', () => {


    it('Validation of mathematical  formula: "4 + 1 = 5" ', function () {
        const expectedResult = 4 + 1
        mp.formula({equation: [mp.elements.four() , mp.elements.plus() , mp.elements.one()]})
        cy.wait('@getRoute').then(interception => {
                const data = interception.response.body
                cy.wrap(data['results']['0']['out']).should('include', expectedResult)
            })
    });


    it('Validation of mathematical  formula: "12 - 6 = 6" with the second possible way - double click on the equal sign', function () {
        const expectedResult = 12 - 6
        mp.formula({equation: [mp.elements.one(), mp.elements.two() , mp.elements.minus() , mp.elements.six()] , doubleClickEqual : true })
        mp.elements.result().invoke('attr', 'title').should("equal", expectedResult.toString())
    });

    it('Validation of mathematical  formula: "(14 - 2) * 2 != 20" with the third option of validation', function () {
        const expectedResult = 20
        mp.formula({equation:
                [
                    mp.elements.left_bracket(),
                    mp.elements.one(),
                    mp.elements.four(),
                    mp.elements.minus(),
                    mp.elements.two(),
                    mp.elements.right_bracket(),
                    mp.elements.multiply(),
                    mp.elements.two(),
                ]})
        selectFromListOfElement({element: mp.elements.history_dropdown(), index: 1}).click()
        cy.get(mp.elements.history_frame_result).invoke('attr', 'title').should("not.equal", expectedResult.toString())
    });

    it(' Validation of mathematical  formula:"sin(30) = 0.5"', function () {
        const expectedResult = Math.round(Math.sin(30 * Math.PI / 180.0) * 10) / 10
       mp.formula({equation: [mp.elements.sinus() , mp.elements.three() , mp.elements.zero() , mp.elements.right_bracket()] , doubleClickEqual : true})
        mp.elements.result().invoke('attr', 'title').should("equal", expectedResult.toString())
    });

    it('Validation of history - will validate more than 4 options in history dropdown because of my solutions', function () {
        selectFromListOfElement({element: mp.elements.history_dropdown(), index: 1}).click()
        mp.elements.history_frame_result().should('have.length.at.least', 4)
    });

    const selectFromListOfElement = ({element, index}) => {
        return element.eq(index)
    }


})