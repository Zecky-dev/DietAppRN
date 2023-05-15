import React from 'react';
import {View,FlatList} from 'react-native';
import RecipeCard from '../../components/RecipeCard/RecipeCard';

const SharedRecipes = () => {

    

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
        <View style={{flex:1, backgroundColor:'#EBEBEB'}}>
            <FlatList
            data={recipeData}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <RecipeCard recipeData={item}/>}/>
        </View>
    )
}

export default SharedRecipes;