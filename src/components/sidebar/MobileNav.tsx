import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Flex, HStack, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import { FiBell, FiChevronDown, FiMenu } from 'react-icons/fi'
import { useAtom } from 'jotai'
import { useLocation } from 'react-recipes'

import { MobileProps } from '@/types'
import { authAtom } from '@/app/store'

function MobileNav({ onOpen, ...rest }: MobileProps) {
	const navigate = useNavigate();
  const [auth ,setAuth] = useAtom(authAtom)
	const { pathname } = useLocation()

	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height="20"
			alignItems="center"
			bg={useColorModeValue('white', 'gray.900')}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
			justifyContent={{ base: 'space-between', md: 'flex-end' }}
			{...rest}
		>
			<IconButton display={{ base: 'flex', md: 'none' }} onClick={onOpen} variant="outline" aria-label="open menu" icon={<FiMenu />} />

			<Text display={{ base: 'flex', md: 'none' }} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
				PocketRSS
			</Text>

			<HStack spacing={{ base: '0', md: '6' }}>
				<IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
				<Flex alignItems="center">
					<Menu>
						<MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
							<HStack>
								<Avatar
									size="sm"
									src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
								/>
								<VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
									<Text fontSize="sm">{auth.username}</Text>
									<Text fontSize="xs" color="gray.600">
										Admin
									</Text>
								</VStack>
								<Box display={{ base: 'none', md: 'flex' }}>
									<FiChevronDown />
								</Box>
							</HStack>
						</MenuButton>
						<MenuList bg={useColorModeValue('white', 'gray.900')} borderColor={useColorModeValue('gray.200', 'gray.700')}>
							<MenuItem isDisabled={true}>Profile</MenuItem>
							<MenuItem isDisabled={true}>Settings</MenuItem>
							<MenuDivider />
							<MenuItem onClick={() => {
								setAuth({ username: '', token: '' })
								// navigate('/signin')
								window.location.href = `/oauth/authorize?redirect_uri=${pathname}`
							}}>Sign out</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</HStack>
		</Flex>
	);
}

export default MobileNav;
