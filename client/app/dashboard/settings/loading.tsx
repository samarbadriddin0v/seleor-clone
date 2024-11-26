import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const Loading = () => {
	return (
		<>
			<h1 className='text-xl font-bold'>Danger zone</h1>

			<Separator className='my-3' />

			<div className='p-4 bg-secondary flex flex-col space-y-0'>
				<div className='text-lg font-bold'>Delete account</div>
				<p className='text-sm text-muted-foreground'>
					Deleting your account will remove all your data from our servers. This action is irreversible.
				</p>
				<Button className='w-fit' size={'sm'} variant={'destructive'}>
					Delete account
				</Button>
			</div>
		</>
	)
}

export default Loading
