/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { ArchivedTask } from "../components/task-displays/Archived-task";
import FirebaseContext from "../context/FirebaseContext";
import UserContext from "../context/UserContext";
import { fetchUserDailies } from "../services/firebase";

export const Archived = () => {
	const { firebase } = useContext(FirebaseContext);
	const { user } = useContext(UserContext);
	const uid = user?.uid;
	const [archivedTasks, setArchivedTasks] = useState([]);
	const [userDailies, setUserDailies] = useState([]);

	useEffect(() => {
		if (uid) {
			fetchUserDailies({ uid, setUserDailies });
		}
	}, [uid]);

	useEffect(() => {
		async function fetchingArchivedTasks() {
			var array = [];
			userDailies.forEach((item) => {
				firebase
					.firestore()
					.collection("daily")
					.doc(item)
					.collection("tasks")
					.where("archived", "==", true)
					.get()
					.then((querySnapshot) => {
						querySnapshot.forEach((doc) => {
							array.push({
								id: doc.id,
								parentId: item,
								...doc.data(),
							});
						});
					});
			});

			setArchivedTasks(array);
		}
		fetchingArchivedTasks();
	}, [firebase, userDailies]);

	return (
		<div
			className="bg-theme-secondary shadow-xl mx-auto w-11/12 p-3 rounded overflow-auto sm:max-w-lg sm:p-5"
			style={{ maxHeight: "calc(100vh - 150px)" }}
		>
			{console.log("From ret", archivedTasks)}
			{/* Task Header */}
			<center className="sm:sticky -top-5 bg-theme-secondary">
				<h2 className="text-xl max-w-lg py-5 font-semibold">
					Arhived tasks
				</h2>

				<hr className="p-2 max-w-lg border-dashed" />
			</center>
			{/* Tasks */}
			<center>
				<div className="pb-5 space-y-2 pt-1">
					{archivedTasks.map((task) => (
						<ArchivedTask key={task.id} task={task} />
					))}

					{archivedTasks.length === 0 ? (
						<div className="text-center">No Archived Tasks</div>
					) : null}
				</div>
			</center>
		</div>
	);
};
