/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  CommonActions,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {Cart_Nav} from '../Navigation';
import {addToCart, decreaseCart} from '../Redux/GlobalRedux';

type RootStackParamList = {
  DetailScreen: {
    name: string;
    price: number;
    image: ImageSourcePropType;
    content: string;
    id: number;
  };
};

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'DetailScreen'>;

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'DetailScreen'>;
  route: DetailScreenRouteProp;
}

const Item: React.FC<Props> = ({route}) => {
  const {data} = route.params;
  const {cartItems} = useSelector(state => state.GlobalRedux);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const itemAvailavbleCart = cartItems.filter(
    (x: {id: number}) => x.id === data.id,
  );

  const hndleAddCart = async () => {
    await dispatch(
      addToCart({
        name: data.name,
        image: data.image,
        content: data.content,
        price: data.price,
        id: data.id,
      }),
    );
  };

  const cartNavigation = () => {
    navigation.dispatch(CommonActions.navigate({name: Cart_Nav}));
  };

  const HeadComponent = () => {
    return (
      <SafeAreaView>
        <View style={styles.HeaderBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MaterialCommunityIcons
              name="chevron-left"
              color={'#3b3a3a'}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Icon}
            onPress={() => cartNavigation()}>
            <AntDesign name="shoppingcart" color={'#3b3a3a'} size={25} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  const BodyComponent = () => {
    return (
      <SafeAreaView style={{marginTop: 15}}>
        <View>
          <Image
            source={data.image}
            alt="image"
            style={{height: 250, borderRadius: 20, width: 360}}
          />
        </View>
        <View style={styles.BodyContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <View>
                <Text
                  style={{fontSize: 24, fontWeight: '900', color: '#353635'}}>
                  {data.name}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                <Text
                  style={{fontSize: 26, fontWeight: '900', color: '#353635'}}>
                  Rs.{data.price}
                </Text>
                <Text style={{fontSize: 20, color: '#353635'}}>/kg</Text>
              </View>
            </View>
            {itemAvailavbleCart.length > 0 && (
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
                  onPress={() => hndleAddCart(data)}
                  style={styles.PlusIcon}>
                  <AntDesign name="plus" color={'#fff'} size={20} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={{marginTop: 25}}>
            <View style={{alignSelf: 'flex-start'}}>
              <Text style={styles.headText}>Description</Text>
            </View>
            <View style={{marginTop: 15}}>
              <Text style={styles.bodyText}>{data.content}</Text>
            </View>
          </View>
          <View style={{marginTop: 25}}>
            <Text style={styles.headText}>Available in</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 15,
              marginTop: 15,
            }}>
            <TouchableOpacity style={styles.AvlBtn}>
              <Text style={{color: '#353635', fontWeight: '900', fontSize: 12}}>
                1kg
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.AvlBtn}>
              <Text style={{color: '#353635', fontWeight: '900', fontSize: 12}}>
                3kg
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.AvlBtn}>
              <Text style={{color: '#353635', fontWeight: '900', fontSize: 12}}>
                5kg
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.BtnBox}
            onPress={() => hndleAddCart(data)}>
            <Text style={styles.BtnTxt}>ADD TO CART</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  return (
    <ScrollView style={{flex: 1, marginBottom: 20, padding: 15}}>
      <HeadComponent />
      <BodyComponent />
    </ScrollView>
  );
};

export default Item;

const styles = StyleSheet.create({
  HeaderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  Icon: {
    backgroundColor: '#ebe8e8',
    borderRadius: 18,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  PlusIcon: {
    backgroundColor: '#7cf295',
    padding: 5,
    borderRadius: 5,
  },
  headText: {
    color: '#7cf295',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bodyText: {
    color: '#4d4a4c',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  BodyContainer: {
    backgroundColor: '#ebe8e8',
    marginTop: 15,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  AvlBtn: {
    backgroundColor: '#9e9d9e',
    padding: 10,
    borderRadius: 10,
  },
  BtnBox: {
    backgroundColor: '#7cf295',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    borderRadius: 10,
  },
  BtnTxt: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});
