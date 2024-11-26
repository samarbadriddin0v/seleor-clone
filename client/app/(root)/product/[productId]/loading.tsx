import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
			<Skeleton className='bg-secondary relative w-full h-[70vh] col-span-2' />

			<div className='flex flex-col space-y-2 self-center'>
				<Skeleton className='w-40 h-6' />
				<Badge className='w-fit' variant={'secondary'}>
					# <Skeleton className='w-20 h-2 ml-2' />
				</Badge>
				<div className='flex flex-col space-y-1'>
					<Skeleton className='w-full h-2' />
					<Skeleton className='w-full h-2' />
					<Skeleton className='w-full h-2' />
					<Skeleton className='w-1/2 h-2' />
				</div>
				<Skeleton className='w-1/4 h-2' />
				<Button className='w-fit'>
					<Skeleton className='w-20 h-2 bg-secondary' />
				</Button>
				<div className='flex flex-col space-y-1'>
					<Skeleton className='w-full h-2' />
					<Skeleton className='w-1/2 h-2' />
				</div>
			</div>
		</div>
	)
}

export default Loading
