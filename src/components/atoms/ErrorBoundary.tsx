import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary'
import { ReactNode } from 'react'
import { Box, Flex, Icon, Heading, Button, Tag, Text } from '@chakra-ui/react'
import { RiCloseCircleLine, RiCloseCircleFill } from 'react-icons/ri'

type Props = {
  children: React.ReactNode
}

const fallback = ({ resetErrorBoundary }: FallbackProps) => (
  <Box textAlign='center' py={10} px={6}>
    <Box display='inline-block'>
      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        // bg={'red.500'}
        rounded={'50px'}
        w={'55px'}
        h={'55px'}
        textAlign='center'
      >
        <Icon color={'red.500'} fontSize='48' as={RiCloseCircleFill} />
      </Flex>
    </Box>
    <Heading as='h2' size='xl' mt={6} mb={2}>
      Error occured. <br />
    </Heading>
    <Text>
      Click <Tag>Refresh</Tag> Button or <Tag>Reload</Tag> the page.
    </Text>
    <Button onClick={() => resetErrorBoundary()}>Refresh</Button>
  </Box>
)

export const ErrorBoundary = ({ children }: Props) => (
  <QueryErrorResetBoundary>
    {({ reset }) => <ReactErrorBoundary fallbackRender={fallback}>{children}</ReactErrorBoundary>}
  </QueryErrorResetBoundary>
)

export default ErrorBoundary
