export default function SpellModal({ showModal, setShowModal, content }) {
  return (
    <div
      style={{
        display: showModal ? "default" : "none",
        position: "fixed",
        zIndex: 1,
        paddingTop: "20vh",
        left: 0,
        right: 0,
        width: "100%",
        height: "100%",
        overflow: "auto",
        backgroundColor: "rgb(0, 0, 0)",
        backgroundColor: "rgba(0,0,0,0.4)" /* Black w/ opacity */,
      }}
      className="spells-modal"
    >
      <div
        style={{
          backgroundColor: "rgb(254,254,254)",
          margin: "auto",
          padding: "20px",
          border: "1px solid #888",
          width: "80vw",
        }}
        className="spells-modal-content"
      >
        <button onClick={() => setShowModal(false)}>close</button>
        {JSON.stringify(content)}
      </div>
    </div>
  );
}
