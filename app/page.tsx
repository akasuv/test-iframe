"use client";
import { CyberApp } from "@cyberlab/cyber-app-sdk";
import React from "react";
import { parseUnits } from "viem";

export default function Home() {
  const [app, setApp] = React.useState<CyberApp>();
  const [res, setRes] = React.useState<string>();
  const [connected, setConnected] = React.useState(false);
  const [address, setAddress] = React.useState("");

  React.useEffect(() => {
    const app = new CyberApp({ name: "testapp" });

    (async () => {
      try {
        const { connected } = await app.start();
        console.log("connected", connected);
        setConnected(connected);
      } catch (err) {
        alert(err);
      }
    })();

    setApp(app);
  }, []);

  const send = async () => {
    const res = await app?.cyberWallet
      ?.sendTransaction({
        to: address,
        value: parseUnits("0.0001", 18),
        data: "0x",
      })
      .catch((err: any) => console.log({ err }));

    setRes(res);
  };

  return (
    <div className="w-full h-screen text-black border bg-white flex flex-col justify-center items-center gap-8">
      <p>Connection: {connected ? "connected" : "disconnected"} </p>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Address
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={send}
      >
        Send Transaction
      </button>
    </div>
  );
}
