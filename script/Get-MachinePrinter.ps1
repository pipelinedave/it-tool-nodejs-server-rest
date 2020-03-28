[CmdletBinding()]
param (
    [Parameter()]
    [String]
    $ComputerName,

    [Parameter()]
    [String]
    $PrinterName
)




try {
    $Output = Get-MachinePrinter -ComputerName $ComputerName
}
catch {
    $Output = $error[0]
}


Write-Output -InputObject (ConvertTo-Json -InputObject @($Output) -Compress)