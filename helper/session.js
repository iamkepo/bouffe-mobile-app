import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLocale = async (key, value, resultats, errors) => {
  await AsyncStorage.setItem(key, JSON.stringify(value))
  .then((response)=> resultats(response))
  .catch((e)=> errors(e));
}
export const getLocale = async (key, resultats, errors) => {
  await AsyncStorage.getItem(key)
  .then((response)=> resultats(JSON.parse(response)))
  .catch((e)=> errors(e));
}
