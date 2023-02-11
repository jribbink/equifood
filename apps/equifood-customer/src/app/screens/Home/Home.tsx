import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Box, ScrollView, View, VStack } from 'native-base';
import { Merchant } from '@equifood/api-interfaces';
import { CoreNavigationProps } from '../../layouts/CoreLayout/CoreNavigatorParams';
import { MerchantCard, SearchBar } from '@equifood/ui-shared';
import { Appearance } from 'react-native';
import {
  useLocation,
  MerchantMap,
  useMerchants,
  ActionSheet,
  MenuItem,
} from '@equifood/ui-shared';
import { Animated, LayoutRectangle } from 'react-native';
import {
  BottomTabHeaderProps,
  useBottomTabBarHeight,
} from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import {
  Header as BaseHeader,
  getHeaderTitle,
} from '@react-navigation/elements';
import { StackHeaderProps } from '@react-navigation/stack';

const Header: ((props: BottomTabHeaderProps) => ReactNode) &
  ((props: StackHeaderProps) => ReactNode) = ({
  layout,
  options,
  route,
}: BottomTabHeaderProps & StackHeaderProps) => {
  return (
    <View pointerEvents="none">
      <BaseHeader
        {...options}
        layout={layout}
        title={getHeaderTitle(options, route.name)}
      />
    </View>
  );
};

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

let i = 0;

const Home = ({ navigation, route }: CoreNavigationProps<'home'>) => {
  console.log('hello ' + i++);

  const [searchFilter, setSearchFilter] = useState('');
  const [selectedItemKey, setSelectedItemKey] = useState<string | null>(null);
  const { merchants } = useMerchants(searchFilter);

  function onChangeFilter(filter: keyof typeof MerchantFilters) {
    setSelectedItemKey(filter ? String(filter) : null);
  }

  function onMerchantPress(merchant: Merchant) {
    if (oldPoint) {
      setPoint(oldPoint);
      setSearchFilter('');
    }
    navigation.navigate('merchant', { merchant });
  }

  const [oldPoint, setOldPoint] = useState<number | null>(null);

  const userLocation = useLocation();

  const [actionSheetEnabled, setActionSheetEnabled] = useState(true);
  const [point, setPoint] = useState(2);
  const [layout, setLayout] = useState<LayoutRectangle>();

  const tabBarOffset = useState(new Animated.Value(0))[0];
  const tabBarHeight = useBottomTabBarHeight();
  const headerOffset = useState(new Animated.Value(0))[0];
  const headerHeight = useHeaderHeight();

  const mapBottom = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    navigation.setOptions({
      header: Header,
    });
  }, []);

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

  const toggleTabBar = useCallback(
    (state: boolean) => {
      Animated.timing(tabBarOffset, {
        toValue: state ? 0 : tabBarHeight,
        useNativeDriver: true,
        duration: 500,
      }).start();
    },
    [tabBarOffset, tabBarHeight]
  );

  const toggleHeader = useCallback(
    (state: boolean) => {
      Animated.timing(headerOffset, {
        toValue: state ? 0 : -headerHeight,
        useNativeDriver: false,
        duration: 500,
      }).start(() => {});
    },
    [headerHeight, headerOffset]
  );

  useEffect(() => {
    toggleTabBar(point !== 3);
  }, [point, toggleTabBar]);

  useEffect(() => {
    toggleHeader(point !== 3 && point !== 0);
  }, [point, toggleHeader]);

  useEffect(() => {
    setActionSheetEnabled(point !== 0);
    if (point === 0 && !oldPoint) {
      setPoint(1);
    }
  }, [point, oldPoint]);

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
          darkMode={colorScheme === 'dark'}
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
              0,
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
            enabled={actionSheetEnabled}
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
              {/*
                  <ScrollingMenu
                    items={MerchantFilters}
                    selectedKey={selectedItemKey}
                    onChange={onChangeFilter}
                  ></ScrollingMenu>
              */}
              <VStack space="4" px={4}>
                <SearchBar
                  value={searchFilter}
                  onChangeText={setSearchFilter}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                ></SearchBar>
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
