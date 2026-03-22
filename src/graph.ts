    // - Create a graph object{} here--
    //   key = package name .. "key" : "db"
    //   value = list of dependents (NOT dependencies) .. "value" : "api-backend"

    // - For each package:
    //    - Look at its dependencies
    //    - If dependency exists inside the repo:
    //         graph[dependency].push(current package)
