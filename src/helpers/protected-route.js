import { cloneElement } from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ user, children, ...rest }) => {
	return (
		<Route
			{...rest}
			render={({ location }) => {
				if (user) {
					return cloneElement(children, { user });
				}

				if (!user) {
					return (
						<Redirect
							to={{
								pathname: "/login",
								state: { from: location },
							}}
						/>
					);
				}

				return null;
			}}
		/>
	);
};
