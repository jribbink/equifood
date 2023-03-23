import { User } from '@equifood/api-interfaces';
import { Text, View } from 'native-base';
import { equifoodTheme } from '../../../atoms';

export function ProfileCard({ user }: { user: User }) {
  return (
    <View
      style={{
        width: '100%',
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <Text
        style={{
          fontWeight: 'bold',
          marginTop: 20,
          fontSize: 30,
          padding: 10,
          color: equifoodTheme.colors.primary[900],
        }}
      >
        {` `}
        {user.first_name} {user.last_name}
      </Text>
      <Text
        style={{
          paddingLeft: 20,
          fontWeight: 'bold',
          color: 'gray',
        }}
      >
        {user.phone}
      </Text>
      <Text
        style={{
          fontWeight: 'bold',
          marginTop: 5,
          fontSize: 15,
          padding: 20,
          color: 'black',
        }}
      >
        {user.email}
      </Text>
    </View>
  );
}
