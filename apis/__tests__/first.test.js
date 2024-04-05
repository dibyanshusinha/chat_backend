import request from 'supertest';
import app from '../src/app.js';


describe('GET / ', () => {
    test('It should respond with an array of students', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
});