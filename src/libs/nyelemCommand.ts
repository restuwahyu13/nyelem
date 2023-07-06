import { program } from 'commander'
import path from 'path'
import tg from 'tiny-glob'

import { Basic } from '../commands/basic'
import { Intermediate } from '../commands/intermediate'
import { Advanced } from '../commands/advanced'
import { NyelemHelpMenu } from './nyelemMenu'
import { getValue } from '../utils/getValue'
import { validFlag } from '../utils/validFlag'
import { optionsFlag } from '../utils/optionsFlag'

export class NyelemCommand {
  private argv: string[]
  private bin: string
  private filename: string
  private dir: string
  private flagFileExist: string[] | null
  private flagDirExist: string[] | null
  private allFiles: string[]
  private argPattern: any
  private extPattern: any
  private kubernetesFlags: string[]
  private helpCommandPattern: boolean
  private message: string
  private basic: InstanceType<typeof Basic>
  private intermediate: InstanceType<typeof Intermediate>
  private advanced: InstanceType<typeof Advanced>

  constructor() {
    this.argv = process.argv
    this.kubernetesFlags = optionsFlag()
    this.bin = 'node'
    this.allFiles = []
    this.argPattern = new RegExp(
      /(cr|exp|del|app|create|expose|run|set|explain|get|edit|delete|rollout|scale|autoscale|certificate|cluster-info|top|cordon|uncordon|drain|taint|describe|logs|attach|exec|port-forward|proxy|cp|auth|debug|diff|apply|patch|replace|wait|label|annotate|completion|alpha|api-resources|api-versions|config|plugin|version)\b/,
      'gi'
    )
    this.extPattern = /\.*(js|ts|cjs|mjs)\b/gi
    this.message = 'Ext file format only support js, cjs, mjs and ts'
    this.basic = new Basic()
    this.intermediate = new Intermediate()
    this.advanced = new Advanced()
  }

  public async command(): Promise<void> {
    this.helpCommandPattern = /(ny|-h|--help|-v|--version|help)\b/gi.test(this.argv.join(' '))
    const helpValidCommand: string[] = ['-h', '--help', '-v', '--version', 'help']

    if (this.helpCommandPattern && validFlag(helpValidCommand, this.argv)) {
      console.log('c1')
      new NyelemHelpMenu(program).handler()
    } else {
      await this.parseFileDir(this.argv)
      this.binaryExecution()
      this.handlerCommand(this.argv)
    }
  }

  private async parseFileDir(argv: string[]): Promise<void> {
    this.flagFileExist = argv.join(' ').match(/(-f|--filename)\b/g)
    this.flagDirExist = argv.join(' ').match(/(--cwd)\b/gi)

    if (Array.isArray(this.flagFileExist) && Array.isArray(this.flagDirExist)) {
      this.filename = getValue(argv, 'file')
      this.dir = getValue(argv, 'dir')
      this.allFiles = await tg(`${this.dir}/${this.filename}`)
    } else {
      this.filename = getValue(argv, 'file')
      this.dir = path.resolve(process.cwd(), this.filename)
    }
  }

  private binaryExecution(): void {
    if (Array.isArray(this.filename)) {
      const tsFile: string[] | null = this.filename.join(' ').match(this.extPattern)
      if (tsFile) this.bin = 'npx ts-node'
      else this.bin = 'node'
    } else {
      const tsFile: string[] | null = this.filename.match(this.extPattern)
      if (tsFile) this.bin = 'npx ts-node'
      else this.bin = 'node'
    }
  }

  private handlerCommand(argv: string[]): void {
    if (this.argPattern.test(argv.join(' ')) && !validFlag(this.kubernetesFlags, argv)) {
      console.log('c2')
      new NyelemHelpMenu(program).handler()
    } else {
      if (this.helpCommandPattern && !validFlag(this.kubernetesFlags, argv)) {
        console.log('c3')
        new NyelemHelpMenu(program).handler()
      } else {
        console.log('c4')
        this.basic.handler({ argv, bin: this.bin, dir: this.dir, allFiles: this.allFiles, filename: this.filename, flagFileExist: this.flagFileExist, extPattern: this.extPattern, message: this.message })
        this.intermediate.handler({ argv, bin: this.bin, dir: this.dir, allFiles: this.allFiles, filename: this.filename, flagFileExist: this.flagFileExist, extPattern: this.extPattern, message: this.message })
        this.advanced.handler({ argv, bin: this.bin, dir: this.dir, allFiles: this.allFiles, filename: this.filename, flagFileExist: this.flagFileExist, extPattern: this.extPattern, message: this.message })
      }
    }
    program.parse(argv)
  }
}
