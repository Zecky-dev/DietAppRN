import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TextInput } from 'react-native'

import styles from './ProfileEditPage.style'
import colors from '../../utils/colors'

import { Formik } from 'formik'
import { Picker } from '@react-native-picker/picker';
import {updateValidations} from '../../utils/validation';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import CustomButton from '../../components/CustomButton/CustomButton'
import { update } from '../../utils/functions'

const ProfileEditPage = ({navigation}) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const username = auth().currentUser.email.split('@')[0];
        const getUser = async () => {
            const user = await firestore().collection('Users').doc(username).get();
            setUser(user._data);
        }
        getUser();
    }, []);

    const InputArea = ({ type, label, optionList, handleChange, value, isNumber = false, errors }) => {
        const { err, touch } = errors;
        return (
            <View style={{ flex: 1, marginTop: 4 }}>
                <Text style={styles.inputStyle.label}>{label}</Text>
                {
                    type === "text"
                        ? (
                            <View style={styles.inputStyle.inputArea}>
                                {
                                    isNumber
                                        ? <TextInput color={colors.black} onChangeText={handleChange} value={value} keyboardType={'numeric'} placeholderTextColor={colors.black} maxLength={3} />
                                        : <TextInput color={colors.black} onChangeText={handleChange} value={value} keyboardType={'default'} placeholderTextColor={colors.black} />
                                }
                            </View>)
                        : type === "option" ? (
                            <View style={{ borderColor: colors.darkGreen, borderWidth: 1, borderRadius: 4, marginTop: 4, backgroundColor: colors.white }}>
                                <Picker
                                    style={{color:colors.black}}
                                    onStart
                                    mode='dropdown'
                                    selectedValue={value}
                                    onValueChange={handleChange}>
                                    {
                                        optionList.map((item, index) => <Picker.Item label={item} value={item} key={item} />)
                                    }
                                </Picker>
                            </View>
                        ) : null
                }
                {err && touch && (<Text style={styles.text.warning}>{err}</Text>)}
            </View>
        )
    }

    if (user) {
        return (
          <ScrollView style={styles.container}>
            <Formik
              initialValues={{
                name: user.name,
                surname: user.surname,
                gender: user.gender,
                age: user.age,
                height: user.height,
                weight: user.weight,
                waistCircum: user.waistCircum,
                neckCircum: user.neckCircum,
                hipCircum: user.hipCircum,
                movementFrequency: user.movementFrequency,
              }}
              onSubmit={values => update(values,navigation)}
              validationSchema={updateValidations}>
              {({
                handleChange,
                handleSubmit,
                values,
                errors,
                touched,
                dirty,
              }) => (
                <>
                  <View style={styles.middle}>
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
                  </View>
                  <View style={styles.btn_container}>
                    <CustomButton
                      label="Güncelle"
                      icon={{name: 'content-save-edit', color: colors.white, size: 36}}
                      onPress={handleSubmit}
                      disabled={!dirty}
                      additionStyles={{
                        container: {
                          backgroundColor: colors.darkGreen,
                          minWidth: 180,                            
                          alignItems: 'center',
                          borderRadius: 4,
                          opacity: !dirty ? 0.5 : 1
                        },
                        label: {color: colors.white},
                      }}
                    />
                  </View>
                </>
              )}
            </Formik>
          </ScrollView>
        );

    }
}

export default ProfileEditPage;