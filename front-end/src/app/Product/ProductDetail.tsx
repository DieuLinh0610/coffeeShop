import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { getProductsAPIs } from '@/src/apis/axios';

export default function ProductDetail() {
  const { id } = useLocalSearchParams(); // Lấy id từ URL hoặc params
  const [products, setProducts] = useState([]); // State lưu danh sách sản phẩm
  const [product, setProduct] = useState(null); // State lưu thông tin chi tiết sản phẩm
  const [loading, setLoading] = useState(true); // Để kiểm tra trạng thái loading

  // Hàm lấy tất cả sản phẩm
  const getPro = async () => {
    try {
      const result = await getProductsAPIs(); // Giả sử bạn có API này
      setProducts(result); // Lưu kết quả vào state products
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Đã tải xong
    }
  };

  // Hàm lọc sản phẩm theo id
  useEffect(() => {
    getPro(); // Gọi API để lấy dữ liệu sản phẩm
  }, []);

  useEffect(() => {
    if (products.length > 0 && id) {
      // Lọc sản phẩm theo id
      const productDetail = products.find(product => product._id === id);
      setProduct(productDetail); // Lưu sản phẩm tìm thấy vào state product
    }
  }, [products, id]);

  // Nếu đang tải dữ liệu, hiển thị loading
  if (loading) {
    return <Text>Loading...</Text>;
  }

  // Nếu không tìm thấy sản phẩm, hiển thị thông báo lỗi
  if (!product) {
    return <Text>Product not found!</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Text style={styles.productPrice}>Price: {product.price} VND</Text>
      <Text style={styles.productRating}>Rating: {product.rating} / 5</Text>
      <Text style={styles.productPurchases}>Purchases: {product.purchases}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  productRating: {
    fontSize: 16,
    marginBottom: 8,
  },
  productPurchases: {
    fontSize: 16,
    color: '#888',
  },
});
