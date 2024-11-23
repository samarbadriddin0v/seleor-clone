import Link from 'next/link'
import { Button } from '../ui/button'
import Logo from './logo'
import { User } from 'lucide-react'

const Navbar = () => {
	return (
		<div className='h-20 bg-secondary border-b fixed inset-0 z-50'>
			<div className='container max-w-6xl flex items-center justify-between h-full'>
				<Logo />

				<div className='flex items-center gap-2'>
					<Button asChild size={'icon'}>
						<Link href={'/sign-in'}>
							<User />
						</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Navbar
