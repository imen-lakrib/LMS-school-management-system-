import React, { FC } from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: any;
  component: any;
  setRoute?: (route: string) => void;
};

const CustomModal: FC<Props> = ({
  open,
  setOpen,
  activeItem,
  component: Component,
  setRoute,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box className="bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
        <div
          style={{
            maxWidth: "450px",
            margin: "auto", // This will center the content inside the box
          }}
        >
          <Component setOpen={setOpen} setRoute={setRoute} />
        </div>
      </Box>
    </Modal>
  );
};

export default CustomModal;
