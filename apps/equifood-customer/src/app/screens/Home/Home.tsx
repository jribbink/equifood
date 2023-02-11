import React, { useEffect, useRef, useState } from 'react';
import { Box, ScrollView, View, VStack } from 'native-base';
import { Merchant } from '@equifood/api-interfaces';
import { CoreNavigationProps } from '../../layouts/CoreLayout/CoreNavigatorParams';
import { MerchantCard } from '@equifood/ui-shared';
import { Appearance, StyleSheet, TextInput } from 'react-native';
import {
  useLocation,
  MerchantMap,
  useMerchants,
  ActionSheet,
  MenuItem,
} from '@equifood/ui-shared';
import { Animated, LayoutRectangle } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';

const MerchantFilters: { [key: string]: MenuItem } = {
  burgers: {
    name: 'Burgers',
  },
  pizza: {
    name: 'Pizza',
  },
  chicken: {
    name: 'Chicken',
  },
};

const Home = ({ navigation }: CoreNavigationProps<'home'>) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedItemKey, setSelectedItemKey] = useState<string | null>(null);
  const { merchants } = useMerchants(searchFilter);

  function onChangeFilter(filter: keyof typeof MerchantFilters) {
    setSelectedItemKey(filter ? String(filter) : null);
  }

  function onMerchantPress(merchant: Merchant) {
    navigation.navigate('merchant', { merchant });
  }

  const userLocation = useLocation();

  const [point, setPoint] = useState(1);
  const [layout, setLayout] = useState<LayoutRectangle>();

  const tabBarOffset = useState(new Animated.Value(0))[0];
  const tabBarHeight = useBottomTabBarHeight();
  const headerOffset = useState(new Animated.Value(0))[0];
  const headerHeight = useHeaderHeight();

  const mapBottom = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: {
        position: 'absolute',
        transform: [{ translateY: tabBarOffset }],
      },
      headerStyle: {
        transform: [{ translateY: headerOffset }],
      },
    });
  }, [navigation, headerOffset, tabBarOffset]);

  useEffect(() => {
    Animated.timing(tabBarOffset, {
      toValue: point !== 2 ? 0 : tabBarHeight,
      useNativeDriver: true,
      duration: 500,
    }).start();
  }, [point, tabBarHeight, tabBarOffset]);

  useEffect(() => {
    Animated.timing(headerOffset, {
      toValue: point !== 2 ? 0 : -headerHeight,
      useNativeDriver: false,
      duration: 500,
    }).start();
  }, [point, headerHeight, headerOffset]);

  const colorScheme = Appearance.getColorScheme();

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 50,
    },
  });

  return (
    <View
      style={{
        position: 'absolute',
        top: -headerHeight,
        bottom: 0,
        left: 0,
        right: 0,
      }}
      onLayout={(e) => setLayout(e.nativeEvent.layout)}
      testID="home-screen"
    >
      {userLocation ? (
        <MerchantMap
          merchants={merchants}
          darkMode={colorScheme == 'dark'}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={{
            position: 'absolute',
            top: headerOffset,
            bottom: mapBottom,
            left: 0,
            right: 0,
          }}
          onMerchantPress={(merchant) =>
            navigation.navigate('merchant', { merchant })
          }
        ></MerchantMap>
      ) : null}
      {layout?.height ? (
        <Box
          position="absolute"
          top="0"
          right="0"
          left="0"
          bottom="0"
          flexDirection="column"
          justifyContent="flex-end"
          pointerEvents="box-none"
          overflow="visible"
        >
          <ActionSheet
            point={point}
            points={[
              headerHeight,
              headerHeight +
                (layout.height - headerHeight - tabBarHeight) * 0.35,
              layout.height - 100,
            ]}
            onPointChange={setPoint}
            onTranslateYChange={(translateY) => {
              Animated.event([mapBottom], { useNativeDriver: false })(
                layout.height - translateY
              );
            }}
            h="full"
            offset={100}
            padding="0"
            paddingTop="30"
          >
            <ScrollView
              height={layout?.height}
              testID="home-screen"
              bounces={false}
            >
              {
                <TextInput
                  style={styles.input}
                  onChangeText={setSearchFilter}
                  placeholder="Search"
                  value={searchFilter}
                  testID="searchInput"
                  autoCapitalize="none"
                />
                /*<ScrollingMenu
                items={MerchantFilters}
                selectedKey={selectedItemKey}
                onChange={onChangeFilter}
          ></ScrollingMenu>*/
              }
              <VStack space="4" m="4">
                {(merchants || []).map((m) => (
                  <Box key={m.id} shadow="2">
                    <MerchantCard
                      merchant={m}
                      onPress={() => onMerchantPress(m)}
                    ></MerchantCard>
                  </Box>
                ))}
              </VStack>
            </ScrollView>
          </ActionSheet>
        </Box>
      ) : null}
    </View>
  );
};

export default Home;
