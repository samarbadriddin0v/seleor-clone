import Filter from '@/components/shared/filter'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import OrderActions from '../_components/order-actions'
import { SearchParams } from '@/types'
import { FC } from 'react'
import { getOrders } from '@/actions/admin.action'
import Pagination from '@/components/shared/pagination'
import { Badge } from '@/components/ui/badge'
import { formatPrice, sliceText } from '@/lib/utils'
import { format } from 'date-fns'

interface Props {
	searchParams: SearchParams
}
const Page: FC<Props> = async props => {
	const searchParams = await props.searchParams
	const res = await getOrders({
		searchQuery: `${searchParams.q || ''}`,
		filter: `${searchParams.filter || ''}`,
		page: `${searchParams.page || '1'}`,
	})

	const orders = res?.data?.orders
	const isNext = res?.data?.isNext || false

	return (
		<>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-xl font-bold'>Orders</h1>
				<Filter />
			</div>

			<Separator className='my-3' />

			<Table>
				{orders && orders.length > 0 && <TableCaption>A list of your recent orders.</TableCaption>}
				<TableHeader>
					<TableRow>
						<TableHead>Product</TableHead>
						<TableHead>Customer</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Created at</TableHead>
						<TableHead className='text-right'>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{orders && orders.length === 0 && (
						<TableRow>
							<TableCell colSpan={6} className='text-center'>
								No orders found.
							</TableCell>
						</TableRow>
					)}
					{orders &&
						orders.map(order => (
							<TableRow key={order._id}>
								<TableCell>{order.product.title}</TableCell>
								<TableCell>{sliceText(order.user.email, 10)}</TableCell>
								<TableCell>
									<Badge variant={'secondary'}>{formatPrice(order.price)}</Badge>
								</TableCell>
								<TableCell>
									<Badge>{order.status}</Badge>
								</TableCell>
								<TableCell>{format(new Date(order.createdAt), 'dd/MM/yyyy')}</TableCell>
								<TableCell className='text-right'>
									<OrderActions order={order} />
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>

			<Pagination isNext={isNext} pageNumber={searchParams?.page ? +searchParams.page : 1} />
		</>
	)
}

export default Page
