const Code = () => {
    return (
        <div className="w-7/12 bg-gray-900 overflow-y-auto overflow-x-auto">
          <div className="h-full">
            <div className="h-full bg-gray-950 border border-transparent p-4">
              <pre className="text-sm text-gray-300">
                <code>{`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Project</title>
</head>
<body>
    <h1>Welcome to DevStudio</h1>
</body>
</html>`}</code>
              </pre>
            </div>
          </div>
        </div>
    );
}

export default Code;