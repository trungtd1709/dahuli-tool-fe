import logo from "./logo.svg";
import "./App.css";
import FileUpload from "./components/file-upload";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>Xin chào sếp Lĩnh</p>
        <FileUpload />
      </header>
    </div>
  );
}

export default App;
