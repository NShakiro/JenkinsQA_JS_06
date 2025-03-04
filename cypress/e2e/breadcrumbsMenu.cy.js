/// <reference types="cypress" />

import homePage from "../fixtures/homePage.json"
describe('Breadcrumbs',()=>{
    
  const pagesName =['New Item', 'People', 'Build History', 'Manage Jenkins', 'My Views']
  const endPointUrl = ['/all/newJob', '/asynchPeople/', '/builds' ,'/manage/', '/my-views/view/all/']
  const text = "Jenkins project"
  const text2 = "Jenkins project in progress"

    it('AT_04.02_001 |Dashboard is displayed on every page and user is able to go back to Home page', ()=>{
   
             pagesName.forEach(page =>{
            cy.contains(page).click()
            cy.get('#breadcrumbs li>a').first().should('have.text', 'Dashboard').and('be.visible')
            cy.get('.jenkins-breadcrumbs__list-item a[href="/"]').click()
            cy.get('div[class="empty-state-block"] h1').should('have.text', 'Welcome to Jenkins!')
         })
       })

       it('AT_04.02_002 |Dashbord has a dropdown menu and  it is clickable', () => {
        
        cy.get('.jenkins-breadcrumbs__list-item button[class="jenkins-menu-dropdown-chevron"]').realHover().realClick()
        cy.get('#breadcrumb-menu > div.bd > ul>li>a>span').should('be.visible').and('have.length', 5)
           .each((el, index) => {
              expect(el.text()).to.equal(pagesName[index])
           })
  
        pagesName.forEach((page ,index) => {
           cy.contains(page).click()
           cy.url().should('include', endPointUrl[index])
           cy.go('back')
        })
     })

     it('AT_02.06_002 |Homepage (Dashboard) User is able to add and edit the text in the panel description', () => {
      cy.get('#description-link').should('be.visible').click()
      cy.get('textarea[name="description"]').clear().type(text).should('have.value', text)
      cy.get('button[name="Submit"]').click()
      cy.get('a[href="editDescription"]').click()
      cy.get('textarea[name="description"]').clear().type(text2).should('have.value', text2)
      cy.get('button[name="Submit"]').click()
   })

   it('AT_04.02_003 | <Breadcrumbs> Dashboard page link > Dropdown menu has subfolders of the Dashboard page', () => {
      
      cy.get('.jenkins-breadcrumbs__list-item [href="/"]').realHover();
      cy.get('[href="/"] .jenkins-menu-dropdown-chevron').should('be.visible').click();

      cy.get('#breadcrumb-menu>.bd>ul>li').should('be.visible')
         .and('have.length', homePage.dashboardDropdownItems.length);
      cy.get('#breadcrumb-menu>.bd>ul>li').each(($el, idx) => {        
         expect($el.text()).contain(homePage.dashboardDropdownItems[idx]);
      })
   })
   
   it('AT_04.02.004 | <Breadcrumbs> Dashboard page link > Clicking on the dropdown menu items should navigate to the corresponding folder page', () => {
      function clickBreadcrumbsDropdownItems(idx) {          
            cy.get('.jenkins-breadcrumbs__list-item [href="/"]').realHover();
            cy.get('[href="/"] .jenkins-menu-dropdown-chevron').click();
            cy.get(`#breadcrumb-menu>.bd>ul>li:nth-child(${idx})`).click();           
      }

      let idx = 1  
      while(idx <= homePage.endPointUrl.length)  {
         clickBreadcrumbsDropdownItems(idx);
         cy.url().should('include', homePage.endPointUrl[idx - 1]);
         idx++;
      }           
   })

})