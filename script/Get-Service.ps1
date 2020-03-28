[CmdletBinding()]
param (
    [Parameter()]
    [String]
    $ComputerName = $env:COMPUTERNAME,

    [Parameter(
        ParameterSetName = 'Name'
    )]
    [String]
    $Name = '*',

    [Parameter(
        ParameterSetName = 'DisplayName'
    )]
    [String]
    $DisplayName = '*'
)




if ($PSCmdlet.ParameterSetName -eq 'Name') {
    $ScriptBlock = {
        Get-Service -Name $Using:Name
    }
}
else {
    $ScriptBlock = {
        Get-Service -DisplayName $Using:DisplayName
    }
}

try {
    $Output = Invoke-Command -ComputerName $ComputerName -ScriptBlock $ScriptBlock
}
catch {
    $Output = $error[0]
}

Write-Output -InputObject (ConvertTo-Json -InputObject @($Output) -Compress)