import { QueryProps } from '@/types'
import clsx from 'clsx'
import { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import qs from 'query-string'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
	return new Intl.NumberFormat('uz-UZ', { style: 'currency', currency: 'UZS' }).format(price)
}

export function formUrlQuery({ key, params, value }: QueryProps) {
	const currentUrl = qs.parse(params)
	currentUrl[key] = value!
	return qs.stringifyUrl({ url: window.location.pathname, query: currentUrl }, { skipNull: true })
}

export function removeUrlQuery({ params, key }: QueryProps) {
	const currentUrl = qs.parse(params)
	delete currentUrl[key]
	return qs.stringifyUrl({ url: window.location.pathname, query: currentUrl }, { skipNull: true })
}
