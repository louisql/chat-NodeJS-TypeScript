import { registerUser } from "../controllers/auth";

test('registration should return success message', async() =>{
    const req: any = {
        body:{
            username: 'testuser',
            email: 'testemail@test.com',
            password: 'testpassword'
        }
    } as unknown as Request

    const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    } as unknown as Response;
    
    // Call the registerUser function with the mocked objects
    await registerUser(req, res);

    // Perform assertions on the response object
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'User registered successfully' });
});