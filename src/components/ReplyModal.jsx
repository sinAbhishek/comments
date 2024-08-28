import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { auth } from "../firebase";
import { db } from "../firebase";
const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "white",
  border: "1px solid #949494",
  boxShadow: 24,
  borderRadius: "20px",
};
const ReplyModal = ({ openReply, handleCloseReply, activepost }) => {
  const [data, setdata] = React.useState("");
  const createReply = async () => {
    console.log(...activepost.Replies);
    const updatedReply = [
      ...activepost.Replies,
      {
        username: auth.currentUser.displayName,
        photoUrl: auth.currentUser.photoURL,
        comment:
          "Dot notation allows you to update a single nested field without overwriting other nested fields. If you update a nested field without dot notation, you will overwrite the entire map field, as shown in the following example:",
      },
    ];
    const frankDocRef = doc(db, "Posts", activepost.id);
    await updateDoc(frankDocRef, {
      Replies: [...updatedReply],
    });
  };
  return (
    <div>
      {" "}
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={openReply}
        onClose={handleCloseReply}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className=" w-full flex px-4 min-h-[300px] pb-16 pt-8 relative">
            <div className=" w-[10%]">
              {auth.currentUser && auth.currentUser.photoURL && (
                <>
                  <img
                    className=" w-12 h-12 rounded-full"
                    src={auth.currentUser?.photoURL}
                    alt=""
                  />
                </>
              )}
            </div>
            <div className="  w-[90%]">
              <textarea
                onChange={(e) => setdata(e.target.value)}
                placeholder="Post your reply"
                name=""
                id=""
                className=" w-full h-full bg-transparent text-slate-100 outline-none"
              ></textarea>
              <hr className=" w-[90%] bg-slate-500 " />
            </div>
            <button
              className=" absolute bottom-2 right-4 bg-sky-500 text-white font-semibold w-max px-[20px] py-2 rounded-full flex items-center justify-center"
              onClick={() => createReply()}
            >
              Reply
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ReplyModal;
