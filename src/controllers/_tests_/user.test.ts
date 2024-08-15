import { describe, it, expect, jest } from "@jest/globals";
import { Request, Response } from "express";
import * as user from '../user';

describe('user controller', () => {
    it('it should create a new User', async () => {
        const req = {
            body: { userName: 'hello', password: 'hi' }
        } as Partial<Request>;

        const res = {
            json: jest.fn()
        } as Partial<Response>;

        await user.createNew(req as Request, res as Response, () => {});

        // Validate that the json method was called with an object that contains a token
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ token: expect.any(String) })
        );
    });
});
