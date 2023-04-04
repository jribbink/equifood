import { useAuth, useAxios, useMerchant } from '@equifood/ui-shared';
import { Button, VStack, Text, Box } from 'native-base';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

function AccountScreen() {
  const { setJwt } = useAuth();
  const axios = useAxios();
  const { merchant } = useMerchant('self');

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 50,
    },
    error: {
      color: 'red',
    },
  });

  useEffect(() => {
    setName(""+merchant?.name);
    setDescription(""+merchant?.description);
    setPhone(""+merchant?.phone_number);
    setAddress(""+merchant?.location.address);
  }, [merchant]);

  async function updateMerchant() {
    await axios.post('/merchants/$'+merchant?.id+'/update',
    {
      id: merchant?.id,
      name: name,
      banner: merchant?.banner_url,
      logo: merchant?.logo_url,
      description: description,
      phone_number: phone,
      location: {
        address: address,
        latitude: merchant?.location.latitude,
        longitude: merchant?.location.longitude,
      },
    });
  }

  return (
    <VStack>
      <Box padding={5}>
        <Text paddingLeft={5}>Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          placeholder="Change merchant name?"
          value={name}
          testID="nameInput"
          autoCapitalize="none"
          placeholderTextColor={'yellowgreen'}
        />

        <Text paddingLeft={5}>Description:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setDescription}
          placeholder="Change merchant description?"
          value={description}
          testID="descriptionInput"
          autoCapitalize="none"
          placeholderTextColor={'yellowgreen'}
        />

        <Text paddingLeft={5}>Phone:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPhone}
          placeholder="Change merchant phone number?"
          value={phone}
          testID="phoneInput"
          autoCapitalize="none"
          placeholderTextColor={'yellowgreen'}
        />

        <Text paddingLeft={5}>Address:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setAddress}
          placeholder="Change address?"
          value={address}
          testID="addressInput"
          autoCapitalize="none"
          placeholderTextColor={'yellowgreen'}
        />
      </Box>
      <Button
      backgroundColor={'green.900'}
      margin={10}
      onPress={() => updateMerchant()}>Update information</Button>

      <Button
      margin={5}
      marginTop={100}
      onPress={() => setJwt(null)}>Logout</Button>
    </VStack>
  );
}

export default AccountScreen;
