import type { PropsWithChildren } from "react"
import LenisProvider from "./LenisProvider";
import React from "react";

interface Props extends PropsWithChildren { }
export default function Providers({ children }: Props) {
    return (
        <React.Fragment>
            {children}
            <LenisProvider/>
        </React.Fragment>
    )
}