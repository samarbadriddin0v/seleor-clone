export interface ChildProps {
	children: React.ReactNode
}

export type SearchParams = { [key: string]: string | string[] | undefined }
export type Params = { productId: string }

export interface QueryProps {
	params: string
	key: string
	value?: string | null
}

export interface ReturnActionType {
	user: IUser
	failure: string
	checkoutUrl: string
	status: number
	isNext: boolean
	products: IProduct[]
	product: IProduct
	customers: IUser[]
	orders: IOrder[]
	transactions: ITransaction[]
	statistics: { totalOrders: number; totalTransactions: number; totalFavourites: number }
}

export interface IProduct {
	title: string
	category: string
	price: number
	image: string
	description: string
	imageKey: string
	_id: string
}

export interface IUser {
	email: string
	fullName: string
	password: string
	_id: string
	role: string
	orderCount: number
	totalPrice: number
	avatar: string
	avatarKey: string
	isDeleted: boolean
	deletedAt: Date
	favorites: IProduct[]
}

export interface IOrder {
	_id: string
	user: IUser
	product: IProduct
	createdAt: Date
	price: number
	status: string
	updatedAt: Date
}

export interface ITransaction {
	_id: string
	id: string
	user: IUser
	product: IProduct
	state: number
	amount: number
	create_time: number
	perform_time: number
	cancel_time: number
	reason: number
	provider: string
}
