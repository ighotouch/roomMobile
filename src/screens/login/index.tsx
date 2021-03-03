import React, {
  useState,
  useLayoutEffect,
  FunctionComponent,
  useEffect,
  useRef,
} from 'react';
import {View, Keyboard, Image, Text, Alert} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import * as Keychain from 'react-native-keychain';
import ReactNativeBiometrics from 'react-native-biometrics';
import {Colors, Fonts} from '../../common';
import AlertFlag from '../../components/AlertFlag';
import Divider from '../../components/Divider';
import Input, {MyInputHandles} from '../../components/Input';
import ScrollableContainer from '../../components/ScrollableContainer';
import TouchableButton from '../../components/TouchableButton';
import {RootStackParamList} from '../../navigation/routes';
import {useLoginDispatch, useLoginState} from 'src/contexts/loginContext';
import {SharedPref} from 'src/common/SharedPref';
import AsyncStorage from '@react-native-community/async-storage';
import SafeAreaView from 'react-native-safe-area-view';
import {useGlobalDispatch, useGlobalState} from 'src/contexts/globalContext';
import {checkInputValidation} from 'src/common/Utilities';
import VectorIcon from 'src/components/VictorIcon';
import {IProfile} from 'src/interfaces/global';
import {useFocusEffect} from '@react-navigation/native';

const wink = require('../../images/wink.png');
const emailIcon = require('../../images/md-mail.png');
const lockIcon = require('../../images/md-lock-closed.png');

type Props = StackScreenProps<RootStackParamList, 'Intro'>;

