
import { useNavigate } from 'react-router-dom';
import { Coffee, BarChart3, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import PageTransition from '@/components/ui/PageTransition';

const Index = () => {
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-secondary/20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-3">Coffee Shop Admin Dashboard</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Manage your coffee shop's products, monitor sales, and handle user accounts all in one place.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl"
        >
          <motion.div variants={item}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>View your shop's performance at a glance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access revenue charts, sales metrics, and key performance indicators to make data-driven decisions.
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate('/dashboard')} className="w-full">
                  Go to Dashboard
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Coffee className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Products</CardTitle>
                <CardDescription>Manage your coffee shop's menu</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Add, edit, or remove products from your catalog. Update prices, descriptions, and product images.
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate('/products')} className="w-full">
                  Manage Products
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Users</CardTitle>
                <CardDescription>Manage staff and customer accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Handle user permissions, create new staff accounts, and review customer information.
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate('/users')} className="w-full">
                  Manage Users
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Coffee Shop Admin. All rights reserved.
          </p>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Index;
