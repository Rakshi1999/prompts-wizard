import Modal from "react-modal";
import { getProviders, signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { MdClose } from "react-icons/md";

const AuthModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [signInproviders, setSignProviders] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setSignProviders(res);
    })();
  }, []);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button className="outline_btn" onClick={() => setModalIsOpen(true)}>
        Sign In
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Authentication Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            border: "none",
            borderRadius: "8px",
            padding: "20px",
            maxWidth: "400px",
            width: "100%",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ffffff",
          },
        }}
      >
        <button
          onClick={closeModal}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <MdClose size={20} />
        </button>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          {signInproviders &&
            Object.values(signInproviders).map((provider) => (
              <div key={provider.name} style={{ margin: "10px 0" }}>
                <button
                  onClick={async () => {
                    await signIn(provider.id);
                    router.push("/");
                  }}
                  className="outline_btn"
                >
                  {provider.name === "Google" && (
                    <FcGoogle style={{ marginRight: "10px" }} />
                  )}
                  {provider.name === "GitHub" && (
                    <FaGithub style={{ marginRight: "10px" }} />
                  )}
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
        </div>
      </Modal>
    </div>
  );
};

export default AuthModal;
