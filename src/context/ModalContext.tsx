import React, { ReactNode } from "react";

interface ModalContextType {
  openModal: (modal: ReactNode) => void;
  removeModal: () => void;
  modalOpen: boolean;
  modal: ReactNode | React.FC;
  hasModal: () => boolean;
}

const ModalContext = React.createContext<ModalContextType | undefined>(
  undefined
);

interface ModalProviderProps {
  children: React.ReactNode;
}

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModal] = React.useState<ReactNode | undefined>(undefined);
  const [modalOpen, setModalOpen] = React.useState<boolean>(true);

  const openModal = React.useCallback(
    function (modal: React.ReactNode) {
      console.log("called");
      setModal(modal);
      setModalOpen(true);
    },
    [setModal, setModalOpen]
  );

  const removeModal = () => {
    setModalOpen(false);
    setModal(undefined);
  };

  const hasModal = () => {
    return modal !== undefined;
  };

  return (
    <ModalContext.Provider
      value={{ modal, modalOpen, openModal, removeModal, hasModal }}
    >
      {children}
      {modal ? modal : null}
    </ModalContext.Provider>
  );
};

const useModalContext = () => {
  const context = React.useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }

  const { modal, openModal, removeModal, hasModal, modalOpen } = context;

  return {
    modal,
    openModal,
    removeModal,
    hasModal,
    modalOpen,
  };
};

export { useModalContext, ModalProvider };
