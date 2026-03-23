import fs from 'fs'
// 1. SCAN PACKAGES
// - Look inside "apps/*" and "packages/*" .. grep "apps" ..

interface ResultsProp {
    name: string;
    dir: string;
    dependencies: Record<string, string>;
}

const scanPackages = (packages: string[]) => {
    const results: ResultsProp[] = [];

    packages.forEach((baseDir) => {
        const items = fs.readdirSync(baseDir, { withFileTypes: true });
        for (const item of items) {
            items.filter((item) => item.isDirectory());

            if (item.isDirectory()) {
                const pkgJsonPath = `${baseDir}/${item.name}/package.json`

                if (fs.existsSync(pkgJsonPath)) {
                    const content = fs.readFileSync(pkgJsonPath, 'utf-8')
                    const parsed = JSON.parse(content)
                    results.push({
                        name: parsed.name,
                        dir: `${baseDir}/${item.name}`,
                        dependencies: parsed.dependencies || {}
                    })

                    // log result = [name, dir, deps]
                    console.log(results)
                }
            }


        }
    })

    return results;
}

scanPackages(['apps', 'packages'])
export default scanPackages;