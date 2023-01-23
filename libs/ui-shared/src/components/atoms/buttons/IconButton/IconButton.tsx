import Ionicons from '@expo/vector-icons/Ionicons';
import { Box, Image, Text } from 'native-base';
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box';
import { GestureResponderEvent, ImageSourcePropType } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
interface IconButtonProps extends InterfaceBoxProps {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  title: string;
  size?: number;
  fontSize?: number;
  borderRadius?: number;
  iconProps: Partial<React.ComponentProps<typeof Ionicons>>;
  onPress?: ((event: GestureResponderEvent) => void) & (() => void);
  textColor?: React.ComponentProps<typeof Text>['color'];
  imageSource: ImageSourcePropType;
  imageAlt: string;
}

export function IconButton({
  icon,
  title,
  size,
  fontSize,
  borderRadius = 9999,
  iconProps,
  onPress,
  textColor = 'black',
  imageSource,
  imageAlt,
  ...props
}: IconButtonProps) {
  return (
    <TouchableHighlight onPress={onPress} style={{ borderRadius }}>
      <Box
        flexDirection="row"
        alignItems="center"
        style={{ borderRadius }}
        {...props}
      >
        <Image
          source={imageSource}
          alt={imageAlt}
          width={size}
          height={size}
          resizeMode="contain"
        ></Image>
        <Box
          position="absolute"
          left="0"
          right="0"
          bottom="0"
          top="0"
          justifyContent="center"
          alignContent="center"
        >
          <Text mx="auto" fontSize={fontSize} color={textColor}>
            {title}
          </Text>
        </Box>
      </Box>
    </TouchableHighlight>
  );
}