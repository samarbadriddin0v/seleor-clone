import { ChildProps } from '@/types'
import { FC } from 'react'
import Sidebar from './_components/sidebar'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { redirect } from 'next/navigation'

const Layout: FC<ChildProps> = async ({ children }) => {
	const session = await getServerSession(authOptions)

	if (!session) return redirect('/sign-in')
	if (session.currentUser?.role !== 'admin') return redirect('/')

	return (
		<div className='grid grid-cols-3 gap-4'>
			<div className='col-span-1'>
				<Sidebar />
			</div>
			<div className='col-span-2 pb-10'>{children}</div>
		</div>
	)
}

export default Layout
