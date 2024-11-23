'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { emailSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const EmailForm = () => {
	const form = useForm<z.infer<typeof emailSchema>>({
		resolver: zodResolver(emailSchema),
		defaultValues: { email: '' },
	})

	async function onSubmit(values: z.infer<typeof emailSchema>) {
		console.log(values)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem className='space-y-0'>
							<Label className='text-xs'>Email</Label>
							<FormControl>
								<Input placeholder='example@gmail.com' className='bg-white' {...field} />
							</FormControl>
							<FormMessage className='text-xs text-red-500' />
						</FormItem>
					)}
				/>
				<Button type='submit' className='self-end mb-0.5' size={'sm'}>
					Submit
				</Button>
			</form>
		</Form>
	)
}

export default EmailForm
