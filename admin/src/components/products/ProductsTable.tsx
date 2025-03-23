import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, Edit, Trash, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  deleteProduct,
  getAllCategories,
  getAllProducts,
} from "@/lib/apis/productApi";
import { AddProductModal } from "./AddProductModal";

export function ProductsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
      const productsData = await getAllProducts();

      // Gán tên danh mục vào từng sản phẩm
      const updatedProducts = productsData.map((product) => {
        const category = categoriesData.find(
          (cat) => cat._id === product.categoryId
        );
        return {
          ...product,
          categoryName: category ? category.name : "Unknown",
        };
      });
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [setProducts, setCategories]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

    try {
      await deleteProduct(id);
      alert("Xóa sản phẩm thành công!");
      fetchData();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className="h-4 w-4 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-[50%]">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        )}
        {Array.from({ length: 5 - fullStars - (hasHalfStar ? 1 : 0) }).map(
          (_, i) => (
            <Star key={i} className="h-4 w-4 text-gray-300" />
          )
        )}
        <span className="ml-1 text-sm font-medium text-gray-600">{rating}</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-soft overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">Products</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <select
                title="Category"
                className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <Button
                className="flex items-center gap-2"
                onClick={() => setIsModalOpen(true)}
              >
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </div>
            <div className="text-sm text-gray-500">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Rating</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <motion.tr
                key={product._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b border-gray-100 hover:bg-gray-50 text-gray-700"
              >
                <td className="py-3 px-6 whitespace-nowrap font-medium">
                  {product.name}
                </td>
                <td className="py-3 px-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                    loading="lazy"
                  />
                </td>
                <td className="py-3 px-6 max-w-xs text-sm truncate">
                  {product.description}
                </td>
                <td className="py-3 px-6">{renderRating(product.rating)}</td>
                <td className="py-3 px-6 font-medium">${product.price}</td>
                <td className="py-3 px-6 capitalize">{product.categoryName}</td>
                <td className="py-3 px-6 text-center flex justify-center gap-2">
                  <button className="p-1 text-blue-500 hover:text-blue-700" title="Edit">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    className="p-1 text-red-500 hover:text-red-700"
                    title="Delete"
                    onClick={() => handleDelete(product._id)}
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddProductModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={categories}
        onProductAdded={fetchData}
      />
    </div>
  );
}
export default ProductsTable;
