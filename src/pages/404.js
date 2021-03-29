import { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import * as ROUTES from "../constants/Routes";

export const NotFound = () => {
	const history = useHistory();

	const { user } = useContext(UserContext);

	const redirect = () => {
		var path = window.location.pathname;
		if (path !== ROUTES.COMPLETED && path !== ROUTES.TODAY && path !== ROUTES.ARCHIVED) {
			user ? history.push(ROUTES.TODAY) : history.push(ROUTES.LOGIN);
		}
	};

	setTimeout(redirect, 500);

	return (
		<div className="flex justify-center">
			<div
				className={`text-white flex flex-col
					main-text-display 
					max-w-xl w-11/12 sm:w-9/12 md:w-7/12 overflow-y-scroll justify-between
					bg-white  rounded relative
					`}
				style={{ height: "calc(100vh - 150px)" }}
			>
				<div className="pt-5">
					<div className="pb-3 space-y-1">
						<p className="text-black-faded text-center text-2xl">Not Found</p>
					</div>
				</div>
			</div>
		</div>
	);
};
