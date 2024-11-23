import WatchListCard from '@/components/card/watch-list.card'
import Filter from '@/components/shared/filter'
import Pagination from '@/components/shared/pagination'
import { Separator } from '@/components/ui/separator'
import { products } from '@/lib/constants'
import React from 'react'

const Page = () => {
	return (
		<>
			<h1 className='text-xl font-bold'>Watch list</h1>

			<Separator className='my-3' />

			<Filter showCategory />

			<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-3'>
				{products.map(product => (
					<WatchListCard key={product._id} product={product} />
				))}
			</div>

			<Pagination />
		</>
	)
}

export default Page
