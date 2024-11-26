import Filter from '@/components/shared/filter'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Loader } from 'lucide-react'

const Loading = () => {
	return (
		<>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-xl font-bold'>Orders</h1>
				<Filter />
			</div>

			<Separator className='my-3' />

			<Table className='text-sm'>
				<TableHeader>
					<TableRow>
						<TableHead>Product</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Order time</TableHead>
						<TableHead className='text-right'>Updated time</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell colSpan={5} className='text-center'>
							<div className='flex justify-center'>
								<Loader size={16} className='animate-spin' />
							</div>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</>
	)
}

export default Loading
