import { useEffect, useState } from 'react'
import { Box, HStack, Icon, useToast } from '@chakra-ui/react'
import { RiArrowLeftCircleLine, RiArrowRightCircleLine } from 'react-icons/ri'
import { useAtom } from 'jotai'
import { floaterAtom, pageAtom } from '@/app/store'

export default function Floater() {
  const toast = useToast()
  const [fab, setFabStore] = useAtom(floaterAtom)

  const [pageIndex, setPageIndex] = useState(fab.pageIndex)

  useEffect(() => setFabStore({ pageIndex }), [pageIndex])

  return (
    <Box pos='fixed' bottom='120px' right='10px' bgColor='white' rounded='3xl' p={2}>
      <HStack>
        <Icon
          w='10'
          h='10'
          color='gray.500'
          as={RiArrowLeftCircleLine}
          onClick={() => {
            if (pageIndex <= 0) {
              toast({
                title: 'No data seems there',
                description: 'No data before current state, my loard',
                status: 'warning',
              })
              return
            }
            setPageIndex(pageIndex - 1)
          }}
          _hover={{ cursor: 'pointer' }}
        />
        <Icon
          w='10'
          h='10'
          color='gray.500'
          as={RiArrowRightCircleLine}
          onClick={() => setPageIndex(pageIndex + 1)}
          _hover={{ cursor: 'pointer' }}
        />
      </HStack>
    </Box>
  )
}
