var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var urlBase = "http://localhost:3000/api";

const UserService = require('../app/services/UserService.js');

describe("Teste API magicthegathering.io",function(){
    console.log(UserService.first());

    it("Deve receber 100 cartas",async (done) =>{
        request.get(
            {
                url : urlBase + "/auth"
            },
            function(error, response, body){

                console.log(error);

                var _body = {};
                try{
                _body = JSON.parse(body);
                }
                catch(e){
                _body = {};
                }

                expect(response.statusCode).to.equal(200);

                // //  verificamos se retornou a propriedade 
                // if( _body.should.have.property('cards') ){
                //   expect(_body.cards).to.have.lengthOf.at.most(100);
                // }

                done(); // avisamos o test runner que acabamos a validacao e ja pode proseeguir
            }
        );
    });
});