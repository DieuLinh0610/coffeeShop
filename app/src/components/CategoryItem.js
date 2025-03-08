import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CategoryItem = ({ category, isSelected, onPress }) => {
    return (
        <TouchableOpacity style={[styles.category, isSelected && styles.selected]} onPress={onPress}>
            <Text>{category.name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    category: { padding: 10, margin: 5, borderWidth: 1, borderRadius: 5 },
    selected: { backgroundColor: 'orange' }
});

export default CategoryItem;