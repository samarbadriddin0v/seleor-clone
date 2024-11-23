import Filter from '@/components/shared/filter'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { products } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'
import React from 'react'

const Page = () => {
	return (
		<>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-xl font-bold'>Orders</h1>
				<Filter />
			</div>

			<Separator className='my-3' />

			<Table className='text-sm'>
				<TableCaption>A list of your recent orders.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Price</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Product</TableHead>
						<TableHead>Order time</TableHead>
						<TableHead className='text-right'>Updated time</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products.map(product => (
						<TableRow key={product._id}>
							<TableCell>{formatPrice(product.price)}</TableCell>
							<TableCell>Paid</TableCell>
							<TableCell>{product.title}</TableCell>
							<TableCell>10-Nov 2024</TableCell>
							<TableCell className='text-right'>12-Nov 12:30 pm</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	)
}

export default Page
