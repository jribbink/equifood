import {
  LocationInput,
  useAuth,
  useAxios,
  useMerchant,
} from '@equifood/ui-shared';
import { Button, VStack, Text, Box } from 'native-base';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { background } from 'native-base/lib/typescript/theme/styled-system';

function AccountScreen() {
  const { setJwt } = useAuth();
  const axios = useAxios();
  const { merchant } = useMerchant('self');

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [logo, setLogo] = useState<string>();
  const [banner, setBanner] = useState<string>();

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
    setName('' + merchant?.name);
    setDescription('' + merchant?.description);
    setPhone('' + merchant?.phone_number);
    setAddress('' + merchant?.location.address);
  }, [merchant]);

  const pickBanner = async () => {
    // No permissions request is necessary for launching the image library
    return null;
  };

  const pickLogo = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      const bodyFormData = new FormData();

      bodyFormData.append('file', {
        uri: result.assets[0].uri,
        name: result.assets[0].fileName ?? 'logo.png',
        type: 'image',
      } as any);

      setLogo(result.assets[0].uri);

      const { data: uploadToken } = await axios.get<string>(
        '/merchants/self/logo/nonce'
      );

      await axios.post('/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'upload-token': uploadToken,
        },
      });
    }
  };

  async function updateMerchant() {
    await axios.patch(`/merchants/self`, {
      description: description,
      phone_number: phone,
    });
  }

  return (
    <VStack>
      <Box padding={5}>
        <Box>
          {logo && (
            <Image source={{ uri: logo }} style={{ width: 100, height: 100 }} />
          )}
          <Button onPress={pickLogo}>Change Logo?</Button>
        </Box>
        <Box marginTop={50}>
          {banner && (
            <Image
              source={{ uri: banner }}
              style={{ width: 300, height: 150 }}
            />
          )}
          <Button onPress={pickBanner}>Change Banner?</Button>
        </Box>
        <Text marginTop={50} paddingLeft={5}>
          Name:
        </Text>
        <Text paddingLeft={5} fontWeight="bold">
          {merchant?.name}
        </Text>

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
        <LocationInput></LocationInput>
      </Box>
      <Button
        backgroundColor={'green.900'}
        margin={10}
        onPress={() => updateMerchant()}
      >
        Update information
      </Button>

      <Button margin={5} marginTop={100} onPress={() => setJwt(null)}>
        Logout
      </Button>
    </VStack>
  );
}

export default AccountScreen;
