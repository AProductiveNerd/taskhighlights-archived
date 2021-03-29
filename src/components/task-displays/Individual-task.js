import { useContext, useLayoutEffect, useRef, useState } from "react";
import FirebaseContext from "../../context/FirebaseContext";
import RadioButtonUncheckedRoundedIcon from "@material-ui/icons/RadioButtonUncheckedRounded";

export const IndividualTask = ({
	task: { id, title, done },
	currDocId,
}) => {
	const { firebase } = useContext(FirebaseContext);

	const [displayTextEdit, setDisplayTextEdit] = useState(false);
	const [newTitle, SetnewTitle] = useState(title);
	const [showPopUp, setShowPopUp] = useState(false);
	const inputRef = useRef();

	const handleToggleDone = () => {
		if (done === false) {
			setShowPopUp(true);
			setTimeout(() => {
				setShowPopUp(false);
			}, 3000);
		}

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

	useLayoutEffect(() => {
		inputRef.current?.focus();
	}, [displayTextEdit]);

	return (
		<div className="flex flex-row items-center justify-between space-x-2">
			<div>
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
						onClick={() => handleToggleDone()}
					>
						<RadioButtonUncheckedRoundedIcon />
					</button>
				)}
			</div>
			<div className="w-full flex flex-row text-left">
				{displayTextEdit === true ? (
					<input
						type="text"
						className={`bg-theme-secondary outline-none w-full border-b-2 border-theme-primary ${
							done && "line-through"
						}`}
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
					<p
						className={`w-full border-b-2 border-theme-primary ${
							done && "line-through"
						}`}
						onClick={() => setDisplayTextEdit(!displayTextEdit)}
					>
						{title}
					</p>
				)}
				{showPopUp && <p>🎉</p>}
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
	);
};
