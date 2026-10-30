$port = 8080
$folder = "d:\Learnings\portfolio"
$listener = New-Object System.Net.HttpListener

function Start-ServerOnPort($p) {
    $l = New-Object System.Net.HttpListener
    $l.Prefixes.Add("http://localhost:$p/")
    $l.Prefixes.Add("http://127.0.0.1:$p/")
    try {
        $l.Start()
        return $l
    } catch {
        return $null
    }
}

$activeListener = Start-ServerOnPort $port
if ($null -eq $activeListener) {
    $port = 8081
    $activeListener = Start-ServerOnPort $port
}
if ($null -eq $activeListener) {
    $port = 5500
    $activeListener = Start-ServerOnPort $port
}

if ($null -eq $activeListener) {
    Write-Error "Could not bind to any test port (8080, 8081, 5500)."
    exit 1
}

Write-Output "=================================================="
Write-Output " PORTFOLIO LOCAL SERVER LIVE AT:"
Write-Output " http://localhost:$port/"
Write-Output "=================================================="

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".pdf"  = "application/pdf"
    ".txt"  = "text/plain; charset=utf-8"
}

while ($activeListener.IsListening) {
    try {
        $context = $activeListener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($urlPath) -or $urlPath -eq "/") {
            $urlPath = "index.html"
        }

        $urlPath = [System.Uri]::UnescapeDataString($urlPath)
        $localPath = [System.IO.Path]::Combine($folder, $urlPath.Replace('/', [System.IO.Path]::DirectorySeparatorChar))

        if (Test-Path $localPath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
            $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            $response.ContentType = $mime
            
            $bytes = [System.IO.File]::ReadAllBytes($localPath)
            $response.ContentLength64 = $bytes.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        $response.Close()
    } catch {
        # ignore transient connection aborts
    }
}
