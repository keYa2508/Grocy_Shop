/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Item_Nav, Notification_Nav} from '../Navigation';
import {
  addToCart,
  clearCart,
  decreaseCart,
  removeFromCart,
} from '../Redux/GlobalRedux';

const Cart = () => {
  const {cartItems, cartTotalQuantity, cartTotalAmount} = useSelector(
    state => state.GlobalRedux,
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
        {cartItems.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={styles.BuyBtn}
              onPress={() => dispatch(clearCart())}>
              <Text>Clear Cart</Text>
            </TouchableOpacity>
            <View style={styles.TotalBtn}>
              <Text
                style={{color: '#353635', fontSize: 20, fontWeight: 'bold'}}>
                Total Items: {cartTotalQuantity}
              </Text>
              <Text
                style={{color: '#353635', fontSize: 16, fontWeight: 'bold'}}>
                SubTotal: {cartTotalAmount}
              </Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  };

  interface Data {
    name: string;
    image: ImageSourcePropType;
    price: number;
    content: string;
    quantity: number;
    cartQuantity: number;
    id: number;
  }
  interface Props {
    data: Data;
    key: number;
  }
  const CartItemCard: React.FC<Props> = ({data, key}: Props) => {
    return (
      <View key={key} style={styles.card}>
        <View style={styles.cardTop}>
          <TouchableOpacity
            onPress={() => navigation.navigate(Item_Nav, {data})}>
            <Image source={data.image} alt="Image" style={styles.cartImage} />
          </TouchableOpacity>
          <View
            style={{justifyContent: 'center', alignItems: 'center', gap: 10}}>
            <Text style={{color: '#353635', fontSize: 28, fontWeight: 'bold'}}>
              {data.name}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
              <Text
                style={{color: '#353635', fontSize: 20, fontWeight: 'bold'}}>
                Rs.{data.price}
              </Text>
              <Text style={{color: '#353635', fontSize: 14, fontWeight: '500'}}>
                /KG
              </Text>
            </View>
          </View>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center', gap: 10}}>
          <Text style={{color: '#353635', fontSize: 20, fontWeight: 'bold'}}>
            Quantity
          </Text>
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => dispatch(decreaseCart(data))}
              style={styles.PlusIcon}>
              <AntDesign name="minus" color={'#fff'} size={20} />
            </TouchableOpacity>
            <View>
              <Text style={{color: '#353635', fontSize: 24, fontWeight: '700'}}>
                {data.cartQuantity}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => dispatch(addToCart(data))}
              style={styles.PlusIcon}>
              <AntDesign name="plus" color={'#fff'} size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <TouchableOpacity
            style={styles.DelBtn}
            onPress={() => dispatch(removeFromCart(data))}>
            <MaterialIcons name="delete-outline" color={'#fff'} size={24} />
            <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
              Del
            </Text>
          </TouchableOpacity>
          <Text style={{color: '#353635', fontSize: 20, fontWeight: 'bold'}}>
            Price: {data.price * data.quantity * data.cartQuantity}
          </Text>
          <TouchableOpacity style={styles.BuyBtn}>
            <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
              BUY
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const EmptyComponent = () => {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: '#353635', fontSize: 18, fontWeight: 'bold'}}>
          No Items Added
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, marginVertical: 20, marginHorizontal: 10}}>
      <HeaderComponent />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={cartItems}
        renderItem={({item, index}) => {
          return <CartItemCard data={item} key={index} />;
        }}
        ListEmptyComponent={EmptyComponent}
      />
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 30,
    gap: 15,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  cartImage: {
    width: 200,
    height: 120,
    borderRadius: 30,
  },
  DelBtn: {
    backgroundColor: '#eb4034',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  BuyBtn: {
    backgroundColor: '#6386e6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  HeaderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  PlusIcon: {
    backgroundColor: '#7cf295',
    padding: 5,
    borderRadius: 5,
  },
  TotalBtn: {
    backgroundColor: '#f5c158',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
