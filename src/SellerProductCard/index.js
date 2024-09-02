import "./index.css";

const SellerProductCard = (props) => {
  const { data, onClickDeleteProduct } = props;
  const { _id, img, name, price, actualPrice, user } = data;

  const onDeleteProduct = () => {
    onClickDeleteProduct(_id);
  };

  return (
    <li>
      <div className="product-container">
        <img className="img" src={img} alt={name} />
        <div className="content">
          <h1 className="pro-name">{name}</h1>
          <p>{price}</p>
          {price < actualPrice && <p className="act-price">{actualPrice}</p>}
          <span className="user">{user}</span>

          <button className="delete-product-btn" onClick={onDeleteProduct}>
            Delete Product
          </button>
        </div>
      </div>
    </li>
  );
};

export default SellerProductCard;
