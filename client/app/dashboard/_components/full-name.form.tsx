'use client'

import { updateUser } from '@/actions/user.action'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useAction from '@/hooks/use-action'
import { toast } from '@/hooks/use-toast'
import { fullNameSchema } from '@/lib/validation'
import { IUser } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface Props {
	user: IUser
}
const FullNameForm: FC<Props> = ({ user }) => {
	const { update } = useSession()
	const { isLoading, onError, setIsLoading } = useAction()

	const form = useForm<z.infer<typeof fullNameSchema>>({
		resolver: zodResolver(fullNameSchema),
		defaultValues: { fullName: user.fullName },
	})

	async function onSubmit(values: z.infer<typeof fullNameSchema>) {
		setIsLoading(true)
		const res = await updateUser(values)
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			toast({ description: 'Full name updated successfully' })
			update()
			setIsLoading(false)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
				<FormField
					control={form.control}
					name='fullName'
					render={({ field }) => (
						<FormItem className='space-y-0'>
							<Label className='text-xs'>Full Name</Label>
							<FormControl>
								<Input placeholder='Osman Ali' className='bg-white' disabled={isLoading} {...field} />
							</FormControl>
							<FormMessage className='text-xs text-red-500' />
						</FormItem>
					)}
				/>
				<Button type='submit' className='self-end mb-0.5' size={'sm'} disabled={isLoading}>
					Submit {isLoading && <Loader className='animate-spin' />}
				</Button>
			</form>
		</Form>
	)
}

export default FullNameForm
