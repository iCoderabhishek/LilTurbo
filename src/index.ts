//  tldr making lilturbo ---- !the most simplified/lightweight monorepo evrr

// 1. Finds packages (apps + packages)
// 2. Builds dependency graph
// 3. Determines execution order
// 4. Hashes package contents (simplified hash)
// 5. Skips execution if unchanged (if else chech so called ""cache""")


// bunch of helpers needed

// 1. SCAN PACKAGES
    // - Look inside "apps/*" and "packages/*" .. grep "apps" ..
    // - For each folder:
    //    - Check if package.json exists
    //    - Read package.json
    //    - Extract:
    //        - name
    //        - dependencies
    //        - directory path
    // - Store all packages in an array ["db", "lint-pack"] etc..
    // o/p - [
    //   { name:  "ui", dir: "packages/ui", dependencies: {...} },
    //   ...
    // ]

// 2. DEP GRAPH

    // - Create a graph object{}:
    //   key = package name .. "key" : "db"
    //   value = list of dependents (NOT dependencies) .. "value" : "api-backend"

    // - For each package:
    //    - Look at its dependencies
    //    - If dependency exists inside the repo:
    //         graph[dependency].push(current package)


// 3. TOPOLOGICAL SORT

    // - Purpose: determine correct execution order
    // - Rule: dependencies must run BEFORE dependents

    // - Use DFS or Kahn's algorithm
    // - Visit nodes recursively
    // - Build ordered list

    // Example result:
    // ["utils", "api", "web"]


// 4. HASHING (PER PACKAGE)

    // - For each package:
    //    - Read all files inside its directory
    //    - Ignore node_modules and unnecessary folders
    //    - Combine file contents
    //    - Generate hash (e.g., sha256)

    // - This hash represents current state of the package

    // Important:
    // If ANY file changes → hash changes

//  5. COMPARE THE CACHE

    //  - Store hashes in a file (e.g., .cache.json)
    // Example:
    // {
    //   "utils": "abc123",
    //   "api": "xyz456"
    // }

    // - On next run:
    //    - Load previous cache
    //    - Compare old hash vs new hash

// 6.RUNNER (CORE LOGIC)

    // - Iterate over packages in topological order

    // For each package:
    //    - Compute current hash
    //    - Compare with cached hash

    // IF hash is SAME:
    //    - Skip execution
    //    - Log: "Skipping (cached)"

    // IF hash is DIFFERENT:
    //    - Run build command (npm run build)
    //    - Log: "Building..."
    //    - Update cache

// STEP 7: EXECUTION RULES

    // - Always follow topological order
    // - Never run dependent before dependency

    // Example:
    // utils → api → web

    // Correct order:
    // 1. utils
    // 2. api
    // 3. web


//tldr execution - scan, build, sort, run 

console.log("hello from lilturbo")