import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router"; // Đảm bảo bạn đang sử dụng expo-router
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BellIcon,
  MapPinIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import {
  addToCartAPI,
  getCategoriesAPIs,
  getProductsAPIs,
} from "@/src/apis/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
} from "../Product/favoriteStorage";

export default function HomePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const user = useSelector((state: any) => state.auth.user); // Lấy userId từ Redux
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getCate = async () => {
      try {
        const result = await getCategoriesAPIs();
        setCategories(result);
      } catch (err) {
        setError(error);
      }
    };

    const getPro = async () => {
      try {
        const result = await getProductsAPIs();
        if (Array.isArray(result)) {
          setProducts(result);
          setFilteredProducts(result);
        }
      } catch (err) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getCate();
    getPro();
  }, []);

  useEffect(() => {
    let filtered = products;
    console.log(products);

    if (selectedCategory) {
      filtered = filtered.filter(
        (product: any) => product.categoryId === selectedCategory
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((product: any) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, products]);

  console.log(selectedCategory);

  useEffect(() => {
    fetchFavorites();
  }, []);
  const fetchFavorites = async () => {
    const data = await getFavorites();
    setFavorites(data);
  };

  // Xử lý thêm hoặc xóa sản phẩm khỏi danh sách yêu thích
  const toggleFavorite = async (product) => {
    const isFavorite = favorites.some((item) => item._id === product._id);

    if (isFavorite) {
      await removeFromFavorites(product._id);
    } else {
      await addToFavorites(product);
    }

    fetchFavorites(); // Cập nhật lại danh sách yêu thích
  };

  const handleAddToCart = async (productId) => {
    try {
      if (!user || !user.id) {
        alert("Vui lòng đăng nhập!");
        return;
      }

      await addToCartAPI(user.id, productId, 1);
      alert("Đã thêm vào giỏ hàng! 🎉");
    } catch (error) {
      alert("Thêm vào giỏ hàng thất bại! ❌");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar />

      {/* Header Section */}
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push("/Tabs/Profile")}>
            <Image
              source={require("../../../assets/images/avatar-profile.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <View style={styles.locationTextContainer}>
            <MapPinIcon color="black" opacity={0.6} size={20} />
            <Text>Hà Nội, Việt Nam</Text>
          </View>
          <TouchableOpacity>
            <BellIcon size={27} color="black" opacity={0.6} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <MagnifyingGlassIcon size={20} color="#FFA500" />
          <TextInput
            placeholder="Tìm kiếm sản phẩm..."
            placeholderTextColor="gray"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </SafeAreaView>

      {/* Categories Section */}
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item: any) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === item._id && styles.selectedButton,
            ]}
            onPress={() =>
              setSelectedCategory(
                selectedCategory === item._id ? null : item._id
              )
            }
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === item._id && styles.selectedText,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.categoriesContainer}
      />

      {/* Products Section */}
      <FlatList
        data={filteredProducts}
        numColumns={2} // 2 items per row
        keyExtractor={(item: any) => item._id} // Ensure a unique key for each product
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() =>
              router.push({
                pathname: "/Product/ProductDetail",
                params: { id: item._id },
              })
            } // Điều hướng tới trang chi tiết sản phẩm
          >
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.image }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => toggleFavorite(item)}
              >
                <Text style={styles.favoriteIcon}>
                  {favorites.some((fav: any) => fav._id === item._id)
                    ? "❤️"
                    : "🤍"}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.productTitle}>{item.name}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <Text style={styles.productPrice}>
              {item.price.toLocaleString()} VND
            </Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleAddToCart(item._id)}
            >
              <Text style={styles.addButtonText}>Thêm vào giỏ</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        columnWrapperStyle={styles.productRow}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // Các style vẫn giữ nguyên
  container: { flex: 1, backgroundColor: "white" },
  headerContainer: { paddingHorizontal: 20, paddingTop: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  locationTextContainer: { flexDirection: "row", alignItems: "center" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 15,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: "black" },
  productCard: {
    backgroundColor: "#EDE0D4",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    width: "95%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginRight: 15,
    marginLeft: 5,
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    aspectRatio: 1,
  },
  productTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#6F4E37",
    marginTop: 10,
  },
  productDescription: { color: "gray", fontSize: 14, marginVertical: 5 },
  productPrice: { fontWeight: "bold", fontSize: 16, color: "#6F4E37" },
  addButton: {
    marginTop: 10,
    backgroundColor: "#6F4E37",
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  productRow: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
    width: "50%",
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    paddingBottom: 0,
    marginBottom: 20,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#ddd",
    height: 40,
    width: 80,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedButton: { backgroundColor: "#ff7f50" },
  categoryText: { fontSize: 16, color: "#333" },
  selectedText: { color: "#fff", fontWeight: "bold" },
  imageContainer: {
    position: "relative", // Để chứa các phần tử con có vị trí tuyệt đối
  },

  favoriteButton: {
    position: "absolute",
    top: 8, // Cách mép trên 8px
    right: 8, // Cách mép phải 8px
    backgroundColor: "rgba(255, 255, 255, 0.6)", // Nền mờ để nhìn rõ hơn
    borderRadius: 20, // Bo tròn viền
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },

  favoriteIcon: {
    fontSize: 20,
  },
});
