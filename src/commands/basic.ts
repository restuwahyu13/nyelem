import { Command, program } from 'commander'

import { errorNotifier } from '../utils/errorNotifier'
import { execCommand } from '../utils/execCommand'
import { getValue } from '../utils/getValue'
import { parseFlag } from '../utils/parseFlag'

interface IBasic {
  argv: string[]
  bin: string
  dir: string
  flagFileExist: string[] | null
  allFiles: string[]
  filename: string
  extPattern: any
  message: string
}

export class Basic {
  private cmd: any

  private createCommand(options: IBasic): void {
    const typeFile: string = options.allFiles.length ? 'multiple' : 'single'
    this.cmd = options.flagFileExist !== null ? `-f - ${parseFlag(options.argv, typeFile)}` : parseFlag(options.argv, typeFile)

    program
      .command('create')
      .alias('cr')
      .option('--allow-missing-template-keys, --allow-missing-template-keys=[value]')
      .option('--dry-run, --dry-run=[value]')
      .option('--edit, --edit=[value]')
      .option('--field-manager, --field-manager=[value]')
      .option('-f, --filename <value>')
      .option('--filename, --filename=[value]')
      .option('-o, --output=[value]')
      .option('--output, --output=[value]')
      .option('--raw, --raw=[value]')
      .option('-R, --recursive=[value]')
      .option('--recursive, --recursive=[value]')
      .option('--save-config, --save-config=[value]')
      .option('-l, --selector, --selector=[value]')
      .option('--selector, --selector=[value]')
      .option('--show-managed-fields, --show-managed-fields=[value]')
      .option('--template, --template=[value]')
      .option('--validate, --validate=[value]')
      .option('--cwd, --cwd=[value]')
      .action(() => {
        if (Array.isArray(options.flagFileExist) && options.extPattern.test(options.filename) === false) {
          errorNotifier(options.message)
          process.exit(0)
        } else {
          if (Array.isArray(options.flagFileExist)) {
            typeFile == 'multiple' ? options.allFiles.forEach((val: string) => execCommand(`${options.bin} ${val} | kubectl create ${this.cmd}`)) : execCommand(`${options.bin} ${options.dir} | kubectl create ${this.cmd}`)
          } else {
            execCommand(`kubectl create ${this.cmd}`)
          }
        }
      })
      .on('error', (): void => {
        program.showSuggestionAfterError(true)
      })
  }

  private exposeCommand(options: IBasic): void {
    const typeFile: string = options.allFiles.length ? 'multiple' : 'single'
    const kbKind: string = getValue(options.argv, 'val', '--kind') ? getValue(options.argv, 'val', '--kind').replace(/[,]/gi, ' ') : ''
    const kbName: string = getValue(options.argv, 'val', '--resource') ? getValue(options.argv, 'val', '--resource').replace(/[,]/gi, ' ') : ''

    this.cmd = options.flagFileExist !== null ? `-f - ${parseFlag(options.argv, typeFile)}` : parseFlag(options.argv, typeFile)

    program
      .command('expose')
      .alias('exp')
      .option('-A, --all-namespaces=[value]')
      .option('--all-namespaces, --all-namespaces=[value]')
      .option('--cluster-ip, --cluster-ip=[value]')
      .option('--dry-run, --dry-run=[value]')
      .option('--field-manager, --field-manager=[value]')
      .option('-f, --filename [value]')
      .option('--filename, --filename=[value]')
      .option('--load-balancer-ip, --load-balancer-ip=[value]')
      .option('--name, --name=[value]')
      .option('-o, --output=[value]')
      .option('--output, --output=[value]')
      .option('--override-type, --override-type=[value]')
      .option('--overrides, --overrides=[value]')
      .option('--port, --port=[value]')
      .option('--protocol, --protocol=[value]')
      .option('-R, --recursive=[value]')
      .option('--recursive, --recursive=[value]')
      .option('--save-config, --save-config=[value]')
      .option('--selector, --selector=[value]')
      .option('--session-affinity, --session-affinity=[value]')
      .option('--show-managed-fields, --show-managed-fields=[value]')
      .option('--target-port, --target-port=[value]')
      .option('--template, --template=[value]')
      .option('--type, --type=[value]')
      .option('--kind, --kind=[value]')
      .option('--resource, --resource=[value]')
      .option('--cwd, --cwd=[value]')
      .action((): void => {
        if (Array.isArray(options.flagFileExist) && options.extPattern.test(options.filename) === false) {
          errorNotifier(options.message)
          process.exit(0)
        } else {
          if (Array.isArray(options.flagFileExist)) {
            typeFile == 'multiple' ? options.allFiles.forEach((val: string) => execCommand(`${options.bin} ${val} | kubectl expose ${this.cmd}`)) : execCommand(`${options.bin} ${options.dir} | kubectl expose ${this.cmd}`)
          } else {
            if (kbKind && kbName) execCommand(`kubectl expose ${kbKind} ${kbName} ${this.cmd}`)
            else if (kbKind) execCommand(`kubectl expose ${kbKind} ${this.cmd}`)
            else execCommand(`kubectl expose ${this.cmd}`)
          }
        }
      })
      .on('error', (): void => {
        program.showSuggestionAfterError(true)
      })
  }

