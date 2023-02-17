import { Box, Modal, Text } from 'native-base';

interface ItemEditorModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

function ItemEditorModal({ isOpen, onClose }: ItemEditorModalProps) {
  return (
    <Box>
      <Text>Hello world</Text>
    </Box>
  );
}

export default ItemEditorModal;
