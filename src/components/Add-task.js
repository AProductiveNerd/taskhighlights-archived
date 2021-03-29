import { useContext, useEffect, useState } from "react";
import FirebaseContext from "../context/FirebaseContext";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles(() => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: "#0F3460",
		border: "2px solid #000",
		width: "512px",
	},
}));

export const AddTask = ({ currDocId, highlightExists }) => {
	const { firebase } = useContext(FirebaseContext);

	const [task, setTask] = useState("");

	const [highlight, setHighlight] = useState(false);
	const [showPopUp, setShowPopUp] = useState(false);
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const PopUp = () => {
		return (
			<div className="text-black-faded mb-5">
				<p>You can only have one highlight!</p>
			</div>
		);
	};
	let popup = null;
	if (showPopUp) {
		popup = <PopUp />;
	}

	useEffect(() => {
		if (showPopUp === true) {
			setTimeout(() => {
				setShowPopUp(false);
			}, 3000);
		}
	}, [showPopUp]);

	const addTask = () => {
		if (firebase) {
			if (highlight === true && highlightExists === true) {
				setShowPopUp(true);
			} else {
				firebase
					.firestore()
					.collection("daily")
					.doc(currDocId)
					.collection("tasks")
					.add({
						archived: false,
						done: false,
						highlight: highlight,
						title: task,
						timeCreated: Date.now(),
					})
					.then(() => {
						setTask("");
						setHighlight(false);
					});
			}
		}
	};

	return (
		<div>
			<button
				className="h-6 w-6 flex justify-center items-center"
				type="button"
				onClick={() => setOpen(true)}
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
						d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</button>
			<Modal
				aria-labelledby="Add-task-modal"
				aria-describedby="Modal-to-add-a-task"
				className={classes.modal}
				open={open}
				onClose={() => setOpen(false)}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={`${classes.paper} shadow-xl`}>
						<div className="p-8 max-w-lg w-full">
							<center>{popup}</center>

							<div className="px-3 w-full flex flex-row justify-center items-center">
								<input
									aria-label="Enter the task"
									type="text"
									placeholder="Task"
									className="bg-theme-secondary h-8 w-min outline-none"
									onChange={({ target }) => setTask(target.value)}
									value={task}
									autoComplete="off"
									onKeyDown={(event) => {
										if (event.key === "Enter" && task !== "") {
											addTask();
										}
									}}
								/>

								<button
									type="button"
									onClick={() => setHighlight(!highlight)}
									className={`bg-theme-primary p-2 rounded  ${
										highlight === false ? "opacity-50" : null
									}`}
								>
									🌟
								</button>
							</div>
						</div>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};
