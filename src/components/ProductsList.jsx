import { useDispatch, useSelector } from 'react-redux'
import { addProductToCart, removeProductFromCart } from '../reducers/cart/cartSlice'

export const ProductsList = ({ products }) => {
	const dispatch = useDispatch()
	const { productsList } = useSelector((state) => state.cart)
	console.log('pl', productsList)

	const handleAddOrRemove = (productId) => {
		const product = products.find((product) => product.id === productId)

		if (productsList.find((p) => p.id === productId)) {
			dispatch(removeProductFromCart(productId))
		} else {
			dispatch(addProductToCart(product))
		}
	}

	return (
		<>
			<h2>Products List</h2>
			<div className='row'>
				{products.map((product) => (
					<div key={product.id} className='col-3 mt-3'>
						<h4>{product.name}</h4>
						<p>
							<b>Price: </b>
							{product.price}
						</p>
						<p>
							<b>Category: </b>
							{product.category}
						</p>
						<button
							className={`btn ${productsList.find((p) => p.id === product.id) ? 'btn-danger' : 'btn-success'}`}
							onClick={() => handleAddOrRemove(product.id)}
						>
							{productsList.find((p) => p.id === product.id) ? 'Remove from' : 'Add to '} Cart
						</button>
					</div>
				))}
			</div>
		</>
	)
}
