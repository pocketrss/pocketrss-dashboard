import { Button, Image, Link, UnderlineLink } from '@/components'

import react_icon from '@/assets/react.svg'
import { useTheme } from '@/hooks'
import { twclsx } from '@/utils'

import { HiMoon, HiSun } from 'react-icons/hi'
import { IoLogoGithub } from 'react-icons/io5'
import { RiHome4Line, RiRssLine, RiNewspaperLine, RiHeart2Line, RiSettings4Line } from 'react-icons/ri'
import { Box, Flex, HStack, Icon, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup } from '@chakra-ui/react'
import { DateTime } from 'luxon'

const Home: React.FunctionComponent = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <HStack>
      <Stat px={{ base: 2, md: 4 }} py={5} borderRadius='md' bgColor='white'>
        <Flex justifyContent='space-between'>
          <Box>
            <StatLabel>Feeds</StatLabel>
            <StatNumber>20</StatNumber>
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
            <StatNumber>20</StatNumber>
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
