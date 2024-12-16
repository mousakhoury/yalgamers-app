import { z } from "zod";

export const loginSchema = z.object({
    email: z.string({ required_error: "email is required" }).email({ message: "Email must be a valid email" }),
    password: z.string({ required_error: "password is required" })
})

export const signUpSchema = z.object({
    name: z.string({ required_error: 'name is required' }),
    username: z.string({ required_error: 'username is required' }),
    email: z.string({ required_error: "email is required" }).email({ message: "invalid email" }),
    password: z.string({ required_error: "password is required" }),
    passwordConfirm: z.string({ required_error: "confirm password is required" })
})