class MainPage {
    elements = {
        zero: () => cy.get('#Btn0'),
        one: () => cy.get('#Btn1'),
        two: () => cy.get('#Btn2'),
        three: () => cy.get('#Btn3'),
        four: () => cy.get('#Btn4'),
        six: () => cy.get('#Btn6'),
        plus: () => cy.get('#BtnPlus'),
        minus: () => cy.get('#BtnMinus'),
        equal: () => cy.get('#BtnCalc'),
        multiply: () => cy.get('#BtnMult'),
        history_frame_result: () => cy.get('#histframe > ul > li > p'),
        history_dropdown: () => cy.get('#hist > button'),
        history_frame_lines: () => cy.get('#histframe > ul > li'),
        result: () => cy.get('#result'),
        left_bracket: () => cy.get('#BtnParanL'),
        right_bracket: () => cy.get('#BtnParanR'),
        sinus: () => cy.get('#BtnSin'),
        clearBtn: () => cy.get('#BtnClear'),
    }


    clear = () => {
        this.elements.clearBtn().click()
    }

    plusFunc = ({num1, num2} , doubleClickEqual = false) => {
        num1.click()
        this.elements.plus().click()
        num2.click()
        doubleClickEqual ? this.elements.equal().dblclick() : this.elements.equal().click()
    }



    minusFunc = ({num1, num2},doubleClickEqual = false ) => {
        num1.click()
        this.elements.minus().click()
        num2.click()
        doubleClickEqual ? this.elements.equal().dblclick() : this.elements.equal().click()
    }


    formula = ({equation , doubleClickEqual = false}) => {
        equation.forEach( element => {
            element.click()
        })
        doubleClickEqual ? this.elements.equal().dblclick() : this.elements.equal().click()
    }
    // // no need to provide the equal sign as part of the formula array.
    // inputFormulaWithInterception = ({formula}, {requestType, requestUrl, expectedResult}) => {
    // formula.forEach( arrayElement => {
    //     console.log(arrayElement)
    //     this.elements['four'].click()
    // })
    // // for (let i = 0; i < formula.length; i++) {
    // //     this.elements[formula[i]].click()
    // // }
    // cy.intercept(requestType, Cypress.config().baseUrl + requestUrl).as('getRoute');
    // this.elements.equal.click()
    // cy.wait('@getRoute').then(interception => {
    //     const data = interception.response.body
    //     cy.wrap(data['results']['0']['out']).should('include', expectedResult)
    // })

}

module.exports = new MainPage()
