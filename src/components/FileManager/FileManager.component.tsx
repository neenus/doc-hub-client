import {
  FileManagerComponent,
  NavigationPane,
  Toolbar,
  DetailsView,
  Inject
} from "@syncfusion/ej2-react-filemanager";
import "./fileManager.styles.css";
import { useSelector } from "react-redux";
import { User } from "../../types";

const FileManager = ({ userInfo }: { userInfo: User }) => {
  const token = useSelector((state: any) => state.auth.token);
  const user = userInfo?._id ? userInfo : useSelector((state: any) => state.auth.user);

  const hostUrl = import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_BASE_URL_PROD + "/filemanager"
    : import.meta.env.VITE_API_BASE_URL_DEV + "/filemanager";

  const beforeSend = (args: any) => {
    args.ajaxSettings.beforeSend = function (args: any) {
      // Setting authorization header for filemanager
      args.httpRequest.setRequestHeader('Authorization', `Bearer ${token}`);
    };
  };


  const ajaxSettings = {
    url: `${hostUrl}/${user?.dir}`,
    downloadUrl: `${hostUrl}/${user?.dir}/Download`,
    uploadUrl: `${hostUrl}/${user?.dir}/Upload`,
    getImageUrl: `${hostUrl}/${user?.dir}/GetImage`,
  };

  const uploadSettings = {
    autoUpload: false,
    minFileSize: 1000,
    maxFileSize: 500000000, // 500MB
    allowedExtensions: ".jpg, .jpeg, .png, .txt, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .zip, .rar, .tar, .gz, .7z",
    autoClose: true
  };

  const toolbarSettings = {
    visible: true,
    items: ['NewFolder', 'Upload', 'SortBy', 'Refresh', 'View', 'Details', 'Cut', 'Copy', 'Delete', 'Paste', 'Download', 'Rename']
  };

  return (
    <>
      <FileManagerComponent
        id="filemanager"
        view="Details"
        beforeSend={beforeSend}
        // enablePersistence={true}
        ajaxSettings={ajaxSettings}
        uploadSettings={uploadSettings}
        toolbarSettings={toolbarSettings}
      >
        <Inject services={[NavigationPane, Toolbar, DetailsView]} />
      </FileManagerComponent>
    </>
  );
};

export default FileManager;
