param (
    [Parameter()]
    [String]
    $SayThis
)
$Output = "This is $PSCommandPath with Parameter $SayThis"
Write-Output -InputObject (ConvertTo-Json -InputObject @($Output) -Compress)