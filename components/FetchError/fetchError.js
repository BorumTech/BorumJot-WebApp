import fetchError from "./fetchError.module.css";
import { useState } from "react";
import Image from "next/image";

/**
 * @public 
 * @copyright Borum Tech 2020
 * @author Varun Singh
 * @description Component to display instead of the actual item
 * when an error is received from a request to the API
 * @param {{itemName : string} : any} props 
 */
export default function FetchError({itemName}) {
    const [reloadBtnCls, setReloadBtnCls] = useState("");
    const handleReloadBtnClick = e => {
        setReloadBtnCls(fetchError.rotateRetry);
	};
	const handleReloadAnimationEnd = e => {
		setReloadBtnCls("");
	};
    
    return (
        <div className={fetchError.fetchError}>
			<p>The {itemName} could not be loaded</p>
			<button onAnimationEnd={handleReloadAnimationEnd} onClick={handleReloadBtnClick} className={reloadBtnCls}>
				<Image width={64} height={64} src="/images/reload.png" />
			</button>
		</div>
    );
}