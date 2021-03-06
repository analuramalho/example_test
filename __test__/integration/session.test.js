const request = require('supertest')

const app = require('../../src/app')
const truncate= require('../utils/truncate')
const { User } = require('../../src/app/models')


describe('Authentication',()=>{

    beforeEach( async () => {
         await truncate();
    });

    
    it("should be able to authenticate with valid credential", async ()=> {
        const user = await User.create({
            name:'Ana',
            email:'ana@teste',
            password:'123456'
        });
        const response = await request(app)
            .post("/sessions")
            .send({
                email:user.email,
                password:'123456' 
            });

        expect(response.status).toBe(200)
    });

    it("should not be able to authenticate with valid credential", async ()=> {
        const user = await User.create({
            name:'Ana',
            email:'ana@teste',
            password_hash:'123456'
        });
        const response = await request(app)
            .post("/sessions")
            .send({
                email:user.email,
                password:'123456' 
            });

        expect(response.status).toBe(401);
    });

    it('should return jwt token when authenticated', async()=>{
        const user = await User.create({
            name:'Ana',
            email:'ana@teste',
            password:'123456'
        });
        const response = await request(app)
            .post("/sessions")
            .send({
                email:user.email,
                password:'123456' 
            });

        expect(response.body).toHaveProperty('token');
    })

    it('should be able to access private routes when authenticated', async()=>{
        const user = await User.create({
            name:'Ana',
            email:'ana@teste',
            password:'123456'
        });
        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer ${user.generateToken()}`)
        
        expect(response.status).toBe(200)
    })


    it('should not be able to access private routes when not authenticated', async()=>{
    
        const response = await request(app)
            .get('/dashboard')
        
        expect(response.status).toBe(401)
    })


    it('should not be able to access private routes when not authenticated', async()=>{
    
        const response = await request(app)
            .get('/dashboard')
            .set('Authorization','Bearer 123123')
        
        expect(response.status).toBe(401)
    })
});