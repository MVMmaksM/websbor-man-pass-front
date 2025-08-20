import { NavLink } from "react-router-dom"
import profileImg from "../../../../public/icon/profile.png"

export const Profile = () =>{
    return (       
		<>
			<div className="position-absolute top-0 end-0 p-3">
				<NavLink to="/main/profile" className="text-dark">
					<img
						src={profileImg}
						alt="Профиль"
						className="rounded-circle"
						style={{ width: '32px', height: '32px', objectFit: 'cover' }}
					/>								
				</NavLink>
			</div>
		</> 
		
    )
} 