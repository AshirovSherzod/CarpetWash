import { Modal } from "antd";

const CustomModal = ({ visible, onOk, onCancel, title, children }) => {
  return (
    <Modal title={title} visible={visible} onOk={onOk} onCancel={onCancel}>
      {children}
    </Modal>
  );
};

export default CustomModal;
