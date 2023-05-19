import React from 'react'
import { Text, View, Image, ScrollView } from 'react-native'
import styles from './RecipeDetails.style'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/FontAwesome5'
import colors from '../../utils/colors'

import {SwiperFlatList} from 'react-native-swiper-flatlist'

const RecipeDetails = ({ route }) => {
    const {
        owner,
        instaProfile,
        foodName,
        category,
        howManyPeople,
        preparationTime,
        description,
        ingredients,
        preparation,
        recipePhotos
    } = route.params

    const renderItems = (item) => <Image source={{ uri: item.item.uri }} style={styles.imageStyle} />

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.imageContainer}>
                <SwiperFlatList
                    horizontal
                    data={recipePhotos}
                    keyExtractor={(item) => item.index}
                    renderItem={(item) => renderItems(item)}
                />
            </View>
            <View style={styles.textContainer}>
                <View style={styles.top}>
                    <View style={{ flex: 1, alignItems: 'center' }}><Text style={styles.text.headerText}>{foodName}</Text></View>
                    <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon3
                            name='signature'
                            color={'black'}
                            size={20}
                        />
                        <Text style={styles.text.signText}> {owner}</Text>
                    </View>
                    {instaProfile
                        ? <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name='instagram' color='black' size={20} />
                            <Text style={styles.text.signText}> {instaProfile}</Text>
                        </View>
                        : ""
                    }
                    </View>
                </View>
                <View style={styles.bottom}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 16 }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon2
                                name='people'
                                color={colors.black}
                                size={24}
                            />
                            <Text style={styles.text.signTextW}>Kişi Sayısı</Text>
                            <Text style={styles.text.signTextW}/>
                            <Text style={styles.text.signTextW}>{howManyPeople} kişi</Text>
                        </View>
                        <View style={{ flex: 1, borderRightWidth: 1, borderRightColor: colors.gray, borderLeftColor: colors.gray, borderLeftWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon
                                name='silverware-fork-knife'
                                color={colors.black}
                                size={24}
                            />
                            <Text style={styles.text.signTextW}>Kategori</Text>
                            <Text style={styles.text.signTextW}/>
                            <Text style={styles.text.signTextW}>{category}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon
                                name='clock-time-nine-outline'
                                color={colors.black}
                                size={24}
                            />
                            <Text style={styles.text.signTextW}>Hazırlanma</Text>
                            <Text style={styles.text.signTextW}>Süresi</Text>
                            <Text style={styles.text.signTextW}>{preparationTime} dakika</Text>
                        </View>
                    </View>
                    <View>
                        <View style={{ marginVertical: 8 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Icon
                                    name='text-long'
                                    color={colors.black}
                                    size={30}
                                />
                                <Text style={{ fontSize: 20, fontWeight: '500', color: colors.white }}>{owner}'dan açıklama</Text>
                            </View>
                            <Text>{description}</Text>
                        </View>
                        <View style={{ borderColor: colors.gray, borderTopWidth: 1, borderBottomWidth: 1, paddingVertical: 8 }}>
                            <View style={{ marginVertical: 8 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon
                                        name='text-long'
                                        color={colors.black}
                                        size={30}
                                    />
                                    <Text style={{ fontSize: 20, fontWeight: '500', color: colors.white }}>{owner}'dan Malzemeler</Text>
                                </View>
                                <Text>{ingredients}</Text>
                            </View>
                        </View>
                        <View>
                        <View style={{marginVertical:8}}>
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Icon
                            name='text-long'
                            color={colors.black}
                            size={30}
                            />
                            <Text style={{fontSize:20,fontWeight:'500',color:colors.white}}>{owner}'dan Tarif</Text>
                            </View>
                            <Text style={{ marginVertical: 8 }}>{preparation}</Text>
                        </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default RecipeDetails