import { getCustomers } from '@/actions/admin.action'
import Filter from '@/components/shared/filter'
import Pagination from '@/components/shared/pagination'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatPrice } from '@/lib/utils'
import { SearchParams } from '@/types'
import { FC } from 'react'

interface Props {
	searchParams: SearchParams
}
const Page: FC<Props> = async props => {
	const searchParams = await props.searchParams
	const res = await getCustomers({
		searchQuery: `${searchParams.q || ''}`,
		filter: `${searchParams.filter || ''}`,
		page: `${searchParams.page || '1'}`,
	})

	const customers = res?.data?.customers
	const isNext = res?.data?.isNext || false

	return (
		<>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-xl font-bold'>Customers</h1>
				<Filter />
			</div>

			<Separator className='my-3' />

			<Table>
				{customers && customers.length > 0 && <TableCaption>A list of your recent custoemrs.</TableCaption>}
				<TableHeader>
					<TableRow>
						<TableHead>№</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Full Name</TableHead>
						<TableHead>Orders</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className='text-right'>Payments</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{customers && customers.length === 0 && (
						<TableRow>
							<TableCell colSpan={6} className='text-center'>
								No customers found.
							</TableCell>
						</TableRow>
					)}
					{customers &&
						customers.map((customer, index) => (
							<TableRow key={customer._id}>
								<TableCell>№{index + 1}</TableCell>
								<TableCell>{customer.email}</TableCell>
								<TableCell>{customer.fullName}</TableCell>
								<TableCell>
									<Badge>{customer.orderCount}</Badge>
								</TableCell>
								<TableCell>
									<Badge variant={customer.isDeleted ? 'destructive' : 'secondary'}>
										{customer.isDeleted ? 'Deleted' : 'Active'}
									</Badge>
								</TableCell>
								<TableCell className='text-right'>
									<Badge variant={'outline'}>{formatPrice(customer.totalPrice)}</Badge>
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
