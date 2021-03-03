import * as Sentry from '@sentry/react-native';
import { Alert } from 'react-native';
import {navigationRef} from 'src/index';
import {globalVariables} from './globalVariables';
export const buildHeader = (secure?: boolean): HeadersInit => {
  const header = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    // 'Accept': '*/*',
  };
  if (secure) {
    console.log(globalVariables);
    Object.assign(header, {
      'x-access-token': `${globalVariables.accessToken}`,
    });
  }

  console.log(header);
  return header;
};

export const makeUrlKeyValuePairs = (json: {[key: string]: any}): string => {
  if (!json || Object.keys(json).length < 1) {
    return '';
  }
  const keys: string[] = Object.keys(json);
  let query = '?';
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    query +=
      encodeURIComponent(key) + '=' + encodeURIComponent(json[key]) + '&';
  }
  return query.replace(/&$/g, '');
};

type RequestObject = {
  type: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  isSecure?: boolean;
  queryParams?: {[key: string]: any};
  onResponse?: () => void;
  data?: {[key: string]: any};
  route: string;
};
export async function requestClan({
  onResponse,
  data,
  type = 'GET',
  queryParams,
  route,
  isSecure = false,
}: RequestObject): Promise<any> {
  console.log('✅ Making a request', data, type, queryParams, route, isSecure);
  let response: Response;

  // Handle get request with params
  let routePlusParams = route;
  if (queryParams) {
    routePlusParams += makeUrlKeyValuePairs(queryParams);
  }

  console.log(routePlusParams, 'dffdfdff');
  response = await fetch(routePlusParams.trim(), {
    method: type,
    headers: buildHeader(isSecure),
    body:
      type === 'POST' || type === 'DELETE' || type === 'PUT' || type === 'PATCH'
        ? JSON.stringify(data)
        : null,
  });

  Sentry.addBreadcrumb({
    category: 'request',
    message: routePlusParams,
    data: queryParams,
    level: Sentry.Severity.Info,
  });
  var response2 = response.clone();

  try {
    // TODO: log responses that are not 200
    
    if (response) {
      const responseJSON = await response.json();
      console.log(responseJSON)
      if (response.status === 401) {
        navigationRef.current?.navigate('Login');
        setTimeout(() => {
          Alert.alert('Warning', responseJSON.message)
        }, 500);
      }
      return {...responseJSON, statusCode: response.status};
    }
    return {exception: 'No response returned!'};
  } catch (error) {
    const dd = await response2.text();
    // TODO: Log error to sentry
    Sentry.captureException(error, {
      tags: {
        section: routePlusParams,
      },
    });
    let errorMsg = 'An error occurred, please try again later.';
    console.log(
      '✅ An error occurred, please try again later.',
      error.message,
      error.text,
      dd,
    );
    return {
      message: errorMsg,
    };
  }
}
