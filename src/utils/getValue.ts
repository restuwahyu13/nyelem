import { NyelemError } from './customError'

export const getValue = (argv: string[], type: string, target?: string): string => {
  switch (type) {
    case 'dir':
      const dir: string[] | null = argv.join(' ').match(/(--cwd)\b.*/gi)
      return dir !== null
        ? dir
            .join(' ')
            .replace(/(\s).*/gi, '')
            .split('=')[1]
            .replace(/\.*(')/gi, '')
        : 'default'

    case 'val':
      const pattern: RegExp = new RegExp('(' + target + ').*', 'gi')
      const val: string[] | null = argv.join(' ').match(pattern)
      return val !== null
        ? val
            .join(' ')
            .replace(/(\s).*/gi, '')
            .split('=')[1]
            .replace(/\.*(')/gi, '')
        : ''

    case 'file':
      const file: string[] | null = argv.join(' ').match(/[a-z/*]+\.*(js|cjs|mjs|ts)\b/gi)
      return file !== null ? file[0] : 'default.yml'

    default:
      throw new NyelemError('Get value type not exist')
  }
}

// console.log(getValue(['nyelem', 'create', '--cwd=kubernetes', '-f', '*.js'], 'val', '--cwd'))
