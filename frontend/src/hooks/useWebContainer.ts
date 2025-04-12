import { useEffect, useState } from "react";
import { WebContainer } from "@webcontainer/api";

export const useWebContainer = () => {
    const [webContainer, setWebContainer] = useState<WebContainer>();

    const main = async () => {
        const WebContainerInstance = await WebContainer.boot();
        setWebContainer(WebContainerInstance);
    }

    useEffect(() => {
        main()
    }, []);

    return webContainer;
}