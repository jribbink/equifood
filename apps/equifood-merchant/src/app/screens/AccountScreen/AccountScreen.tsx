import { useAuth, useAxios, useMerchant } from '@equifood/ui-shared';
import { Button, VStack, Text, Box } from 'native-base';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

function AccountScreen() {
  const { setJwt } = useAuth();
  const axios = useAxios();
  const { merchant } = useMerchant('self');

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [logo, setLogo] = useState<string>();

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

  const pickLogo = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const bodyFormData = new FormData();
      const response = await fetch(result.uri);

      const blob = await response.blob();
      bodyFormData.append('image', blob);
      setLogo(result.uri);
      const id = await axios({
        method: "post",
        url: "/uploads",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(id);
    }
  };

  async function updateMerchant() {
    await axios.post('/merchants/$' + merchant?.id + '/update', {
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

      {logo && <Image source={{ uri: logo }} style={{ width: 200, height: 200 }} />}
      <Button onPress={pickLogo}>Pick an image from camera roll</Button>
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
