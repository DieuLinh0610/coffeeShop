import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosCustomize from '@/src/utils/axiosCustomize';

export default function OrderHistory() {
    const currentUser = useSelector((state: any) => state.auth.user);
    const [orders, setOrders] = useState<any[]>([]);
  
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await axiosCustomize.get(`/orders/${currentUser.id}`);
          setOrders(response);
        } catch (error) {
          console.error('Error fetching order history:', error);
        }
      };
  
      if (currentUser?.id) {
        fetchOrders();
      }
    }, [currentUser]);
  
    return (
      <View style={styles.container}>
        <FlatList
          data={orders}
          keyExtractor={(order) => order._id}
          style= {{marginTop: 40}}
          renderItem={({ item: order }) => (
            <View style={styles.orderContainer}>
              <Text style={styles.orderTitle}>Đơn hàng #{order._id}</Text>
              <FlatList
                data={order.items}
                keyExtractor={(item, index) => `${order._id}-${index}`}
                renderItem={({ item }) => (
                  <View style={styles.orderItem}>
                    <Image source={{ uri: item.productId.image }} style={styles.image} />
                    <View style={styles.details}>
                      <Text style={styles.productName}>{item.productId.name}</Text>
                      <Text style={styles.quantity}>Số lượng: {item.quantity}</Text>
                      <Text style={styles.price}>Giá: {item.productId.price} VNĐ</Text>
                    </View>
                  </View>
                )}
              />
              <Text style={styles.totalPrice}>Tổng: {order.totalPrice} VNĐ</Text>
            </View>
          )}
        />
      </View>
    );
  }
  
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 5,
  },
  details: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 14,
    color: 'gray',
  },
  price: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    marginTop: 5,
    textAlign: 'right',
  },
});
