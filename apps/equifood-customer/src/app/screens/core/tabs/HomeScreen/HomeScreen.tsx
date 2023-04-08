import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Box, Heading, HStack, Spinner, VStack } from 'native-base';
import { Merchant } from '@equifood/api-interfaces';
import { MerchantCard, SearchBar, ScrollingSheet } from '@equifood/ui-shared';
import { Appearance, View } from 'react-native';
import { useLocation, MerchantMap, useMerchants } from '@equifood/ui-shared';
import { LayoutRectangle } from 'react-native';
import { TabNavigationProps } from '../TabLayout';
import { useAnimatedProps, useSharedValue } from 'react-native-reanimated';
import { TextInput } from 'react-native-gesture-handler';
import { EventArg } from '@react-navigation/native';

function HomeScreen({ navigation }: TabNavigationProps<'home'>) {
  const userLocation = useLocation();
  const [searchFilter, setSearchFilter] = useState('');
  const { merchants, isLoading: areMerchantsLoading } =
    useMerchants(searchFilter);
  const [mapSelectedMerchant, setMapSelectedMerchant] =
    useState<Merchant | null>(null);

  const [point, setPoint] = useState<0 | 1>(1);
  const [layout, setLayout] = useState<LayoutRectangle>();
  const [sheetDisabled, setSheetDisabled] = useState(false);
  const searchBarRef = createRef<TextInput>();

  const paddingBottom = useSharedValue(0);
  const layoutHeight = useSharedValue(0);

  const colorScheme = Appearance.getColorScheme();

  const _point = useRef<0 | 1>(1);
  const _oldPoint = useRef<0 | 1 | null>(null);

  useEffect(() => {
    _point.current = point;
  }, [point]);

  const onSearchActiveChange = useCallback(
    function (state: boolean) {
      if (state) {
        _oldPoint.current = _point.current;
        setPoint(1);
        setSheetDisabled(true);
      } else {
        if (_oldPoint.current === null) return;
        setPoint(_oldPoint.current);
        _oldPoint.current = null;
        setSheetDisabled(false);
      }
    },
    [setPoint, setSheetDisabled, _oldPoint, _point]
  );

  const onMerchantPress = useCallback(
    function (merchant: Merchant) {
      if (_oldPoint.current) {
        setPoint(_oldPoint.current);
        setSearchFilter('');
      }
      navigation.navigate('merchant', { merchant });
    },
    [_oldPoint, setPoint, setSearchFilter, navigation]
  );

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
      {layout ? (
        <ScrollingSheet
          paddingBottom={paddingBottom}
          point={point}
          onPointChange={setPoint}
          width={layout?.width}
          height={layout?.height}
          disabled={sheetDisabled}
        >
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
                selectedMerchant={mapSelectedMerchant}
                onMerchantChange={setMapSelectedMerchant}
                onTouchStart={() => searchBarRef.current?.blur()}
              ></MerchantMap>
            ) : null,
            foreground: (
              <VStack space="4" px={4}>
                {merchants && !areMerchantsLoading ? (
                  merchants.map((m) => (
                    <Box key={m.id} shadow="2">
                      <MerchantCard
                        merchant={m}
                        onPress={() => onMerchantPress(m)}
                      ></MerchantCard>
                    </Box>
                  ))
                ) : (
                  <HStack
                    paddingTop="4"
                    space={2}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Spinner
                      size="lg"
                      accessibilityLabel="Loading merchants"
                      color="black"
                    />
                    <Heading color="black" fontSize="lg">
                      Searching...
                    </Heading>
                  </HStack>
                )}
              </VStack>
            ),
            header: (
              <SearchBar
                value={searchFilter}
                onChangeText={setSearchFilter}
                onActiveChange={onSearchActiveChange}
                ref={searchBarRef}
              ></SearchBar>
            ),
          }}
        </ScrollingSheet>
      ) : null}
    </View>
  );
}

export default HomeScreen;
