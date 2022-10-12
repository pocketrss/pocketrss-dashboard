import { Avatar, Box, Heading, HStack, Icon, Link, SkeletonCircle, SkeletonText, Text, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { WarningTwoIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { useFloating } from '@floating-ui/react-dom'

import { useEntries } from '@/hooks'
import { authAtom, floaterAtom, pageAtom } from '@/app/store'
import { DateTime } from 'luxon'
import { Floater, HTMLRender } from '@/components'
import { isEmpty, length } from 'rambda'
import shortUUID from 'short-uuid'
import { useList } from 'react-use'

const Home: React.FunctionComponent = () => {
  const [authStore] = useAtom(authAtom)
  const [pageStore] = useAtom(pageAtom)
  const [fabStore] = useAtom(floaterAtom)
  const { x, y, reference, floating, strategy } = useFloating()
  const { data, isLoading } = useEntries({
    pagination: { pageIndex: fabStore.pageIndex, pageSize: pageStore.pageSize },
    token: authStore.token,
  })

  const [entryList, { set: setEntryList }] = useList()

  useEffect(() => setEntryList(data?.data?.entries ?? []), [data])

  if (isLoading) {
    return (
      <Box padding='6' boxShadow='lg' bg='white'>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines={4} spacing='4' />
      </Box>
    )
  }

  if (length(entryList) === 0) {
    return (
      <Box textAlign='center' py={10} px={6}>
        <WarningTwoIcon boxSize={'50px'} color={'orange.300'} />
        <Heading as='h2' size='xl' mt={6} mb={2}>
          Ooops, no data seems here!
        </Heading>
        <Text color={'gray.500'}>Try to navigate back or refresh current page.</Text>
        <Floater />
      </Box>
    )
  }

  return (
    <Box>
      {entryList &&
        entryList.map((entry: any) => (
          <Box
            key={shortUUID.generate()}
            mb={2}
            p={4}
            fontSize='sm'
            lineHeight='9'
            bgColor='whiteAlpha.900'
            rounded='base'
          >
            <HStack>
              <Avatar name={entry.edges.feed.title} />
              <VStack align='start'>
                <Heading as='h6' size='xs'>
                  {entry.edges.feed.title}
                </Heading>
                <Text>{DateTime.fromISO(entry.published_at).toRelative()}</Text>
              </VStack>
            </HStack>
            <Heading as='h3' size='md' m={4}>
              <Link href={entry.url} color='cyan.800' isExternal>
                {entry.title} <Icon fontSize='16' as={ExternalLinkIcon} />
              </Link>
            </Heading>
            <Box overflowX='auto' p={4} bgColor='gray.100' fontSize='xl' rounded='base'>
              {(length(entry.content) > 0 || length(entry.description) > 0) && (
                <HTMLRender html={entry.content ?? entry.description} />
              )}
            </Box>
          </Box>
        ))}
      <Floater />
    </Box>
  )
}

export default Home
