import { Banknote, Barcode, Heart, Settings2, Shuffle, User } from 'lucide-react'

export const products = [
	{
		_id: '1',
		title: 'Product 1',
		description: 'Description 1',
		image: '/1.webp',
		category: 'Category 1',
		price: 100000,
	},
	{
		_id: '2',
		title: 'Product 2',
		description: 'Description 2',
		image: '/2.webp',
		category: 'Category 2',
		price: 200000,
	},
	{
		_id: '3',
		title: 'Product 3',
		description: 'Description 3',
		image: '/3.webp',
		category: 'Category 3',
		price: 300000,
	},
]

export const categories = ['All', 'Shoes', 'T-Shirts', 'Clothes', 'Books', 'Accessories', 'Universal']

export const dashboardSidebar = [
	{ name: 'Personal Information', route: '/dashboard', icon: User },
	{ name: 'Orders', route: '/dashboard/orders', icon: Shuffle },
	{ name: 'Payments', route: '/dashboard/payments', icon: Banknote },
	{ name: 'Watch list', route: '/dashboard/watch-list', icon: Heart },
	{ name: 'Settings', route: '/dashboard/settings', icon: Settings2 },
]

export const adminSidebar = [
	{ name: 'Customers', icon: User, route: '/admin' },
	{ name: 'Products', icon: Barcode, route: '/admin/products' },
	{ name: 'Orders', icon: Shuffle, route: '/admin/orders' },
	{ name: 'Payments', icon: Banknote, route: '/admin/payments' },
]
