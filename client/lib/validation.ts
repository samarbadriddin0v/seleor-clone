import { z } from 'zod'

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
})

export const registerSchema = z.object({
	fullName: z.string().min(3, { message: 'Full name must be at least 3 characters' }),
	email: z.string().email({ message: 'Invalid email' }),
	password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
})
