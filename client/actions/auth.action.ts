'use server'

import { axiosClient } from '@/http/axios'
import { actionClient } from '@/lib/safe-action'
import { loginSchema } from '@/lib/validation'
import { ReturnActionType } from '@/types'

export const login = actionClient.schema(loginSchema).action<ReturnActionType>(async ({ parsedInput }) => {
	const { data } = await axiosClient.post('/api/auth/login', parsedInput)
	return JSON.parse(JSON.stringify(data))
})
