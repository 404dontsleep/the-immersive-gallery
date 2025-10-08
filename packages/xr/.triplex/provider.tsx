import React from "react";
import XRProvider from "../src/providers/XRProvider";

export default function ProviderComponent({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <XRProvider>{children}</XRProvider>;
}
