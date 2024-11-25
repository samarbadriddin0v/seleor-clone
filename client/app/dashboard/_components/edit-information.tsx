'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Edit2, Loader } from 'lucide-react'
import FullNameForm from './full-name.form'
import EmailForm from './email.form'
import { IUser } from '@/types'
import { FC, useState } from 'react'
import { UploadDropzone } from '@/lib/uploadthing'
import useAction from '@/hooks/use-action'
import { updateUser } from '@/actions/user.action'
import { toast } from '@/hooks/use-toast'
import { useSession } from 'next-auth/react'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
	user: IUser
}
const EditInformation: FC<Props> = ({ user }) => {
	const [open, setOpen] = useState(false)

	const { update } = useSession()
	const { isLoading, onError, setIsLoading } = useAction()

	const onUpdateAvatar = async (avatar: string, avatarKey: string) => {
		setIsLoading(true)
		const res = await updateUser({ avatar, avatarKey })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			toast({ description: 'Avatar updated successfully' })
			update()
			setOpen(false)
			setIsLoading(false)
		}
	}

	return (
		<>
			<div className='w-full h-52 bg-secondary flex justify-center items-center'>
				<div className='relative'>
					{isLoading && (
						<Skeleton className='absolute inset-0 bg-secondary z-50 flex justify-center items-center'>
							<Loader className='animate-spin' />
						</Skeleton>
					)}
					<Avatar className='size-32'>
						<AvatarImage src={user.avatar} alt={user.fullName} />
						<AvatarFallback className='bg-primary text-white text-6xl'>{user.fullName.charAt(0).toUpperCase()}</AvatarFallback>
					</Avatar>
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogTrigger asChild>
							<Button
								size={'icon'}
								className='absolute right-0 bottom-0 rounded-full border border-primary'
								variant={'secondary'}
							>
								<Edit2 />
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle />
							</DialogHeader>
							<UploadDropzone
								endpoint={'imageUploader'}
								config={{ appendOnPaste: true, mode: 'auto' }}
								appearance={{ container: { height: 200, padding: 10 } }}
								onClientUploadComplete={res => onUpdateAvatar(res[0].url, res[0].key)}
							/>
						</DialogContent>
					</Dialog>
				</div>
			</div>

			<div className='my-3 bg-secondary px-4'>
				<Accordion type='single' collapsible>
					<AccordionItem value='item-1'>
						<AccordionTrigger>
							<div className='flex flex-col space-y-0'>
								<h2 className='font-bold'>Full Name</h2>
								<p className='text-muted-foreground'>{user.fullName}</p>
							</div>
						</AccordionTrigger>
						<AccordionContent className='border-l border-l-primary pl-4'>
							<FullNameForm user={user} />
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value='item-2'>
						<AccordionTrigger>
							<div className='flex flex-col space-y-0'>
								<h2 className='font-bold'>Emal</h2>
								<p className='text-muted-foreground'>{user.email}</p>
							</div>
						</AccordionTrigger>
						<AccordionContent className='border-l border-l-primary pl-4'>
							<EmailForm user={user} />
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</>
	)
}

export default EditInformation
