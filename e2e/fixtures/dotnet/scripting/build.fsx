#r "paket:
source release/dotnetcore
source https://api.nuget.org/v3/index.json
// @OctoLinkerResolve(https://www.nuget.org/packages/FSharp.Core)
nuget FSharp.Core ~> 4.1
// @OctoLinkerResolve(https://www.nuget.org/packages/System.AppContext)
nuget System.AppContext prerelease
// @OctoLinkerResolve(https://www.nuget.org/packages/Newtonsoft.Json)
nuget Newtonsoft.Json
// @OctoLinkerResolve(https://www.nuget.org/packages/Octokit)
nuget Octokit //"

// @OctoLinkerResolve(<root>/dotnet/scripting/import.csx)
#load import.csx

// @OctoLinkerResolve(<root>/dotnet/scripting/import.csx)
#load "./import.csx"
