/// <reference types="cypress" />

import req from '../support/api/requests'
import schemas from '../support/api/schemas'
import assertions from '../support/api/assertions'


context('Booking', () => {
  before(() => {
    req.doAuth()
  });

    it('Validar o contrato do GET Booking @contract', () => {
      req.getBooking().then(getBookingResponse => {
          assertions.validateContractOf(getBookingResponse, schemas.getBookingSchema())
          assertions.validateContractOf(getBookingResponse, schemas.getBookingSchema())
        })          
    });

    it('Criar uma reserva com sucesso @functional', () => {
      req.postBooking().then(postBookingResponse => {
        assertions.shouldHaveStatus(postBookingResponse, 200)
        assertions.shouldBookingIdPresent(postBookingResponse)
        assertions.shouldHaveDefaultHeaders(postBookingResponse)
        assertions.shouldHaveContentTypeAppJson(postBookingResponse)
        assertions.shouldDurationBeFast(postBookingResponse)      

      })      
    });

    it('Tentar alterar uma reserva sem token @functional', () => {
     req.postBooking().then(postBookingResponse => {
     req.updateBookingWithoutToken(postBookingResponse).then(putBookingResponse =>{
       assertions.shouldHaveStatus(putBookingResponse, 403)
     })       
    })
  });

  it('Alterar uma reserva com sucesso @functional', () => {
    req.postBooking().then(postBookingResponse => {
      req.updateBooking(postBookingResponse).then(putBookingResponse => {
        assertions.shouldHaveStatus(putBookingResponse, 200)
      })       
     })
  });


  it('Excluir uma reserva com sucesso @functional', () => {
    req.postBooking().then(postBookingResponse => {
      req.deleteBooking(postBookingResponse).then(deleteBookingResponse => {
        assertions.shouldHaveStatus(deleteBookingResponse, 201)
      })
    }) 
  });


  
  it('Alterar reserva sem token @functional', () => {
    req.postBooking().then(postBookingResponse => {
        req.updateBookingWithoutToken(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 403)
            })
        })
})

it('Alterar um reserva sem sucesso @functional', () => {
    req.postBooking().then(postBookingResponse => {
        req.deleteBookingWithoutToken(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 403)
            })
        })
})


});
