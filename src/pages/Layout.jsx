// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import Navbar from "../navbar/components/Navbar";

export default function Layout(props) {
  const history = useHistory();
  function Logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        history.push("/");
      })
      .catch((error) => {
        // An error happened.
      });
  }
  return (
    <>
      <Navbar>
        <Button
          variant="contained"
          className="font-weight-bold text-capitalize"
          onClick={Logout}
        >
          Logout
        </Button>
      </Navbar>
      {/* <AppBar position="static">
        <Toolbar className="d-flex justify-content-between">
          <Typography variant="h6" className="font-weight-bold">
            My Journal
          </Typography>
        </Toolbar>
      </AppBar> */}
      {props.children}
    </>
  );
}
