import CardLoader from '@/components/loaders/card.loader'
import Filter from '@/components/shared/filter'
import { Separator } from '@/components/ui/separator'

const Loading = () => {
	return (
		<>
			<h1 className='text-xl font-bold'>Watch list</h1>
			<Separator className='my-3' />
			<Filter showCategory />
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-3'>
				{Array.from({ length: 4 }).map((_, i) => (
					<CardLoader key={i} />
				))}
			</div>
		</>
	)
}

export default Loading
