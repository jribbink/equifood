import { Ionicons } from '@expo/vector-icons';
import { VStack, Text } from 'native-base';
import { ComponentProps } from 'react';
import { TouchableOpacity } from 'react-native';
interface CircleButtonProps {
  iconName: ComponentProps<typeof Ionicons>['name'];
  color: string | undefined;
  text: string;
  onPress: () => void;
}

export function CircleButton({
  iconName,
  color,
  text,
  onPress,
}: CircleButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <VStack alignItems="center">
        <Ionicons name={iconName} color={color} size={100}></Ionicons>
        <Text mt={-3} fontSize="24" fontWeight="bold" color={color}>
          {text}
        </Text>
      </VStack>
    </TouchableOpacity>
  );
}
