import Filter from '@/components/shared/filter'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const Page = () => {
	return (
		<>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-xl font-bold'>Customers</h1>
				<Filter />
			</div>

			<Separator className='my-3' />

			<Table>
				<TableCaption>A list of your recent custoemrs.</TableCaption>
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
					<TableRow>
						<TableCell>1</TableCell>
						<TableCell>info@sammi.ac</TableCell>
						<TableCell>Samar Badriddinov</TableCell>
						<TableCell>12</TableCell>
						<TableCell>Active</TableCell>
						<TableCell className='text-right'>$1200</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</>
	)
}

export default Page
