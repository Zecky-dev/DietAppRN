import React,{useEffect, useRef,useState} from 'react';
import {View,Text,TouchableOpacity, ScrollView,Button,TextInput} from 'react-native';

// styles
import styles from './IntroPages.style';
import colors from '../../utils/colors';

// pages
import LoginPage from '../LoginPage/LoginPage';

// npm packages
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import {Formik} from 'formik';
import {Picker} from '@react-native-picker/picker';
import Lottie from 'lottie-react-native';

// utils
import {registerValidationSchema} from '../../utils/validation';

// Authentication and storage
import firestore from '@react-native-firebase/firestore';
import FlashMessage from 'react-native-flash-message';

// functions
import {login} from '../../utils/functions';






// components
const IntroPageButton = ({type, swiperFlatlistRef,handleRegister}) => {
  // Buton clicklerinde olacaklar..
  const handleButtonClick = type => {
    if (swiperFlatlistRef.current) {
      const currentIndex = swiperFlatlistRef.current.getCurrentIndex();
      if (type === 'toRegister' || type === 'toEntry') {
        if(type==="toRegister") {
            swiperFlatlistRef.current.scrollToIndex({index: currentIndex + 1});
        }
        else {
            if(currentIndex === 2) {
                swiperFlatlistRef.current.scrollToIndex({index: currentIndex - 1});
            }
            else {
                swiperFlatlistRef.current.scrollToIndex({index: currentIndex + 1});                
            }
        }
      }
      if (type === 'toLogin') {
        swiperFlatlistRef.current.scrollToIndex({index: currentIndex - 1});
      }
      
      if (type === 'register') {
        handleRegister();
      }
      if (type === 'login') {
        console.log('Giriş yapılıyor..');
      }
    }
  };

  // Buton textlerinin değiştirilmesi
  let buttonText = '';
  switch (type) {
    case 'toLogin':
      buttonText = 'Giriş Yap';
      break;
    case 'toRegister':
      buttonText = 'Hesabım Yok';
      break;
    case 'toEntry':
      buttonText = 'Önceki';
      break;
    case 'register':
      buttonText = 'Kayıt Ol';
      break;
    case 'login':
      buttonText = 'Giriş Yap';
      break;
    default:
      buttonText = '';
      break;
  }

  return (
    <TouchableOpacity
      onPress={() => handleButtonClick(type)}
      style={styles.button.container}>
      <Text style={styles.button.label}>{buttonText}</Text>
    </TouchableOpacity>
  );
};
const InputArea = ({type,label,optionList,handleChange,value,isNumber=false,errors,secret=false}) => {
    const {err,touch} = errors;
    return (
      <View style={{flex:1,marginTop:4,}}>
            <Text style={styles.inputStyle.label}>{label}</Text>
            {
              type === "text" 
              ? (
              <View style={styles.inputStyle.inputArea}>
                {
                isNumber
                ? <TextInput onChangeText={handleChange} value={value} keyboardType={'numeric'} placeholderTextColor={colors.black} maxLength={3}/>
                : <TextInput onChangeText={handleChange} value={value} keyboardType={'default'} placeholderTextColor={colors.black} secureTextEntry={secret}/>
                }
              </View>)
              : type==="option" ? (
                <View style={{borderColor:colors.darkGreen,borderWidth:1,borderRadius: 4,marginTop: 4}}>
                  <Picker
                  mode='dropdown'
                  selectedValue={value}
                  onValueChange={handleChange}>
                    {
                      optionList.map((item,index) => <Picker.Item label={item} value={item} key={item}/>)
                    }
                  </Picker>
                </View>
              ) : null
            }
            {err && touch && (<Text style={styles.text.warning}>{err}</Text>)}
      </View>
    )
  }


