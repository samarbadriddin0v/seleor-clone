import { Badge } from '@/components/ui/badge'
import { products } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import CreateOrderButton from '../_components/create-order.btn'

const Page = () => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
			<div className='bg-secondary relative w-full h-[70vh] col-span-2'>
				<Image src={products[0].image} fill className='mx-auto' alt={products[0].title} />
			</div>
			<div className='flex flex-col space-y-1 self-center'>
				<h1 className='font-bold text-4xl'>{products[0].title}</h1>
				<Badge className='w-fit' variant={'secondary'}>
					# {products[0].category}
				</Badge>
				<p className='text-xs text-muted-foreground'>{products[0].description}</p>
				<p className='font-bold'>{formatPrice(+products[0].price)}</p>
				<CreateOrderButton />
				<div className='text-xs'>
					Your purchase is secure with us. We do not store any credit card information. We use Payme for payment processing.
				</div>
			</div>
		</div>
	)
}

export default Page
