/// <reference types='cypress'/>
import { iconLegends } from '../fixtures/iconLegends.json'

describe('Verify <Dashboard>Icon legend', () => {
    beforeEach('Create Project', function () {
        cy.get('a[href="newJob"]').click()
        cy.get('input#name').type('TestProject')
        cy.get('li[tabindex="0"] span').contains('Freestyle project').click()
        cy.get('#ok-button').click()
        cy.get(':nth-child(1) > .model-link').click()
        
    });
    it('AT_TC_20.05_001 | Verify <Dashboard>Icon legend',() => {
        cy.get('a[href="/legend"]')
        .should('be.visible')
        .click()
        cy.url().should('equal','http://localhost:8080/legend')
    })
   
    it('Click on Icon legend via Dashboard', function () {

        cy.get('.jenkins-button[href="/legend"]').click()
        cy.url().should('contain', '/legend')

      });

    it('Verify number of Icon legend', () => {
        cy.get('#rss-bar .jenkins-button').contains('Icon legend').click()
        cy.get('#main-panel > .app-icon-legend dt').should('have.length', iconLegends.length)
    })

 })