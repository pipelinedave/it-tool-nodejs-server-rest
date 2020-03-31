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
    Get-Process -Name $Using:Name | Select-Object Name, Id, StartTime
}

try {
    $Output = Invoke-Command -ComputerName $ComputerName -ScriptBlock $ScriptBlock
}
catch {
    $Output = $error[0]
}

Write-Output -InputObject (ConvertTo-Json -InputObject @($Output) -Compress)