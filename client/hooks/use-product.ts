import { IProduct } from '@/types'
import { create } from 'zustand'

type Store = {
	product: IProduct | null
	setProduct: (product: IProduct | null) => void
	open: boolean
	setOpen: (open: boolean) => void
}

export const useProduct = create<Store>()(set => ({
	product: null,
	setProduct: product => set({ product }),
	open: false,
	setOpen: open => set({ open }),
}))
