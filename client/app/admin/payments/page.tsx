import Filter from '@/components/shared/filter'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const Page = () => {
	return (
		<>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-xl font-bold'>Payments</h1>
				<Filter />
			</div>

			<Separator className='my-3' />

			<Table>
				<TableCaption>A list of your recent payments.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Product</TableHead>
						<TableHead>Customer</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Provider</TableHead>
						<TableHead className='text-right'>Price</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>Product 1</TableCell>
						<TableCell>info@sammi.ac</TableCell>
						<TableCell>Paid</TableCell>
						<TableCell>Click</TableCell>
						<TableCell className='text-right'>100$</TableCell>
					</TableRow>
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={4} className='font-bold'>
							Total
						</TableCell>
						<TableCell className='text-right'>100$</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</>
	)
}

export default Page
