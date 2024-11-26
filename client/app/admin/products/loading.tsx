import { Separator } from '@/components/ui/separator'
import AddProduct from '../_components/add-product'
import Filter from '@/components/shared/filter'
import CardLoader from '@/components/loaders/card.loader'

const Loading = () => {
	return (
		<>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-xl font-bold'>Products</h1>
				<AddProduct />
			</div>

			<Separator className='my-3' />

			<Filter showCategory />

			<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-3'>
				{Array.from({ length: 4 }).map((_, i) => (
					<CardLoader key={i} isAdmin />
				))}
			</div>
		</>
	)
}

export default Loading
