import React, { useEffect } from 'react';
import { Divider, Text, ScrollView } from 'native-base';
import { Button, View } from 'react-native';
import { Merchant } from '@equifood/api-interfaces';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { getMerchants } from '../../redux/slices/merchant-slice';
import { AppDispatch, RootState } from '../../redux/store';
import { CoreNavigationProps } from '../../layouts/CoreLayout/CoreNavigatorParams';

const Home = ({ navigation }: CoreNavigationProps<'home'>) => {
  const store = useStore<RootState>();
  const dispatch = useDispatch<AppDispatch>();

  const merchants = useSelector<RootState, Merchant[]>(
    () => store.getState().merchants.merchants
  );

  useEffect(() => {
    dispatch(getMerchants());
  }, [dispatch]);

  return (
    <ScrollView testID="home-screen">
      <ScrollView horizontal={true}>
        <Button title="Food Type A" color="#AADB1E" />
        <Button title="Food Type B" color="#AADB1E" />
        <Button title="Food Type C" color="#AADB1E" />
        <Button title="Food Type D" color="#AADB1E" />
        <Button title="Food Type E" color="#AADB1E" />
      </ScrollView>

      <Divider my={8}></Divider>

      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 40,
          padding: 20,
          textAlign: 'center',
        }}
      >
        Food Type
      </Text>
      <View style={[{ width: '80%', margin: 40 }]}>
        <Button
          title="Restaurant 1"
          color="gray"
          onPress={() => navigation.navigate('account')}
        />
      </View>
      <View style={[{ width: '80%', margin: 40 }]}>
        <Button
          title="Restaurant 2"
          color="gray"
          onPress={() =>
            navigation.navigate('merchant', { merchant: { name: 'test' } })
          }
        />
      </View>
      <View style={[{ width: '80%', margin: 40 }]}>
        <Button title="Restaurant 3" color="gray" />
      </View>
      <View style={[{ width: '80%', margin: 40 }]}>
        <Button title="Restaurant 4" color="gray" />
      </View>
      <View style={[{ width: '80%', margin: 40 }]}>
        <Button title="Restaurant 5" color="gray" />
      </View>
      <View style={[{ width: '80%', margin: 40 }]}>
        <Button title="Restaurant 6" color="gray" />
      </View>
    </ScrollView>
  );
};

export default Home;
