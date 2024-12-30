import "./App.css";
import OrganismHeader from "./pages/components/organismHeader/OrganismHeader";
import OrganismsFooter from "./pages/components/organismsFooter/OrganismsFooter";
import AppRouters from "./routers/AppRouters";

function App() {
	return (
		<>
			<OrganismHeader />
			<AppRouters />
			<OrganismsFooter />
		</>
	);
}

export default App;
