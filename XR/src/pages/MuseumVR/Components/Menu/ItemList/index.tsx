import { itemsService } from '@/services/items.service';
import { Container, Text } from '@react-three/uikit';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@react-three/uikit-default';
import { useCallback } from 'react';
import useSWR from 'swr';
import ItemCard from './ItemCard';

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
