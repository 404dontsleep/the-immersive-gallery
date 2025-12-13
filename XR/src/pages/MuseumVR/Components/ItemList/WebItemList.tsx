import { Fullscreen, Container, Image, Text } from '@react-three/uikit';
import { Button } from '@react-three/uikit-default';
import { EyeClosed, Eye } from '@react-three/uikit-lucide';
import type { Item } from '@/types';
import React from 'react';

export default function WebItemList({
  items,
  onItemClick,
  onShowItemList,
  isShowItemList,
}: {
  items: Item[];
  onItemClick: (item: Item) => void;
  onShowItemList: (isShow: boolean) => void;
  isShowItemList: boolean;
}) {
  const WebItemListContent = React.memo(() => {
    return (
      <group>
        <Fullscreen
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Container
            backgroundColor={'#ffffff'}
            borderRadius={10}
            overflow={'scroll'}
            maxWidth={'100%'}
            maxHeight={'80%'}
            padding={20}
            margin={20}
            display={'flex'}
            flexDirection={'row'}
            gap={10}
            flexWrap={'wrap'}
          >
            {items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onClick={() => onItemClick(item)}
              />
            ))}
          </Container>
        </Fullscreen>
      </group>
    );
  });

  return (
    <Fullscreen
      depthTest={false}
      display={'flex'}
      alignItems={'flex-end'}
      justifyContent={'center'}
      positionType={'relative'}
    >
      <Button
        positionType={'absolute'}
        positionTop={20}
        positionRight={20}
        onClick={() => onShowItemList(!isShowItemList)}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        gap={10}
      >
        {isShowItemList ? <EyeClosed /> : <Eye />}
        <Text>{isShowItemList ? 'Hide Item List' : 'Show Item List'}</Text>
      </Button>
      {isShowItemList && <WebItemListContent />}
    </Fullscreen>
  );
}

function ItemCard({ item, onClick }: { item: Item; onClick: () => void }) {
  return (
    <Container
      backgroundColor={'#ffffff'}
      borderRadius={10}
      overflow={'hidden'}
      padding={10}
      onClick={onClick}
      display={'flex'}
      flexDirection={'column'}
      gap={10}
      minWidth={220}
    >
      <Image width={200} src={item.thumbnailUrl} />
      <Text maxWidth={200} overflow={'hidden'}>
        {item.name}
      </Text>
    </Container>
  );
}
