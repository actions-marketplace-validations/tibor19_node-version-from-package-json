# Read node version from engines field in package.json

Read your node version from `package.json`


## Inputs

### path

Path of `package.json`, `./` by default. If path points to a file, then node version will be read from that file



## Example workflow

`package.json`
```json

{
  "name": "your-package",
  "engines": {
    "node": "16.3.x"
  }
}
```

`.github/workflow/test.yml`
```yml
name: Get node version from package.json

on: push

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v1

      - name: Read node from package.json
        uses: tibor19/node-version-from-package-json@v1
        id: node-version
        with:
          fallback-version: '16.3.x'

      - name: Show node version number
        run: echo "Version is ${{ steps.node-version.outputs.version }}"
        # Version is 16.3.x

      - name: Set up Node.js version
        uses: actions/setup-node@v1
        with:
          node-version: '${{ steps.package-version.outputs.version }}'
```

# License

MIT