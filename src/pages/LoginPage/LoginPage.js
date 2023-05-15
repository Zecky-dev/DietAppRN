import React,{useState,useEffect} from 'react';
import { View, ScrollView,Text,TextInput } from 'react-native';

import CustomButton from '../../components/CustomButton/CustomButton';
import Lottie from 'lottie-react-native';

import colors from '../../utils/colors';
import styles from './LoginPage.style';

const LoginPage = ({swiperFlatlistRef,loginMethod}) => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);


    return (
      <View style={styles.container}>
        <CustomButton
          icon={{name: 'close', size: 48, color: colors.orange}}
          onPress={() => {
            if (swiperFlatlistRef.current) {
              swiperFlatlistRef.current.scrollToIndex({index: 1});
            }
          }}
        />

        <Text style={styles.appTitle}>Diyet Yolculuğum</Text>

        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.actionTitle}>Giriş Yap</Text>
          </View>

          <View style={styles.loginContainer}>
            <View>
              <TextInput
                placeholder="E-posta Adresi"
                style={styles.input}
                placeholderTextColor={colors.black}
                onChangeText={(value) => setEmail(value)}
              />
              <TextInput
                placeholder="Şifre"
                style={styles.input}
                secureTextEntry
                placeholderTextColor={colors.black}
                onChangeText={(value) => setPassword(value)}
              />
            </View>
            <View style={styles.buttonContainer}>

              
              <CustomButton
                loading={loading}
                label="Giriş Yap"
                onPress={() => loginMethod(email,password,setLoading)}
                icon={{name: 'key', color: colors.white, size: 24}}
                additionStyles={{
                  container: {backgroundColor: colors.orange},
                  label: {color: colors.white},
                }}
              />

              <View style={{marginHorizontal: 4}} />

              <CustomButton
                label="Şifremi Unuttum"
                onPress={null}
                icon={{name: 'lock-question', color: 'white', size: 24}}
                additionStyles={{
                  container: {backgroundColor: colors.orange},
                  label: {color: 'white'},
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
}

export default LoginPage;