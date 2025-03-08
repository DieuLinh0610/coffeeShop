import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { fetchCategories, fetchProducts } from '../../apis';
import CategoryItem from '../../components/CategoryItem';
import ProductItem from '../../components/ProductItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories().then(data => {
      setCategories(data);
    }) ;
    fetchProducts().then((data) => {
      setProducts(data);
      setFilteredProducts(data);  
    });

    const fetchUserInfo = async () => {
      try {
        // Lấy dữ liệu từ AsyncStorage
        const storedUserInfo = await AsyncStorage.getItem('userInfo');
        
        if (storedUserInfo !== null) {
          // Chuyển dữ liệu từ chuỗi JSON thành đối tượng
          console.log("user: ",JSON.parse(storedUserInfo));
          
        }
      } catch (error) {
        console.error('Error retrieving user info', error);
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    filterProducts();

  }, [searchText, selectedCategory, products]);

  
  
  
  const filterProducts = () => {
    let filtered = products;
    
    if (searchText) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(product => String(product.categoryId._id) === String(selectedCategory));
    }
    
    setFilteredProducts(filtered);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 20 }}>
      {/* Location Bar */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Feather name="map-pin" size={16} color="#8B5E3C" style={{ marginRight: 5 }} />
        <Text style={{ fontSize: 14, color: '#5C4033' }}>Hà Nội, Việt Nam</Text>
        <Feather name="phone" size={16} color="#8B5E3C" style={{ marginLeft: 'auto' }} />
      </View>
      
      {/* Search Bar */}
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 25, padding: 10, marginBottom: 16 }}>
        <Feather name="search" size={20} color="#888" style={{ marginHorizontal: 8 }} />
        <TextInput 
          placeholder="Search..." 
          style={{ flex: 1, fontSize: 16, color: '#333' }}
          value={searchText} 
          onChangeText={setSearchText} 
        />
      </View>
      
      {/* Categories */}
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Categories</Text>
      <FlatList 
        data={categories} 
        horizontal 
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <CategoryItem 
            category={item} 
            selected={selectedCategory === item._id}
            onPress={() => setSelectedCategory(selectedCategory === item._id ? null : item._id)}
          />
        )} 
        style={{ marginBottom: 10}}
      />

      {/* Product List */}
      <FlatList 
        data={filteredProducts} 
        numColumns={2}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <ProductItem product={item} />}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingTop: 10 }}
      />
    </View>
  );
};

export default HomeScreen;