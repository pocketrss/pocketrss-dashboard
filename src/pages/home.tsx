import { RiRssLine, RiNewspaperLine } from 'react-icons/ri'
import { Box, Flex, HStack, Icon, Skeleton, Stack, Stat, StatLabel, StatNumber } from '@chakra-ui/react'
import { useArray } from 'react-recipes'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

import { useHomeTimeline } from '@/hooks'
import { authAtom, pageAtom } from '@/app/store'

const Home: React.FunctionComponent = () => {
  const [authStore] = useAtom(authAtom)
  const [pageStore] = useAtom(pageAtom)
  const { data, isLoading } = useHomeTimeline({ limit: pageStore.pageSize, token: authStore.token })
  const { add, removeIndex, value: statusList, setValue: setStatusList } = useArray([])

  useEffect(() => setStatusList(data), [data])

  if (isLoading) {
    return (
      <Stack>
        <Skeleton height='20px' />
        <Skeleton height='20px' />
        <Skeleton height='20px' />
      </Stack>
    )
  }

  return (
    <HStack>
      <Stat px={{ base: 2, md: 4 }} py={5} borderRadius='md' bgColor='white'>
        <Flex justifyContent='space-between'>
          <Box>
            <StatLabel>Feeds</StatLabel>
            <StatNumber>{statusList?.length ?? 0}</StatNumber>
            {/* <StatHelpText>{DateTime.now().toSQLDate()}</StatHelpText> */}
          </Box>
          <Box>
            <Icon as={RiRssLine} w={20} h={20} />
          </Box>
        </Flex>
      </Stat>

      <Stat px={{ base: 2, md: 4 }} py={5} borderRadius='md' bgColor='white'>
        <Flex justifyContent='space-between'>
          <Box>
            <StatLabel>Feeds</StatLabel>
            <StatNumber>{statusList?.length}</StatNumber>
            {/* <StatHelpText>{DateTime.now().toSQLDate()}</StatHelpText> */}
          </Box>
          <Box>
            <Icon as={RiNewspaperLine} w={20} h={20} />
          </Box>
        </Flex>
      </Stat>
    </HStack>
  )
}

export default Home
