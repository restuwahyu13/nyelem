import { program } from 'commander'

import { errorNotifier } from '../utils/errorNotifier'
import { execCommand } from '../utils/execCommand'
import { getValue } from '../utils/getValue'
import { parseFlag } from '../utils/parseFlag'

interface IIntermediate {
  argv: string[]
  bin: string
  dir: string
  flagFileExist: string[] | null
  allFiles: string[]
  filename: string
  extPattern: any
  message: string
}

export class Intermediate {
  private cmd: any

  private getCommand(options: IIntermediate): void {
    const typeFile: string = options.allFiles.length ? 'multiple' : 'single'
    const kbKind: string = getValue(options.argv, 'val', '--kind') ? getValue(options.argv, 'val', '--kind') : ''
    const kbName: string = getValue(options.argv, 'val', '--resource') ? getValue(options.argv, 'val', '--resource').replace(/[,]/gi, ' ') : ''

    this.cmd = options.flagFileExist !== null ? `-f - ${parseFlag(options.argv, typeFile)}` : parseFlag(options.argv, typeFile)

    program
      .command('get')
      .option('-A, --all-namespaces=[value]')
      .option('--all-namespaces, --all-namespaces=[value]')
      .option('--allow-missing-template-keys, --allow-missing-template-keys=[value]')
      .option('--chunk-size, --chunk-size=[value]')
      .option('--field-selector, --field-selector=[value]')
      .option('-f, --filename [value]')
      .option('--filename, --filename=[value]')
      .option('--ignore-not-found, --ignore-not-found=[value]')
      .option('-L, --label-columns, --label-columns=[value]')
      .option('--label-columns, --label-columns=[value]')
      .option('--no-headers, --no-headers=[value]')
      .option('-o, --output=[value]')
      .option('--output, --output=[value]')
      .option('--output-watch-events, --output-watch-events=[value]')
      .option('--raw, --raw=[value]')
      .option('-R, --recursive, --recursive=[value]')
      .option('--recursive, --recursive=[value]')
      .option('--server-print, --server-print=[value]')
      .option('--show-kind, --show-kind=[value]')
      .option('--show-labels, --show-labels=[value]')
      .option('--show-managed-fields, --show-managed-fields=[value]')
      .option('--sort-by, --sort-by=[value]')
      .option('--subresource, --subresource=[value]')
      .option('--template, --template=[value]')
      .option('-w, --watch=[value]')
      .option('--watch, --watch=[value]')
      .option('--watch-only, --watch-only=[value]')
      .option('--kind, --kind=[value]')
      .option('--resource, --resource=[value]')
      .option('--cwd, --cwd=[value]')
      .action((): void => {
        if (Array.isArray(options.flagFileExist) && options.extPattern.test(options.filename) === false) {
          errorNotifier(options.message)
          process.exit(0)
        } else {
          if (Array.isArray(options.flagFileExist)) {
            typeFile == 'multiple' ? options.allFiles.forEach((val: string) => execCommand(`${options.bin} ${val} | kubectl get ${this.cmd}`)) : execCommand(`${options.bin} ${options.dir} | kubectl get ${this.cmd}`)
          } else {
            if (kbKind && kbName) execCommand(`kubectl get ${kbKind} ${kbName} ${this.cmd}`)
            else if (kbKind) execCommand(`kubectl get ${kbKind} ${this.cmd}`)
            else execCommand(`kubectl get ${this.cmd}`)
          }
        }
      })
      .on('error', () => {
        program.showSuggestionAfterError(true)
      })
  }

  private deleteCommand(options: IIntermediate): void {
    const typeFile: string = options.allFiles.length ? 'multiple' : 'single'
    const kbKind: string = getValue(options.argv, 'val', '--kind') ? getValue(options.argv, 'val', '--kind') : ''
    const kbName: string = getValue(options.argv, 'val', '--resource') ? getValue(options.argv, 'val', '--resource').replace(/[,]/gi, ' ') : ''

    this.cmd = options.flagFileExist !== null ? `-f - ${parseFlag(options.argv, typeFile)}` : parseFlag(options.argv, typeFile)

    program
      .command('delete')
      .alias('del')
      .option('--all, --all=[value]')
      .option('-A, --all-namespaces=[value]')
      .option('--all-namespaces, --all-namespaces=[value]')
      .option('--dry-run, --dry-run=[value]')
      .option('--field-selector, --field-selector=[value]')
      .option('--force, --force=[value]')
      .option('-f, --filename [value]')
      .option('--filename, --filename=[value]')
      .option('--ignore-not-found, --ignore-not-found=[value]')
      .option('--now, --now=[value]')
      .option('-o, --output=[value]')
      .option('--output, --output=[value]')
      .option('--raw, --raw=[value]')
      .option('-R, --recursive, --recursive=[value]')
      .option('--recursive, --recursive=[value]')
      .option('-l, --selector, --selector=[value]')
      .option('--selector, --selector=[value]')
      .option('--wait, --wait=[value]')
      .option('--kind, --kind=[value]')
      .option('--resource, --resource=[value]')
      .option('--cwd, --cwd=[value]')
      .action((): void => {
        if (Array.isArray(options.flagFileExist) && options.extPattern.test(options.filename) === false) {
          errorNotifier(options.message)
          process.exit(0)
        } else {
          if (Array.isArray(options.flagFileExist)) {
            typeFile == 'multiple' ? options.allFiles.forEach((val: string) => execCommand(`${options.bin} ${val} | kubectl delete ${this.cmd}`)) : execCommand(`${options.bin} ${options.dir} | kubectl delete ${this.cmd}`)
          } else {
            if (kbKind && kbName) execCommand(`kubectl delete ${kbKind} ${kbName} ${this.cmd}`)
            else if (kbKind) execCommand(`kubectl delete ${kbKind} ${this.cmd}`)
            else execCommand(`kubectl delete ${this.cmd}`)
          }
        }
      })
      .on('error', () => {
        program.showSuggestionAfterError(true)
      })
  }

  public handler(options: IIntermediate): void {
    this.getCommand(options)
    this.deleteCommand(options)
  }
}
