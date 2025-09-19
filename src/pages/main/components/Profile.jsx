import { useNavigate } from 'react-router-dom';
import profileImg from "../../../../public/icon/profile.png"
import { authLogout } from "../../../store/auth/authSlice.js";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOADING_STATUS } from '../../../constants/loadingStatus';
import { Spinner } from "../../../components/Spinner";
import { clearProfile } from '../../../store/profile/profileSlice.js';

export const Profile = () => {
	const navigate = useNavigate();

	const login = useSelector(state => state.profile.profile?.login);

	const authLS = useSelector(state => state.auth.authLS);
	const isAuth = useSelector(state => state.auth.isAuth?.isAuth);

	const dispatch = useDispatch();

	useEffect(() => {
		//если 200 и false, то редиректим	
		if (authLS === LOADING_STATUS.SUCCESS && !isAuth) {
			navigate("/auth/login");
			//чистим стейт профидя при выходе
			dispatch(clearProfile());
		}
	}, [authLS])

	const onLogout = () => {
		dispatch(authLogout());
	}

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
								onClick={onLogout}
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