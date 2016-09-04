var should=require("chai").should();
var expect=require("chai").expect;
var supertest=require("supertest");
var api=supertest("http://localhost:3000");

describe("Store",function(){
    var  storeName=Date.now()+"test";

  it("should return store detail after it is created",function(done){

        api.post("/store/registerStore")
        .set("Accept","application/json")
        .send({
            storename:storeName,
            owneremail:storeName+"@gmail.com",
             password:"test"

          })

        .expect(200)
        .end(function(err,res){

          expect(res.body.storename).to.equal(storeName);
          expect(res.body.owneremail).to.equal(storeName+"@gmail.com");
          done();

        })



      })

   it("It shoud not allow duplicate email",function(done){

        api.post("/store/registerStore")
        .set("Accept","application/json")
        .send({
            storename:storeName+"dup",
            owneremail:storeName+"@gmail.com",
             password:"test"

          })

        .expect(200)
        .end(function(err,res){

          expect(res.body.excpcode).to.equal("S001");

          done();

        })



      })

   it("It shoud not allow duplicate storename",function(done){

        api.post("/store/registerStore")
        .set("Accept","application/json")
        .send({
            storename:storeName,
            owneremail:storeName+"@gmail.comdup",
             password:"test"

          })

        .expect(200)
        .end(function(err,res){

          expect(res.body.excpcode).to.equal("S000");

          done();

        })



      })

   it("Invalid email",function(done){

        api.post("/store/storeAdminAuthentication")
        .set("Accept","application/json")
        .send({
            owneremail:storeName+"@gmail.comdup",
             password:"test"

          })

        .expect(200)
        .end(function(err,res){

          expect(res.body.excpcode).to.equal("S002");

          done();

        })



      })

it("invalid password",function(done){

        api.post("/store/storeAdminAuthentication")
        .set("Accept","application/json")
        .send({
            storename:storeName,
            owneremail:storeName+"@gmail.com",
             password:"test1"

          })

        .expect(200)
        .end(function(err,res){

          expect(res.body.excpcode).to.equal("S003");

          done();

        })



      })


it("Sucessfull login",function(done){

        api.post("/store/storeAdminAuthentication")
        .set("Accept","application/json")
        .send({
            storename:storeName,
            owneremail:storeName+"@gmail.com",
             password:"test"

          })

        .expect(200)
        .end(function(err,res){

          expect(res.body.owneremail).to.equal(storeName+"@gmail.com");

          done();

        })



      })














})
