import { twclsx } from '@/utils'

import { Link, LinkProps } from 'react-router-dom'

export type CustomLinkProps = {
  rel?: 'noopener noreferrer'
  target?: '_blank' | '_top' | '_self' | '_parent'
} & LinkProps

const CustomLink: React.FunctionComponent<CustomLinkProps> = ({ to, className: c, ...props }) => {
  const className = twclsx(
    'inline-flex items-center justify-center',
    'font-semibold text-primary-5 hover:text-primary-6',
    c
  )

  if (typeof to === 'string' && to.startsWith('http')) {
    return (
      <a {...props} href={to} className={className} target='_blank' rel='noopener noreferrer'>
        {props.children}
      </a>
    )
  }

  return (
    <Link {...props} to={to} className={className}>
      {props.children}
    </Link>
  )
}

export default CustomLink
