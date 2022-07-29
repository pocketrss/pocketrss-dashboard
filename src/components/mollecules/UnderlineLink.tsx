import { CustomLinkProps, Link } from '@/components'

import { twclsx } from '@/utils'

const UnderlineLink: React.FunctionComponent<CustomLinkProps> = (props) => {
  return (
    <Link
      {...props}
      className={twclsx(
        'relative max-w-max',
        'py-0.5 border-b border-dashed',
        'after:absolute after:left-0 after:-bottom-0.5 after:transition-all',
        'after:w-0 after:h-0.5 hover:after:w-full',
        'after:bg-gradient-to-r from-primary-5 to-secondary-5',
        props.className
      )}
    >
      {props.children}
    </Link>
  )
}

export default UnderlineLink
