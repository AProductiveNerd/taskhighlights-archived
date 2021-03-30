import { firebase } from "../lib/Firebase";
import { setDay } from "date-fns";

export async function doesUsernameExist(username) {
	const result = await firebase
		.firestore()
		.collection("users")
		.where("username", "==", username)
		.get();

	return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUsername(username) {
	const result = await firebase
		.firestore()
		.collection("users")
		.where("username", "==", username)
		.get();

	return result.docs.map((item) => ({
		...item.data(),
		docId: item.id,
	}));
}

export async function getUserByUserId(userId) {
	const result = await firebase
		.firestore()
		.collection("users")
		.where("userId", "==", userId)
		.get();
	const user = result.docs.map((item) => ({
		...item.data(),
		docId: item.id,
	}));

	return user;
}

export async function addPageIfNotExist({
	currDocId,
	setCurrDocId,
	todayExists,
	setTodayExists,
	dateManup,
	uid,
}) {
	console.log("It ran");
	const y = setDay(new Date(), dateManup).toLocaleDateString("en-GB");

	const result = await firebase
		.firestore()
		.collection("daily")
		.where("uid", "==", uid)
		.where("slashDate", "==", y)
		.get();

	var resLength = result.docs.map(
		(item) => currDocId !== item.id && setCurrDocId(item.id)
	).length;

	if (resLength > 0 && todayExists !== true) {
		setTodayExists(true);
	} else if (resLength === 0 && todayExists !== false) {
		setTodayExists(false);
	}
}

export async function addingPage({
	uid,
	setCurrDocId,
	setTodayExists,
	dateManup,
}) {
	console.log("addingPage ran");

	const y = setDay(new Date(), dateManup).toLocaleDateString("en-GB");

	await firebase
		.firestore()
		.collection("daily")
		.add({
			utcLongDate: new Date().toUTCString(),
			localDateString: new Date(),
			slashDate: y,
			uid: uid,
		})
		.then((document) => {
			setCurrDocId(document.id);
			setTodayExists(true);
		});
}
