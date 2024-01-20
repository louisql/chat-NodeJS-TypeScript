import { registerUser } from "../controllers/auth";

test('registration should return success message', async() =>{
    const req = {
        body:{
            username: 'testuser',
            email: 'testemail@test.com',
            password: 'testpassword'
        }
    }

    
    const response = await registerUser();
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
}