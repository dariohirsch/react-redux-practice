import axios from 'axios'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../reducers/user/userSlice'

export const Index = () => {
	const emailField = useRef(null)
	const passwordField = useRef(null)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleSubmitForm = async (e) => {
		e.preventDefault()
		const response = await axios.get('http://localhost:3000/users')
		const users = response.data

		const userToLog = users.find(
			(user) => user.email === emailField.current.value
		)
		if (userToLog) {
			if (userToLog.password === passwordField.current.value) {
				dispatch(
					setUser({
						email: userToLog.email,
						fullName: `${userToLog.first_name} ${userToLog.last_name}`,
						token: Date.now(),
					})
				)
				navigate('/home')
			}
		}
	}

	return (
		<div className='row justify-content-center'>
			<div className='col-6'>
				<h2 className='mb-4'>LOGIN FORM</h2>
				<form onSubmit={handleSubmitForm}>
					<div className='mb-3'>
						<label className='form-label'>Email address</label>
						<input type='email' className='form-control' ref={emailField} />
					</div>
					<div className='mb-3'>
						<label className='form-label'>Password</label>
						<input
							type='password'
							className='form-control'
							ref={passwordField}
						/>
					</div>
					<button type='submit' className='btn btn-primary'>
						SUBMIT
					</button>
				</form>
			</div>
		</div>
	)
}
