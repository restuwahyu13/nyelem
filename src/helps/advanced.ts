import { Command, Option } from 'commander'

export class Advanced {
  private program: Command

  constructor(program: Command) {
    this.program = program
  }

  private applyMenuHelp(): void {
    this.program
      .command('apply')
      .alias('app')
      .description('Apply a configuration to a resource by file name or stdin')
      .addOption(new Option('--all=[value]:', 'Select all resources in the namespace of the specified resource types.').default(false))
      .addOption(new Option('--allow-missing-template-keys=[value]:', 'If true, ignore any errors in templates when a field or map key is missing in the template. Only applies to golang and jsonpath output formats.').default(true))
      .addOption(new Option('--cascade=[value]:', 'Selects the deletion cascading strategy for the dependents (e.g. Pods created by a ReplicationController).').choices(['background', 'orphan', 'foreground']))
      .addOption(
        new Option('--dry-run=[value]', 'If client strategy, only print the object that would be sent, without sending it. If server strategy, submit server-side request without persisting the resource.')
          .default('none')
          .choices(['none', 'server', 'client'])
      )
      .addOption(new Option('--field-manager=[value]', 'Name of the manager used to track field ownership.').default('kubectl-client-side-apply'))
      .addOption(new Option('-f, --filename=<value>:', 'Name of the manager used to track field ownership.').default(''))
      .addOption(
        new Option('--force=[value]:', 'If true, immediately remove resources from API and bypass graceful deletion. Note that immediate deletion of some resources may result in inconsistency or data loss and requires confirmation.').default(false)
      )
      .addOption(new Option('--force-conflicts=[value]:', 'If true, server-side apply will force the changes against conflicts.').default(false))
      .addOption(
        new Option('--grace-period=[value]:', 'Period of time in seconds given to the resource to terminate gracefully. Ignored if negative. Set to 1 for immediate shutdown. Can only be set to 0 when --force is true (force deletion).').default(-1)
      )
      .addOption(new Option('--openapi-patch=[value]:', 'If true, use openapi to calculate diff when the openapi presents and the resource can be found in the openapi spec. Otherwise, fall back to use baked-in types.').choices(['false', 'true']))
      .addOption(new Option('-o, --output=[value]:', 'Output format.').choices(['json', 'yaml', 'name', 'go-template', 'go-template-file', 'template', 'templatefile', 'jsonpath', 'jsonpath-as-json', ' jsonpath-file']))
      .addOption(new Option('--overwrite=[value]:', 'Automatically resolve conflicts between the modified and live configuration by using values from the modified configuration').default(true))
      .addOption(new Option('--prune=[value]:', 'Automatically delete resource objects, that do not appear in the configs and are created by either apply or create --save-config. Should be used with either -l or --all.').default(false))
      .addOption(new Option('--prune-whitelist=[value]', 'Overwrite the default whitelist with <group/version/kind> for --prune').default([]))
      .addOption(new Option('-R, --recursive=[value]', 'Process the directory used in -f, --filename recursively. Useful when you want to manage related manifests  organized within the same directory.').default(false))
      .addOption(new Option('-l, --selector=[value]', "Selector (label query) to filter on, supports '=', '==', and '!='.(e.g. -l key1=value1,key2=value2). Matching objects must satisfy all of the specified label constraints.").default(''))
      .addOption(new Option('--server-side=[value]', 'If true, apply runs in the server instead of the client.').default(false))
      .addOption(new Option('--show-managed-fields=[value]:', 'If true, keep the managedFields when printing objects in JSON or YAML format.').default(false))
      .addOption(new Option('--template=[value]:', 'Template string or path to template file to use when -o=go-template, -o=go-template-file. The template format is golang templates [http://golang.org/pkg/text/template/#pkg-overview].').default(''))
      .addOption(new Option('--timeout=[value]', 'The length of time to wait before giving up on a delete, zero means determine a timeout from the size of the  object').default('0s'))
      .addOption(new Option('--validate=[value]:', 'Will use a schema to validate the input and fail the request if invalid.').choices(['strict', 'warn', 'ignore', 'true', 'false']))
      .addOption(new Option('--cwd=[value]', 'current working directory config location.').default(''))
      .usage('kubectl apply -f <filename> [options]')
  }

  public handler(): void {
    this.applyMenuHelp()
  }
}
