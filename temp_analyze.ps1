$bytes = [System.IO.File]::ReadAllBytes('src\data\content\fallback.ts')
$text = [System.Text.Encoding]::UTF8.GetString($bytes)
$lines = $text -split "`r?`n"
Write-Output ('Total lines: ' + $lines.Length)

$bt = [char]96
$keyPattern = '^\s+' + [char]39 + '[^' + [char]39 + ']+' + [char]39 + ':\s*' + $bt
$keyCount = 0
foreach ($l in $lines) { if ($l -match $keyPattern) { $keyCount++ } }
Write-Output ('Keys (opening delimiter entries): ' + $keyCount)

Write-Output ''
Write-Output 'Last 6 lines:'
foreach ($l in $lines[-6..-1]) { Write-Output $l }

$closingCount = 0
foreach ($l in $lines) { if ($l -match ($bt + ',\s*$')) { $closingCount++ } }
Write-Output ''
Write-Output ('Lines ending with bt-comma: ' + $closingCount)

$endingBt = 0
foreach ($l in $lines) { if ($l -match ('^\s*' + $bt + '$')) { $endingBt++ } }
Write-Output ('Lines that are just a bt: ' + $endingBt)
