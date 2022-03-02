import { useDispatch, useSelector } from "react-redux";
import CartSlice from "../store/CartSlice";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const { toggle } = CartSlice.actions;
  const items = useSelector((state) => state.cart.items);
  let itemsCount = 0;

  if (items) {
    for (let i = 0; i < items.length; i++) {
      itemsCount += items[i].quantity;
    }
  }

  return (
    <button className={classes.button} onClick={() => dispatch(toggle())}>
      <span>My Cart</span>
      <span className={classes.badge}>{itemsCount}</span>
    </button>
  );
};

export default CartButton;
