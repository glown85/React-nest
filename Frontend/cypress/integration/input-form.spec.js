describe('Input form', () => {
    beforeEach(()=>{
        cy.visit('/')
    })
    // it('focuses input on load', () => {
       
    //     cy.focused()
    //     .should('have.id', 'email')
    // })

    it('accepts input', () =>{
        const typedText = 'emailText'
        cy.get('#email')
        .type(typedText)
        .should('have.value', typedText)

    })

    context('Form submission', () =>{
        it.only('login', () =>{
        const email = 'realname@realemail.com'
        const password = 'password'

        cy.get('#email')
        .type(email)
        cy.get('#password')
        .type(password)
        .type('{enter}')
        cy.url().should('eq', 'http://localhost:3000/home')


        })
    })
})