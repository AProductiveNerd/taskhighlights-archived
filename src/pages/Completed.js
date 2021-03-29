// import { useContext, useEffect, useState } from "react";
// import FirebaseContext from "../context/FirebaseContext";
// import UserContext from "../context/UserContext";
// import { IndividualTask } from "../components/task-displays/Individual-task";

// export const Completed = () => {
// 	const { firebase } = useContext(FirebaseContext);
// 	const { user } = useContext(UserContext);
// 	const uid = user?.uid;
// 	const [completedTasks, setCompletedTasks] = useState([]);

// 	useEffect(() => {
// 		document.title = "Completed";
// 		if (uid && firebase) {
// 			// Done and not highlight and not archived
// 			firebase
// 				.firestore()
// 				.collection("tasks")
// 				.where("uid", "==", uid)
// 				.where("done", "==", true)
// 				.where("highlight", "==", false)
// 				.where("archived", "==", false)
// 				.orderBy("dateCreated", "desc")
// 				.onSnapshot((querySnapshot) => {
// 					var arrayTwo = [];
// 					querySnapshot.forEach((doc) => {
// 						arrayTwo.push({
// 							id: doc.id,
// 							...doc.data(),
// 						});
// 					});
// 					setCompletedTasks(arrayTwo);
// 					arrayTwo = [];
// 				});
// 		}
// 	}, [firebase, uid]);

// 	return (
// 		<div className="flex justify-center">
// 			<div
// 				className={`text-white flex flex-col
// 				main-text-display 
// 				max-w-xl w-11/12 sm:w-9/12 md:w-7/12 overflow-y-scroll justify-between
// 				bg-white  rounded relative
// 				`}
// 				style={{ height: "calc(100vh - 150px)" }}
// 			>
// 				<div className="px-5 pb-3 relative">
// 					<div className="pt-5">
// 						{completedTasks.length > 0 && (
// 							<>
// 								<div className="pb-3 space-y-1">
// 									<p className="text-black-faded text-center text-2xl">Completed</p>
// 									<hr className="text-black-faded border-dotted" />
// 								</div>
// 								<div className="space-y-2">
// 									{completedTasks.map((task) => (
// 										<IndividualTask key={task.id} task={task} />
// 									))}
// 								</div>
// 							</>
// 						)}
// 						{!completedTasks.length > 0 && (
// 							<>
// 								<div className="pb-3 space-y-1">
// 									<p className="text-black-faded text-center text-2xl">
// 										No completed tasks yet
// 									</p>
// 								</div>
// 							</>
// 						)}
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
