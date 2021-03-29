import { useContext, useEffect, useState } from "react";
import FirebaseContext from "../context/FirebaseContext";
import UserContext from "../context/UserContext";
import { AddTask } from "../components/Add-task";
import { IndividualTask } from "../components/task-displays/Individual-task";
import { HighlightTask } from "../components/task-displays/Highlight-task";
import { addPageIfNotExist } from "../services/firebase";
import { setDay } from "date-fns";

export const Today = () => {
	const { firebase } = useContext(FirebaseContext);
	const { user } = useContext(UserContext);
	const uid = user?.uid;
	const [tasks, setTasks] = useState([]);
	const [currHighlight, setCurrHighlight] = useState([]);
	const [todayExists, setTodayExists] = useState();
	const [currDocId, setCurrDocId] = useState();
	const [dateManup, setDateManup] = useState(1);

	useEffect(() => {
		addPageIfNotExist({
			currDocId,
			setCurrDocId,
			todayExists,
			setTodayExists,
			dateManup,
			uid,
		});

		if (todayExists === true && currDocId) {
			firebase
				.firestore()
				.collection("daily")
				.doc(currDocId)
				.collection("tasks")
				.where("archived", "==", false)
				.where("highlight", "==", false)
				.onSnapshot((querySnapshot) => {
					var array = [];
					querySnapshot.forEach((doc) => {
						array.push({
							id: doc.id,
							...doc.data(),
						});
					});
					setTasks(array);
					array = [];
				});

			firebase
				.firestore()
				.collection("daily")
				.doc(currDocId)
				.collection("tasks")
				.where("archived", "==", false)
				.where("highlight", "==", true)
				.orderBy("timeCreated")
				.onSnapshot((querySnapshot) => {
					var array = [];
					querySnapshot.forEach((doc) => {
						array.push({
							id: doc.id,
							...doc.data(),
						});
					});
					setCurrHighlight(array);
					array = [];
				});
		}
	}, [currDocId, dateManup, firebase, todayExists, uid]);

	return (
		<div
			className="bg-theme-secondary shadow-xl mx-auto container w-11/12 p-3 rounded overflow-auto sm:max-w-lg sm:px-5 sm:py-3 main-text-display"
			style={{ maxHeight: "calc(100vh - 150px)" }}
		>
			{/* Task Header */}
			<center className="sm:sticky -top-5 bg-theme-secondary">
				<div className="flex flex-row items-center justify-between max-w-lg py-5 font-semibold text-xl">
					<h2 className="">Today</h2>
					<div className="flex items-center space-x-2">
						<p>
							{setDay(new Date(), dateManup).toLocaleDateString(
								"en-GB"
							)}
						</p>
						<AddTask
							uid={uid}
							currDocId={currDocId}
							highlightExists={
								currHighlight.length !== 0 ? true : false
							}
						/>
					</div>
				</div>
				<hr className="p-2 max-w-lg border-dashed" />
				<div className="max-w-lg pb-5 pt-1">
					{currHighlight.map((task) => (
						<HighlightTask
							key={task.id}
							currDocId={currDocId}
							task={task}
						/>
					))}

					{!currHighlight.length > 0 && (
						<p className="pt-3 text-black-faded font-mono text-lg">
							No highlight ☹️
						</p>
					)}
				</div>
			</center>
			{/* Tasks */}
			<center>
				<div className="max-w-lg pb-5 space-y-4 pt-1">
					{tasks.map((task) => (
						<IndividualTask
							currDocId={currDocId}
							key={task.id}
							task={task}
						/>
					))}
				</div>
			</center>
			<div className="flex justify-between max-w-lg">
				<button
					type="button"
					className="w-6 h-6"
					onClick={() => setDateManup(dateManup - 1)}
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
							d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
						/>
					</svg>
				</button>
				<button
					type="button"
					className="w-6 h-6"
					onClick={() => setDateManup(dateManup + 1)}
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
							d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};
