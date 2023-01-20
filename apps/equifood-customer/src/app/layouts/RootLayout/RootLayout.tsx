import React, { useEffect, useState } from 'react';
import { useSelector, useStore } from 'react-redux';
import { RootState } from '../../redux/store';

import CoreLayout from '../CoreLayout/CoreLayout';
import { Animated, Dimensions } from 'react-native';
import { Box } from 'native-base';
import AuthLayout from '../AuthLayout/AuthLayout';

const RootLayout = () => {
  const store = useStore<RootState>();
  const jwt = useSelector<RootState, string | null>(
    () => store.getState().auth.jwt
  );
  const [loggedIn, setLoggedIn] = useState(!!jwt);
  useEffect(() => {
    setLoggedIn(!!jwt);
  }, [jwt]);

  const [showLogin, setShowLogin] = useState(false);
  const [showCore, setShowCore] = useState(false);
  const topLogin = useState(new Animated.Value(0))[0];
  const topCore = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (!showLogin && !showCore) {
      if (loggedIn) {
        setShowCore(true);
      } else {
        setShowLogin(true);
      }
    } else {
      setShowLogin(true);
      setShowCore(true);

      const candidatesShow: [boolean, React.Dispatch<boolean>][] = [
        [showLogin, setShowLogin],
        [showCore, setShowCore],
      ];
      const candidatesTop: Animated.Value[] = [topLogin, topCore];
      const [, setShowOther] = candidatesShow[Number(!loggedIn)];
      const topTarget = candidatesTop[Number(loggedIn)];
      const topOther = candidatesTop[Number(!loggedIn)];

      topOther.setValue(0);
      topTarget.setValue(Dimensions.get('window').height);

      Animated.timing(topTarget, {
        toValue: 0,
        duration: 750,
        useNativeDriver: true,
      }).start(() => {
        setShowOther(false);
      });
    }

    if (loggedIn && showLogin) return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  return (
    <Box flex={1}>
      {showCore ? (
        <Animated.View
          style={{
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: '100%',
            transform: [{ translateY: topCore }],
            zIndex: Number(loggedIn),
          }}
        >
          <CoreLayout></CoreLayout>
        </Animated.View>
      ) : null}

      {showLogin ? (
        <Animated.View
          style={{
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            transform: [{ translateY: topLogin }],
            zIndex: Number(!loggedIn),
          }}
        >
          <AuthLayout></AuthLayout>
        </Animated.View>
      ) : null}
    </Box>
  );
};

export default RootLayout;
