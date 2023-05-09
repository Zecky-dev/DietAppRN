import React,{useState,useRef,useEffect} from 'react';
import {ScrollView,View,Text,TouchableOpacity,Dimensions, TextInput} from 'react-native';


import styles from './IntroPages.style';

// pages
import LoginPage from '../Login/LoginPage';





// packages
import Lottie from 'lottie-react-native';
import {Picker} from '@react-native-picker/picker';
import {Formik} from 'formik';

// utils
import validationSchema from '../../utils/validation';
import auth from '@react-native-firebase/auth';


import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../utils/colors';


const IntroPages = ({setShowHomeScreen}) => {
  const screenWidth = Dimensions.get('window').width;
  const scrollViewRef = useRef();
  const currIndex = useRef(1);

  
  useEffect(() =>{
    scrollViewRef.current?.scrollTo({
      x: 1 * screenWidth,
      y: 0,
      animated: true
    })
  },[])


  const NextPrevButton = ({type,handleSubmit}) => {
    let text = "";

    switch(type) {
      case 'next':
        text = "Hesabım Yok"; break;
      case 'prev':
        text = "Önceki"; break;
      case 'done':
        text = "Kayıt Ol"; break;
      case 'login':
        text = "Giriş Yap"; break;
      default:
        text = ""; break;     
    }

    return (
      <TouchableOpacity onPress={() => movePage(type,handleSubmit)} style={styles.button.container}>
        <Text style={styles.button.label}>
          {text}
        </Text>
      </TouchableOpacity>
    )
  }

  const InputArea = ({type,label,optionList,handleChange,value,isNumber=false,errors,secret}) => {
    const {err,touch} = errors;
    return (
      <View style={{flex:1,marginTop:4,}}>
            <Text style={styles.inputStyle.label}>{label}</Text>
            {
              type === "text" 
              ? (
              <View style={styles.inputStyle.inputArea}>
                <TextInput onChangeText={handleChange} value={value} keyboardType={isNumber ? 'numeric' : 'default'} secureTextEntry={secret} placeholderTextColor={colors.black} />
              </View>)
              : type==="option" ? (
                <View style={{backgroundColor:'white',borderRadius: 4,marginTop: 4}}>
                  <Picker
                  mode='dropdown'
                  selectedValue={value}
                  onValueChange={handleChange}>
                    {
                      optionList.map((item) => <Picker.Item label={item} value={item} key={item}/>)
                    }
                  </Picker>
                </View>
              ) : null
            }
            {err && touch && (<Text style={styles.text.warning}>{err}</Text>)}
      </View>
    )
  }



  const movePage = (type,handleSubmit) => {
    // Hesabım yok => kayıt
    if(type === "next") {
      currIndex.current += 1;
    }
    // Önceki
    if(type === "prev") {
      currIndex.current -= 1;
    }

    // Kayıt ol
    if(type === "done") {
      handleSubmit();
    }

    // Giriş Yap
    if(type === "login") {
      currIndex.current -= 1;
    }

    scrollViewRef.current?.scrollTo({
      x: currIndex.current * screenWidth,
      y: 0,
      animated: true
    })
  }

  const storeFirstStart = async () => {
    try {
      await AsyncStorage.setItem('firstStart','false');
    }catch(e) {
      console.log("Error while storing data: " + e);
    }
  }



  const onDone = (values) => {
    storeFirstStart()
    setShowHomeScreen(true);

    // Kullanıcıyı girdiği bilgilerden email adresi ve şifre değerlerini alıp firebase auth'a kaydedeceğiz..
    const {email,password} = values;
    auth()
      .createUserWithEmailAndPassword(email,password)
      .then(() => {
        console.log("User account created & signed in!")
      })
      .catch((err) => {
        if(err.code === "auth/email-already-in-use") {
          console.log("That email address is already in use")
        }
        if(err.code === "auth/invalid-email"){
          console.log(  )
        }
      })


  }



  return (
    <ScrollView
      horizontal={true}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}
      ref={scrollViewRef}>
      {/* First slide => Giriş yap*/}
      <View style={styles.container}>
        <LoginPage />
      </View>

      {/* First slide => Giriş yapma =>*/}

      <View style={styles.container}>
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
          <NextPrevButton type="login" />
          <NextPrevButton type="next" />
        </View>
      </View>

      {/* Second view */}

      <View style={styles.container}>
        <Formik
          initialValues={{
            name: null,
            surname: null,
            email: null,
            password: null,
            gender: null,
            age: null,
            height: null,
            weight: null,
            waistCircum: null,
            neckCircum: null,
            hipCircum: null,
            movementFrequency: null,
          }}
          onSubmit={onDone}
          validationSchema={validationSchema}>
          {({handleChange, handleSubmit, values, errors, touched}) => (
            <>
              <View style={styles.top}>
                <View>
                  <Text style={styles.text.title}>Bilgilerinizi Alalım</Text>
                </View>
              </View>

              <View style={styles.middle}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View
                    style={{flexDirection: 'row', justifyContent: 'center'}}>
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
                      errors={{err: errors.surname, touch: touched.surname}}
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
                    errors={{err: errors.password, touch: touched.password}}
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
                      errors={{err: errors.hipCircum, touch: touched.hipCircum}}
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
                <NextPrevButton type="prev" />
                <NextPrevButton type="done" handleSubmit={handleSubmit} />

                {/* Buton tipi "done" olduğunda tıklamada handleSubmit metodunu çağıracağız, done methodu oneDone olarak oluşturulan method*/}
              </View>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}

export default IntroPages;