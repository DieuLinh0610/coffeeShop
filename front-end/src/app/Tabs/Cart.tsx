import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { getCartAPI, removeFromCartAPI, updateCartAPI } from "@/src/apis/axios";

export default function CartScreen() {
  const user = useSelector((state: any) => state.user);
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchCart = async () => {
      try {
        const response = await getCartAPI(user.id);
        setCart(response.items || []);
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
    if (!user?.id) {
      alert("Vui lòng đăng nhập");
      return;
    }

    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }

    try {
      await updateCartAPI(user.id, productId, newQuantity);
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId._id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng:", error);
    }
  };

  const handleRemoveFromCart = async (productId: string) => {
    if (!user?.id) {
      alert("Vui lòng đăng nhập");
      return;
    }

    try {
      await removeFromCartAPI(user.id, productId);
      setCart(cart.filter((item) => item.productId._id !== productId));
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  // ✅ Hàm tính tổng tiền hàng trong giỏ hàng
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.productId.price * item.quantity, 0);
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Giỏ Hàng</Text>

      {cart.length === 0 ? (
        <Text style={styles.emptyCart}>Giỏ hàng trống!</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.productId._id}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={{ uri: item.productId.image }} style={styles.image} />
                <View style={styles.details}>
                  <Text style={styles.name}>{item.productId.name}</Text>
                  <Text style={styles.price}>{item.productId.price.toLocaleString()} VND</Text>

                  <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => handleUpdateQuantity(item.productId._id, item.quantity - 1)}>
                      <Text style={styles.quantityButton}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.quantityText}>{item.quantity}</Text>

                    <TouchableOpacity onPress={() => handleUpdateQuantity(item.productId._id, item.quantity + 1)}>
                      <Text style={styles.quantityButton}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity onPress={() => handleRemoveFromCart(item.productId._id)} style={styles.removeButton}>
                  <Text style={styles.removeButtonText}>Xóa</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          {/* ✅ Hiển thị tổng tiền */}
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Tổng tiền: {calculateTotal().toLocaleString()} VND</Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  emptyCart: { textAlign: "center", fontSize: 16, color: "gray", marginTop: 20 },
  cartItem: { flexDirection: "row", alignItems: "center", backgroundColor: "#f9f9f9", padding: 10, borderRadius: 8, marginBottom: 10 },
  image: { width: 60, height: 60, borderRadius: 8 },
  details: { flex: 1, marginLeft: 10 },
  name: { fontSize: 16, fontWeight: "bold" },
  price: { fontSize: 14, color: "#555" },
  removeButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 5,
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  quantityButton: {
    fontSize: 18,
    paddingHorizontal: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  // ✅ Style phần tổng tiền
  totalContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