  private setCommand(options: IBasic): void {
    const typeFile: string = options.allFiles.length ? 'multiple' : 'single'
    const kbKind: string = getValue(options.argv, 'val', '--kind') ? getValue(options.argv, 'val', '--kind').replace(/[,]/gi, ' ') : ''
    const kbResource: string = getValue(options.argv, 'val', '--resource') ? getValue(options.argv, 'val', '--resource').replace(/[,]/gi, ' ') : ''

    this.cmd = options.flagFileExist !== null ? `-f - ${parseFlag(options.argv, typeFile)}` : parseFlag(options.argv, typeFile)

    program
      .command('set')
      .addCommand(
        new Command('env')
          .description('Update environment variables on a pod template')
          .option('--all', '--all=[value]')
          .option('--allow-missing-template-keys', '--allow-missing-template-keys=[value]')
          .option('-c', '--containers=[value]')
          .option('--containers', '--containers=[value]')
          .option('-e', '--env=[value]')
          .option('--env', '--env=[value]')
          .option('--field-manager', '--field-manager=[value]')
          .option('-f, --filename [value]')
          .option('--filename, --filename=[value]')
          .option('--from, --from=[value]')
          .option('--keys, --keys=[value]')
          .option('--list, --list=[value]')
          .option('--local, --local=[value]')
          .option('-o, --output=[value]')
          .option('--output, --output=[value]')
          .option('--overwrite, --overwrite=[value]')
          .option('--prefix, --prefix=[value]')
          .option('-R, --recursive=[value]')
          .option('--recursive, --recursive=[value]')
          .option('--resolve, --resolve=[value]')
          .option('-l, --selector, --selector=[value]')
          .option('--selector, --selector=[value]')
          .option('--show-managed-fields, --show-managed-fields=[value]')
          .option('--template, --template=[value]')
          .option('--kind, --kind=[value]')
          .action((): void => {
            if (Array.isArray(options.flagFileExist) && options.extPattern.test(options.filename) === false) {
              errorNotifier(options.message)
              process.exit(0)
            } else {
              if (Array.isArray(options.flagFileExist)) {
                if (kbKind && typeFile == 'multiple') options.allFiles.forEach((val: string) => execCommand(`${options.bin} ${val} | kubectl set env ${kbKind} ${this.cmd}`))
                else execCommand(`kubectl set env ${this.cmd}`)

                if (kbKind && typeFile == 'single') execCommand(`${options.bin} ${options.dir} | kubectl set env ${kbKind} ${this.cmd}`)
                else execCommand(`kubectl set env ${this.cmd}`)
              } else {
                if (kbKind) execCommand(`kubectl set env ${kbKind} ${this.cmd}`)
                else execCommand(`kubectl set env ${this.cmd}`)
              }
            }
          })
          .on('error', (): void => {
            program.showSuggestionAfterError(true)
          })
      )
      .addCommand(
        new Command('image')
          .description('Update the image of a pod template')
          .option('--all', '--all=[value]')
          .option('--allow-missing-template-keys', '--allow-missing-template-keys=[value]')
          .option('--dry-run, --dry-run=[value]')
          .option('--field-manager, --field-manager=[value]')
          .option('-f, --filename [value]')
          .option('--filename, --filename=[value]')
          .option('--local, --local=[value]')
          .option('-o, --output=[value]')
          .option('--output, --output=[value]')
          .option('-R, --recursive=[value]')
          .option('--recursive, --recursive=[value]')
          .option('-l, --selector, --selector=[value]')
          .option('--selector, --selector=[value]')
          .option('--show-managed-fields, --show-managed-fields=[value]')
          .option('--template, --template=[value]')
          .option('--kind, --kind=[value]')
          .option('--resource, --resource=[value]')
          .action((): void => {
            if (Array.isArray(options.flagFileExist) && options.extPattern.test(options.filename) === false) {
              errorNotifier(options.message)
              process.exit(0)
            } else {
              if (Array.isArray(options.flagFileExist)) {
                if (kbKind && kbResource && typeFile == 'multiple') options.allFiles.forEach((val: string) => execCommand(`${options.bin} ${val} | kubectl set image ${kbKind} ${kbResource} ${this.cmd}`))
                else if (kbKind && typeFile == 'multiple') options.allFiles.forEach((val: string) => execCommand(`${options.bin} ${val} | kubectl set image ${kbKind} ${this.cmd}`))
                else execCommand(`kubectl set image ${this.cmd}`)

                if (kbKind && kbResource && typeFile == 'single') execCommand(`${options.bin} ${options.dir} | kubectl set image ${kbKind} ${kbResource} ${this.cmd}`)
                else if (kbKind && typeFile == 'single') execCommand(`${options.bin} ${options.dir} | kubectl set image ${kbKind} ${this.cmd}`)
                else execCommand(`kubectl set image ${this.cmd}`)
              } else {
                if (kbKind && kbResource) execCommand(`kubectl set image ${kbKind} ${kbResource} ${this.cmd}`)
                else if (kbKind) execCommand(`kubectl set image ${kbKind} ${this.cmd}`)
                else execCommand(`kubectl set image ${this.cmd}`)
              }
            }
          })
          .on('error', (): void => {
            program.showSuggestionAfterError(true)
          })
      )
      .addCommand(
        new Command('resources')
          .description('Update resource requests/limits on objects with pod templates')
          .option('--all', '--all=[value]')
          .option('--allow-missing-template-keys', '--allow-missing-template-keys=[value]')
          .option('-c', '--containers=[value]')
          .option('--containers', '--containers=[value]')
          .option('--dry-run, --dry-run=[value]')
          .option('--field-manager, --field-manager=[value]')
          .option('-f, --filename [value]')
          .option('--filename, --filename=[value]')
          .option('--limits, --limits=[value]')
          .option('--local, --local=[value]')
          .option('-o, --output=[value]')
          .option('--output, --output=[value]')
          .option('-R, --recursive=[value]')
          .option('--recursive, --recursive=[value]')
          .option('--requests, --requests=[value]')
          .option('-l, --selector, --selector=[value]')
          .option('--selector, --selector=[value]')
          .option('--show-managed-fields, --show-managed-fields=[value]')
          .option('--template, --template=[value]')
          .option('--kind, --kind=[value]')
          .option('--resource, --resource=[value]')
          .action((): void => {
            if (Array.isArray(options.flagFileExist) && options.extPattern.test(options.filename) === false) {
              errorNotifier(options.message)
              process.exit(0)
            } else {
              if (Array.isArray(options.flagFileExist)) {
                if (kbKind && kbResource && typeFile == 'multiple') options.allFiles.forEach((val: string) => execCommand(`${options.bin} ${val} | kubectl set resources ${kbKind} ${kbResource} ${this.cmd}`))
                else if (kbKind && typeFile == 'multiple') options.allFiles.forEach((val: string) => execCommand(`${options.bin} ${val} | kubectl set resources ${kbKind} ${this.cmd}`))
                else execCommand(`kubectl set resources ${this.cmd}`)

                if (kbKind && kbResource && typeFile == 'single') execCommand(`${options.bin} ${options.dir} | kubectl set resources ${kbKind} ${kbResource} ${this.cmd}`)
                else if (kbKind && typeFile == 'single') execCommand(`${options.bin} ${options.dir} | kubectl set resources ${kbKind} ${this.cmd}`)
                else execCommand(`kubectl set resources ${this.cmd}`)
              } else {
                if (kbKind && kbResource) execCommand(`kubectl set resources ${kbKind} ${kbResource} ${this.cmd}`)
                else if (kbKind) execCommand(`kubectl set resources ${kbKind} ${this.cmd}`)
                else execCommand(`kubectl set resources ${this.cmd}`)
              }
            }
          })
          .on('error', (): void => {
            program.showSuggestionAfterError(true)
          })
      )
      .addCommand(
        new Command('selector')
          .description('Set the selector on a resource')
          .option('--all', '--all=[value]')
          .option('--allow-missing-template-keys', '--allow-missing-template-keys=[value]')
          .option('--dry-run, --dry-run=[value]')
          .option('--field-manager, --field-manager=[value]')
          .option('-f, --filename [value]')
          .option('--filename, --filename=[value]')
          .option('--local, --local=[value]')
          .option('-o, --output=[value]')
          .option('--output, --output=[value]')
          .option('-R, --recursive=[value]')
          .option('--recursive, --recursive=[value]')
          .option('--resource-version, --resource-version=[value]')
          .option('--show-managed-fields, --show-managed-fields=[value]')
          .option('--template, --template=[value]')
          .option('--kind, --kind=[value]')
          .option('--resource, --resource=[value]')
          .action((): void => {
            if (Array.isArray(options.flagFileExist) && options.extPattern.test(options.filename) === false) {
              errorNotifier(options.message)
              process.exit(0)
            } else {
              if (Array.isArray(options.flagFileExist)) {
                if (kbKind && kbResource && typeFile == 'multiple') options.allFiles.forEach((val: string) => execCommand(`${options.bin} ${val} | kubectl set selector ${kbKind} ${kbResource} ${this.cmd}`))
                else if (kbKind && typeFile == 'multiple') options.allFiles.forEach((val: string) => execCommand(`${options.bin} ${val} | kubectl set selector ${kbKind} ${this.cmd}`))
                else execCommand(`kubectl set selector ${this.cmd}`)

                if (kbKind && kbResource && typeFile == 'single') execCommand(`${options.bin} ${options.dir} | kubectl set selector ${kbKind} ${kbResource} ${this.cmd}`)
                else if (kbKind && typeFile == 'single') execCommand(`${options.bin} ${options.dir} | kubectl set selector ${kbKind} ${this.cmd}`)
                else execCommand(`kubectl set selector ${this.cmd}`)
              } else {
                if (kbKind && kbResource) execCommand(`kubectl set selector ${kbKind} ${kbResource} ${this.cmd}`)
                else if (kbKind) execCommand(`kubectl set selector ${kbKind} ${this.cmd}`)
                else execCommand(`kubectl set selector ${this.cmd}`)
              }
            }
          })
          .on('error', (): void => {
            program.showSuggestionAfterError(true)
          })
      )
      .addCommand(
        new Command('serviceaccount')
          .alias('sa')
          .description('Update the service account of a resource')
          .option('--all', '--all=[value]')
          .option('--allow-missing-template-keys', '--allow-missing-template-keys=[value]')
          .option('--dry-run, --dry-run=[value]')
          .option('--field-manager, --field-manager=[value]')
          .option('-f, --filename [value]')
          .option('--filename, --filename=[value]')
          .option('--local, --local=[value]')
          .option('-o, --output=[value]')
          .option('--output, --output=[value]')
          .option('-R, --recursive=[value]')
          .option('--recursive, --recursive=[value]')
          .option('--show-managed-fields, --show-managed-fields=[value]')
          .option('--template, --template=[value]')
          .option('--kind, --kind=[value]')
          .option('--resource, --resource=[value]')
          .action((): void => {
            if (Array.isArray(options.flagFileExist) && options.extPattern.test(options.filename) === false) {
              errorNotifier(options.message)
              process.exit(0)
            } else {
              if (Array.isArray(options.flagFileExist)) {
                if (kbKind && kbResource && typeFile == 'multiple') options.allFiles.forEach((val: string) => execCommand(`${options.bin} ${val} | kubectl set serviceaccount ${kbKind} ${kbResource} ${this.cmd}`))
                else if (kbKind && typeFile == 'multiple') options.allFiles.forEach((val: string) => execCommand(`${options.bin} ${val} | kubectl set serviceaccount ${kbKind} ${this.cmd}`))
                else execCommand(`kubectl set serviceaccount ${this.cmd}`)

                if (kbKind && kbResource && typeFile == 'single') execCommand(`${options.bin} ${options.dir} | kubectl set serviceaccount ${kbKind} ${kbResource} ${this.cmd}`)
                else if (kbKind && typeFile == 'single') execCommand(`${options.bin} ${options.dir} | kubectl set serviceaccount ${kbKind} ${this.cmd}`)
                else execCommand(`kubectl set serviceaccount ${this.cmd}`)
              } else {
                if (kbKind && kbResource) execCommand(`kubectl set serviceaccount ${kbKind} ${kbResource} ${this.cmd}`)
                else if (kbKind) execCommand(`kubectl set serviceaccount ${kbKind} ${this.cmd}`)
                else execCommand(`kubectl set serviceaccount ${this.cmd}`)
              }
            }
          })
          .on('error', (): void => {
            program.showSuggestionAfterError(true)
          })
      )
      .addCommand(
        new Command('subject')
          .description('Update the user, group, or service account in a role binding or cluster role binding')
          .option('--all', '--all=[value]')
          .option('--allow-missing-template-keys', '--allow-missing-template-keys=[value]')
          .option('--dry-run, --dry-run=[value]')
          .option('--field-manager, --field-manager=[value]')
          .option('-f, --filename [value]')
          .option('--filename, --filename=[value]')
          .option('--group, --group=[value]')
          .option('--local, --local=[value]')
          .option('-o, --output=[value]')
          .option('--output, --output=[value]')
          .option('-R, --recursive=[value]')
          .option('--recursive, --recursive=[value]')
          .option('-l, --selector=[value]')
          .option('--selector, --selector=[value]')
          .option('--serviceaccount, --serviceaccount=[value]')
          .option('--show-managed-fields, --show-managed-fields=[value]')
          .option('--template, --template=[value]')
          .option('--kind, --kind=[value]')
          .option('--resource, --resource=[value]')
          .action((): void => {
            if (Array.isArray(options.flagFileExist) && options.extPattern.test(options.filename) === false) {
              errorNotifier(options.message)
              process.exit(0)
            } else {
              if (Array.isArray(options.flagFileExist)) {
                if (kbKind && kbResource && typeFile == 'multiple') options.allFiles.forEach((val: string) => execCommand(`${options.bin} ${val} | kubectl set subject ${kbKind} ${kbResource} ${this.cmd}`))
                else if (kbKind && typeFile == 'multiple') options.allFiles.forEach((val: string) => execCommand(`${options.bin} ${val} | kubectl set subject ${kbKind} ${this.cmd}`))
                else execCommand(`kubectl set subject ${this.cmd}`)

                if (kbKind && kbResource && typeFile == 'single') execCommand(`${options.bin} ${options.dir} | kubectl set subject ${kbKind} ${kbResource} ${this.cmd}`)
                else if (kbKind && typeFile == 'single') execCommand(`${options.bin} ${options.dir} | kubectl set subject ${kbKind} ${this.cmd}`)
                else execCommand(`kubectl set subject ${this.cmd}`)
              } else {
                if (kbKind && kbResource) execCommand(`kubectl set subject ${kbKind} ${kbResource} ${this.cmd}`)
                else if (kbKind) execCommand(`kubectl set subject ${kbKind} ${this.cmd}`)
                else execCommand(`kubectl set subject ${this.cmd}`)
              }
            }
          })
          .on('error', (): void => {
            program.showSuggestionAfterError(true)
          })
      )
  }

  public handler(options: IBasic): void {
    this.createCommand(options)
    this.exposeCommand(options)
    this.setCommand(options)
  }
}
