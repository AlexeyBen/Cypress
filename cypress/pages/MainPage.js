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

    formula = ({equation, doubleClickEqual = false}) => {
        equation.forEach(element => {
            element.click()
        })
        doubleClickEqual ? this.elements.equal().dblclick() : this.elements.equal().click()
    }
}

module.exports = new MainPage()
