import { Command, Option } from 'commander'

export class Basic {
  private program: Command

  constructor(program: Command) {
    this.program = program
  }

  private createMenuHelp(): void {
    this.program
      .command('create')
      .alias('cr')
      .description('Create a resource from a file or from stdin')
      .addOption(new Option('--allow-missing-template-keys=[value]:', 'If true, ignore any errors in templates when a field or map key is missing in the template. Only applies to golang and jsonpath output formats.').default(true))
      .addOption(
        new Option('--dry-run=[value]:', 'If client strategy, only print the object that would be sent, without sending it. If server strategy, submit server-side request without persisting the resource.')
          .default('none')
          .choices(['none', 'server', 'client'])
      )
      .addOption(new Option('--edit=[value]:', 'Edit the API resource before creating.').default(false))
      .addOption(new Option('--field-manager=[value]:', 'Name of the manager used to track field ownership.').default('kubectl-create'))
      .addOption(new Option('-f, --filename=<value>:', 'Filename, directory, or URL to files to use to create the resource.').default(''))
      .addOption(new Option('-o, --output=[value]:', 'Output format.').default('').choices(['json', 'yaml', 'name', 'go-template', 'go-template-file', 'template', 'templatefile', 'jsonpath', 'jsonpath-as-json', ' jsonpath-file']).default(''))
      .addOption(new Option('--raw=[value]', 'Raw URI to POST to the server.  Uses the transport specified by the kubeconfig file.').default(''))
      .addOption(new Option('-R, --recursive=[value]', 'Process the directory used in -f, --filename recursively. Useful when you want to manage related manifests  organized within the same directory.').default(false))
      .addOption(
        new Option(
          '--save-config=[value]:',
          'If true, the configuration of current object will be saved in its annotation. Otherwise, the annotation will be unchanged. This flag is useful when you want to perform kubectl apply on this object in the future.'
        ).default(false)
      )
      .addOption(new Option('-l, --selector=[value]:', `Selector (label query) to filter on, supports ' = (', ' == ', and ') != '.(e.g. -l key1=value1,key2=value2). Matching objects must satisfy all of the specified label constraints.`).default(''))
      .addOption(new Option('--show-managed-fields=[value]:', `If true, keep the managedFields when printing objects in JSON or YAML format.`).default(false))
      .addOption(new Option('--template=[value]:', 'Template string or path to template file to use when -o=go-template, -o=go-template-file. The template format is golang templates [http://golang.org/pkg/text/template/#pkg-overview].').default(''))
      .addOption(new Option('--validate=[value]:', 'Will use a schema to validate the input and fail the request if invalid.').default('strict').choices(['strict', 'warn', 'ignore', 'true', 'false']))
      .addOption(new Option('--cwd=[value]', 'current working directory config location.').default(''))
      .usage('kubectl create -f <filename> [options]')
  }

  private setMenuHelp(): void {
    this.program
      .command('set')
      .argument('[subcommand]')
      .description('Set specific features on objects')
      .addCommand(new Command('env').description('Update environment variables on a pod template').addOption(new Option('--all=[value]:', 'If true, select all resources in the namespace of the specified resource types').default(false)))
      .addCommand(new Command('image').description('Update the image of a pod template'))
      .addCommand(new Command('resources').description('Update resource requests/limits on objects with pod templates'))
      .addCommand(new Command('selector').description('Set the selector on a resource'))
      .addCommand(new Command('serviceaccount').description('Update the service account of a resource'))
      .addCommand(new Command('subject').description('Update the user, group, or service account in a role binding or cluster role binding'))
      .usage('kubectl set [subcommand] [options]')
  }

  public handler(): void {
    this.createMenuHelp()
    this.setMenuHelp()
  }
}
