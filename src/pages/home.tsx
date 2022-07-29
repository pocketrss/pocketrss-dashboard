import { Button, Image, Link, UnderlineLink } from '@/components'

import react_icon from '@/assets/react.svg'
import { useTheme } from '@/hooks'
import { twclsx } from '@/utils'

import { HiMoon, HiSun } from 'react-icons/hi'
import { IoLogoGithub } from 'react-icons/io5'

const Home: React.FunctionComponent = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <section>
      <Image src={react_icon} alt='React' className='w-16 h-16 react animate-spin' />
      <h1 className='bg-clip-text text-transparent dark:text-transparent bg-gradient-to-r from-primary-5 to-secondary-5'>
        Stravital
      </h1>
      <p className='text-center'>Kickstart your Web Application with React, Vite and Tailwind CSS.</p>

      <div className='flex items-center justify-center gap-2'>
        <Button onClick={toggleTheme} className='p-0 h-8 w-8'>
          {theme === 'dark' ? <HiSun /> : <HiMoon />}
        </Button>

        <Link
          to='https://github.com/rizkimcitra/stravital'
          className={twclsx('h-8 w-8', 'p-0 hover:ring rounded-lg transition-all', 'text-main-7 dark:text-main-3 ')}
        >
          <IoLogoGithub />
        </Link>
      </div>

      <UnderlineLink to='/foo'>See 404</UnderlineLink>
    </section>
  )
}

export default Home
