import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { getProductsAPIs } from '@/src/apis/axios';
import { FontAwesome, Feather } from '@expo/vector-icons';

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('M');

  const getPro = async () => {
    try {
      const result = await getProductsAPIs();
      setProducts(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPro();
  }, []);

  useEffect(() => {
    if (products.length > 0 && id) {
      const productDetail = products.find(product => product._id === id);
      setProduct(productDetail);
    }
  }, [products, id]);

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (!product) {
    return <Text style={styles.errorText}>Product not found!</Text>;
  }

  const renderStars = (rating) => {
    return (
      <View style={styles.ratingContainer}>
        <FontAwesome name="star" size={20} color="#FFD700" />
        <Text style={styles.ratingText}>{rating} (230)</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        
        <Feather style= {{marginLeft: 340}} name="heart" size={24} color="black" />
      </View>

      {/* Hình ảnh sản phẩm */}
      <Image source={{ uri: product.image }} style={styles.productImage} />

      {/* Thông tin sản phẩm */}
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productSubtext}>Ice/Hot</Text>

      {/* Đánh giá sao */}
      {renderStars(product.rating)}

      {/* Mô tả sản phẩm */}
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.productDescription} numberOfLines={2}>
        {product.description} <Text style={styles.readMore}>Read More</Text>
      </Text>

     

      {/* Giá và nút mua */}
      <View style={styles.footer}>
        <Text style={styles.priceText}>$ {product.price}</Text>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  productImage: {
    width: '100%',
    height: 250,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 15,
  },
  productSubtext: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
  },
  readMore: {
    color: '#FF5733',
    fontWeight: 'bold',
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  sizeBox: {
    width: 60,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedSize: {
    backgroundColor: '#E8C3A0',
    borderColor: '#E8C3A0',
  },
  sizeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  selectedSizeText: {
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  priceText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E44D26',
  },
  buyButton: {
    backgroundColor: 'brown',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    
  },
  buyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
    marginTop: 20,
  },
});