const IntroPage = ({setUserLoggedIn}) => {

    const swiperFlatlist = useRef(null);
    const [loading,setLoading] = useState(false);

    // Fonksiyonlar

    const register = (credits) => {
        const {email,password} = credits;
        const username = credits.email.substring(0,credits.email.indexOf('@'));
        /* Kullanıcı bilgilerini firestore'a kaydetme işlemi */
        setLoading(true);
        firestore()
            .collection('Users')
            .doc(username)
            .set({
                name: credits.name,
                surname: credits.surname,
                email: credits.email,
                gender: credits.gender,
                age: credits.age,
                height: credits.height,
                weight: credits.weight,
                waistCircum: credits.waistCircum,
                hipCircum: credits.hipCircum,
                neckCircum: credits.neckCircum,
                movementFrequency: credits.movementFrequency,
            })
            .then(
                () => {
                    // Veriler eklendikten sonra kayıt işlemi
                    auth()
                        .createUserWithEmailAndPassword(email,password)
                        .then(() => {
                            setUserLoggedIn(true);
                            setLoading(false);
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
            )
            .catch((storageError) => console.log(storageError))
    }

    


    return (
      <View style={styles.container}>
        <SwiperFlatList index={1} ref={swiperFlatlist} disableGesture>
          {/* Giriş ekranı */}
          <View style={styles.slide}>
            <LoginPage swiperFlatlistRef={swiperFlatlist} loginMethod={login} />
          </View>

          {/* Başlangıç ekranı */}
          <View style={styles.slide}>
            <View style={styles.top}>
              <View>
                <Text style={styles.text.title}>Diyet Yolculuğum</Text>
                <Text style={[styles.text.subTitle]}>
                  Uygulamasına Hoş Geldiniz
                </Text>
              </View>
            </View>

            <View style={styles.middle}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <View>
                  <Text style={[styles.text.regular, {textAlign: 'center'}]}>
                    Yeme alışkanlıklarınızı düzenlemeye ve istediğiniz kiloya
                    erişmeye hazır mısınız?
                  </Text>
                </View>
                <View style={{flex: 0.7}}>
                  <Lottie
                    source={require('../../assets/animations/intro_animation.json')}
                    autoPlay
                    loop
                  />
                </View>
              </View>
            </View>

            <View style={[styles.bottom, {justifyContent: 'space-between'}]}>
              <IntroPageButton
                type="toLogin"
                swiperFlatlistRef={swiperFlatlist}
              />
              <IntroPageButton
                type="toRegister"
                swiperFlatlistRef={swiperFlatlist}
              />
            </View>
          </View>

          {/* Kayıt ekranı */}
          <View style={styles.slide}>
            <View style={styles.container}>
              <Formik
                initialValues={{
                  name: '',
                  surname: '',
                  email: '',
                  password: '',
                  confirmPasword: '',
                  gender: '',
                  age: 0,
                  height: 0,
                  weight: 0,
                  waistCircum: 0,
                  neckCircum: 0,
                  hipCircum: 0,
                  movementFrequency: '',
                }}
                onSubmit={values => register(values)}
                validationSchema={registerValidationSchema}>
                {({handleChange, handleSubmit, values, errors, touched}) => (
                  <>
                    <View style={styles.top}>
                      <View>
                        <Text style={styles.text.title}>
                          Bilgilerinizi Alalım
                        </Text>
                      </View>
                    </View>

                    <View style={styles.middle}>
                      <ScrollView showsVerticalScrollIndicator={false}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                          }}>
                          <InputArea
                            type="text"
                            label="İsminiz"
                            value={values.name}
                            handleChange={handleChange('name')}
                            errors={{err: errors.name, touch: touched.name}}
                          />

                          <View style={{marginHorizontal: 4}} />

                          <InputArea
                            type="text"
                            label="Soyisminiz"
                            value={values.surname}
                            handleChange={handleChange('surname')}
                            errors={{
                              err: errors.surname,
                              touch: touched.surname,
                            }}
                          />
                        </View>

                        <InputArea
                          type="text"
                          label="E-posta Adresiniz"
                          value={values.email}
                          handleChange={handleChange('email')}
                          errors={{err: errors.email, touch: touched.email}}
                        />

                        <InputArea
                          type="text"
                          label="Şifreniz"
                          secret={true}
                          value={values.password}
                          handleChange={handleChange('password')}
                          errors={{
                            err: errors.password,
                            touch: touched.password,
                          }}
                        />

                        <InputArea
                          type="text"
                          label="Şifre Tekrarı"
                          secret={true}
                          value={values.confirmPassword}
                          handleChange={handleChange('confirmPassword')}
                          errors={{
                            err: errors.confirmPassword,
                            touch: touched.confirmPassword,
                          }}
                        />

                        <InputArea
                          type="option"
                          label="Cinsiyetiniz"
                          optionList={['Erkek', 'Kadın']}
                          value={values.gender}
                          handleChange={handleChange('gender')}
                          errors={{err: errors.gender, touch: touched.gender}}
                        />

                        <InputArea
                          type="text"
                          label="Yaşınız"
                          isNumber={true}
                          value={values.age}
                          handleChange={handleChange('age')}
                          errors={{err: errors.age, touch: touched.age}}
                        />

                        <View style={{flexDirection: 'row'}}>
                          <InputArea
                            type="text"
                            label="Boyunuz"
                            isNumber={true}
                            value={values.height}
                            handleChange={handleChange('height')}
                            errors={{err: errors.height, touch: touched.height}}
                          />

                          <View style={{marginHorizontal: 4}} />

                          <InputArea
                            type="text"
                            label="Kilonuz"
                            isNumber={true}
                            value={values.weight}
                            handleChange={handleChange('weight')}
                            errors={{err: errors.weight, touch: touched.weight}}
                          />
                        </View>

                        <View style={{flexDirection: 'row'}}>
                          <InputArea
                            type="text"
                            label="Bel Çevreniz"
                            isNumber={true}
                            value={values.waistCircum}
                            handleChange={handleChange('waistCircum')}
                            errors={{
                              err: errors.waistCircum,
                              touch: touched.waistCircum,
                            }}
                          />

                          <View style={{marginHorizontal: 4}} />

                          <InputArea
                            type="text"
                            label="Boyun Çevreniz"
                            isNumber={true}
                            value={values.neckCircum}
                            handleChange={handleChange('neckCircum')}
                            errors={{
                              err: errors.neckCircum,
                              touch: touched.neckCircum,
                            }}
                          />

                          <View style={{marginHorizontal: 4}} />

                          <InputArea
                            type="text"
                            label="Kalça Çevreniz"
                            isNumber={true}
                            value={values.hipCircum}
                            handleChange={handleChange('hipCircum')}
                            errors={{
                              err: errors.hipCircum,
                              touch: touched.hipCircum,
                            }}
                          />
                        </View>

                        <InputArea
                          type="option"
                          label="Hareket Sıklığınız"
                          optionList={[
                            'Hareketsiz',
                            'Az hareketli',
                            'Orta Derece Hareketli',
                            'Çok Hareketli',
                          ]}
                          value={values.movementFrequency}
                          handleChange={handleChange('movementFrequency')}
                          errors={{
                            err: errors.movementFrequency,
                            touch: touched.movementFrequency,
                          }}
                        />
                      </ScrollView>
                    </View>

                    <View
                      style={[
                        styles.bottom,
                        {justifyContent: 'space-between', paddingHorizontal: 4},
                      ]}>
                      <IntroPageButton
                        type="toEntry"
                        swiperFlatlistRef={swiperFlatlist}
                      />
                      <IntroPageButton
                        type="register"
                        handleRegister={handleSubmit}
                        swiperFlatlistRef={swiperFlatlist}
                      />

                      {/* Buton tipi "done" olduğunda tıklamada handleSubmit metodunu çağıracağız, done methodu oneDone olarak oluşturulan method*/}
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </View>
        </SwiperFlatList>
        <FlashMessage position="top" />
      </View>
    );
}

export default IntroPage;