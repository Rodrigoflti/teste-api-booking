/// <reference types="cypress" />

import req from '../support/api/requests'  //importando do diretorio api 
import assertions from '../support/api/assertions' 

context('Ping', () => {
    it('Validar que a aplicação está no ar @healthcheck', () => {
        
        req.getPing().then(getPingResponse =>{
            assertions.shouldHaveStatus(getPingResponse, 201)
        }) 
    });
});