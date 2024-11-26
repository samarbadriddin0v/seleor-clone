type RateLimitEntry = {
	timestamps: number[]
}

const rateLimitMap = new Map<string, RateLimitEntry>()
const WINDOW_SIZE_IN_SECONDS = 60 // 1-minute window
const MAX_REQUESTS = 300 // Allow 10 requests per IP per window

export function rateLimiter(ip: string): boolean {
	const currentTime = Math.floor(Date.now() / 1000) // Current time in seconds

	// Get the existing entry or create a new one
	const entry = rateLimitMap.get(ip) || { timestamps: [] }

	// Filter timestamps to keep only those within the current time window
	entry.timestamps = entry.timestamps.filter(timestamp => timestamp > currentTime - WINDOW_SIZE_IN_SECONDS)

	// Add the current request's timestamp
	entry.timestamps.push(currentTime)

	// Save back to the map
	rateLimitMap.set(ip, entry)

	// Check if the number of requests exceeds the limit
	return entry.timestamps.length <= MAX_REQUESTS
}
