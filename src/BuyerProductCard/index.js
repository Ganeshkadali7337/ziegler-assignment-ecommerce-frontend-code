import "./index.css";

const BuyerProductCard = (props) => {
  const { data, onAddToCart } = props;
  const { _id, img, name, price, actualPrice, user } = data;
  let change = actualPrice - price;
  let persentage = Math.round((change / actualPrice) * 100);
  let deal = user === "PRIME" ? "Prime Deal" : "Deal";

  const onClickAddToCart = () => {
    onAddToCart(_id);
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
        {price < actualPrice && <p className="act-price">{actualPrice}</p>}
        {persentage < 0 ? (
          <p className="persentage-off">0% off</p>
        ) : (
          <p className="persentage-off">{persentage}% off</p>
        )}
      </div>
      <button className="cart-button" onClick={onClickAddToCart}>
        Add To Cart
      </button>
    </li>
  );
};

export default BuyerProductCard;
