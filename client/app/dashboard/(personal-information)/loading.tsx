import { Accordion, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Banknote, Edit2, Heart, Shuffle } from 'lucide-react'

const Loading = () => {
	return (
		<>
			<h1 className='text-xl font-semibold'>Personal information</h1>

			<Separator className='my-3' />

			<div className='w-full h-52 bg-secondary flex justify-center items-center'>
				<div className='relative'>
					<Avatar className='size-32'>
						<AvatarFallback className='bg-primary text-white text-6xl'>SB</AvatarFallback>
					</Avatar>

					<Button size={'icon'} className='absolute right-0 bottom-0 rounded-full border border-primary' variant={'secondary'}>
						<Edit2 />
					</Button>
				</div>
			</div>

			<div className='my-3 bg-secondary px-4'>
				<Accordion type='single' collapsible>
					<AccordionItem value='item-1'>
						<AccordionTrigger>
							<Skeleton className='w-1/4 h-4' />
						</AccordionTrigger>
					</AccordionItem>
					<AccordionItem value='item-2'>
						<AccordionTrigger>
							<Skeleton className='w-1/4 h-4' />
						</AccordionTrigger>
					</AccordionItem>
				</Accordion>
			</div>

			<div className='grid grid-cols-3 gap-4'>
				<div className='border-2 p-2 flex justify-center flex-col space-y-2 items-center shadow-md hover:animate-pulse transition-all cursor-pointer'>
					<Shuffle size={50} />
					<div className='text-center'>
						<p>Orders</p>
					</div>
				</div>

				<div className='border-2 p-2 flex justify-center flex-col space-y-2 items-center shadow-md hover:animate-pulse transition-all cursor-pointer'>
					<Banknote size={50} />
					<div className='text-center'>
						<p>Payments</p>
					</div>
				</div>

				<div className='border-2 p-2 flex justify-center flex-col space-y-2 items-center shadow-md hover:animate-pulse transition-all cursor-pointer'>
					<Heart size={50} />
					<div className='text-center'>
						<p>Watch list</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default Loading
