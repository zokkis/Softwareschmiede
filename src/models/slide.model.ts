import { ImageData } from './image.model';

export interface SlideData {
	title: string;
	href: string;
	imgs: ImageData[];
}

export const SlideDataProps: (keyof SlideData)[] = ['title', 'href', 'imgs'];
