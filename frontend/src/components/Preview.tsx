import { WebContainer } from "@webcontainer/api";
import { useEffect, useState } from "react";

const Preview = ({ files, webContainer } : { files: any[], webContainer : WebContainer | undefined }) => {
  const [url, setUrl] = useState("");

  const main = async () => {
    const installProcess = await webContainer?.spawn('npm', ['install']);
    installProcess?.output.pipeTo(new WritableStream({
      write(data) {
        console.log(data);
      }
    }));

    await webContainer?.spawn('npm', ['run', 'dev']);
    webContainer?.on("server-ready", (port, url) => {
      console.log(url);
      console.log(port);
      setUrl(url);
    });
  }

  useEffect(() => {
    main();
  }, []);

    return (
        <div className="flex-1 flex h-full bg-gray-950 border-l border-gray-700 text-gray-400 p-1 overflow-y-auto items-center justify-center">
          { url=="" ? `Waiting for the code part to complete. Currently tracking ${files.length} files.` : <iframe width={"100%"} height={"100%"} src={url} /> }
        </div>
    );
}

export default Preview;