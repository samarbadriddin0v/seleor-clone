'use client'

import { createProduct, deleteFile, updateProduct } from '@/actions/admin.action'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import useAction from '@/hooks/use-action'
import { useProduct } from '@/hooks/use-product'
import { toast } from '@/hooks/use-toast'
import { categories } from '@/lib/constants'
import { UploadDropzone } from '@/lib/uploadthing'
import { formatPrice } from '@/lib/utils'
import { productSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader, PlusCircle, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const AddProduct = () => {
	const { isLoading, onError, setIsLoading } = useAction()
	const { open, setOpen, product, setProduct } = useProduct()

	const form = useForm<z.infer<typeof productSchema>>({
		resolver: zodResolver(productSchema),
		defaultValues: { title: '', description: '', category: '', price: '', image: '', imageKey: '' },
	})

	async function onSubmit(values: z.infer<typeof productSchema>) {
		if (!form.watch('image')) return toast({ description: 'Please upload an image', variant: 'destructive' })
		setIsLoading(true)
		let res
		if (product?._id) {
			res = await updateProduct({ ...values, id: product._id })
		} else {
			res = await createProduct(values)
		}
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 201) {
			toast({ description: 'Product created successfully' })
			setOpen(false)
			form.reset()
			setIsLoading(false)
		}
		if (res.data.status === 200) {
			toast({ description: 'Product updated successfully' })
			setOpen(false)
			form.reset()
			setIsLoading(false)
		}
	}

	function onOpen() {
		setOpen(true)
		setProduct({ _id: '', title: '', description: '', category: '', price: 0, image: '', imageKey: '' })
	}

	function onDeleteImage() {
		deleteFile(form.getValues('imageKey'))
		form.setValue('image', '')
		form.setValue('imageKey', '')
	}

	useEffect(() => {
		if (product) {
			form.reset({ ...product, price: product.price.toString() })
		}
	}, [product])

	return (
		<>
			<Button size={'sm'} onClick={onOpen}>
				<span>Add Product</span>
				<PlusCircle />
			</Button>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Manage your product</SheetTitle>
						<SheetDescription>Field marked with * are required fields and must be filled.</SheetDescription>
					</SheetHeader>
					<Separator className='my-3' />
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
							<FormField
								control={form.control}
								name='title'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label className='text-xs'>Title</Label>
										<FormControl>
											<Input placeholder='Adidas shoes' className='bg-secondary' disabled={isLoading} {...field} />
										</FormControl>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='description'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label className='text-xs'>Description</Label>
										<FormControl>
											<Textarea
												placeholder='Adidas shoes are the best shoes in the world'
												disabled={isLoading}
												className='bg-secondary'
												{...field}
											/>
										</FormControl>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='category'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label className='text-xs'>Cateogry</Label>
										<Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
											<FormControl>
												<SelectTrigger className='bg-secondary'>
													<SelectValue placeholder='Select category' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{categories.slice(1).map(category => (
													<SelectItem value={category} key={category}>
														{category}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='price'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label className='text-xs'>
											{!form.watch('price') ? 'Price' : `Price ${formatPrice(Number(form.watch('price')))} `}
										</Label>
										<FormControl>
											<Input placeholder='100.000 UZS' type='number' className='bg-secondary' disabled={isLoading} {...field} />
										</FormControl>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							{form.watch('image') && (
								<div className='w-full h-[200px] bg-secondary flex justify-center items-center relative'>
									<Image src={form.watch('image')} alt='product image' fill className='object-cover' />
									<Button
										size={'icon'}
										variant={'destructive'}
										className='absolute right-0 top-0'
										type='button'
										onClick={onDeleteImage}
									>
										<X />
									</Button>
								</div>
							)}
							{!form.watch('image') && (
								<UploadDropzone
									endpoint={'imageUploader'}
									onClientUploadComplete={res => {
										form.setValue('image', res[0].url)
										form.setValue('imageKey', res[0].key)
									}}
									config={{ appendOnPaste: true, mode: 'auto' }}
									appearance={{ container: { height: 200, padding: 10 } }}
								/>
							)}
							<Button type='submit' className='w-full' disabled={isLoading}>
								Submit {isLoading && <Loader className='animate-spin' />}
							</Button>
						</form>
					</Form>
				</SheetContent>
			</Sheet>
		</>
	)
}

export default AddProduct
