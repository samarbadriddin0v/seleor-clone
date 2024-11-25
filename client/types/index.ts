export interface ChildProps {
	children: React.ReactNode
}

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export interface QueryProps {
	params: string
	key: string
	value?: string | null
}

export interface ReturnActionType {
	user: IUser
	failure: string
	status: number
	isNext: boolean
	products: IProduct[]
	customers: IUser[]
	orders: IOrder[]
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
