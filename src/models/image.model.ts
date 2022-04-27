export interface ImageData {
	src: string;
	srcset?: string;
	alt: string;
	id?: string;
	lazy?: boolean;
}

// only optionals
export const ImageDataProps: (keyof ImageData)[] = ['src', 'alt'];
