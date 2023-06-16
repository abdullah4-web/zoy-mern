import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import Footer from "./components/Footer";
import './App.css';
import { SingleProductProvider } from "./SingleProductContext";
import { CartProvider } from "./CartContext";
import { FilterContextProvider } from "./FilterContext";
import { JewelryProvider } from "./JewelryContext";
import ProductComponent from "./pages/ProductComponent";
import Login from "./pages/Login";
import Siginup from "./pages/Siginup";
import Shipping from "./pages/Shipping";
import PlaceOrderScreen from "./pages/PlaceOrder";
import OrderScreen from "./pages/OrderScreen";
import OrderHistory from "./pages/OrderHistory";
import ProfileScreen from "./pages/ProfileScreen";
import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardScreen from "./pages/DashboardScreen";
import ProductListScreen from "./pages/ProductListScreen";
import ProductEditScreen from "./pages/ProductEditScreen";
import OrderListScreen from "./pages/OrderListScreen";
import UserListScreen from "./pages/UserListScreen";
import UserEditScreen from "./pages/UserEditScreen";
import Payment from "./pages/Payment";

function App() {
  return (
    <>
      <CartProvider>
        <FilterContextProvider>
          <JewelryProvider>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/login" element={<Login />} />
                <Route path="/siginup" element={<Siginup />} />
                <Route path="/productscomponent" element={<ProductComponent />} />
                <Route path="/products/:_id" element={<SingleProductProvider><ProductDetail /> </SingleProductProvider>} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/placeorder" element={<PlaceOrderScreen />} />
                <Route path="/contact" element={<Contact />} />
                <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              ></Route>
                <Route path="/orderhistory" element={<OrderHistory />}></Route>
                <Route path="/profile"  element={<ProtectedRoute><ProfileScreen/></ProtectedRoute>} />
                 {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              ></Route>
               <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              ></Route>
               <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <ProductEditScreen />
                  </AdminRoute>
                }
              ></Route>
                  <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <OrderListScreen />
                  </AdminRoute>
                }
              ></Route>
                 <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              ></Route>
                  <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                }
              ></Route>
                
               
                 
                    
                
             
                  
               
                <Route path="*" element={<Error />} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </JewelryProvider>
        </FilterContextProvider>
      </CartProvider>
    </>
  );
}


export default App;
