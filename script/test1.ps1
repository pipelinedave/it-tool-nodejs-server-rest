param (
  [Parameter()]
  [String]
  $Name
)
$Output = @{
  ComputerName = 'mockdata'
  Name         = $Name
  Status       = 'awesome'
}
Write-Output -InputObject (ConvertTo-Json -InputObject @($Output) -Compress)