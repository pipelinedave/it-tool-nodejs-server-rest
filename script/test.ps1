<#
.PARAM_START
SayThis
JustATest
BestParameter
.PARAM_END
#>

param (
    [Parameter()]
    [String]
    $SayThis,

    [String]
    $BestParameter
)
$Output = "This is $PSCommandPath with Parameter $SayThis"
Write-Output -InputObject (ConvertTo-Json -InputObject @($Output) -Compress)