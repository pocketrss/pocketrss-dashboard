import { LinkItemProps } from '@/types';
import {
	Box,
	useColorModeValue,
	Drawer,
	DrawerContent,
	useDisclosure,
} from '@chakra-ui/react';
import { ReactNode } from 'react'

import MobileNav from './MobileNav'
import SidebarContent from './SidebarContent'

function SidebarWithHeader({ children, linkItems }: { children: ReactNode, linkItems: Array<LinkItemProps> }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
			<SidebarContent linkItems={linkItems} onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full"
			>
				<DrawerContent>
					<SidebarContent linkItems={linkItems} onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			<MobileNav onOpen={onOpen} />
			<Box ml={{ base: 0, md: 60 }} p="4">
				{children}
			</Box>
		</Box>
	);
}

export default SidebarWithHeader
