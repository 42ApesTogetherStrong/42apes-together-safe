import { useState, useEffect } from "react";

import { SafeSmartAccountClient } from "@/lib/permissionless";
import {
  install7579Module,
  scheduleTransfer,
  scheduledTransfersModuleAddress,
  recoveryModuleAddress,
  installRecoveryModule,
  addSocialSignerGuardian,
  getAllGuardians,
} from "@/lib/scheduledTransfers";

const ScheduledTransferForm: React.FC<{ safe: SafeSmartAccountClient }> = ({
  safe,
}) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [txHash, setTxHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [is7579Installed, setIs7579Installed] = useState(false);

  const handleInstallRecovery = async () => {
    setLoading(true);
    setError(false);
    try {
      const newTxHash = await installRecoveryModule(
        safe,
        "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
      );
      if (newTxHash !== txHash) {
        setTxHash(newTxHash);
      }
      setIs7579Installed(true);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(true);
      setLoading(false);
    }
  };

  const handleAddSocialSignerGuardian = async () => {
    setLoading(true);
    setError(false);
    try {
      const newTxHash = await addSocialSignerGuardian(
        safe,
        "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
      );
      if (newTxHash !== txHash) {
        setTxHash(newTxHash);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(true);
      setLoading(false);
    }
  };

  const handleGetAllGuardians = async () => {
    setLoading(true);
    setError(false);
    try {
      const theGuardians = await getAllGuardians(safe);
      console.log(theGuardians);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(true);
      setLoading(false);
    }
  };

  const baseButtonStyle = {
    backgroundColor: "#4CAF50", // Green background
    color: "white", // White text
    padding: "12px 24px", // Larger padding for better touch target
    fontSize: "16px", // Larger font size for readability
    borderRadius: "5px", // Rounded corners
    border: "none", // No border
    cursor: "pointer", // Pointer cursor on hover
    margin: "5px 0", // Margin to separate buttons
    width: "100%", // Full width buttons for better mobile experience
    boxSizing: "border-box", // Include padding in width
  };

  return (
    <>
      <div
        style={{
          marginTop: "20px",
          padding: "0 15px",
          fontSize: "18px",
          textAlign: "center",
        }}
      >
        Your Safe: <strong>{safe.account.address}</strong>
      </div>
      <div
        style={{
          marginTop: "10px",
          padding: "0 15px",
          fontSize: "18px",
          textAlign: "center",
        }}
      >
        ERC-7579 module installed:{" "}
        {is7579Installed
          ? "Yes ✅"
          : "No, click on Install Recovery Module to install it!"}
      </div>
      <div style={{ padding: "0 15px", marginTop: "20px" }}>
        {loading && (
          <p style={{ textAlign: "center" }}>Processing, please wait...</p>
        )}
        {error && (
          <p style={{ color: "red", textAlign: "center" }}>
            There was an error processing the transaction. Please try again.
          </p>
        )}
        {txHash && (
          <p style={{ textAlign: "center" }}>
            Success!{" "}
            <a
              href={`https://sepolia.etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "underline",
                color: "blue",
              }}
            >
              View on Etherscan
            </a>
          </p>
        )}
      </div>
      <div style={{ padding: "0 15px", marginTop: "20px" }}>
        <button
          style={baseButtonStyle}
          disabled={loading}
          onClick={handleInstallRecovery}
        >
          Install Recovery Module
        </button>
        <button
          style={baseButtonStyle}
          disabled={loading}
          onClick={handleAddSocialSignerGuardian}
        >
          Add as Recovery Signer
        </button>
        <button
          style={baseButtonStyle}
          disabled={loading}
          onClick={handleInstallRecovery}
        >
          Trigger Recovery as Recovery
        </button>
        <button
          style={baseButtonStyle}
          disabled={loading}
          onClick={handleGetAllGuardians}
        >
          Get Your Pack Addresses
        </button>
      </div>
    </>
  );
};

export default ScheduledTransferForm;
