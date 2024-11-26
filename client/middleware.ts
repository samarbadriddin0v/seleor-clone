import { NextRequest, NextResponse } from 'next/server'
import { rateLimiter } from './lib/rate-limiter'

const getClientIp = (req: NextRequest): string => {
	const forwarded = req.headers.get('x-forwarded-for')
	return forwarded?.split(',')[0]?.trim() || 'unknown'
}

export function middleware(req: NextRequest) {
	const ip = getClientIp(req)

	// Check rate limit for this IP
	if (!rateLimiter(ip)) {
		return NextResponse.json({ message: 'Too many requests, please try again later.' }, { status: 429 })
	}

	return NextResponse.next() // Allow the request if under the limit
}

export const config = {
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
