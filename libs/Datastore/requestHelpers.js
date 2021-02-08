import { useEffect } from "react";

/**
 * Custom hook for firing the same request every 3 seconds
 */
export function useRecurringRequest(makeRequest, interval = 3000) {
    useEffect(() => {
        const updateData = setInterval(() => {
            makeRequest();
        }, interval);
        
        return () => clearInterval(updateData);
    }, []);
}