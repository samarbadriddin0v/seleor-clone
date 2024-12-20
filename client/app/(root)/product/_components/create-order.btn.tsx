'use client'

import { clickCheckout, paymeCheckout, stripeCheckout, uzumCheckout } from '@/actions/user.action'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import useAction from '@/hooks/use-action'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React from 'react'

const CreateOrderButton = () => {
	const { isLoading, onError, setIsLoading } = useAction()
	const { productId } = useParams<{ productId: string }>()

	const onStripe = async () => {
		setIsLoading(true)
		const res = await stripeCheckout({ id: productId })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			window.open(res.data.checkoutUrl, '_self')
		}
	}

	const onPayme = async () => {
		setIsLoading(true)
		const res = await paymeCheckout({ id: productId })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			window.open(res.data.checkoutUrl, '_self')
		}
	}

	const onClick = async () => {
		setIsLoading(true)
		const res = await clickCheckout({ id: productId })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			window.open(res.data.checkoutUrl, '_self')
		}
	}

	const onUzum = async () => {
		setIsLoading(true)
		const res = await uzumCheckout({ id: productId })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			window.open(res.data.checkoutUrl, '_self')
		}
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button className='w-fit' size={'lg'}>
					Purchase
				</Button>
			</PopoverTrigger>
			<PopoverContent className='p-1 w-56' side='right'>
				<div className='flex flex-col space-y-1'>
					<Button variant={'secondary'} disabled={isLoading} onClick={onStripe}>
						<Image src={'/stripe.svg'} alt='stripe' width={70} height={50} className='cursor-pointer' />
					</Button>
					<Button variant={'secondary'} disabled={isLoading} onClick={onClick}>
						<Image src={'/click.svg'} alt='stripe' width={70} height={50} className='cursor-pointer' />
					</Button>
					<Button variant={'secondary'} disabled={isLoading} onClick={onPayme}>
						<Image src={'/payme.svg'} alt='stripe' width={70} height={50} className='cursor-pointer' />
					</Button>
					<Button variant={'secondary'} disabled={isLoading} onClick={onUzum}>
						<Image src={'/uzum.svg'} alt='stripe' width={70} height={50} className='cursor-pointer' />
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	)
}

export default CreateOrderButton
