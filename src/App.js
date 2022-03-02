import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import CartSlice, {
  fetchCartData,
  SendCartData,
} from "./components/store/CartSlice";
import UISlice from "./components/store/UISlice";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const notification = useSelector((state) => state.ui.notification);
  const { showNotification } = UISlice.actions;
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.cart.showCart);
  const cart = useSelector((state) => state.cart);
  const items = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(SendCartData(cart));
    console.log(notification);
  }, [items, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}

      <Layout>
        {showCart && <Cart />}

        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
