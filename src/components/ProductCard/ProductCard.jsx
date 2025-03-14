import { useCart, useCategoriesData } from '../../store'
import style from './ProductCard.module.css'



export default function ProductCard({ productName, productPrice, productImg, product }) {
  const { domain } = useCategoriesData();
  const { addToCart } = useCart();

  const handleAdd = () => {

    let obj = {
      id: product.documentId,
      name: product.product_name,
      price: product.product_price,
      qty: 1,
      img: (domain + productImg)
    }
    console.log(obj.img);
    addToCart(obj)
  }

  return (

    <div className=" col-10 col-md-6 col-lg-3 p-4">
      <div className={`col-12 d-flex flex-column shadow rounded border  p-4 ${style.card} `}>
        <img src={domain + productImg} />  {/* not finished */}
        <h2>{productName}</h2>
        <span>Product Weight</span>
        <p>$ {productPrice}</p>
        <button onClick={handleAdd} className=' btn btn-primary'>Add To Cart</button>
      </div>
    </div>
  )
}
