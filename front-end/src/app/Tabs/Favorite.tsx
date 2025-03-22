import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Button, Image } from 'react-native-elements';
import { useRouter } from 'expo-router';  // Import router để chuyển màn hình
import { getFavorites, removeFromFavorites } from '../Product/favoriteStorage';

const FavoriteScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const router = useRouter(); // Sử dụng router để điều hướng

  useEffect(() => {
    fetchFavorites();
  }, []);

  // Lấy danh sách sản phẩm yêu thích từ AsyncStorage
  const fetchFavorites = async () => {
    const data = await getFavorites();
    setFavorites(data);
  };

  // Xóa sản phẩm khỏi danh sách yêu thích
  const handleRemove = async (productId: any) => {
    await removeFromFavorites(productId);
    fetchFavorites(); // Cập nhật lại danh sách
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách yêu thích</Text>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item: any) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/Product/ProductDetail",
                  params: { id: item._id },
                })
              }
            >
              <Card containerStyle={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Card.Title>{item.name}</Card.Title>
                <Text style={styles.price}>{item.price} VND</Text>
                <Button
                  title="Xóa khỏi yêu thích"
                  buttonStyle={styles.button}
                  onPress={() => handleRemove(item._id)}
                />
              </Card>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>Chưa có sản phẩm yêu thích</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  card: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#d32f2f',
    borderRadius: 8,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
    color: '#888',
  },
});

export default FavoriteScreen;
