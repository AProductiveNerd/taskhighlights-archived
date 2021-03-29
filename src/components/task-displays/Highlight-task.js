import { useContext, useLayoutEffect, useRef, useState } from "react";
import FirebaseContext from "../../context/FirebaseContext";
import RadioButtonUncheckedRoundedIcon from "@material-ui/icons/RadioButtonUncheckedRounded";

export const HighlightTask = ({
	task: { id, title, done },
	currDocId,
}) => {
	const { firebase } = useContext(FirebaseContext);

	const [displayTextEdit, setDisplayTextEdit] = useState(false);
	const [newTitle, SetnewTitle] = useState(title);
	const [showPopUp, setShowPopUp] = useState(false);
	const inputRef = useRef();

	const handleTextSubmit = () => {
		setDisplayTextEdit(false);
		firebase
			.firestore()
			.collection("daily")
			.doc(currDocId)
			.collection("tasks")
			.doc(id)
			.update({
				title: newTitle,
			});
	};

	const handleToggleDone = () => {
		firebase
			.firestore()
			.collection("daily")
			.doc(currDocId)
			.collection("tasks")
			.doc(id)
			.update({
				done: !done,
			});
	};

	const handleArchive = () => {
		firebase
			.firestore()
			.collection("daily")
			.doc(currDocId)
			.collection("tasks")
			.doc(id)
			.update({
				archived: true,
			});
	};

	const handleDelete = () => {
		firebase
			.firestore()
			.collection("daily")
			.doc(currDocId)
			.collection("tasks")
			.doc(id)
			.delete();
	};

	useLayoutEffect(() => {
		inputRef.current?.focus();
	}, [displayTextEdit]);

	var styles;
	if (done === true) {
		styles = {
			color: "#fce6ff",
			textDecoration: "line-through",
		};
	} else {
		styles = {
			color: "#fce6ff",
		};
	}

	return (
		<div>
			<div
				className="flex justify-between border-t-2 border-b-2  border-theme-primary uppercase text-lg items-center p-3"
				style={styles}
			>
				<div className="flex space-x-2 items-center">
					{done === true ? (
						<button
							type="button"
							className="w-6 h-6 flex items-center"
							onClick={() => handleToggleDone()}
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
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</button>
					) : (
						<button
							type="button"
							className="w-6 h-6 flex items-center"
							onClick={() => {
								handleToggleDone();
								setShowPopUp(true);
								setTimeout(() => {
									setShowPopUp(false);
								}, 3000);
							}}
						>
							<RadioButtonUncheckedRoundedIcon />
						</button>
					)}
					{displayTextEdit === true ? (
						<input
							type="text"
							ref={inputRef}
							className="bg-theme-secondary outline-none uppercase"
							style={{ color: "#fce6ff" }}
							defaultValue={title}
							onChange={({ target }) => SetnewTitle(target.value)}
							onKeyDown={(event) => {
								if (event.key === "Enter") {
									handleTextSubmit();
									setDisplayTextEdit(false);
								}
								if (event.key === "Escape") {
									setDisplayTextEdit(false);
								}
							}}
						/>
					) : (
						<h3
							onClick={() => {
								setDisplayTextEdit(true);
							}}
						>
							{title}
						</h3>
					)}
				</div>
				<div className="flex space-x-2">
					<button
						className="w-6 h-6 flex justify-center items-center"
						title="Archive"
						onClick={() => handleArchive()}
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
					</button>

					<button
						className="h-6 w-6 flex justify-center items-center"
						title="Permanently Delete"
						onClick={() => handleDelete()}
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
								d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
							/>
						</svg>
					</button>
				</div>
			</div>
			{showPopUp && <p>Wohooo you have completed your highlight!🎉</p>}
		</div>
	);
};
