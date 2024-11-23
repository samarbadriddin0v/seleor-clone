import { Separator } from '@/components/ui/separator'
import { Banknote, Heart, Shuffle } from 'lucide-react'
import EditInformation from '../_components/edit-information'

const Page = () => {
	return (
		<>
			<h1 className='text-xl font-semibold'>Personal information</h1>
			<Separator className='my-3' />
			<EditInformation />
			<div className='grid grid-cols-3 gap-4'>
				<div className='border-2 p-2 flex justify-center flex-col space-y-2 items-center shadow-md hover:animate-pulse transition-all cursor-pointer'>
					<Shuffle size={50} />
					<div className='text-center'>
						<h1 className='text-4xl font-bold'>2</h1>
						<p>Orders</p>
					</div>
				</div>

				<div className='border-2 p-2 flex justify-center flex-col space-y-2 items-center shadow-md hover:animate-pulse transition-all cursor-pointer'>
					<Banknote size={50} />
					<div className='text-center'>
						<h1 className='text-4xl font-bold'>3</h1>
						<p>Payments</p>
					</div>
				</div>

				<div className='border-2 p-2 flex justify-center flex-col space-y-2 items-center shadow-md hover:animate-pulse transition-all cursor-pointer'>
					<Heart size={50} />
					<div className='text-center'>
						<h1 className='text-4xl font-bold'>8</h1>
						<p>Watch list</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default Page
