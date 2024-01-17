/* eslint-disable no-undef */
const request = require('supertest')

const {server} = require('../../app')

describe('Login user tests', () => {
   it('should return statusCode 201', async () => { 
    
    const testData = {
        email: "test1@mail.com",
        password: "testtest1"
    };
    
    const res = await request(server).post('/api/users/login').send(testData);

    expect(res.statusCode).toBe(200)
    })

    expect(res.body).toEqual(
        expect.objectContaining({
            msg: expect.any(String),
            token: expect.any(String),
            user: expect.any(Object)
        })
    )
  

    afterAll(async () => {
        if(server){
            await server.close();
        }
    })
})