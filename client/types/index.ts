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
	products: IProduct[]
	isNext: boolean
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
