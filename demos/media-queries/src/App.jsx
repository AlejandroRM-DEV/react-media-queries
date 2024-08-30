import { useMediaQueries } from "../../../index";
import "./App.css";

function App() {
	const { isDesktop, isTablet, isMobile, isLandscape, isPortrait } =
		useMediaQueries();

	return (
		<div className="card">
			<p>
				{isDesktop && "Desktop"} {isTablet && "Tablet"}{" "}
				{isMobile && "Mobile"} {isLandscape && "Landscape"}{" "}
				{isPortrait && "Portrait"}
			</p>
		</div>
	);
}

export default App;
