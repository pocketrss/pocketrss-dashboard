import { twclsx } from '@/utils'

import { createElement } from 'react'

const Button: React.FunctionComponent<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className: c, ...props }) => {
  const className = twclsx(
    'inline-flex items-center justify-center',
    'py-2.5 px-3.5 rounded-lg font-medium transition-all',
    'hover:ring',
    c
  )

  return createElement('button', { ...props, className })
}

export default Button
