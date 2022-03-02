import { useDispatch } from "react-redux";
import CartSlice from "../store/CartSlice";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const { title, quantity, total, price } = props.item;
  const { increase, decrease } = CartSlice.actions;
  const dispatch = useDispatch();

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={() => dispatch(decrease({ title }))}>-</button>
          <button onClick={() => dispatch(increase({ title }))}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
