import Navbar from "./Navbar";
import Heroes from "./Heroes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";
import ChangeName from "./ChangeName";

function App(): JSX.Element {
	return (
		<Router>
			<div className="App">
				<Navbar />
				<div className="content">
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/change/:id" element={<ChangeName />} />
						<Route path="/heroes" element={<Heroes />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
