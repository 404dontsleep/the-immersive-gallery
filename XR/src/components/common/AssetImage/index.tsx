import type { ImageProps } from 'antd';
import { Image } from 'antd';

export default function AssetImage({
  ...props
}: ImageProps & { assetsId: number }) {
  return (
    <Image
      src={`/api/public/assets-items/${props.assetsId}/stream`}
      {...props}
    />
  );
}
