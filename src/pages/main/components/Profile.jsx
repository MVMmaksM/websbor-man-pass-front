import profileImg from "../../../../public/icon/profile.png"

export const Profile = () => {
	return (
		<>
			<div className="position-absolute top-0 end-0 p-3">
				<div className="dropdown">
					{/* Триггер dropdown — ссылка с именем и иконкой */}
					<a
						href="#"
						className="text-white text-decoration-none d-flex align-items-center dropdown-toggle"
						data-bs-toggle="dropdown"
						aria-expanded="false"
						role="button"
						id="dropdownMenuLink"					
					>
						<span className="me-2" style={{ fontSize: '15px' }}>admin</span>
						<img
							src={profileImg}
							alt="Профиль"
							className="rounded-circle"
							style={{ width: '16px', height: '16px', objectFit: 'cover' }}
						/>
					</a>

					{/* Выпадающее меню */}
					<ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
						<li>
							<span className="dropdown-item-text" style={{ fontSize: '15px' }}>
								admin
							</span>
						</li>
						<li>
							<hr className="dropdown-divider" />
						</li>
						<li>
							<button
								className="dropdown-item"
								type="button"
								onClick={() => {
									// Логика выхода
									// Например: logout(); navigate('/login');
								}}
							>
								Выход
							</button>
						</li>
					</ul>
				</div>
			</div>
		</>

	)
} 