import { Item } from '@equifood/api-interfaces';
import { Box, Text } from 'native-base';
import { useState } from 'react';
import { RootNavigationProps } from '../../layouts/RootLayout';

function ItemEditorScreen({ route }: RootNavigationProps<'itemEditor'>) {
  const [item, setItem] = useState<Partial<Item>>(route.params?.item ?? {});

  return (
    <Box>
      <Text>{item.id}</Text>
    </Box>
  );
}

export default ItemEditorScreen;
