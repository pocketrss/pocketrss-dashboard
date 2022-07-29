import {
	Box,
	CloseButton,
	Flex,
	useColorModeValue,
	Text,
} from '@chakra-ui/react';
import { SidebarProps } from '@/types'
import NavItem from './NavItem'

function SidebarContent({ onClose, linkItems, ...rest }: SidebarProps) {
	return (
		<Box
			transition="3s ease"
			bg={useColorModeValue('white', 'gray.900')}
			borderRight="1px"
			borderRightColor={useColorModeValue('gray.200', 'gray.700')}
			w={{ base: 'full', md: 60 }}
			pos="fixed"
			h="full"
			{...rest}
		>
			<Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
				<Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
					PocketRSS
				</Text>
				<CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
			</Flex>
			{linkItems.map((link) => (
				<NavItem key={link.name} icon={link.icon} url={link.url}>
					{link.name}
				</NavItem>
			))}
		</Box>
	);
}

export default SidebarContent
