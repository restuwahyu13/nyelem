export const validFlag = (data: string[], argv: string[]): boolean => {
  const str: string = argv.join(' ')
  const separator: string = str.match(/\.*[=]/gi) ? '=' : ' '

  const normalizeFlags: string[] = separator == '=' ? str.split(separator).join(' ').split(' ') : str.split(separator)
  normalizeFlags
    .map((val: string): string => {
      if (val.match(/[(--)|(-)].*/gi) !== null) return val.match(/[(--)|(-)].*/gi)[0]
      return 'null'
    })
    .filter((val: string) => val !== 'null' && val)

  const checkFlags: any[] = normalizeFlags.filter((val: any) => data.indexOf(val) != -1 && val)
  // .map((val: any) => data.indexOf(val))

  return checkFlags.includes(-1) || checkFlags.length == 0 ? false : true
}

// let xx = [
//   '-all',
//   '--allow-missing-template-keys',
//   '--cascade',
//   '-dry-run',
//   '--field-manager',
//   '-f',
//   '--filename',
//   '--force',
//   '--force-conflicts',
//   '--grace-period',
//   '-k',
//   '--kustomize',
//   '--openapi-patch',
//   '-o',
//   '--output',
//   '--overwrite',
//   '--prune',
//   '--prune-whitelist',
//   '-R',
//   '--recursive',
//   '-l',
//   '--selector',
//   '--server-side',
//   '--show-managed-fields',
//   '--template',
//   '-timeout',
//   '--validate',
//   '--wait',
//   '--cwd'
// ]

// let test = validFlag(xx, ['--filenamex=index.js'])
// console.log(test)

// if (!test) {
//   console.log('work')
//   new NyelemHelpMenu(program).handler()
//   // process.exit()
// }
