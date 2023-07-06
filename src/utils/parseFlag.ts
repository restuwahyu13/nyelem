export const parseFlag = (argv: string[], type: string): string => {
  switch (type) {
    case 'single':
      return argv
        .map((val: string) => {
          if (!val.match(/(js|ts|cjs|ts)+$/gi) && !['-f', '--filename'].includes(val)) return val
          return 'null'
        })
        .filter((val: string) => val.match(/[(--)|(-)].*/gi) && val)
        .filter((val: string) => !val.match(/(--kind|--resource|--cmd)\b/gi) && val)
        .join(' ')
        .trim()
    case 'multiple':
      return argv
        .map((val: string) => {
          if (!val.match(/(js|ts|cjs|ts)+$/gi) && !['-f', '--filename'].includes(val)) return val
          return 'null'
        })
        .filter((val: string) => val.match(/[(--)|(-)].*/gi) && val)
        .filter((val: string) => !val.match(/(--cwd)\b/gi) && val)
        .join(' ')
        .trim()
  }
}

// console.log(
//   parseFlag(['nyelem', 'create', '--kind=pods', '--all=true'], 'single')
//   // .split(' ')
//   // .filter((val: string) => !val.match(/(--kind|--value)\b/gi) && val)
//   // .join(' ')
// )

// return argv
//   .join(' ')
//   .match(/(js|ts|cjs|ts).*/gi)
//   .join(' ')
//   .replace(/\.*(js|ts|cjs|ts)/gi, '')
//   .trim()
