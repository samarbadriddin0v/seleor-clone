import { Heart } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'
import { Button } from '../ui/button'
import { FC } from 'react'

interface Props {
	isAdmin?: boolean
}
const CardLoader: FC<Props> = ({ isAdmin }) => {
	return (
		<div>
			<div className='bg-secondary relative w-full h-[300px]'>
				{!isAdmin && (
					<Skeleton className='absolute right-0 top-0'>
						<Button size={'icon'}>
							<Heart />
						</Button>
					</Skeleton>
				)}
			</div>

			<div className='flex justify-between items-center mt-2 text-sm'>
				<Skeleton className='w-1/2 h-2' />
				<Skeleton className='w-1/4 h-2' />
			</div>
			<Skeleton className='w-1/4 h-2 mt-1' />
		</div>
	)
}

export default CardLoader
