import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/FirebaseContext";
import * as ROUTES from "../constants/Routes";

export const SignIn = () => {
	const history = useHistory();
	const { firebase } = useContext(FirebaseContext);

	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");

	const [error, setError] = useState("");
	const isInvalid = password === "" || emailAddress === "";

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
			history.push(ROUTES.TODAY);
		} catch (error) {
			setEmailAddress("");
			setPassword("");
			setError(error.message);
		}
	};

	useEffect(() => {
		document.title = "Login - TodoList";
	}, []);

	return (
		<div className="bg-theme-secondary container mx-auto container max-w-xl rounded pb-3">
			<center className="space-y-4 py-5 sm:py-2 md:py-3">
				<h1 className="text-4xl">Sign In</h1>
				<hr className="max-w-lg" />
			</center>
			<center className="pt-5 sm:py-2">
				<div className="flex flex-col justify-center max-w-lg items-center">
					{error && <p className="mb-4 text-xs text-red-500">{error}</p>}

					<form
						onSubmit={handleLogin}
						method="POST"
						className="space-y-2 flex w-7/12 flex-col text-theme-text-gray-base"
					>
						<input
							aria-label="Enter your email address"
							type="text"
							placeholder="Email address"
							className="text-sm text-gray-base w-full mr-3 px-4 h-11 border border-theme-background rounded"
							onChange={({ target }) => setEmailAddress(target.value)}
							value={emailAddress}
						/>
						<input
							aria-label="Enter your password"
							type="password"
							className="text-sm text-gray-base w-full mr-3 px-4 h-11 border border-theme-background rounded"
							placeholder="Password"
							onChange={({ target }) => setPassword(target.value)}
							value={password}
						/>

						{!isInvalid && (
							<div className="space-y-2">
								<hr />

								<button
									type="submit"
									className="bg-theme-primary text-white w-full rounded h-8 font-bold"
								>
									Login
								</button>
							</div>
						)}
					</form>
					<p className="text-sm mt-3 sm:mt-2">
						Don't have an account?{` `}
						<Link
							to={ROUTES.SIGN_UP}
							aria-label="Link to Sign Up"
							title="Link to Sign Up"
							className="font-bold text-theme-primary"
						>
							Sign Up
						</Link>
					</p>
				</div>
			</center>
		</div>
	);
};
