import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Img from "next/image";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "42 Apes Together Stronger",
  description: "A Safe that stays safe with",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{
          backgroundImage: "linear-gradient(to bottom, #6a11cb, #2575fc)",
          color: "white", // Ensuring text is readable on a dark background
        }}
      >
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem",
          }}
        >
          <a href="https://safe.global">
            <Img width={95} height={36} alt="safe-logo" src="/safe.svg" />
          </a>
          <div style={{ display: "flex" }}>
            <a
              href="https://docs.safe.global/advanced/erc-7579/tutorials/7579-tutorial"
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "1rem",
              }}
            ></a>
            <a
              href="https://github.com/42ApesTogetherStrong"
              style={{ display: "flex", alignItems: "center" }}
            >
              View on GitHub{" "}
              <Img
                width={24}
                height={24}
                alt="github-icon"
                src="/github.svg"
                style={{ marginLeft: "0.5rem" }}
              />
            </a>
          </div>
        </nav>
        <div style={{ width: "100%", textAlign: "center" }}>
          <h1>42Apes Together Strong 🦍</h1>
          <h2>
            <i>Safe</i>r together
          </h2>

          <div>
            Create a new ERC-7579-compatible Safe Smart Account and use it to
            make your Safe Safer With The Power Of Friendship!
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: "40px",
            marginRight: "40px",
            flexDirection: "column",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
