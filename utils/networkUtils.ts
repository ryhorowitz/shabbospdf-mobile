import NetInfo from '@react-native-community/netinfo';

export interface NetworkState {
  isConnected: boolean;
  isInternetReachable: boolean;
  type: string;
  isWifi: boolean;
  isCellular: boolean;
}

export const checkNetworkConnectivity = async (): Promise<NetworkState> => {
  try {
    const state = await NetInfo.fetch();
    return {
      isConnected: state.isConnected ?? false,
      isInternetReachable: state.isInternetReachable ?? false,
      type: state.type ?? 'unknown',
      isWifi: state.type === 'wifi',
      isCellular: state.type === 'cellular',
    };
  } catch (error) {
    console.error('Error checking network connectivity:', error);
    return {
      isConnected: false,
      isInternetReachable: false,
      type: 'unknown',
      isWifi: false,
      isCellular: false,
    };
  }
};

export const isOffline = async (): Promise<boolean> => {
  const networkState = await checkNetworkConnectivity();
  return !networkState.isConnected || !networkState.isInternetReachable;
};

export const getNetworkErrorMessage = (networkState: NetworkState): string => {
  if (!networkState.isConnected) {
    return 'No internet connection detected. Please check your network settings and try again.';
  }
  
  if (!networkState.isInternetReachable) {
    return 'Internet connection is not reachable. Please check your network connection.';
  }
  
  return 'Network connection issue. Please try again.';
}; 