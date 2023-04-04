import React, { useEffect, useState } from 'react';
import { Box, VStack } from 'native-base';
import { Merchant } from '@equifood/api-interfaces';
import { MerchantCard, SearchBar, ScrollingSheet } from '@equifood/ui-shared';
import { Appearance, View } from 'react-native';
import { useLocation, MerchantMap, useMerchants } from '@equifood/ui-shared';
import { LayoutRectangle } from 'react-native';
import { TabNavigationProps } from '../TabLayout';
import { useAnimatedProps, useSharedValue } from 'react-native-reanimated';

function HomeScreen({ navigation }: TabNavigationProps<'home'>) {
  const userLocation = useLocation();
  const [searchFilter, setSearchFilter] = useState('');
  const { merchants } = useMerchants(searchFilter);

  function onMerchantPress(merchant: Merchant) {
    if (oldPoint) {
      setPoint(oldPoint);
      setSearchFilter('');
    }
    navigation.navigate('merchant', { merchant });
  }

  const [oldPoint, setOldPoint] = useState<number | null>(null);

  const [point, setPoint] = useState(2);
  const [layout, setLayout] = useState<LayoutRectangle>();

  const colorScheme = Appearance.getColorScheme();

  function handleSearchFocus() {
    setOldPoint(point);
    setPoint(0);
  }

  function handleSearchBlur() {
    if (!oldPoint) return;
    setPoint(oldPoint);
    setOldPoint(null);
  }

  const paddingBottom = useSharedValue(0);
  const layoutHeight = useSharedValue(0);

  useEffect(() => {
    layoutHeight.value = layout?.height ?? 0;
  }, [layout, layoutHeight]);

  const mapViewProps = useAnimatedProps(() => ({
    mapPadding: {
      bottom: layoutHeight.value - paddingBottom.value,
      left: 0,
      right: 0,
      top: 0,
    },
  }));

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
      onLayout={(e) => setLayout(e.nativeEvent.layout)}
      testID="home-screen"
    >
      <ScrollingSheet paddingBottom={paddingBottom}>
        {{
          background: userLocation ? (
            <MerchantMap
              paddingBottom={paddingBottom}
              merchants={merchants}
              darkMode={colorScheme === 'dark'}
              initialRegion={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              mapViewProps={{
                animatedProps: mapViewProps,
              }}
              onMerchantPress={(merchant) =>
                navigation.navigate('merchant', { merchant })
              }
            ></MerchantMap>
          ) : null,
          foreground: (
            <VStack space="4" px={4}>
              {(merchants || []).map((m) => (
                <Box key={m.id} shadow="2">
                  <MerchantCard
                    merchant={m}
                    onPress={() => onMerchantPress(m)}
                  ></MerchantCard>
                </Box>
              ))}
            </VStack>
          ),
          header: (
            <SearchBar
              value={searchFilter}
              onChangeText={setSearchFilter}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
            ></SearchBar>
          ),
        }}
      </ScrollingSheet>
    </View>
  );
}

export default HomeScreen;
