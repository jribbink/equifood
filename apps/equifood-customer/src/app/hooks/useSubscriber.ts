import { useRef } from 'react';

function useSubscriber() {
  const ws = useRef(new WebSocket()).current;
}

export default useSubscriber;
