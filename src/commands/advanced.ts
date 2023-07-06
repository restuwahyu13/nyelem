import { program } from 'commander'

import { errorNotifier } from '../utils/errorNotifier'
import { execCommand } from '../utils/execCommand'
import { parseFlag } from '../utils/parseFlag'

interface IAdvanced {
  argv: string[]
  bin: string
  dir: string
  flagFileExist: string[] | null
  allFiles: string[]
  filename: string
  extPattern: any
  message: string
}

export class Advanced {
  private cmd: any

  private applyCommand(options: IAdvanced): void {
    const typeFile: string = options.allFiles.length ? 'multiple' : 'single'
    this.cmd = options.flagFileExist !== null ? `-f - ${parseFlag(options.argv, typeFile)}` : parseFlag(options.argv, typeFile)

    program
      .command('apply')
      .alias('app')
      .option('--all, --all=[value]')
      .option('--allow-missing-template-keys, --allow-missing-template-keys=[value]')
      .option('--cascade, --cascade=[value]')
      .option('--dry-run, --dry-run=[value]')
      .option('--field-manager, --field-manager=[value]')
      .option('-f, --filename <value>')
      .option('--filename, --filename=[value]')
      .option('--force, --force=[value]')
      .option('--force-conflicts, --force-conflicts=[value]')
      .option('--grace-period, --grace-period=[value]')
      .option('--openapi-patch, --openapi-patch=[value]')
      .option('-o, --output=[value]')
      .option('--output, --output=[value]')
      .option('---overwrite, ---overwrite=[value]')
      .option('--prune, --prune=[value]')
      .option('--prune-whitelist, --prune-whitelist=[value]')
      .option('-R, --recursive, --recursive=[value]')
      .option('--recursive, --recursive=[value]')
      .option('-l, --selector, --selector=[value]')
      .option('--selector, --selector=[value]')
      .option('--server-side, --server-side=[value]')
      .option('--show-managed, --show-managed=[value]')
      .option('--template, --template=[value]')
      .option('--timeout, --timeout=[value]')
      .option('--validate, --validate=[value]')
      .option('--cwd, --cwd=[value]')
      .action((): void => {
        if (Array.isArray(options.flagFileExist) && options.extPattern.test(options.filename) === false) {
          errorNotifier(options.message)
          process.exit(0)
        } else {
          if (Array.isArray(options.flagFileExist)) {
            typeFile == 'multiple' ? options.allFiles.forEach((val: string) => execCommand(`${options.bin} ${val} | kubectl apply ${this.cmd}`)) : execCommand(`${options.bin} ${options.dir} | kubectl apply ${this.cmd}`)
          } else {
            execCommand(`kubectl apply ${this.cmd}`)
          }
        }
      })
      .on('error', () => {
        program.showSuggestionAfterError(true)
      })
  }

  public handler(options: IAdvanced): void {
    this.applyCommand(options)
  }
}
