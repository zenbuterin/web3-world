'use client'
import styles from "@/style/dvoting.module.css";
import { CreateProposalButton } from "@/components/dvoting/createProposalButton";

//NOTE: this is /dvoting path
export default function page() {
    return (<>
    <div className={styles.enterRoomPage}>  
        {/**disini akan ada button untuk buat proposal, addoption dan akan diberikan watchevent untuk proposal yang sudah terbuat. ada 3 komponen */}
        <CreateProposalButton />
    </div>
    </>)
}