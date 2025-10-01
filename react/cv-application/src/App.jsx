import "./styles/App.css";   // 👈 add this import
import GeneralInfo from "./components/GeneralInfo";
import EducationInfo from "./components/EducationInfo";
import ExperienceInfo from "./components/ExperienceInfo";

function App() {
  return (
    <div>
      <h1>My CV Application</h1>
      <GeneralInfo />
      <EducationInfo />
      <ExperienceInfo />
    </div>
  );
}

export default App;
