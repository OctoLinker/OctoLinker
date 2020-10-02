// @OctoLinkerResolve(https://www.nuget.org/packages/Cake.DotNetTool.Module)
#module nuget:?package=Cake.DotNetTool.Module&version=0.4.0

// @OctoLinkerResolve(https://www.nuget.org/packages/Cake.Coveralls)
#addin "nuget:https://api.nuget.org/v3/index.json?package=Cake.Coveralls&version=0.10.1"

// @OctoLinkerResolve(https://www.nuget.org/packages/coveralls.io)
#tool "nuget:https://api.nuget.org/v3/index.json?package=coveralls.io&version=1.4.2"

// @OctoLinkerResolve(https://www.nuget.org/packages/GitVersion.Tool)
#tool "dotnet:https://api.nuget.org/v3/index.json?package=GitVersion.Tool&version=5.1.2"

// @OctoLinkerResolve(<root>/dotnet/scripting/import.csx)
#load import.csx

// @OctoLinkerResolve(<root>/dotnet/scripting/import.csx)
#load "./import.csx"

// @OctoLinkerResolve(<root>/dotnet/scripting/import.cake)
#load "./import.cake"
