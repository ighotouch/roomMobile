import async from '@react-native-community/async-storage/jest/async-storage-mock';

async.__INTERNAL_MOCK_STORAGE__ = {COUNT: '1'};

export default async;
