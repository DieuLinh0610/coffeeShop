import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createProduct } from "@/lib/apis/productApi";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  categories: any[];
  onProductAdded: () => void;
}

export function AddProductModal({ open, onClose, categories, onProductAdded }: AddProductModalProps) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    categoryId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!product.name || !product.price || !product.categoryId) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    
    try {
      await createProduct(product);
      onProductAdded();
      onClose();
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Thêm sản phẩm mới</DialogTitle>
      <DialogContent className="flex flex-col gap-4">
        <Input name="name" placeholder="Tên sản phẩm" value={product.name} onChange={handleChange} />
        <Input name="description" placeholder="Mô tả" value={product.description} onChange={handleChange} />
        <Input name="price" type="number" placeholder="Giá" value={product.price} onChange={handleChange} />
        <Input name="image" placeholder="URL ảnh" value={product.image} onChange={handleChange} />
        <select name="categoryId" value={product.categoryId} onChange={handleChange} className="border p-2 rounded" title="Danh mục">
          <option value="">Chọn danh mục</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outline">Hủy</Button>
        <Button onClick={handleSubmit}>Thêm</Button>
      </DialogActions>
    </Dialog>
  );
}
