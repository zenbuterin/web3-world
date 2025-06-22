'use state'
import styles from "@/style/dvoting.module.css";
//NOTE: voting room will take data from state if state is created from createRoom component
//NOTE: it takes data from smartcontract
export default function page() {
    return(<>
    <div className={styles.pageDvoting}>
        {/*TODO: this page used for display all information about related proposal */}
    </div>
    </>)
    }