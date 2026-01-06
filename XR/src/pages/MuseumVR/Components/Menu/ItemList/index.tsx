import { Container, Text } from '@react-three/uikit';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@react-three/uikit-default';
import ItemCard from './ItemCard';
import useItemContext from '@/stores/ItemContext/useItemContext';
import { useLanguageStore } from '@/stores/language.store';
import { useCallback } from 'react';

export default function ItemList() {
  const { items, categories } = useItemContext();
  const { getLanguage } = useLanguageStore();
  const itemByCategory = useCallback(
    (categoryId: string) => {
      return items?.filter((item) => item.category.id === Number(categoryId));
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
        <TabsList height={80}>
          <TabsTrigger value="all" height={'100%'}>
            <Text>{getLanguage('ALL')}</Text>
          </TabsTrigger>
          {categories?.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id.toString()}
              height={'100%'}
            >
              <Text>{getLanguage(category.name)}</Text>
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
            value={category.id.toString()}
            display={'flex'}
            flexDirection={'column'}
            gap={20}
            overflow={'scroll'}
            flexGrow={1}
          >
            <Container display={'flex'} flexDirection={'column'} gap={10}>
              <Text fontSize={20} fontWeight={600}>
                {getLanguage(category.name)}
              </Text>
              <Text fontSize={16} fontWeight={400}>
                {getLanguage(category.description)}
              </Text>
            </Container>
            <Container
              display={'flex'}
              flexDirection={'row'}
              flexWrap={'wrap'}
              gap={10}
            >
              {itemByCategory(category.id.toString())?.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </Container>
          </TabsContent>
        ))}
      </Tabs>
    </Container>
  );
}
