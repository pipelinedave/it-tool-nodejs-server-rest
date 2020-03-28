[CmdletBinding()]
param (
    [Parameter()]
    [String]
    $ComputerName = $env:COMPUTERNAME,

    [Parameter()]
    [String]
    $Name = '*'
)




$ScriptBlock = {
    Get-Printer -Name $Using:Name
}

try { 
    $Output = Invoke-Command -ComputerName $ComputerName -ScriptBlock $ScriptBlock
}
catch {
    $Output = $error[0]
}
 
Write-Output -InputObject (ConvertTo-Json -InputObject @($Output) -Compress)