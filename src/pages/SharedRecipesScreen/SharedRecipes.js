import React, { useEffect } from 'react';
import { View, FlatList, Text, ScrollView, TextInput } from 'react-native';

import RecipeCard from '../../components/RecipeCard/RecipeCard';

import Modal from 'react-native-modal'

import styles from './SharedRecipes.style'
import Icon from 'react-native-vector-icons/Ionicons';

import { FAB } from 'react-native-elements';
import colors from '../../utils/colors';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';


const SharedRecipes = () => {
  const [isModalVisible, setModalVisible] = React.useState(false)

  useEffect(() => {
    console.log("object")
  }, [])

  const InputArea = ({ type, label, optionList, handleChange, value, isNumber = false, errors, secret = false, additionalStyles, multiline }) => {
    const { err, touch } = errors;
    return (
      <View style={{ flex: 1, marginTop: 4, }}>
        <Text style={styles.inputStyle.label}>{label}</Text>
        {
          type === "text"
            ? (
              <View style={[styles.inputStyle.inputArea, additionalStyles]}>
                {
                  isNumber
                    ? <TextInput multiline={multiline} onChangeText={handleChange} value={value} keyboardType={'numeric'} placeholderTextColor={colors.black} maxLength={3} secureTextEntry={secret} />
                    : <TextInput multiline={multiline} onChangeText={handleChange} value={value} keyboardType={'default'} placeholderTextColor={colors.black} secureTextEntry={secret} />
                }
              </View>)
            : type === "option" ? (
              <View style={{ borderColor: colors.darkGreen, borderWidth: 1, borderRadius: 4, marginTop: 4 }}>
                <Picker
                  mode='dropdown'
                  selectedValue={value}
                  onValueChange={handleChange}
                >
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


  const recipeData = [
    {
      id: 1,
      name: 'Menemen',
      owner: 'Zekican',
      description:
        'Excepteur reprehenderit commodo et adipisicing ea nulla qui. Commodo esse deserunt aliquip nisi. Laboris dolor consectetur ad sunt anim sit exercitation qui.',
      imageUrl:
        'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg',
    },
    {
      id: 2,
      name: 'Tavuklu Pilav',
      owner: 'Zekican',
      description: 'Cupidatat aute Lorem nulla excepteur magna adipisicing. Esse ad aute tempor ut qui cupidatat reprehenderit esse. Aliqua ea ut sunt nulla esse. Exercitation aute culpa adipisicing consectetur qui irure nostrud non id fugiat nulla commodo nulla. Laborum est amet esse adipisicing laboris sit. Dolore magna sunt enim occaecat.',
      imageUrl:
        'https://cdn.yemek.com/mncrop/940/625/uploads/2014/12/tavuklu-pilav-one-cikan-yeni.jpg',
    },
    {
      id: 3,
      name: 'Karnıyarık',
      owner: 'Zekican',
      description: 'Dolor labore qui dolore non velit ut ad. Sunt dolore ea minim consectetur laboris labore velit exercitation id do sit laboris voluptate irure. Eu exercitation velit culpa Lorem aliqua esse culpa cillum nisi quis ut irure. Ad eu labore quis reprehenderit voluptate laborum nostrud pariatur. Veniam ullamco cupidatat qui tempor irure aliquip elit labore duis. Nostrud incididunt adipisicing pariatur laborum velit reprehenderit id qui et eu dolore excepteur amet aute. Pariatur esse nostrud exercitation ipsum aliquip.',
      imageUrl:
        'https://cdn.yemek.com/mnresize/940/940/uploads/2014/10/karniyarik-yemekcom.jpg',
    },
    {
      id: 4,
      name: 'Tarhana çorbası',
      owner: 'Zekican',
      description: 'Lorem nisi ex voluptate adipisicing et consequat amet ullamco. Aliqua proident exercitation aliqua do reprehenderit proident excepteur aliquip dolore non. Ut excepteur labore fugiat pariatur amet do.',
      imageUrl:
        'https://cdn.yemek.com/mnresize/1250/833/uploads/2019/05/tarhana-corbasi-yemekcom.jpg',
    },
    {
      id: 5,
      name: 'Etli karnabahar',
      owner: 'Zekican',
      description: 'Exercitation in duis incididunt irure. Enim sint elit sint sunt. Lorem cupidatat id sint Lorem exercitation occaecat. Sit laborum amet Lorem esse ut veniam proident voluptate duis ex.',
      imageUrl:
        'https://i0.wp.com/portakalagaci.com/wp-content/uploads/2021/12/P1012169.jpg?ssl=1',
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={recipeData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RecipeCard recipeData={item} />}
      />
      <View style={styles.FAB_style}>
        <FAB
          color={colors.darkGreen}
          size='large'
          icon={
            <Icon
              name="add"
              color={colors.white}
              size={24}
            />}
          onPress={() => setModalVisible(!isModalVisible)}
        />
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={() => setModalVisible(!isModalVisible)}
        onBackdropPress={() => setModalVisible(!isModalVisible)}
        onSwipeComplete={() => setModalVisible(false)}
        propagateSwipe={true}
        
        style={styles.createRecipe.modal}>
        <View style={styles.createRecipe.container} >
          <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 8, borderBottomColor: colors.gray, borderBottomWidth: 2 }}>
            <View style={{ width: 70, height: 5, backgroundColor: '#c0c0c0', borderRadius: 16, marginBottom: 8 }} />
            <Text style={{ color: colors.black, fontWeight: '500', fontSize: 28 }}>
              TARİFİNİZİ GİRİN
            </Text>
          </View>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'}>
            <Formik
              initialValues={{
                owner: '',
                instaProfile: '@',
                foodName: '',
                category: '',
                howManyPeople: 1,
                preparationTime: 5,
                description: '',
                ingredients: '',
                preparation: '',
                recipePhotos: [],
                calorie: 0,
                protein: 0,
                carbohydrate: 0
              }}
              onSubmit={(values) => clg(values)}

            >
              {({ handleChange, handleSubmit, values, errors, touched }) => (
                <>
                  <View style={[styles.form.first_layer, { marginTop: 4, flex: 0.8 }]}>
                    <Text style={{ color: colors.black, fontWeight: '500', fontSize: 28, textAlign: 'center' }}>
                      Genel Bilgiler
                    </Text>
                    <View style={{borderTopColor: colors.gray, borderTopWidth: 2,marginTop:8}}/>
                    <InputArea
                      type='text'
                      label='Adınız'
                      value={values.owner}
                      handleChange={handleChange('owner')}
                      errors={{ err: errors.owner, touch: touched.owner }}
                    />

                    <InputArea
                      type='text'
                      label='Instagram Hesabınız (Opsiyonel)'
                      value={values.instaProfile}
                      handleChange={handleChange('instaProfile')}
                      errors={{ err: errors.instaProfile, touch: touched.instaProfile }}
                    />

                    <InputArea
                      type='text'
                      label='Yemeğinizin Adı'
                      value={values.foodName}
                      handleChange={handleChange('foodName')}
                      errors={{ err: errors.foodName, touch: touched.foodName }}
                    />

                    <InputArea
                      type='option'
                      label='Kategori'
                      optionList={['Ana Yemekler', 'Diyet Tarifleri', 'Çorbalar', 'Salatalar', 'Detoks Tarifleri', 'Atıştırmalıklar', 'Tatlılar', 'Kahvaltılık Tarifler']}
                      value={values.category}
                      handleChange={handleChange('category')}
                      errors={{ err: errors.category, touch: touched.category }}
                    />

                    <View style={styles.form.second_layer}>
                      <View style={{ paddingRight: 4, flex: 1 }}>
                        <InputArea
                          type='option'
                          label='Kişi Sayısı'
                          optionList={['1', '2', '3', '4', '5', '6', '7', '8', '9']}
                          value={values.howManyPeople}
                          handleChange={handleChange('howManyPeople')}
                          errors={{ err: errors.howManyPeople, touch: touched.howManyPeople }}
                        />
                      </View>
                      <View style={{ paddingLeft: 4, flex: 1 }}>
                        <InputArea
                          type='option'
                          label='Hazırlama Süresi(Dakika)'
                          optionList={['5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60', '90', '120']}
                          value={values.preparationTime}
                          handleChange={handleChange('preparationTime')}
                          errors={{ err: errors.preparationTime, touch: touched.preparationTime }}
                        />
                      </View>
                    </View>

                    <InputArea
                      type='text'
                      label='Açıklama'
                      value={values.description}
                      handleChange={handleChange('description')}
                      multiline={true}
                      errors={{ err: errors.description, touch: touched.description }}
                    />

                    <InputArea
                      type='text'
                      label='Malzemeler'
                      value={values.ingredients}
                      handleChange={handleChange('ingredients')}
                      multiline={true}
                      errors={{ err: errors.ingredients, touch: touched.ingredients }}
                    />

                    <InputArea
                      type='text'
                      label='Hazırlanışı'
                      value={values.preparation}
                      handleChange={handleChange('preparation')}
                      multiline={true}
                      errors={{ err: errors.preparation, touch: touched.preparation }}
                    />

                  </View>
                  <Text style={{ color: colors.black, fontWeight: '500', fontSize: 28, textAlign: 'center' }}>
                    Yemeğin Besin Değerleri
                  </Text>
                  <View style={{ flexDirection: 'row', borderTopColor: colors.gray, borderTopWidth: 2, margin: 8 }}>
                    <InputArea
                      isNumber
                      type='text'
                      label='Karbonhidrat'
                      value={values.carbohydrate}
                      handleChange={handleChange('carbohydrate')}
                      multiline={true}
                      errors={{ err: errors.carbohydrate, touch: touched.carbohydrate }}
                    />
                    <View style={{ paddingHorizontal: 8, flex: 1 }}>
                    <InputArea
                      isNumber
                      type='text'
                      label='Yağ'
                      value={values.calorie}
                      handleChange={handleChange('calorie')}
                      multiline={true}
                      errors={{ err: errors.calorie, touch: touched.calorie }}
                    />
                    </View>
                    <InputArea
                      isNumber
                      type='text'
                      label='Protein'
                      value={values.protein}
                      handleChange={handleChange('protein')}
                      multiline={true}
                      errors={{ err: errors.protein, touch: touched.protein }}
                    />
                  </View>
                </>
              )}
            </Formik>
          </ScrollView>
        </View>
      </Modal>
    </View>
  )
}

export default SharedRecipes;