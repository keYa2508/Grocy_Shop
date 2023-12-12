/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CategoryList} from '../Products/CategoryList';
import {VegitablesList} from '../Products/VegitablesList';
import {useNavigation} from '@react-navigation/native';
import {Item_Nav, List_Nav, Notification_Nav} from '../Navigation';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, decreaseCart} from '../Redux/GlobalRedux';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {cartItems} = useSelector(state => state.GlobalRedux);

  const HeaderComponent = () => {
    const profilPic = require('../Assets/Images/Pic.jpg');
    return (
      <SafeAreaView>
        <View style={styles.HeaderBar}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={profilPic}
              style={{width: 30, borderRadius: 15, height: 30}}
            />
            <Text style={{fontSize: 14, color: '#7a7a7a', fontWeight: 'bold'}}>
              Keya
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Icon}
            onPress={() => navigation.navigate(Notification_Nav)}>
            <MaterialCommunityIcons
              name="bell-outline"
              color={'#3b3a3a'}
              size={25}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{color: '#545353', fontWeight: 'bold', fontSize: 14}}>
            Hello!
          </Text>
          <Text style={styles.HeadTXT}>Find your daily needs</Text>
        </View>
        <View style={styles.SearchBar}>
          <EvilIcons name="search" color={'#3b3a3a'} size={20} />
          <TextInput
            style={{padding: 10, width: 300, fontSize: 18, color: '#3b3a3a'}}
            placeholder="Search grocery"
            placeholderTextColor={'#3b3a3a'}
          />
        </View>
      </SafeAreaView>
    );
  };

  const CatecoryComponent = () => {
    interface Data {
      name: string;
      image: ImageSourcePropType;
    }
    interface Props {
      data: Data;
      key: number;
    }
    const Card: React.FC<Props> = ({data, key}: Props) => {
      const CategoryNav = () => {
        const Head = data.name;
        const PassingData = VegitablesList;
        navigation.navigate(List_Nav, {PassingData, Head});
      };
      return (
        <TouchableOpacity
          key={key}
          style={styles.CategoryCard}
          onPress={() => CategoryNav()}>
          <Image
            source={data.image}
            alt="Image"
            style={{width: 80, height: 50, borderRadius: 10}}
          />
          <View style={{width: 80}}>
            <Text style={{color: '#353635', fontSize: 18, fontWeight: '900'}}>
              {data.name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    const seeMorePress = () => {
      const PassingData = CategoryList;
      const Head = 'Category';
      navigation.navigate(List_Nav, {PassingData, Head});
    };
    return (
      <SafeAreaView style={{marginTop: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text style={styles.CompHead}>Category</Text>
          </View>
          <TouchableOpacity onPress={() => seeMorePress()}>
            <Text style={styles.SeeAll}>SEE ALL</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={CategoryList}
            renderItem={({item, index}) => {
              return <Card data={item} key={index} />;
            }}
          />
        </View>
      </SafeAreaView>
    );
  };

  const OfferComponent = () => {
    interface Data {
      id: number;
      name: string;
      image: ImageSourcePropType;
      price: number;
      content: string;
    }
    interface Props {
      data: Data;
      key: number;
    }
    const Card: React.FC<Props> = ({data, key}: Props) => {
      const itemAvailavbleCart = cartItems.filter(
        (x: {id: number}) => x.id === data.id,
      );
      return (
        <View key={key} style={styles.OfferCard}>
          <TouchableOpacity
            onPress={() => navigation.navigate(Item_Nav, {data})}>
            <Image
              source={data.image}
              alt="Image"
              style={{width: 150, height: 150, borderRadius: 20}}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
              width: 180,
              gap: 10,
            }}>
            <View>
              <Text
                style={{color: '#353635', fontSize: 24, fontWeight: 'bold'}}>
                {data.name}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
              <Text
                style={{color: '#353635', fontSize: 18, fontWeight: 'bold'}}>
                Rs.{data.price}
              </Text>
              <Text style={{color: '#353635', fontSize: 14}}>/kg</Text>
            </View>
            {itemAvailavbleCart.length > 0 ? (
              <View
                style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => dispatch(decreaseCart(data))}
                  style={styles.PlusIcon}>
                  <AntDesign name="minus" color={'#fff'} size={20} />
                </TouchableOpacity>
                <View>
                  <Text
                    style={{color: '#353635', fontSize: 24, fontWeight: '700'}}>
                    {itemAvailavbleCart[0].cartQuantity}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => dispatch(addToCart(data))}
                  style={styles.PlusIcon}>
                  <AntDesign name="plus" color={'#fff'} size={20} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.PlusIcon}
                onPress={() =>
                  dispatch(
                    addToCart({
                      name: data.name,
                      image: data.image,
                      content: data.content,
                      price: data.price,
                      quantity: 1,
                      id: data.id,
                    }),
                  )
                }>
                <AntDesign name="plus" color={'#fff'} size={20} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      );
    };

    const seeMorePress = () => {
      const PassingData = VegitablesList;
      const Head = 'Exclusive Offers';
      navigation.navigate(List_Nav, {PassingData, Head});
    };
    return (
      <SafeAreaView style={{marginTop: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text style={styles.CompHead}>Exclusive Offers</Text>
          </View>
          <TouchableOpacity onPress={() => seeMorePress()}>
            <Text style={styles.SeeAll}>SEE ALL</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={VegitablesList}
            renderItem={({item, index}) => {
              return <Card data={item} key={index} />;
            }}
          />
        </View>
      </SafeAreaView>
    );
  };

  const BestSellingComponent = () => {
    interface Data {
      id: number;
      name: string;
      image: ImageSourcePropType;
      price: number;
      content: string;
    }
    interface Props {
      data: Data;
      key: number;
    }
    const Card: React.FC<Props> = ({data, key}: Props) => {
      const itemAvailavbleCart = cartItems.filter(
        (x: {id: number}) => x.id === data.id,
      );
      return (
        <View key={key} style={styles.OfferCard}>
          <TouchableOpacity
            onPress={() => navigation.navigate(Item_Nav, {data})}>
            <Image
              source={data.image}
              alt="Image"
              style={{width: 150, height: 150, borderRadius: 20}}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
              width: 180,
              gap: 10,
            }}>
            <View>
              <Text
                style={{color: '#353635', fontSize: 24, fontWeight: 'bold'}}>
                {data.name}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
              <Text
                style={{color: '#353635', fontSize: 18, fontWeight: 'bold'}}>
                Rs.{data.price}
              </Text>
              <Text style={{color: '#353635', fontSize: 14}}>/kg</Text>
            </View>
            {itemAvailavbleCart.length > 0 ? (
              <View
                style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => dispatch(decreaseCart(data))}
                  style={styles.PlusIcon}>
                  <AntDesign name="minus" color={'#fff'} size={20} />
                </TouchableOpacity>
                <View>
                  <Text
                    style={{color: '#353635', fontSize: 24, fontWeight: '700'}}>
                    {itemAvailavbleCart[0].cartQuantity}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => dispatch(addToCart(data))}
                  style={styles.PlusIcon}>
                  <AntDesign name="plus" color={'#fff'} size={20} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.PlusIcon}
                onPress={() =>
                  dispatch(
                    addToCart({
                      name: data.name,
                      image: data.image,
                      content: data.content,
                      price: data.price,
                      quantity: 1,
                      id: data.id,
                    }),
                  )
                }>
                <AntDesign name="plus" color={'#fff'} size={20} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      );
    };

    const seeMorePress = () => {
      const PassingData = VegitablesList;
      const Head = 'Best Selling';
      navigation.navigate(List_Nav, {PassingData, Head});
    };
    return (
      <SafeAreaView style={{marginVertical: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text style={styles.CompHead}>Best Selling</Text>
          </View>
          <TouchableOpacity onPress={() => seeMorePress()}>
            <Text style={styles.SeeAll}>SEE ALL</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={VegitablesList}
            renderItem={({item, index}) => {
              return <Card data={item} key={index} />;
            }}
          />
        </View>
      </SafeAreaView>
    );
  };
  return (
    <ScrollView style={{paddingHorizontal: 20, paddingVertical: 15}}>
      <HeaderComponent />
      <CatecoryComponent />
      <OfferComponent />
      <BestSellingComponent />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  HeaderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  HeadTXT: {
    fontSize: 38,
    color: '#545353',
    fontWeight: 'bold',
  },
  SearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ebe8e8',
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  Icon: {
    backgroundColor: '#ebe8e8',
    borderRadius: 18,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SeeAll: {
    color: '#000',
    fontSize: 14,
    fontWeight: '700',
  },
  CompHead: {
    fontSize: 18,
    color: '#000',
    fontWeight: '700',
  },
  CategoryCard: {
    width: 200,
    borderRadius: 30,
    height: 100,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: 15,
    padding: 10,
    marginRight: 20,
  },
  OfferCard: {
    width: 200,
    alignItems: 'center',
    gap: 15,
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#fff',
    marginTop: 15,
    marginRight: 20,
  },
  PlusIcon: {
    backgroundColor: '#7cf295',
    padding: 5,
    borderRadius: 5,
  },
});
