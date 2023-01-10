import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ProductsList } from '../components/ProductsList'
import { unsetUser } from '../reducers/user/userSlice'

export const Home = () => {
	const [products, setProducts] = useState([])
	const user = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		getProducts()
	}, [])

	const getProducts = async () => {
		const response = await axios.get('http://localhost:3000/products')
		setProducts(response.data)
	}

	const handleLogout = () => {
		dispatch(unsetUser())
		navigate('/')
	}

	return (
		<div className='container'>
			<h2>HOME</h2>
			<p>Welcolme {user.fullName}</p>
			<button className='btn btn-primary' onClick={handleLogout}>
				Log Out
			</button>
			<hr />
			<ProductsList products={products} />
		</div>
	)
}
