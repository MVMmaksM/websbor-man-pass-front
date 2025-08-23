import { useNavigate } from 'react-router-dom';
import profileImg from "../../../../public/icon/profile.png"
import { getProfile } from '../../../store/profile/profileSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Profile = () => {
	const navigate = useNavigate();
	const status = useSelector(state => state.profile.status);
	const login = useSelector(state => state.profile.userData?.login)

	const dispatch = useDispatch();

	useEffect(() => {
		if (status === "idle")
			dispatch(getProfile());
	})

	return (
		<>
			<div className="position-absolute top-0 end-0 p-3">
				<div className="dropdown">
					<a
						href="#"
						className="text-white text-decoration-none d-flex align-items-center dropdown-toggle"
						data-bs-toggle="dropdown"
						aria-expanded="false"
						role="button"
						id="dropdownMenuLink"
					>
						<span className="me-2" style={{ fontSize: '15px' }}>{login}</span>
						<img
							src={profileImg}
							alt="Профиль"
							className="rounded-circle"
							style={{ width: '16px', height: '16px', objectFit: 'cover' }}
						/>
					</a>

					<ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
						<li>
							<button
								className="dropdown-item"
								type="button"
								onClick={() => {
									navigate("/main/profile")
								}}
							>
								<span style={{ fontSize: '15px' }}>Перейти в профиль</span>
							</button>
						</li>
						<li>
							<hr className="dropdown-divider" />
						</li>
						<li>
							<button
								className="dropdown-item"
								type="button"
								onClick={() => {
									navigate("/auth/login")
								}}
							>
								<span style={{ fontSize: '15px' }}>Выход</span>
							</button>
						</li>
					</ul>
				</div>
			</div>
		</>

	)
} 