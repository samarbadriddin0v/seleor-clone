'use client'

import { IProduct } from '@/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { Button } from '../ui/button'
import { Heart } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import NoSSR from 'react-no-ssr'

interface Props {
	product: Partial<IProduct>
}
const ProductCard: FC<Props> = ({ product }) => {
	const router = useRouter()

	return (
		<div onClick={() => router.push(`/product/${product._id}`)} className='cursor-pointer'>
			<div className='bg-secondary relative group'>
				<Image src={product.image!} width={300} height={300} className='mx-auto' alt={product.title!} />
				<div className='absolute right-0 top-0 z-50 opacity-0 group-hover:opacity-100 transition-all'>
					<Button size={'icon'}>
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
