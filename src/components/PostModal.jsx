import * as React from "react";
import Box from "@mui/material/Box";
import { onAuthStateChanged } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import Modal from "@mui/material/Modal";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { db } from "../firebase";
const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  minimumWidth: 300,
  width: "100%",
  bgcolor: "black",
  border: "1px solid #949494",
  boxShadow: 24,
  borderRadius: "20px",
};
const PostModal = ({ handleClose, open }) => {
  const [data, setdata] = React.useState("");
  const [user, setuser] = React.useState("");
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setuser(user);
        // ...
      } else {
        setuser("");
      }
    });
  }, []);
  const createPost = async () => {
    const id = uuidv4();
    data.length > 0 &&
      (await setDoc(doc(db, "Posts", id), {
        Content: data,
        photourl: user.photoURL,
        Replies: [],
        userid: user.uid,
        username: user.displayName,
        id: id,
      }));
    setdata("");
    handleClose();
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className=" w-full flex px-4 min-h-[300px] pb-16 pt-8 relative">
            <div className=" w-[10%]">
              {user && user.photoURL && (
                <>
                  <img
                    className=" w-12 h-12 rounded-full"
                    src={user?.photoURL}
                    alt=""
                  />
                </>
              )}
            </div>
            <div className="  w-[90%]">
              <textarea
                onChange={(e) => setdata(e.target.value)}
                placeholder="What is happening?!"
                name=""
                id=""
                className=" w-full h-full bg-transparent text-slate-100 outline-none"
              ></textarea>
              <hr className=" w-[90%] bg-slate-500 " />
            </div>
            <button
              className=" absolute bottom-2 right-4 bg-sky-500 text-white font-semibold w-max px-[20px] py-2 rounded-full flex items-center justify-center"
              onClick={() => createPost()}
            >
              Post
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PostModal;
