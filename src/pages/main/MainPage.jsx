import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { PageTitle } from "../../components/PageTitle";
import { useDispatch, useSelector } from 'react-redux';
import { LOADING_STATUS } from "../../constants/loadingStatus";
import { useEffect } from "react";
import { getProfile } from '../../store/profile/profileSlice.js';

export const MainPage = () => {
	const dispatch = useDispatch();
	const getProfileLS = useSelector(state => state.profile.getProfileLS);

	//получение профиля
	useEffect(() => {
		if (getProfileLS === LOADING_STATUS.IDLE)
			dispatch(getProfile());
	}, [])

	return (
		<>
			{
				//отображаем главную страницу только после загрузки профиля	
				//чтобы показывать навбар в зависимости от прав юзера			
				getProfileLS === LOADING_STATUS.SUCCESS &&
				<>
					<PageTitle />
					<div className="d-flex flex-column min-vh-100">
						<Header />
						<main id="main_page" className="flex-grow-1 bg-light">
							<Outlet />
						</main>
					</div></>
			}

		</>
	)
}