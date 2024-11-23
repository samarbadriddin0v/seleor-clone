'use client'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useProduct } from '@/hooks/use-product'
import { formatPrice } from '@/lib/utils'
import { IProduct } from '@/types'
import Image from 'next/image'
import { FC } from 'react'
import NoSSR from 'react-no-ssr'

interface Props {
	product: Partial<IProduct>
}
const ProductCard: FC<Props> = ({ product }) => {
	const { setOpen } = useProduct()

	const onEdit = () => {
		setOpen(true)
	}

	return (
		<div className={'border relative flex justify-between flex-col'}>
			<div className='bg-secondary relative'>
				<Image src={product.image!} width={200} height={200} className='mx-auto' alt={product.title!} />
				<Badge className='absolute top-0 left-0'>{product.category}</Badge>
			</div>

			<div className='p-2'>
				<div className='flex justify-between items-center text-sm'>
					<h1 className='font-bold'>{product.title}</h1>
					<NoSSR>
						<p className='font-medium'>{formatPrice(product.price!)}</p>
					</NoSSR>
				</div>
				<p className='text-xs text-muted-foreground leading-1 line-clamp-5'>{product.description}</p>
				<Separator className='my-2' />
			</div>

			<div className='grid grid-cols-2 gap-2 px-2 pb-2'>
				<Button variant={'secondary'} onClick={onEdit}>
					Edit
				</Button>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button variant={'outline'}>Delete</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently delete your account and remove your data from our servers.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction>Continue</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	)
}

export default ProductCard
