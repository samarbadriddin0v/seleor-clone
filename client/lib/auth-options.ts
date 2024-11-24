import { axiosClient } from '@/http/axios'
import { ReturnActionType } from '@/types'
import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: { userId: { label: 'User ID', type: 'text' } },
			async authorize(credentials) {
				const { data } = await axiosClient.get<ReturnActionType>(`/api/user/profile/${credentials?.userId}`)
				return JSON.parse(JSON.stringify({ email: data.user.email, name: data.user._id }))
			},
		}),
	],
	callbacks: {
		async session({ session }) {
			const { data } = await axiosClient.get<ReturnActionType>(`/api/user/profile/${session.user?.name}`)
			session.currentUser = data.user
			return session
		},
	},
	session: { strategy: 'jwt' },
	jwt: { secret: process.env.NEXT_PUBLIC_JWT_SECRET },
	secret: process.env.NEXT_AUTH_SECRET,
}
