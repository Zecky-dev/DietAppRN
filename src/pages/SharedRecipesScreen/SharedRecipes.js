import React, { useEffect } from 'react';
import { View, FlatList, Text, ScrollView, TextInput, Image, TouchableOpacity, Button } from 'react-native';

import RecipeCard from '../../components/RecipeCard/RecipeCard';

import Modal from 'react-native-modal'

import styles from './SharedRecipes.style'
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons'

import { FAB } from 'react-native-elements';
import colors from '../../utils/colors';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { recipeShareValidations } from '../../utils/validation';


const SharedRecipes = ({navigation}) => {
  const [isModalVisible, setModalVisible] = React.useState(false)
  const [isAdded, setIsAdded] = React.useState([])
  const [recipeData, setRecipeData] = React.useState([
    {
      owner:'kadir',
      foodName:'Test Food',
      recipePhotos:['https://cdn.yemek.com/mncrop/940/625/uploads/2014/12/tavuklu-pilav-one-cikan-yeni.jpg']
    }
  ])

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
                    ? <TextInput color={colors.black} multiline={multiline} onChangeText={handleChange} value={value} keyboardType={'numeric'} placeholderTextColor={colors.black} maxLength={3} secureTextEntry={secret} />
                    : <TextInput color={colors.black} multiline={multiline} onChangeText={handleChange} value={value} keyboardType={'default'} placeholderTextColor={colors.black} secureTextEntry={secret} />
                }
              </View>)
            : type === "option" ? (
              <View style={{ borderColor: colors.darkGreen, borderWidth: 1, borderRadius: 4, marginTop: 4 }}>
                <Picker
                  style={{ color: colors.black }}
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
        {err && touch && (<Text style={{
          color: 'orange',
          fontSize: 14,
          fontWeight: 'bold'
        }}>{err}</Text>)}
      </View>
    )
  }


  useEffect(() => {
  }, [isAdded])

  const handleAddImage = (values, source) => {
    const newImage = source; // Yeni eklenen resmin URL'si
    const updatedImages = [...values.recipePhotos, newImage]; // Diziyi güncelleyin
    values.recipePhotos = updatedImages; // values nesnesini güncelleyin
    setIsAdded(updatedImages)
  };

  const removePhoto = (values, index) => {
    const updatedImages = [...values.recipePhotos];
    updatedImages.splice(index, 1);
    values.recipePhotos = updatedImages
    setIsAdded(updatedImages)
  }

  const handleChoosePhoto = (values) => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = { uri: response.uri };
        handleAddImage(values, source)
      }
    });
  };

  const handleTakeFoto = (values) => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = { uri: response.uri };
        handleAddImage(values, source)
      }
    });
  }

  const Submit = (values) => {
    setModalVisible(!isModalVisible)
    setRecipeData([...recipeData, values]);
  }

  return (
    <View style={styles.container}>
      
      <FlatList
        data={recipeData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RecipeCard recipeData={item} navigation={navigation}/>}
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
                category: 'Ana Yemekler',
                howManyPeople: 1,
                preparationTime: 5,
                description: '',
                ingredients: '',
                preparation: '',
                recipePhotos: [],
              }}
              onSubmit={(values) => Submit(values)}
              validationSchema={recipeShareValidations}
            >
              {({ handleChange, handleSubmit, values, errors, touched }) => (
                <>
                  <View style={[styles.form.first_layer, { marginTop: 4, flex: 0.8 }]}>
                    <Text style={{ color: colors.black, fontWeight: '500', fontSize: 28, textAlign: 'center' }}>
                      Genel Bilgiler
                    </Text>
                    <View style={{ borderTopColor: colors.gray, borderTopWidth: 2, marginTop: 8 }} />
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
                    Yemeğin fotoğrafları
                  </Text>

                  <View style={{ flexDirection: 'row', justifyContent: 'center', borderTopColor: colors.gray, borderTopWidth: 2, marginTop: 8, padding: 8 }}>
                    <View style={{ marginRight: 8 }}>
                      <FAB
                        title="Galeriden Seç"
                        onPress={() => handleChoosePhoto(values)}
                        color={colors.darkGreen}
                        icon={
                          <Icon2
                            name='photo-library'
                            color={colors.white}
                            size={24}
                          />
                        }
                      />
                    </View>
                    <View style={{ marginLeft: 8 }}>
                      <FAB
                        title="Fotoğraf Çek"
                        onPress={() => handleTakeFoto(values)}
                        color={colors.darkGreen}
                        icon={
                          <Icon2
                            name='add-a-photo'
                            color={colors.white}
                            size={24}
                          />
                        }
                      />
                    </View>
                  </View>
                  <ScrollView horizontal >
                    {values.recipePhotos.map((image, index) => (
                      <TouchableOpacity key={index} onLongPress={() => removePhoto(values, index)} >
                        <Image key={index} source={{ uri: image.uri }} style={{
                          width: 100,
                          height: 150,
                          resizeMode: 'cover',
                          marginVertical: 8,
                          marginHorizontal: 2,
                        }} />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                      {errors.recipePhotos && touched.recipePhotos && (<Text style={{
                        color: 'orange',
                        fontSize: 14,
                        fontWeight: 'bold',
                        textAlign:'center'
                      }}>{errors.recipePhotos}</Text>)}
                  <View>
                      <Text style={{ color: colors.darkGreen, fontWeight: '500', fontSize: 16, textAlign: 'left' }}> • Yatığınız yemekle alakalı fotoğrafları yükleyin.</Text>
                      <Text style={{ color: colors.darkGreen, fontWeight: '500', fontSize: 16, textAlign: 'left' }}> • Yükleyeceğiniz fotoğraflar size ait olmalı.</Text>
                      <Text style={{ color: colors.darkGreen, fontWeight: '500', fontSize: 16, textAlign: 'left' }}> • Fotoğraf kalitesine dikkat ederek paylaşın.</Text>
                      <Text style={{ color: colors.darkGreen, fontWeight: '500', fontSize: 16, textAlign: 'left' }}> • Fotoğrafları yatay olarak çekmeniz tavsiye edilir.</Text>

                    </View>
                  <Text style={{ color: colors.warning, fontWeight: '500', fontSize: 28, textAlign: 'center' }}>
                    UYARILAR
                  </Text>

                  <View style={{borderTopColor: colors.gray, borderTopWidth: 2, marginTop: 8, padding: 8}}>
                    <Text style={{ color: colors.darkGreen, fontWeight: '500', fontSize: 16, textAlign: 'left' }}> • Girmiş olduğunuz tüm bilgiler size ait olmalıdır.</Text>
                    <Text style={{ color: colors.darkGreen, fontWeight: '500', fontSize: 16, textAlign: 'left' }}> • Yemek tarifiniz replika ise her an silinebilir.</Text>
                    <Text style={{ color: colors.darkGreen, fontWeight: '500', fontSize: 16, textAlign: 'left' }}> • Tarifin malzemeleri ve hazırlanışı eksik girilmemeli.</Text>                    
                    <Text style={{ color: colors.meat, fontWeight: '500', fontSize: 20, textAlign: 'center' }}>Yukarıda yazan tüm uyarılara uyulmaması halinde tarifiniz sistemden silinecektir.</Text>
                  </View>
                  <View style={{marginVertical:16}}>
                    <FAB
                      title="Tarifi Paylaş"
                      color={colors.darkGreen}
                      icon={
                        <Icon2
                          name='file-upload'
                          color={colors.white}
                          size={24}
                        />
                      }
                      onPress={handleSubmit}
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