const Login: FunctionComponent<Props> = ({navigation}) => {
  const {setBiometry, resetBiometry} = useGlobalDispatch();
  const {biometryType, biometry} = useGlobalState();
  const {} = useLoginState();
  const {login} = useLoginDispatch();
  const usernameRef = useRef<MyInputHandles>(null);
  const passwordRef = useRef<MyInputHandles>(null);
  const [username, setUsername] = useState<string | null>();
  const [password, setPassword] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<IProfile | null>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => (
        <Text style={{fontFamily: Fonts.AVERTA_EXTRABOLD}}>theRoom</Text>
      ),
      headerBackTitle: 'Back',
    });
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      const load = async () => {
        const prof = await SharedPref.restoreProfileData();
        if (prof) {
          setProfile(prof);
        }
        const userN = await SharedPref.restoreUsername();
        setUsername(userN);
      };

      load();

      AsyncStorage.getItem('biometricLogin', (err, result) => {
        if (!result) {
          AsyncStorage.setItem('biometricLogin', 'true');
          Keychain.resetGenericPassword();
          AsyncStorage.removeItem('biometrics');
          AsyncStorage.removeItem('biometricPIN');
          setBiometry(false);
        }
      });

      SharedPref.getBiometrics().then((result) => {
        if (result && result === 'enabled') {
          setBiometry(true);
        }
      });
    }, []),
  );

  useEffect(() => {
    const load = async () => {
      const prof = await SharedPref.restoreProfileData();
      if (prof) {
        setProfile(prof);
      }
      const userN = await SharedPref.restoreUsername();
      setUsername(userN);
    };

    load();

    AsyncStorage.getItem('biometricLogin', (err, result) => {
      if (!result) {
        AsyncStorage.setItem('biometricLogin', 'true');
        Keychain.resetGenericPassword();
        AsyncStorage.removeItem('biometrics');
        AsyncStorage.removeItem('biometricPIN');
        setBiometry(false);
      }
    });

    SharedPref.getBiometrics().then((result) => {
      if (result && result === 'enabled') {
        setBiometry(true);
      }
    });
  }, []);

  function handleOnRegister() {
    navigation.navigate('SignUp');
  }

  async function getBioCredentails(): Promise<
    false | Keychain.UserCredentials
  > {
    const resultObject = await ReactNativeBiometrics.simplePrompt({
      promptMessage: 'Login',
    });
    const {success} = resultObject;
    if (success) {
      try {
        const credentails = await Keychain.getGenericPassword();
        return credentails;
      } catch (error) {
        return false;
      }
    } else {
      console.log('user cancelled biometric prompt');
      return false;
    }
  }

  async function onLogin(usern?: string, passw?: string) {
    if (usern && passw) {
      try {
        setLoading(true);
        const resp = await login({email: usern, password: passw});
        setLoading(false);
        if (resp && resp.statusCode === 200) {
          SharedPref.storeUsername(usern);
          setPassword('');
          navigation.navigate('Dashboard');
          return;
        }

        if (resp && resp.statusCode !== 200) {
          Alert.alert('Error', resp.message);
          return;
        }

        Alert.alert('Error', 'Something went wrong');
        // show error alert
      } catch (error) {
        console.log(error);
        setLoading(false);
        Alert.alert('Error', 'Something went wrong');
      }
    }
  }

  async function handleOnLogin() {
    Keyboard.dismiss();
    if (biometry && !password) {
      const credentials = await getBioCredentails();
      if (credentials) {
        onLogin(credentials.username, credentials.password);
      }
      return;
    }
    if (
      usernameRef.current &&
      passwordRef.current &&
      checkInputValidation([usernameRef.current, passwordRef.current])
    ) {
      if (username && password) onLogin(username, password);
      return;
    }

    if (passwordRef.current && checkInputValidation([passwordRef.current])) {
      if (username && password) onLogin(username, password);
      return;
    }
    // navigation.navigate('DashboardTab');
  }

  function onNotUser() {
    SharedPref.storeProfileData({});
    setProfile(null);
    resetBiometry();
    setUsername('');
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollableContainer style={{flex: 1, paddingBottom: Fonts.h(40)}}>
        {(!profile || !profile.email) && (
          <AlertFlag
            message="Login to continue your journey towards making Africa Great"
            source={wink}
          />
        )}

        {!!profile && !!profile.email && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.white,
              borderRadius: Fonts.w(10),
              shadowColor: Colors.inputBorder,
              elevation: 2,
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowRadius: 15,
              shadowOpacity: 0.7,
              paddingVertical: Fonts.h(26),
            }}>
            <VectorIcon name="profile-icon" size={Fonts.w(57)} />

            <Text
              style={{
                marginTop: Fonts.h(15),
                fontFamily: Fonts.AVERTA_REGULAR,
                fontSize: Fonts.w(25),
                color: Colors.primaryColor,
              }}>
              {`Welcome back`}
            </Text>
            <Text
              style={{
                marginTop: Fonts.h(4),
                fontFamily: Fonts.AVERTA_REGULAR,
                fontSize: Fonts.w(13),
                color: Colors.darkText,
              }}>
              Enter password to proceed to dashboard
            </Text>
          </View>
        )}
        {(!profile || !profile.email) && (
          <Input
            ref={usernameRef}
            label="Email address"
            placeholder="What is your email address"
            style={{marginTop: Fonts.h(29)}}
            onChangeText={(text) => {
              setUsername(text);
            }}
            icon={emailIcon}
          />
        )}
        <Input
          ref={passwordRef}
          label="Password"
          placeholder="Password"
          validationRules="required"
          value={password}
          icon={lockIcon}
          onChangeText={(text) => {
            setPassword(text);
          }}
          secure
          style={{marginTop: Fonts.h(29)}}
        />

        <View style={{marginTop: Fonts.h(10)}}>
          <TouchableButton
            title={
              password || !biometry ? 'Login' : `Login with ${biometryType}`
            }
            loading={loading}
            onPress={handleOnLogin}
          />
        </View>

        {!!profile && !!profile.email && (
          <View style={{height: Fonts.h(60)}}>
            <TouchableButton
              title={`Not your Account?`}
              transparent
              onPress={onNotUser}
            />
          </View>
        )}
        <View style={{marginTop: Fonts.h(10)}}>
          <Divider text="Or" />

          <TouchableButton
            title="Don't have an account? Register"
            transparent
            style={{marginTop: Fonts.h(10), marginBottom: 0}}
            onPress={handleOnRegister}
          />
        </View>
      </ScrollableContainer>
    </SafeAreaView>
  );
};

export default Login;
