import { LinkItemProps } from '@/types';
import { FiHome, FiStar, FiSettings, FiRss, FiLayers } from 'react-icons/fi';

const LinkItems: Array<LinkItemProps> = [
	{ name: 'Home', icon: FiHome, url: '/' },
	{ name: 'Feeds', icon: FiRss, url: '/feeds' },
	{ name: 'Entries', icon: FiLayers, url: '/' },
	{ name: 'Favourites', icon: FiStar, url: '/' },
	{ name: 'Settings', icon: FiSettings, url: '/' },
];

export default LinkItems
