import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Link from 'next/link'

const Page = () => {
	return (
		<div className='flex justify-center items-center w-full h-[80vh]'>
			<div className='relative p-4 w-full max-w-md h-full md:h-auto'>
				<div className='relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5'>
					<div className='w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 p-2 flex items-center justify-center mx-auto mb-3.5'>
						<X />
					</div>
					<p className='mb-4 text-lg text-gray-900 dark:text-white'>Your payment was not processed</p>
					<Button asChild>
						<Link href={'/dashboard'}>
							<span>Back to home</span>
						</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Page
