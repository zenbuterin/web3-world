'use client'
import dvotingstyle from "@/app/dvoting/votingroom/dvoting.module.css";
import signupstyle from "@/app/signup/signup.module.css"
import { usePathname } from "next/navigation";
// import walletstyle from  "@/app/wallet/wallet.module.css"
// import authorstyle from  "@/app/author/author.module.css"
// import swapstyle from  "@/app/swap/swap.module.css"
const { createContext, useContext, useState, useEffect } = require("react");

const uiContext = createContext();

export function UIContextProvider({children}) {
    const [style, setStyle] = useState(dvotingstyle)
    //NOTE: pathname is for dynamic css based on url page name
    const pathname = usePathname();



    useEffect(() => {
        if (pathname.startsWith("/dvoting")) {
            setStyle(dvotingstyle)
    } else if (pathname.startsWith("/signup")) {
        setStyle(signupstyle)
    }

        //NOTE: it's for next project
        //NOTE: dynamic style
        // else if (pathname.startsWith("/wallet")) {
        //     style = walletstyle;
        // }
        // else if (pathname.startsWith("/swap")) {
        //     style = swapstyle;

        // } else if (pathname.startsWith("/author")) {
        //     style = authorstyle;

        // }

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