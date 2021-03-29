import { useContext, useEffect, useState } from "react";
import { ArchivedTask } from "../components/task-displays/Archived-task";
import FirebaseContext from "../context/FirebaseContext";
import UserContext from "../context/UserContext";

export const Archived = () => {
	const { firebase } = useContext(FirebaseContext);
	const { user } = useContext(UserContext);
	const uid = user?.uid;
	const [archivedTasks, setArchivedTasks] = useState([]);

	useEffect(() => {
		if (uid && firebase) {
			firebase
				.firestore()
				.collection("daily")
				.where("uid", "==", uid)
				.get()
				.then((querySnapshot) => {
					var array = [];
					querySnapshot.forEach((doc) => {
						array.push(doc.id);
					});

					array.forEach((id) => {
						firebase
							.firestore()
							.collection("daily")
							.doc(id)
							.collection("tasks")
							.where("archived", "==", true)
							.orderBy("timeCreated")
							.onSnapshot((querySnapshot) => {
								var array2 = [];
								querySnapshot.forEach((doc) => {
									array2.push({
										id: doc.id,
										parentId: id,
										...doc.data(),
									});
								});
								setArchivedTasks(array2);
								array2 = [];
							});
					});
				});
		}
	}, [firebase, uid]);

	return (
		<div
			className="bg-theme-secondary shadow-xl mx-auto w-11/12 p-3 rounded overflow-auto sm:max-w-lg sm:p-5"
			style={{ maxHeight: "calc(100vh - 150px)" }}
		>
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
