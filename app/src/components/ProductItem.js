import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductItem = ({ product }) => {
    return (
        <View style={styles.product}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <Text>{product.name}</Text>
            <Text>{product.price}đ</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    product: { flex: 1, padding: 10, margin: 5, borderWidth: 1, borderRadius: 5 },
    image: { width: 100, height: 100 }
});

export default ProductItem;