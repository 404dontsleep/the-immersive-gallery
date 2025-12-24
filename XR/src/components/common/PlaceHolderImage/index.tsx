import type { ImageProps } from 'antd';
import { Image } from 'antd';

export type PlaceHolderImageProps = {} & ImageProps;
export default function PlaceHolderImage({ ...props }: PlaceHolderImageProps) {
  return (
    <Image
      fallback={`https://placehold.co/600x400/?text=${props.src}`}
      {...props}
    />
  );
}
