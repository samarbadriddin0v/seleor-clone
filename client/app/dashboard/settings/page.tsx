'use client'

import { updatePassword, updateUser } from '@/actions/user.action'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import useAction from '@/hooks/use-action'
import { toast } from '@/hooks/use-toast'
import { passwordSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import { signOut } from 'next-auth/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const Page = () => {
	const { isLoading, onError, setIsLoading } = useAction()

	const form = useForm<z.infer<typeof passwordSchema>>({
		resolver: zodResolver(passwordSchema),
		defaultValues: { confirmPassword: '', newPassword: '', oldPassword: '' },
	})

	async function onDelete() {
		setIsLoading(true)
		const res = await updateUser({ isDeleted: true, deletedAt: new Date() })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			toast({ description: 'Account deleted successfully' })
			setIsLoading(false)
			signOut({ callbackUrl: '/sign-up' })
		}
	}

	async function onSubmit(values: z.infer<typeof passwordSchema>) {
		setIsLoading(true)
		const res = await updatePassword(values)
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			toast({ description: 'Password updated successfully' })
			setIsLoading(false)
			form.reset()
		}
	}

	return (
		<>
			<h1 className='text-xl font-bold'>Danger zone</h1>
			<Separator className='my-3' />
			<div className='p-4 bg-secondary flex flex-col space-y-0'>
				<div className='text-lg font-bold'>Delete account</div>
				<p className='text-sm text-muted-foreground'>
					Deleting your account will remove all your data from our servers. This action is irreversible.
				</p>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button className='w-fit' size={'sm'} variant={'destructive'}>
							Delete account
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently delete your account and remove your data from our servers.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
							<AlertDialogAction onClick={onDelete} disabled={isLoading}>
								Continue
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>

			<div className='p-4 bg-secondary mt-4'>
				<div className='w-1/2'>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
							<FormField
								control={form.control}
								name='oldPassword'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label>Old password</Label>
										<FormControl>
											<Input placeholder='****' type='password' className='bg-white' {...field} />
										</FormControl>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='newPassword'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label>New password</Label>
										<FormControl>
											<Input placeholder='****' type='password' className='bg-white' {...field} />
										</FormControl>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='confirmPassword'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label>Confirm password</Label>
										<FormControl>
											<Input placeholder='****' type='password' className='bg-white' {...field} />
										</FormControl>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							<Button type='submit'>Submit</Button>
						</form>
					</Form>
				</div>
			</div>
		</>
	)
}

export default Page
