import {StackNavigationOptions} from '@react-navigation/stack';
import {FunctionComponent} from 'react';
import Dashboard from 'src/screens/dashboard';
import Intro from 'src/screens/Intro';
import Login from 'src/screens/login';
import SignUp from 'src/screens/signup';
import Welcome from 'src/screens/welcome';

export type RenderProps = {
  name: keyof RootStackParamList;
  component: FunctionComponent<any>;
  options: StackNavigationOptions;
};

export type TabRenderProps = {
  index?: number;
  name: string;
  icon: string;
  component: FunctionComponent<any>;
};

export type DashboardTabParamList = {
  Dashboard: undefined;
  TransactionNavigation: undefined;
};

export type RootStackParamList = {
  Intro: undefined;

  AuthScreen: undefined;

  Login: undefined;
  Dashboard: undefined;
  Welcome: undefined;
  SignUp: undefined;
};

export const routes: Array<RenderProps> = [
  {name: 'Intro', component: Intro, options: {headerShown: false}},
  {name: 'Login', component: Login, options: {headerShown: true}},
  {name: 'Welcome', component: Welcome, options: {headerShown: true}},
  {name: 'Dashboard', component: Dashboard, options: {headerShown: false}},

  {name: 'SignUp', component: SignUp, options: {headerShown: true}},
];

// Drawer navigation

export type DrawerStackParamList = {
  More: undefined;
  DashboardTab: undefined;
};
