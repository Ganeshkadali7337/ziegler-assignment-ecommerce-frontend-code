import "./index.css";

const CartProductCard = (props) => {
  const { data, onRemoveFromCart, id } = props;
  console.log(data);
  const { img, name, price, actualPrice, user } = data;
  let change = actualPrice - price;
  let persentage = Math.round((change / actualPrice) * 100);
  let deal = user === "PRIME" ? "Prime Deal" : "Deal";

  const onClickRemoveFromCart = () => {
    onRemoveFromCart(id);
  };

  return (
    <li className="list-item">
      <img className="img-container" src={img} alt={name} />
      <div className="title-container">
        <p className="title">{name}</p>
        <p className="label">• {deal}</p>
      </div>
      <div className="title-container">
        <p className="price">Rs {price}</p>
        <p className="compare-price">{actualPrice}</p>
        <p className="persentage-off">{persentage}% off</p>
      </div>
      <button className="cart-button" onClick={onClickRemoveFromCart}>
        Remove from cart
      </button>
    </li>
  );
};

export default CartProductCard;
