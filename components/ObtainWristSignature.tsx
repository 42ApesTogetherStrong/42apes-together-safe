/* eslint-disable */
// @ts-ignore
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web";

import { useState, useEffect } from "react";
import { SafeSmartAccountClient } from "@/lib/permissionless";
import { addSocialSignerGuardian } from "@/lib/scheduledTransfers";

const ObtainWristSignature: React.FC<{ safe: SafeSmartAccountClient }> = ({
  safe,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [ethAddress, setEthAddress] = useState("");

  const joinThePack = async () => {
    setLoading(true);
    setError(false);

    let command = {
      name: "sign",
      keyNo: 1,
      format: "text",
      message: safe.account.address,
    };

    let res;

    try {
      // --- request NFC command execution ---
      res = await execHaloCmdWeb(command);
      // the command has succeeded, display the result to the user
      console.log(JSON.stringify(res, null, 4));
      //set message to the output of the json
      console.log(res["signature"]);
      setEthAddress(res["etherAddress"]);
      const newTxHash = await addSocialSignerGuardian(
        safe,
        res["etherAddress"]
      );
      document.getElementById("message").innerText = newTxHash;
      setLoading(false);
      // Additional state updates as needed
    } catch (err) {
      console.error(err);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <>
      <p id="message"></p>
      <button disabled={loading} onClick={joinThePack}>
        Join the pack
      </button>
    </>
  );
};

export default ObtainWristSignature;
