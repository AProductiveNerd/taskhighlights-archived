import React from "react";
import { render } from "react-dom";
import { App } from "./App";
import FirebaseContext from "./context/FirebaseContext";
import { firebase } from "./lib/Firebase";
import "./index.css";

render(
	<FirebaseContext.Provider value={{ firebase }}>
		<App />
	</FirebaseContext.Provider>,
	document.getElementById("root")
);
