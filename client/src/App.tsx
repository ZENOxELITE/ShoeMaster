
import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/hooks/use-cart";
import Home from "@/pages/home";
import Products from "@/pages/products";
import ProductDetail from "@/pages/product-detail";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <CartProvider>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products" component={Products} />
        <Route path="/products/:category" component={Products} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route component={NotFound} />
      </Switch>
      <Toaster />
    </CartProvider>
  );
}

export default App;
