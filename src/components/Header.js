import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/FirebaseContext";
import UserContext from "../context/UserContext";
import { getUserByUserId } from "../services/firebase";
import * as ROUTES from "../constants/Routes";

export const Header = () => {
	const { firebase } = useContext(FirebaseContext);
	const { user } = useContext(UserContext);
	const uid = user?.uid;
	const [activeUser, setActiveUser] = useState();
	const history = useHistory();

	useEffect(() => {
		async function getCurrUserbyUserId(uid) {
			const [user] = await getUserByUserId(uid);
			setActiveUser(user);
		}

		if (uid) {
			getCurrUserbyUserId(uid);
		}
	}, [uid]);

	const redirect = () => {
		var path = window.location.pathname;
		if (
			path !== ROUTES.COMPLETED &&
			path !== ROUTES.TODAY &&
			path !== ROUTES.ARCHIVED &&
			path !== ROUTES.PROFILE
		) {
			uid && history.push(ROUTES.TODAY);
		}
	};
	setTimeout(redirect, 500);

	return (
		<header className="bg-theme-third border-b  border-theme-primary text-5xl px-5 py-3 mb-5">
			<div className="mx-auto container max-w-5xl">
				{activeUser && (
					<div className="flex flex-row justify-between items-center">
						{/* Links to different app pages */}
						<div className="flex space-x-3 flex-wrap">
							{/* {currUrlPath !== ROUTES.TODAY ? ( */}
							<Link
								to={ROUTES.TODAY}
								title="Tasks"
								aria-label="App"
								className="w-6 h-6"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
									/>
								</svg>
							</Link>
							{/* ) : null} */}

							{/* {currUrlPath !== ROUTES.COMPLETED ? ( */}
							<Link
								to={ROUTES.COMPLETED}
								title="Comleted Tasks"
								aria-label="Completed Tasks"
								className="w-6 h-6"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
									/>
								</svg>
							</Link>
							{/* ) : null} */}

							{/* {currUrlPath !== ROUTES.ARCHIVED ? ( */}
							<Link
								to={ROUTES.ARCHIVED}
								title="Archived Tasks"
								aria-label="Archived Tasks"
								className="w-6 h-6"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
									/>
								</svg>
							</Link>
							{/* ) : null} */}
						</div>

						{/* User avatar and stories */}
						<div className="user-image bg-gradient-to-tr from-theme-primary to-theme-fuchsia-600 p-1 transform transition rounded-full hidden">
							<div className="bg-white rounded-full p-1 transform transition hover:-rotate-360">
								<img
									className="h-12 w-12"
									src={activeUser.avatar}
									alt={activeUser.fullName}
									title={activeUser.username}
								/>
							</div>
						</div>

						<div className="flex space-x-3 flex-wrap justify-between">
							<button
								type="button"
								title="Add a story"
								className="w-6 h-6"
								aria-label="Add a story"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									/>
								</svg>
							</button>
							<Link
								to={`/p/${activeUser?.username}`}
								type="button"
								title="Profile"
								className="w-6 h-6"
								aria-label="Profile"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
									/>
								</svg>
							</Link>

							<button
								type="button"
								title="Sign Out"
								aria-label="Sign Out"
								className="w-6 h-6"
								onClick={() => {
									firebase.auth().signOut();
									history.push(ROUTES.LOGIN);
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
									/>
								</svg>
							</button>
						</div>
					</div>
				)}

				{!activeUser && (
					<div className="flex flex-row justify-between items-center">
						<Link
							title="Sign Up"
							aria-label="Sign Up"
							className="w-6 h-6"
							to={ROUTES.SIGN_UP}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
								/>
							</svg>
						</Link>

						<Link
							title="Sign In"
							aria-label="Sign In"
							className="w-6 h-6"
							to={ROUTES.LOGIN}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
								/>
							</svg>
						</Link>
					</div>
				)}
			</div>
		</header>
	);
};
