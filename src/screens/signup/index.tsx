import React, {FunctionComponent, useLayoutEffect, useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import SafeAreaView from 'react-native-safe-area-view';
import {RootStackParamList} from '../../navigation/routes';
import ScrollableContainer from '../../components/ScrollableContainer';
import TouchableIcon from '../../components/TouchableIcon';
import HeaderIndicator from './components/HeaderIndicator';
import {Fonts} from '../../common';
import AlertFlag from '../../components/AlertFlag';
import TouchableButton from '../../components/TouchableButton';
import Divider from '../../components/Divider';
import Form from 'src/components/Form';
import {useRegistrationDispatch} from 'src/contexts/registrationStore';
import LoadingModal from 'src/components/LoadingModal';
import {IRegisterRequest} from 'src/interfaces/global';
import { SharedPref } from 'src/common/SharedPref';

const wink = require('../../images/wink.png');

const userIcon = require('../../images/User.png');
const emailIcon = require('../../images/md-mail.png');
const lockIcon = require('../../images/md-lock-closed.png');


type Props = StackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp: FunctionComponent<Props> = ({navigation}) => {
  const {registerUser} = useRegistrationDispatch();
  const [loading, setLoading] = useState(false);

  const formData: Array<any> = React.useMemo(
    () => [
      {
        id: 'firstName',
        type: 'input',
        props: {
          validationRules: 'required',
          label: 'First Name',
          placeholder: 'First Name',
          icon: userIcon,
        },
      },
      {
        id: 'lastName',
        type: 'input',
        props: {
          validationRules: 'required',
          label: 'Last Name',
          placeholder: 'Last Name',
          icon: userIcon,
        },
      },
      {
        id: 'email',
        type: 'input',
        props: {
          autoCapitalize: 'none',
          validationRules: 'email|required',
          keyboardType: 'email-address',
          label: 'Email Address',
          placeholder: 'What is your email address',
          icon: emailIcon,
        },
      },
      {
        id: 'password',
        type: 'input',
        props: {
          validationRules: 'password|required',
          label: 'Create Password',
          placeholder: 'Password',
          showStrength: true,
          icon: lockIcon,
          secure: true,
        },
      },
    ],
    [],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => <HeaderIndicator step={1} />,
      headerBackImage: () => <TouchableIcon icon="close" />,
      headerBackTitle: ' ',
    });
  }, [navigation]);

  function handleOnLogin() {
    navigation.navigate('Login');
  }

  async function handleOnConfirm(state: {[key: string]: string}) {
    // Register
    if (!state.firstName) {
      Alert.alert('Warning', 'All fields are required!');
      return;
    }
    try {
      const payload: IRegisterRequest = {
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        password: state.password,
      };
      setLoading(true);
      const resp = await registerUser(payload);
      setLoading(false);
      if (resp && resp.statusCode === 200) {
        // SharedPref.storeProfileData(payload);
        setTimeout(() => {
          Alert.alert('Success', resp.message, [
            {text: 'Ok', onPress: () => navigation.navigate('Login')},
          ]);
        }, 500);
        return;
       
      }

      setTimeout(() => {
        Alert.alert('Success', resp.message, [
          {text: 'Ok', onPress: () => {}},
        ]);
      }, 500);
    } catch (error) {
      setLoading(true);
      Alert.alert('Error', 'An error occured!');
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollableContainer>
        <Text style={{fontFamily: Fonts.AVERTA_EXTRABOLD, textAlign: 'center'}}>
          theRoom
        </Text>
        <AlertFlag
          message="Awesome! Nice to meet you "
          source={wink}
          textStyle={{fontSize: Fonts.w(14)}}
          containerStyle={{
            marginTop: Fonts.h(12.6),
            width: Fonts.w(336),
            paddingVertical: Fonts.h(14),
          }}
        />

        <View>
          <Form
            data={formData}
            buttonLabel="Register"
            onConfirm={handleOnConfirm}
          />
          <View style={{marginTop: Fonts.h(22)}}>
            <Divider text="Or" />

            <TouchableButton
              title="Already have an account? Login"
              transparent
              style={{marginTop: Fonts.h(24)}}
              onPress={handleOnLogin}
            />
          </View>
        </View>
      </ScrollableContainer>
      <LoadingModal loading={loading} />
    </SafeAreaView>
  );
};

export default SignUp;
