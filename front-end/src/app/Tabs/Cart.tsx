import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeCart, setCart, updateQuanityCart } from "@/src/redux/cartSlice";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { getCartAPI, getProductsAPIs } from "@/src/apis/axios";

export default function ShoppingCart() {
  const currentCart = useSelector((state: any) => state.cart.cart);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    getCartAPI().then((res) => {
      dispatch(setCart(res));
    });
  }, []);

  const handleUpdateQuantity = (item: any, quantity: any) => {
    dispatch(
      updateQuanityCart({
        userId: currentUser.id,
        productId: item.productId._id,
        quantity: quantity
      })
    );
  };

  const handleDeleteItem = (item: any) => {
    dispatch(removeCart({ userId: currentUser.id, productId: item.productId._id }));
  }
  // console.log(currentCart);

  return (
    currentCart && (
      <View style={{ flex: 1, backgroundColor: "white", position: "relative" }}>
        <FlatList
          data={currentCart?.items}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={{
                padding: 20,
                borderBottomWidth: 0.2,
                borderColor: "#E2E2E2",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View style={{ marginRight: 10 }}>
                <Image
                  source={{ uri: item?.productId?.image }}
                  style={{ width: 120, height: 80 }}
                />
              </View>
              <View style={{ width: "70%" }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "semibold",
                      fontWeight: "bold",
                    }}
                  >
                    {item?.productId?.name}
                  </Text>
                  <TouchableOpacity onPress={() => handleDeleteItem(item)}>
                    <Ionicons name="close" size={20} color={"gray"} />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        handleUpdateQuantity(item, item.quantity - 1)
                      }
                    >
                      <Text
                        style={{
                          fontSize: 24,
                          borderWidth: 0.2,
                          borderColor: "gray",
                          padding: 5,
                          paddingHorizontal: 15,
                          borderRadius: 7,
                        }}
                      >
                        -
                      </Text>
                    </TouchableOpacity>

                    <Text style={{ fontSize: 24, borderColor: "gray" }}>
                      {item.quantity}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        handleUpdateQuantity(item, item.quantity + 1)
                      }
                    >
                      <Text
                        style={{
                          fontSize: 24,
                          borderWidth: 0.2,
                          borderColor: "gray",
                          padding: 5,
                          paddingHorizontal: 15,
                          borderRadius: 7,
                          color: "green",
                        }}
                      >
                        +
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 24,
                        fontFamily: "semibold",
                        fontWeight: "bold",
                        marginRight: 10,
                      }}
                    >
                      ${item?.productId?.price * item.quantity}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        />

        <View
          style={{
            padding: 20,
            width: "100%",
          }}
        >
          <Button
            title={`checkout( ${currentCart.items.reduce(
              (total, item) => total + item.quantity * item?.productId?.price,
              0
            )} $)`}
            onPress={() => actionSheetRef.current?.show()}
          />
        </View>
        <ActionSheet ref={actionSheetRef}>
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 20,
              }}
            >
              <Text style={{ fontSize: 20, fontFamily: "outfit-bold" }}>
                Checkout
              </Text>
              <Ionicons name="close" size={20} />
            </View>

            <View
              style={{
                borderBottomWidth: 0.2,
                borderColor: "gray",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 20,
              }}
            >
              <Text
                style={{ fontSize: 16, fontFamily: "outfit", color: "gray" }}
              >
                Delivery
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 16, fontFamily: "outfit" }}>
                  Select Method
                </Text>
                <Ionicons name="chevron-forward" size={20} />
              </View>
            </View>

            <View
              style={{
                borderBottomWidth: 0.2,
                borderColor: "gray",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 20,
              }}
            >
              <Text
                style={{ fontSize: 16, fontFamily: "outfit", color: "gray" }}
              >
                Pament
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FontAwesome name="cc-mastercard" size={20} />
                <Ionicons name="chevron-forward" size={20} />
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 0.2,
                borderColor: "gray",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 20,
              }}
            >
              <Text
                style={{ fontSize: 16, fontFamily: "outfit", color: "gray" }}
              >
                Promo Code{" "}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 16, fontFamily: "outfit" }}>
                  Pick discount
                </Text>
                <Ionicons name="chevron-forward" size={20} />
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 0.2,
                borderColor: "gray",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 20,
              }}
            >
              <Text
                style={{ fontSize: 16, fontFamily: "outfit", color: "gray" }}
              >
                Total Cost{" "}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 16, fontFamily: "outfit" }}>
                  $
                  {currentCart.items.reduce(
                    (total, item) =>
                      total + item.quantity * item?.productId?.price,
                    0
                  )}{" "}
                </Text>
                <Ionicons name="chevron-forward" size={20} />
              </View>
            </View>

            <View
              style={{
                padding: 20,
                width: "100%",
              }}
            >
              <Button
                title={`Place Order`}
                onPress={() => actionSheetRef.current?.show()}
              />
            </View>
          </View>
        </ActionSheet>
      </View>
    )
  );
}

const styles = StyleSheet.create({});
