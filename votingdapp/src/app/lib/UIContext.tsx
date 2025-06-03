'use client'
import dvotingstyle from "@/app/style/dvoting.module.css";
import signupstyle from "@/app/style/signup.module.css"
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
const { createContext, useContext, useState, useEffect } = require("react");

const uiContext = createContext();

export function UIContextProvider({children} : {children: ReactNode}) {
    const [style, setStyle] = useState(dvotingstyle)
    //NOTE: pathname is for dynamic css based on url page name
    const pathname = usePathname();



    useEffect(() => {
        if (pathname.startsWith("/dvoting")) {
            setStyle(dvotingstyle)
    } else if (pathname.startsWith("/signup")) {
        setStyle(signupstyle)
    }
    //TODO: add logic for next utility

    }, [pathname])

    return (
    <uiContext.Provider value={style}>
        {children}
    </uiContext.Provider>
    )
    
}

export function useUIContext() {
    return useContext(uiContext);
}