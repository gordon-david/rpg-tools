import React from "react";
import { Navbar } from "./navigation/Navbar";

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <Navbar />
    <main className="container">{children}</main>
  </div>
);
