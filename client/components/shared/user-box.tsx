'use client'

import { IUser } from '@/types'
import { FC, useState } from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { signOut } from 'next-auth/react'
import { LogIn } from 'lucide-react'
import Link from 'next/link'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '../ui/alert-dialog'

interface Props {
	user: IUser
}
const UserBox: FC<Props> = ({ user }) => {
	const [open, setOpen] = useState(false)

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Avatar className='cursor-pointer'>
						<AvatarImage src={user.avatar} alt={user.fullName} />
						<AvatarFallback className='capitalize bg-primary text-white'>{user.fullName.charAt(0)}</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-56'>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{user.role === 'admin' && (
						<DropdownMenuItem className='cursor-pointer' asChild>
							<Link href={'/admin'}>Admin</Link>
						</DropdownMenuItem>
					)}
					<DropdownMenuItem className='cursor-pointer' asChild>
						<Link href={'/dashboard'}>Dashboard</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className='cursor-pointer' onClick={() => setOpen(true)}>
						<LogIn />
						<span>Logout</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will logout you from the application.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={() => signOut({ callbackUrl: '/sign-in' })}>Continue</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}

export default UserBox
