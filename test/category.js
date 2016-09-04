var should=require("chai").should();
var expect=require("chai").expect;
var supertest=require("supertest");
var api=supertest("http://localhost:3000");
var _ = require('lodash-node');

describe("Category",function(){

     var category="shirt"+Date.now();

  it("should create a category and return the value",function(done){

        api.post("/catalog/createCategory")
        .set("Accept","application/json")
        .send({ "name":category,
               "storeid":"a",
               "parent":"/"

})

        .expect(200)
        .end(function(err,res){



  expect(res.body.name).to.equal(category);





          done();

        })



      })


  it("should no create a category when parent does not exist",function(done){

        api.post("/catalog/createCategory")
        .set("Accept","application/json")
        .send({ "name":category,
               "storeid":"a",
               "parent":"/9999999999999999999999999/"

})

        .expect(200)
        .end(function(err,res){



  expect(res.body.excpcode).to.equal("PC001");





          done();

        })



      })







})
