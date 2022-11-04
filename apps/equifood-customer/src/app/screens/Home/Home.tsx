import React, { useEffect } from 'react';
import { Divider, Text, VStack, ScrollView } from 'native-base';
import { StyleSheet, Button, View, SafeAreaView, Alert } from 'react-native';
import MerchantCard from '../../components/cards/MerchantCard/MerchantCard';
import { Merchant } from '@equifood/api-interfaces';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { getMerchants } from '../../redux/slices/merchant-slice';
import { AppDispatch, RootState } from '../../redux/store';

const Home = () => {
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
      <Button
        title="Food Type A"
        color="#AADB1E"
      />
      <Button
        title="Food Type B"
        color="#AADB1E"
      />
      <Button
        title="Food Type C"
        color="#AADB1E"
      />
      <Button
        title="Food Type D"
        color="#AADB1E"
      />
      <Button
        title="Food Type E"
        color="#AADB1E"
      />
      </ScrollView>

      <Divider my={8}></Divider>
      
      <Text style={{fontWeight: 'bold', fontSize:40, padding:20, textAlign:"center"}} >
        Food Type
      </Text>
      <View style={[{ width: "80%", margin: 40 }]}>
          <Button
            title="Restaurant 1"
            color="gray"
          />
      </View>
      <View style={[{ width: "80%", margin: 40 }]}>
          <Button
            title="Restaurant 2"
            color="gray"
          />
      </View>
      <View style={[{ width: "80%", margin: 40 }]}>
          <Button
            title="Restaurant 3"
            color="gray"
          />
      </View>
      <View style={[{ width: "80%", margin: 40 }]}>
          <Button
            title="Restaurant 4"
            color="gray"
          />
      </View>
      <View style={[{ width: "80%", margin: 40 }]}>
          <Button
            title="Restaurant 5"
            color="gray"
          />
      </View>
      <View style={[{ width: "80%", margin: 40 }]}>
          <Button
            title="Restaurant 6"
            color="gray"
          />
      </View>

      <VStack space={3} paddingX={2}>
        {merchants.map((merchant) => (
          <MerchantCard merchant={merchant} key={merchant.id}></MerchantCard>
        ))}
      </VStack>
    </ScrollView>
  );
};

export default Home;
