import ProductCard from '@/components/card/product.card'
import Filter from '@/components/shared/filter'
import Pagination from '@/components/shared/pagination'
import { Separator } from '@/components/ui/separator'
import { products } from '@/lib/constants'

const HomePage = () => {
	return (
		<>
			<div className='flex justify-between items-center'>
				<h1 className='text-xl font-bold'>Products</h1>
				<Filter showCategory />
			</div>

			<Separator className='my-3' />

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{products.map(product => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>

			<Pagination />
		</>
	)
}

export default HomePage
