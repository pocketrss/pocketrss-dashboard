import { createElement } from 'react'

type ImageProps = {
  src: string
  alt: string
  loading?: 'lazy' | 'eager'
} & React.ImgHTMLAttributes<HTMLImageElement>

const Image: React.FunctionComponent<ImageProps> = ({ src, alt, ...props }) =>
  createElement('img', { ...props, loading: 'lazy', src, alt })

export default Image
