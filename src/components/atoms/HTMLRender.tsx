import HTMLRenderer from 'react-html-renderer'
import { Link, Code, ListItem, OrderedList, UnorderedList } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

const HTMLRender = ({ html }: { html: string }) => (
  <HTMLRenderer
    html={html}
    components={{
      a: (props: any) => (
        <Link color='cyan.800' isExternal {...props}>
          {props.children} <ExternalLinkIcon boxSize={3} />
        </Link>
      ),
      code: (props: any) => <Code colorScheme='cyan' rounded='md' px={1} {...props} />,
      // img: (props: any) => <Image fallbackSrc='https://via.placeholder.com/150' {...props} />,
      li: ListItem,
      ol: OrderedList,
      ul: UnorderedList,
    }}
  />
)

export default HTMLRender
