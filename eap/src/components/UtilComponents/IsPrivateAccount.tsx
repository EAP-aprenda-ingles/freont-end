const IsPrivateAccount = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <strong>
        <p>Esta conta é privada.</p>
        <p>
          Você precisa solicitar para seguir este usuário para ver as postagens.
        </p>
      </strong>
    </div>
  );
};

export default IsPrivateAccount;
