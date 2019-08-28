import AsyncStorage from '@react-native-community/async-storage';

const createToken = async (key, value) => {
    await AsyncStorage.setItem(key, value);
    return new Promise((resolve, reject) =>{
        resolve(true);
    });
}

const signOut = async (key) => {
    await AsyncStorage.removeItem(key);
    return new Promise((resolve, reject) => {
        resolve();
    });
}

const isSignedIn = async (key) => {
    const user = await AsyncStorage.getItem(key);
    return new Promise((resolve, reject) => {
        resolve(user===null ? false : true);
        reject("error");
    });
}

const getUserData = async ()=>{
    const user = await AsyncStorage.getItem(USERNAME);
    return user;
}


export {createToken, signOut, isSignedIn, getUserData}