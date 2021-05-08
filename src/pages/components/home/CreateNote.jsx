import { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert"; // comes another package install npm i @material-ui/lab/
import firebase from "firebase/app";
import "../../Firebase"; //auth

export default function CreateNote() {
  const [state, setState] = useState({ //hooks manages the chngs that constantly chngs
    note: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,//prev state is empty - note:""
      [id]: value,
    }));
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const [open, setOpen] = useState(false);

  const handleClose = () => {
      setOpen(false);
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    console.log(state.note);
    const note = state.note; //ref
    var db = firebase.firestore();//ref to firestore
    if (state.note != "") {
      db.collection("notes")
        .add({
          note: note,
          created: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          setOpen(true);
          setState((prevState) => ({
            ...prevState,
            note: "",
          }));
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
  };
  return (
    <>
      <div className="container mt-4">
        <form action="#">
          <TextField
            id="note"
            label="Create a new note"
            variant="outlined"
            rows={4}
            className="shadow-sm"
            fullWidth
            multiline
            onChange={handleChange} //if the value chngs it triggers handle chng
            value={state.note}
          />
          <Button variant="contained"
            color="primary"
            className="d-flex ml-auto mt-3 text-capitalize font-weight-bold"
            onClick={handleSubmitClick}>Create
            </Button>
        </form>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Note created successfully!
                </Alert>
      </Snackbar>
    </>
  );
}