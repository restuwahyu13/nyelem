import shell from 'shelljs'

export const execCommand = (command: string): void => {
  shell.exec(command)
}
