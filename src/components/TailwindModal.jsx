import Modal from "react-modal";

export const TailwindModal = ({ isOpen, onRequestClose, children }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Modal"
    ariaHideApp={false}
    className="absolute top-1/2 left-1/2 max-w-[450px] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-gray-200 bg-white p-6 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.05)] focus:outline-none"
    overlayClassName="fixed inset-0 bg-[rgba(107,114,128,0.75)] z-[1000]"
  >
    {children}
  </Modal>
);
