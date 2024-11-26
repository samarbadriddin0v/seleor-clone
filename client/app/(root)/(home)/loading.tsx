import CardLoader from '@/components/loaders/card.loader'
import Filter from '@/components/shared/filter'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const Loading = () => {
	return (
		<>
			<div className='flex justify-between items-center'>
				<h1 className='text-xl font-bold'>Products</h1>
				<Filter showCategory />
			</div>

			<Separator className='my-3' />

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{Array.from({ length: 6 }).map((_, i) => (
					<CardLoader key={i} />
				))}
			</div>
		</>
	)
}

export default Loading
