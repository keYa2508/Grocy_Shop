/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
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
import {
  CommonActions,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {VegitablesList} from '../Products/VegitablesList';
import {Cart_Nav, Item_Nav, List_Nav, Notification_Nav} from '../Navigation';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, decreaseCart} from '../Redux/GlobalRedux';

type RootStackParamList = {
  DetailScreen: {
    name: string;
    price: number;
    image: ImageSourcePropType;
    content: string;
  };
};

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'DetailScreen'>;

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'DetailScreen'>;
  route: DetailScreenRouteProp;
}

const List: React.FC<Props> = ({route}) => {
  const {PassingData, Head} = route.params;
  const {cartItems} = useSelector(state => state.GlobalRedux);
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
            <Text style={{fontSize: 24, color: '#3b3a3a', fontWeight: 'bold'}}>
              {Head}
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', gap: 10}}>
            <TouchableOpacity
              style={styles.Icon}
              onPress={() => navigation.navigate(Notification_Nav)}>
              <MaterialCommunityIcons
                name="bell-outline"
                color={'#3b3a3a'}
                size={25}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.Icon}
              onPress={() =>
                navigation.dispatch(CommonActions.navigate({name: Cart_Nav}))
              }>
              <AntDesign name="shoppingcart" color={'#3b3a3a'} size={25} />
            </TouchableOpacity>
          </View>
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

  const selectItemPress = (data: {
    image?: ImageSourcePropType | undefined;
    name?: string;
    price?: number;
    content?: string;
    id?: number;
  }) => {
    if (data.price) {
      navigation.navigate(Item_Nav, {data});
    } else {
      const Head = data.name;
      const PassingData = VegitablesList;
      navigation.navigate(List_Nav, {PassingData, Head});
    }
  };
  return (
    <ScrollView style={{flex: 1, marginBottom: 20, padding: 15}}>
      <HeadComponent />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 20,
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingVertical: 15,
        }}>
        {PassingData.map(
          (
            x: {
              [x: string]: any;
              image: ImageSourcePropType | undefined;
              name:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | null
                | undefined;
              price:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
            },
            i: React.Key | null | undefined,
          ) => {
            const itemAvailavbleCart = cartItems.filter(
              item => item.id === x.id,
            );
            return (
              <TouchableOpacity
                onPress={() => selectItemPress(x)}
                key={i}
                style={[
                  styles.Card,
                  {backgroundColor: i % 2 === 0 ? '#b6c7f0' : '#f0b6e9'},
                ]}>
                <View>
                  <Image
                    source={x.image}
                    style={{width: 150, height: 150, borderRadius: 20}}
                  />
                </View>
                {x.price ? (
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
                        style={{
                          color: '#353635',
                          fontSize: 24,
                          fontWeight: 'bold',
                        }}>
                        {x.name}
                      </Text>
                    </View>
                    <View
                      style={{flexDirection: 'row', alignItems: 'baseline'}}>
                      <Text
                        style={{
                          color: '#353635',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        Rs.{x.price}
                      </Text>
                      <Text style={{color: '#353635', fontSize: 14}}>/kg</Text>
                    </View>
                    {itemAvailavbleCart.length > 0 ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: 10,
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() => dispatch(decreaseCart(x))}
                          style={styles.PlusIcon}>
                          <AntDesign name="minus" color={'#fff'} size={20} />
                        </TouchableOpacity>
                        <View>
                          <Text
                            style={{
                              color: '#353635',
                              fontSize: 24,
                              fontWeight: '700',
                            }}>
                            {itemAvailavbleCart[0].cartQuantity}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => dispatch(addToCart(x))}
                          style={styles.PlusIcon}>
                          <AntDesign name="plus" color={'#fff'} size={20} />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.PlusIcon}
                        onPress={() => dispatch(addToCart(x))}>
                        <AntDesign name="plus" color={'#fff'} size={20} />
                      </TouchableOpacity>
                    )}
                  </View>
                ) : (
                  <View>
                    <Text style={styles.Name}>{x.name}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          },
        )}
      </View>
    </ScrollView>
  );
};

export default List;

const styles = StyleSheet.create({
  Card: {
    width: 170,
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Name: {
    fontSize: 24,
    color: '#353635',
    textAlign: 'center',
    fontWeight: '700',
  },
  PlusIcon: {
    backgroundColor: '#7cf295',
    padding: 5,
    borderRadius: 5,
  },
  HeaderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
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
});
