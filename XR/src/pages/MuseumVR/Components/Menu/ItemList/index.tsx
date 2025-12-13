import { itemsService } from '@/services/items.service';
import type { Item } from '@/types';
import { Container, Image, Text } from '@react-three/uikit';
import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@react-three/uikit-default';
import { useCallback } from 'react';
import useSWR from 'swr';

export default function ItemList() {
  const { data: items } = useSWR('items', () => itemsService.getItems());
  const { data: categories } = useSWR('categories', () =>
    itemsService.getCategories(),
  );

  const itemByCategory = useCallback(
    (categoryId: string) => {
      return items?.filter((item) => item.categoryId === categoryId);
    },
    [items],
  );

  return (
    <Container
      display={'flex'}
      flexDirection={'row'}
      flexWrap={'wrap'}
      gap={10}
      width={'100%'}
      height={'100%'}
    >
      <Tabs
        width={'100%'}
        height={'100%'}
        defaultValue="all"
        display={'flex'}
        flexDirection={'column'}
      >
        <TabsList>
          <TabsTrigger value="all">
            <Text>All</Text>
          </TabsTrigger>
          {categories?.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              <Text>{category.name}</Text>
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="all" overflow={'scroll'} flexGrow={1}>
          <Container
            display={'flex'}
            flexDirection={'row'}
            flexWrap={'wrap'}
            gap={10}
          >
            {items?.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </Container>
        </TabsContent>
        {categories?.map((category) => (
          <TabsContent
            key={category.id}
            value={category.id}
            display={'flex'}
            flexDirection={'column'}
            gap={20}
            overflow={'scroll'}
            flexGrow={1}
          >
            <Container display={'flex'} flexDirection={'column'} gap={10}>
              <Text fontSize={20} fontWeight={600}>
                {category.name}
              </Text>
              <Text fontSize={16} fontWeight={400}>
                {category.description}
              </Text>
            </Container>
            <Container
              display={'flex'}
              flexDirection={'row'}
              flexWrap={'wrap'}
              gap={10}
            >
              {itemByCategory(category.id)?.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </Container>
          </TabsContent>
        ))}
      </Tabs>
    </Container>
  );
}

function ItemCard({ item }: { item: Item }) {
  return (
    <Container
      flexGrow={1}
      height={200}
      backgroundColor={'#ffffff'}
      borderRadius={10}
      overflow={'hidden'}
      display={'flex'}
      alignItems={'flex-start'}
      gap={10}
    >
      <Image
        minWidth={200}
        minHeight={200}
        width={200}
        height={200}
        src={item.thumbnailUrl}
        borderLeftRadius={10}
      />
      <Container
        display={'flex'}
        flexDirection={'column'}
        gap={10}
        height={'100%'}
        width={'100%'}
        justifyContent={'space-between'}
      >
        <Container
          display={'flex'}
          flexDirection={'column'}
          gap={10}
          padding={10}
        >
          <Text fontSize={24} fontWeight={600}>
            {item.name}
          </Text>
          <Text fontSize={16} fontWeight={400}>
            {item.description}
          </Text>
        </Container>
        <Container
          display={'flex'}
          alignItems={'center'}
          justifyContent={'flex-end'}
        >
          <Button variant={'link'}>
            <Text>View details</Text>
          </Button>
        </Container>
      </Container>
    </Container>
  );
}
