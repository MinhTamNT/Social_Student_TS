import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { deletePost } from "../../Redux/apiRequest";
interface IProp {
  isOpenModal: boolean;
  postId: number;
  refreshPosts: boolean;
  accessToken: string;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setRefreshPosts: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ModalDeletedPost = ({
  isOpenModal,
  accessToken,
  postId,
  setOpenModal,
  setRefreshPosts,
  refreshPosts,
}: IProp) => {
  
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const dispatch = useDispatch();
  const handlerDeletedPost = async (postId: number) => {
    try {
      await deletePost(accessToken, dispatch, postId);
      setOpenModal(false);
      console.log("truoc ki", refreshPosts);
      setRefreshPosts(!refreshPosts);
      console.log("Sau khi", refreshPosts);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  return (
    <Modal
      open={isOpenModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          style={{ textAlign: "center", marginBottom: "10px" }}
        >
          Are you sure deleted Post
        </Typography>
        <Stack
          direction={"row"}
          spacing={2}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handlerDeletedPost(postId)}
          >
            Yes
          </Button>
          <Button variant="outlined" color="error">
            No
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
