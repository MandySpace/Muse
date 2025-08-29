import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Open in Spotify",
  cancelText = "Cancel",
}) {
  if (!isOpen) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: -50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -50,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h3>{title}</h3>
            <button className="modal-close" onClick={onClose}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div className="modal-body">
            <p>{message}</p>
          </div>

          <div className="modal-footer">
            <button className="modal-btn modal-btn-cancel" onClick={onClose}>
              {cancelText}
            </button>
            <button className="modal-btn modal-btn-confirm" onClick={onConfirm}>
              <FontAwesomeIcon icon={faExternalLinkAlt} />
              {confirmText}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Modal;
