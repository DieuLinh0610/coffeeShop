
// Mock data for the coffee shop admin dashboard

import { 
  Coffee, 
  CupSoda, 
  Croissant, 
  Sandwich, 
  IceCream, 
  DollarSign, 
  Users, 
  ShoppingBag,
  PieChart,
  LineChart,
  BarChart
} from 'lucide-react';

// User data
export const adminUser = {
  name: "Alex Johnson",
  email: "alex@coffeeshop.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  role: "Admin",
};

// Statistics for dashboard
export const statistics = [
  {
    id: 1,
    title: "Total Revenue",
    value: "$12,634",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    id: 2,
    title: "Total Users",
    value: "2,345",
    change: "+5.8%",
    trend: "up",
    icon: Users,
  },
  {
    id: 3,
    title: "Products Sold",
    value: "15,876",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingBag,
  },
  {
    id: 4,
    title: "Avg. Order Value",
    value: "$24.50",
    change: "-2.3%",
    trend: "down",
    icon: PieChart,
  },
];

// Revenue data for charts
export const revenueData = {
  daily: [
    { name: "Mon", revenue: 1200 },
    { name: "Tue", revenue: 1400 },
    { name: "Wed", revenue: 1300 },
    { name: "Thu", revenue: 1500 },
    { name: "Fri", revenue: 2000 },
    { name: "Sat", revenue: 2400 },
    { name: "Sun", revenue: 2100 },
  ],
  weekly: [
    { name: "Week 1", revenue: 8900 },
    { name: "Week 2", revenue: 9200 },
    { name: "Week 3", revenue: 9800 },
    { name: "Week 4", revenue: 10500 },
  ],
  monthly: [
    { name: "Jan", revenue: 42000 },
    { name: "Feb", revenue: 38000 },
    { name: "Mar", revenue: 44000 },
    { name: "Apr", revenue: 45000 },
    { name: "May", revenue: 48000 },
    { name: "Jun", revenue: 51000 },
    { name: "Jul", revenue: 55000 },
    { name: "Aug", revenue: 53000 },
    { name: "Sep", revenue: 49000 },
    { name: "Oct", revenue: 52000 },
    { name: "Nov", revenue: 56000 },
    { name: "Dec", revenue: 62000 },
  ],
};

// Chart types
export const chartTypes = [
  {
    id: "bar",
    name: "Bar Chart",
    icon: BarChart,
  },
  {
    id: "line",
    name: "Line Chart",
    icon: LineChart,
  },
  {
    id: "pie",
    name: "Pie Chart",
    icon: PieChart,
  },
];

// Time periods
export const timePeriods = [
  {
    id: "daily",
    name: "Daily",
  },
  {
    id: "weekly",
    name: "Weekly",
  },
  {
    id: "monthly",
    name: "Monthly",
  },
];

// Product categories
export const categories = [
  {
    id: "coffee",
    name: "Coffee",
    icon: Coffee,
  },
  {
    id: "beverages",
    name: "Beverages",
    icon: CupSoda,
  },
  {
    id: "pastries",
    name: "Pastries",
    icon: Croissant,
  },
  {
    id: "sandwiches",
    name: "Sandwiches",
    icon: Sandwich,
  },
  {
    id: "desserts",
    name: "Desserts",
    icon: IceCream,
  },
];

// Products data
export const products = [
  {
    id: 1,
    name: "Espresso",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    description: "Strong, pure coffee served in a small cup",
    rating: 4.8,
    price: "$3.50",
    category: "coffee",
  },
  {
    id: 2,
    name: "Cappuccino",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    description: "Espresso with steamed milk and foam",
    rating: 4.9,
    price: "$4.50",
    category: "coffee",
  },
  {
    id: 3,
    name: "Iced Latte",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    description: "Espresso with cold milk and ice",
    rating: 4.7,
    price: "$4.75",
    category: "coffee",
  },
  {
    id: 4,
    name: "Croissant",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    description: "Buttery, flaky French pastry",
    rating: 4.6,
    price: "$3.25",
    category: "pastries",
  },
  {
    id: 5,
    name: "Iced Tea",
    image: "https://images.unsplash.com/photo-1556679343-c1306ee3303a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    description: "Refreshing cold tea with lemon",
    rating: 4.5,
    price: "$3.75",
    category: "beverages",
  },
  {
    id: 6,
    name: "Avocado Sandwich",
    image: "https://images.unsplash.com/photo-1540914124281-342587941389?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    description: "Fresh avocado with cream cheese on sourdough",
    rating: 4.7,
    price: "$6.50",
    category: "sandwiches",
  },
  {
    id: 7,
    name: "Chocolate Cake",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    description: "Rich chocolate cake with ganache",
    rating: 4.9,
    price: "$5.25",
    category: "desserts",
  },
  {
    id: 8,
    name: "Mocha",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    description: "Espresso with chocolate and steamed milk",
    rating: 4.8,
    price: "$4.95",
    category: "coffee",
  },
  {
    id: 9,
    name: "Fruit Smoothie",
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    description: "Blend of fresh fruits with yogurt",
    rating: 4.6,
    price: "$5.50",
    category: "beverages",
  },
  {
    id: 10,
    name: "Cinnamon Roll",
    image: "https://images.unsplash.com/photo-1583529246464-8927b019fefb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    description: "Sweet pastry with cinnamon and frosting",
    rating: 4.7,
    price: "$4.25",
    category: "pastries",
  },
];

// Users data
export const users = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    role: "Customer",
    status: "Active",
    joinDate: "2023-01-15",
    orders: 12,
  },
  {
    id: 2,
    name: "Emma Johnson",
    email: "emma@example.com",
    role: "Customer",
    status: "Active",
    joinDate: "2023-02-28",
    orders: 8,
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    role: "Staff",
    status: "Active",
    joinDate: "2022-11-10",
    orders: 0,
  },
  {
    id: 4,
    name: "Sophia Davis",
    email: "sophia@example.com",
    role: "Customer",
    status: "Inactive",
    joinDate: "2023-03-05",
    orders: 3,
  },
  {
    id: 5,
    name: "William Wilson",
    email: "william@example.com",
    role: "Customer",
    status: "Active",
    joinDate: "2023-04-18",
    orders: 5,
  },
  {
    id: 6,
    name: "Olivia Martinez",
    email: "olivia@example.com",
    role: "Staff",
    status: "Active",
    joinDate: "2022-12-01",
    orders: 0,
  },
];

// Dashboard navigation items
export const dashboardNavItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: PieChart,
  },
  {
    title: "Users",
    path: "/users",
    icon: Users,
  },
  {
    title: "Products",
    path: "/products",
    icon: Coffee,
  },
];
