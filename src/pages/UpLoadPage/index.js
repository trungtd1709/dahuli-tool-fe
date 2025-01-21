import FileUpload from "../../components/file-upload";

export const UploadPage = () => {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p style={{ margin: "0 0 20px 0" }}>Xin chào sếp Lĩnh</p>
        <FileUpload />
      </header>
    </div>
  );
};
