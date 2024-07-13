import {
  getScheduledTransactionData,
  getInstallScheduledTransfersExecutor,
  getCreateScheduledTransferAction,
} from "@rhinestone/module-sdk";
import {
  getInstallSocialRecoveryValidator,
  getAddSocialRecoveryGuardianAction,
} from "@rhinestone/module-sdk";
import { Address } from "viem";
import { SafeSmartAccountClient } from "./permissionless";

export interface ScheduledTransferDataInput {
  startDate: number;
  repeatEvery: number;
  numberOfRepeats: number;
  amount: number;
  recipient: `0x${string}`;
}

export const scheduledTransfersModuleAddress =
  "0xF1aE317941efeb1ffB103D959EF58170F1e577E0";
export const recoveryModuleAddress =
  "0x0Ecd5E6721BB885A68B4cbA52B74827994AbD66C";
const sepoliaUSDCTokenAddress = "0x94a9d9ac8a22534e3faca9f4e7f2e2cf85d5e4c8";

export const install7579Module = async (
  safe: SafeSmartAccountClient,
  scheduledTransferInput: ScheduledTransferDataInput
) => {
  const { startDate, repeatEvery, numberOfRepeats, amount, recipient } =
    scheduledTransferInput;
  const scheduledTransaction = {
    startDate,
    repeatEvery,
    numberOfRepeats,
    token: {
      token_address: sepoliaUSDCTokenAddress as `0x${string}`,
      decimals: 6,
    },
    amount,
    recipient,
  };

  const executionData = getScheduledTransactionData({
    scheduledTransaction,
  });

  const scheduledTransfersModule = getInstallScheduledTransfersExecutor({
    executeInterval: repeatEvery,
    numberOfExecutions: numberOfRepeats,
    startDate,
    executionData,
  });

  const txHash = await safe.installModule({
    type: "executor",
    address: scheduledTransfersModuleAddress,
    context: scheduledTransfersModule.data as `0x${string}`,
  });

  console.log(
    "Scheduled transfers module is being installed: https://sepolia.etherscan.io/tx/" +
      txHash
  );

  return txHash;
};

export const installRecoveryModule = async (
  safe: SafeSmartAccountClient,
  address: string
) => {
  const guardians: Address[] = ["0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"];

  const threshold = 1;

  const recoveryModule = getInstallSocialRecoveryValidator({
    threshold,
    guardians,
  });

  console.log(recoveryModule.module);
  const txHash = await safe.installModule({
    type: "executor",
    address: recoveryModule.module,
    context: recoveryModule.data as `0x${string}`,
  });

  console.log(
    "Recovery module is being installed: https://sepolia.etherscan.io/tx/" +
      txHash
  );
  return txHash;
};

export const addSocialSignerGuardian = async (
  safe: SafeSmartAccountClient,
  addressToAdd: string
) => {
  const guardian: Address = "0x2E21f5d32841cf8C7da805185A041400bF15f21A";

  const addGuardian = getAddSocialRecoveryGuardianAction({
    guardian,
  });

  const txHash = await safe.sendTransaction({
    to: addGuardian.target,
    value: addGuardian.value as bigint,
    data: addGuardian.callData,
  });

  console.log(
    "Successfully added a Recovery Signer to the pack! : https://sepolia.etherscan.io/tx/" +
      txHash
  );
  return txHash;
};
export const scheduleTransfer = async (
  safe: SafeSmartAccountClient,
  scheduledTransferInput: ScheduledTransferDataInput
) => {
  const { startDate, repeatEvery, numberOfRepeats, amount, recipient } =
    scheduledTransferInput;
  const scheduledTransaction = {
    startDate,
    repeatEvery,
    numberOfRepeats,
    token: {
      token_address: sepoliaUSDCTokenAddress as `0x${string}`,
      decimals: 6,
    },
    amount,
    recipient,
  };

  const scheduledTransactionData = getCreateScheduledTransferAction({
    scheduledTransaction,
  });
  const txHash = await safe.sendTransaction({
    to: scheduledTransactionData.target,
    value: scheduledTransactionData.value as bigint,
    data: scheduledTransactionData.callData,
  });

  return txHash;
};
