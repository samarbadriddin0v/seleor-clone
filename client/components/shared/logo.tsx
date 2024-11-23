import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
	return (
		<Link href={'/'}>
			<div className='flex items-center gap-1'>
				<Image src={'/logo.svg'} alt='logo' width={150} height={50} />
			</div>
		</Link>
	)
}

export default Logo
