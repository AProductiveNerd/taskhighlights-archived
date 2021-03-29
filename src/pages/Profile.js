import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/Routes";
import { UserProfile } from "../components/Profile";

export const Profile = () => {
	const { username } = useParams();
	const [user, setUser] = useState(null);
	const history = useHistory();

	useEffect(() => {
		async function checkUserExists() {
			const [user] = await getUserByUsername(username);
			if (user?.userId) {
				setUser(user);
			} else {
				history.push(ROUTES.NOT_FOUND);
			}
		}

		checkUserExists();
	}, [username, history]);

	return user?.username ? (
		<div className="mx-auto max-w-lg">
			<UserProfile user={user} />
		</div>
	) : null;
};
