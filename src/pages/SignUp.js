import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/FirebaseContext";
import { doesUsernameExist } from "../services/firebase";
import { AvatarGenerator } from "random-avatar-generator";
import * as ROUTES from "../constants/Routes";

export const SignUp = () => {
	const generator = new AvatarGenerator();
	const history = useHistory();
	const { firebase } = useContext(FirebaseContext);

	const [username, setUsername] = useState("");
	const [fullName, setFullName] = useState("");
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [avatar, setAvatar] = useState("");
	const [error, setError] = useState("");

	const isInvalid = password === "" || emailAddress === "" || fullName === "" || username === "";

	const handleSignUp = async (event) => {
		event.preventDefault();

		const usernameExists = await doesUsernameExist(username);
		if (!usernameExists.length && avatar !== "") {
			try {
				const createdUserResult = await firebase
					.auth()
					.createUserWithEmailAndPassword(emailAddress, password);

				await createdUserResult.user.updateProfile({
					displayName: username,
				});

				await firebase.firestore().collection("users").add({
					avatar: avatar,
					userId: createdUserResult.user.uid,
					username: username.toLowerCase(),
					fullName,
					emailAddress: emailAddress.toLowerCase(),
					dateCreated: Date.now(),
				});

				history.push(ROUTES.TODAY);
			} catch (error) {
				setFullName("");
				setEmailAddress("");
				setPassword("");
				setError(error.message);
			}
		} else {
			setUsername("");
			setError("That username is already taken, please try another.");
		}
	};

	useEffect(() => {
		document.title = "Sign Up | TodoList";
	}, []);

	return (
		<div className="bg-theme-secondary container mx-auto container max-w-xl rounded pb-3">
			<center className="space-y-4 py-5 sm:py-2 md:py-3">
				<h1 className="text-4xl">Sign Up</h1>
				<hr className="max-w-lg" />
			</center>
			<center className="pt-5 sm:py-2">
				<div className="flex flex-col justify-center max-w-lg items-center">
					{error && <p className="mb-4 text-xs text-red-500">{error}</p>}

					<form
						onSubmit={handleSignUp}
						method="POST"
						className="space-y-2 flex w-7/12 flex-col text-theme-text-gray-base"
					>
						<input
							aria-label="Enter your username"
							type="text"
							className="text-sm text-gray-base w-full mr-3 px-4 h-11 border border-theme-background rounded"
							placeholder="Username"
							onChange={({ target }) => setUsername(target.value)}
							value={username}
						/>
						<input
							aria-label="Enter your full name"
							type="text"
							className="text-sm text-gray-base w-full mr-3 px-4 h-11 border border-theme-background rounded"
							placeholder="Full name"
							onChange={({ target }) => setFullName(target.value)}
							value={fullName}
						/>
						<input
							aria-label="Enter your email address"
							className="text-sm text-gray-base w-full mr-3 px-4 h-11 border border-theme-background rounded"
							type="text"
							placeholder="Email address"
							onChange={({ target }) => setEmailAddress(target.value)}
							value={emailAddress}
						/>
						<input
							aria-label="Enter your password"
							className="text-sm text-gray-base w-full mr-3 px-4 h-11 border border-theme-background rounded"
							type="password"
							placeholder="Password"
							onChange={({ target }) => setPassword(target.value)}
							value={password}
						/>

						{!isInvalid && (
							<div className="space-y-2">
								<hr />
								<div className="flex flex-col items-center justify-center ">
									<button
										type="button"
										onClick={() => setAvatar(generator.generateRandomAvatar())}
										className="bg-theme-primary text-white w-full rounded h-11 font-bold border border-theme-background opacity-100"
									>
										Generate avatar
									</button>

									{avatar !== "" ? (
										<img className="max-h-60 -mt-2" alt="avatar" src={avatar} />
									) : null}
								</div>
								{avatar !== "" ? (
									<button
										type="submit"
										className="bg-theme-primary text-white w-full rounded h-8 font-bold"
									>
										Sign Up
									</button>
								) : null}
							</div>
						)}
					</form>
					<p className="text-sm mt-3 sm:mt-2">
						Already have an account?{` `}
						<Link
							to={ROUTES.LOGIN}
							aria-label="Link to Login"
							title="Link to Login"
							className="font-bold text-theme-primary"
						>
							Login
						</Link>
					</p>
				</div>
			</center>
		</div>
	);
};
