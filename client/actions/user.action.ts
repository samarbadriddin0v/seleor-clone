'use server'

import { axiosClient } from '@/http/axios'
import { authOptions } from '@/lib/auth-options'
import { generateToken } from '@/lib/generate-token'
import { actionClient } from '@/lib/safe-action'
import { idSchema, passwordSchema, searchParamsSchema, updateUserSchema } from '@/lib/validation'
import { ReturnActionType } from '@/types'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

export const getProducts = actionClient.schema(searchParamsSchema).action<ReturnActionType>(async ({ parsedInput }) => {
	const { data } = await axiosClient.get('/api/user/products', {
		params: parsedInput,
	})
	return JSON.parse(JSON.stringify(data))
})

export const getProduct = actionClient.schema(idSchema).action<ReturnActionType>(async ({ parsedInput }) => {
	const { data } = await axiosClient.get(`/api/user/product/${parsedInput.id}`)
	return JSON.parse(JSON.stringify(data))
})

export const getStatistics = actionClient.action<ReturnActionType>(async () => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.get(`/api/user/statistics`, { headers: { Authorization: `Bearer ${token}` } })
	return JSON.parse(JSON.stringify(data))
})

export const getOrders = actionClient.schema(searchParamsSchema).action<ReturnActionType>(async ({ parsedInput }) => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.get('/api/user/orders', {
		headers: { Authorization: `Bearer ${token}` },
		params: parsedInput,
	})
	return JSON.parse(JSON.stringify(data))
})

export const getTransactions = actionClient.schema(searchParamsSchema).action<ReturnActionType>(async ({ parsedInput }) => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.get('/api/user/transactions', {
		headers: { Authorization: `Bearer ${token}` },
		params: parsedInput,
	})
	return JSON.parse(JSON.stringify(data))
})

export const getFavourites = actionClient.schema(searchParamsSchema).action<ReturnActionType>(async ({ parsedInput }) => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.get('/api/user/favorites', {
		headers: { Authorization: `Bearer ${token}` },
		params: parsedInput,
	})
	return JSON.parse(JSON.stringify(data))
})

export const addFavorite = actionClient.schema(idSchema).action<ReturnActionType>(async ({ parsedInput }) => {
	const session = await getServerSession(authOptions)
	if (!session?.currentUser) return { failure: 'You must be logged in to add a favorite' }
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.post(
		'/api/user/add-favorite',
		{ productId: parsedInput.id },
		{ headers: { Authorization: `Bearer ${token}` } }
	)
	return JSON.parse(JSON.stringify(data))
})

export const stripeCheckout = actionClient.schema(idSchema).action<ReturnActionType>(async ({ parsedInput }) => {
	const session = await getServerSession(authOptions)
	if (!session?.currentUser) return { failure: 'You must be logged in to apply for a product' }
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.post(
		'/api/user/stripe/checkout',
		{ productId: parsedInput.id },
		{ headers: { Authorization: `Bearer ${token}` } }
	)
	return JSON.parse(JSON.stringify(data))
})

export const updateUser = actionClient.schema(updateUserSchema).action<ReturnActionType>(async ({ parsedInput }) => {
	const session = await getServerSession(authOptions)
	if (!session?.currentUser) return { failure: 'You must be logged in to update your profile' }
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.put('/api/user/update-profile', parsedInput, {
		headers: { Authorization: `Bearer ${token}` },
	})
	revalidatePath('/dashboard')
	return JSON.parse(JSON.stringify(data))
})

export const updatePassword = actionClient.schema(passwordSchema).action<ReturnActionType>(async ({ parsedInput }) => {
	const session = await getServerSession(authOptions)
	if (!session?.currentUser) return { failure: 'You must be logged in to update your password' }
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.put('/api/user/update-password', parsedInput, {
		headers: { Authorization: `Bearer ${token}` },
	})
	return JSON.parse(JSON.stringify(data))
})

export const deleteFavorite = actionClient.schema(idSchema).action<ReturnActionType>(async ({ parsedInput }) => {
	const session = await getServerSession(authOptions)
	if (!session?.currentUser) return { failure: 'You must be logged in to delete a favorite' }
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.delete(`/api/user/delete-favorite/${parsedInput.id}`, {
		headers: { Authorization: `Bearer ${token}` },
	})
	revalidatePath('/dashboard/watch-list')
	return JSON.parse(JSON.stringify(data))
})
