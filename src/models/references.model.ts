import { ImageData } from './image.model';

export interface ReferencData {
	title: string;
	id: string;
	data: { text: string; imgs: ImageData[]; id?: string }[];
}

export const ReferencDataProps: (keyof ReferencData)[] = ['title', 'id', 'data'];
