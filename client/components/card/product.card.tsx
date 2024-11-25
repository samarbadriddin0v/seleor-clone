'use client'

import { IProduct } from '@/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC, MouseEvent } from 'react'
import { Button } from '../ui/button'
import { Heart } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import NoSSR from 'react-no-ssr'
import useAction from '@/hooks/use-action'
import { addFavorite } from '@/actions/user.action'
import { toast } from '@/hooks/use-toast'

interface Props {
	product: IProduct
}
const ProductCard: FC<Props> = ({ product }) => {
	const { isLoading, onError, setIsLoading } = useAction()
	const router = useRouter()

	const onFavourite = async (e: MouseEvent) => {
		e.stopPropagation()
		setIsLoading(true)
		const res = await addFavorite({ id: product._id })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			toast({ description: 'Added to favorites' })
			setIsLoading(false)
		}
	}

	return (
		<div onClick={() => router.push(`/product/${product._id}`)} className='cursor-pointer'>
			<div className='bg-secondary relative group'>
				<Image src={product.image!} width={300} height={300} className='mx-auto' alt={product.title!} />
				<div className='absolute right-0 top-0 z-50 opacity-0 group-hover:opacity-100 transition-all'>
					<Button size={'icon'} disabled={isLoading} onClick={onFavourite}>
						<Heart />
					</Button>
				</div>
			</div>
			<div className='flex justify-between items-center mt-2 text-sm'>
				<h1 className='font-bold line-clamp-1'>{product.title}</h1>
				<NoSSR>
					<p className='font-medium'>{formatPrice(product.price!)}</p>
				</NoSSR>
			</div>
			<p className='text-xs text-muted-foreground'>{product.category}</p>
		</div>
	)
}

export default ProductCard
