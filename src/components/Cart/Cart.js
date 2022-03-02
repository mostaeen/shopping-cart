import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData } from "../store/CartSlice";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  let cartItems = useSelector((state) => state.cart.items);

  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    total += cartItems[i].price * cartItems[i].quantity;
  }

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>

      <ul>
        {cartItems.map((c) => (
          <CartItem
            key={c.title}
            item={{ ...c, total: c.quantity * c.price }}
          />
        ))}
      </ul>

      {cartItems.length > 0 && <h1>Total: ${total}</h1>}
    </Card>
  );
};

export default Cart;
