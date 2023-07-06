import { Command } from 'commander'
import figlet from 'figlet'

import { Basic } from '../helps/basic'
import { Intermediate } from '../helps/intermediate'
import { Advanced } from '../helps/advanced'

export class NyelemHelpMenu {
  private program: Command
  private basic: InstanceType<typeof Basic>
  private intermediate: InstanceType<typeof Intermediate>
  private advanced: InstanceType<typeof Advanced>

  constructor(program: Command) {
    this.program = program
    this.basic = new Basic(this.program)
    this.intermediate = new Intermediate(this.program)
    this.advanced = new Advanced(this.program)
  }

  private asciTextMenuHelp(): void {
    figlet('Nyelem', (err: any, asciiText: string | undefined): void => {
      if (!err) {
        this.program.addHelpText('beforeAll', `${asciiText} \n`)
        this.program.version('nyelem v0.0.1', '-v, --version', 'show version cli app')

        this.basic.handler()
        this.intermediate.handler()
        this.advanced.handler()

        this.program.usage('[command] [options]')
        this.program.parse(process.argv)
        this.program.help()
      }
    })
  }

  public handler(): void {
    this.asciTextMenuHelp()
  }
}
