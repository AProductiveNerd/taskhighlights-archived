import { lazy, Suspense } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import UserContext from "./context/UserContext";
import { fireAuth } from "./lib/Firebase";
import { Header } from "./components/Header";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import { ProtectedRoute } from "./helpers/protected-route";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import * as ROUTES from "./constants/Routes";

const Login = lazy(() =>
	import("./pages/SignIn").then((module) => ({ default: module.SignIn }))
);
const SignUp = lazy(() =>
	import("./pages/SignUp").then((module) => ({ default: module.SignUp }))
);
const Today = lazy(() =>
	import("./pages/Today").then((module) => ({ default: module.Today }))
);
const NotFound = lazy(() =>
	import("./pages/404").then((module) => ({ default: module.NotFound }))
);
const Archived = lazy(() =>
	import("./pages/Archived").then((module) => ({
		default: module.Archived,
	}))
);
const Profile = lazy(() =>
	import("./pages/Profile").then((module) => ({
		default: module.Profile,
	}))
);

const override = css`
	display: block;
	margin: 0 auto;
	border-color: #ed4956;
`;

export const App = () => {
	const [user] = useAuthState(fireAuth);

	return (
		<UserContext.Provider value={{ user }}>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<BrowserRouter>
					<Header />
					<Suspense
						fallback={<ClipLoader css={override} size={150} />}
					>
						<Switch>
							<Route path={ROUTES.LOGIN} component={Login} />
							<Route path={ROUTES.SIGN_UP} component={SignUp} />

							<ProtectedRoute user={user} path={ROUTES.TODAY} exact>
								<Today />
							</ProtectedRoute>

							<ProtectedRoute
								user={user}
								path={ROUTES.ARCHIVED}
								exact
							>
								<Archived />
							</ProtectedRoute>

							<Route path={ROUTES.PROFILE} component={Profile} />

							<Route component={NotFound} />
						</Switch>
					</Suspense>
				</BrowserRouter>
			</MuiPickersUtilsProvider>
		</UserContext.Provider>
	);
};
