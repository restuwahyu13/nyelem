import { Command, Option } from 'commander'

export class Intermediate {
  private program: Command

  constructor(program: Command) {
    this.program = program
  }

  private getMenuHelp(): void {
    this.program
      .command('get')
      .description('Display one or many resources')
      .addOption(new Option('-A, --all-namespaces=[value]:', 'If present, list the requested object(s) across all namespaces. Namespace in current context is ignored even if specified with --resourcespace.').default(false))
      .addOption(new Option('--allow-missing-template-keys=[value]', 'If true, ignore any errors in templates when a field or map key is missing in the template. Only applies to golang and jsonpath output formats.').default(true))
      .addOption(new Option('--chunk-size=[value]', 'Return large lists in chunks rather than all at once. Pass 0 to disable. This flag is beta and may change in the future.').default('none').default(500))
      .addOption(
        new Option('--field-selector=[value]', "Selector (field query) to filter on, supports '=', '==', and '!='.(e.g. --field-selector  key1=value1,key2=value2). The server only supports a limited number of field queries per type.").default('')
      )
      .addOption(new Option('-f, --filename=[value]:', 'Filename identifying the resource to get from a server.').default(''))
      .addOption(new Option('--ignore-not-found=[value]:', 'If the requested object does not exist the command will return exit code 0.').default(false))
      .addOption(
        new Option('-L, --label-columns=[value]', 'Accepts a comma separated list of labels that are going to be presented as columns. Names are case-sensitive. You can also use multiple flag options like -L label1 -L label2...').default([])
      )
      .addOption(new Option('--no-headers=[value]', "When using the default or custom-column output format, don't print headers (default print headers).").default(false))
      .addOption(new Option('-o, --output=[value]:', 'Output format.').choices(['json', 'yaml', 'name', 'go-template', 'go-template-file', 'template', 'templatefile', 'jsonpath', 'jsonpath-as-json', ' jsonpath-file']))
      .addOption(new Option('--output-watch-events=[value]:', 'Output watch event objects when --watch or --watch-only is used. Existing objects are output as initial ADDED events.').default(false))
      .addOption(new Option('--raw=[value]:', 'Raw URI to request from the server.  Uses the transport specified by the kubeconfig file.').default(''))
      .addOption(new Option('-R, --recursive=[value]:', 'Process the directory used in -f, --filename recursively. Useful when you want to manage related manifests organized within the same directory').default(false))
      .addOption(new Option('-l, --selector=[value]', "Selector (label query) to filter on, supports '=', '==', and '!='.(e.g. -l key1=value1,key2=value2). Matching objects must satisfy all of the specified label constraints.").default(''))
      .addOption(new Option('--server-print=[value]', 'If true, have the server return the appropriate table output. Supports extension APIs and CRDs.').default(true))
      .addOption(new Option('--show-kind=[value]:', 'If present, list the resource type for the requested object(s).').default(false))
      .addOption(new Option('--show-labels=[value]:', 'When printing, show all labels as the last column (default hide labels column)').default(false))
      .addOption(new Option('--show-managed-fields=[value]:', 'If true, keep the managedFields when printing objects in JSON or YAML format.').default(false))
      .addOption(
        new Option(
          '--sort-by=[value]:',
          `If non-empty, sort list types using this field specification.  The field specification is expressed as a JSONPath expression (e.g. '{.metadata.name}'). The field in the API resource specified by this JSONPath expression must be an integer or a string`
        ).default('')
      )
      .addOption(new Option('--subresource=[value]:', 'If specified, gets the subresource of the requested object. Must be one of [status scale]. This flag is alpha and may change in the future.').default(''))
      .addOption(new Option('--template=[value]:', 'Template string or path to template file to use when -o=go-template, -o=go-template-file. The template format is golang templates [http://golang.org/pkg/text/template/#pkg-overview].').default(''))
      .addOption(new Option('-w, --watch=[value]:', 'After listing/getting the requested object, watch for changes.').default(false))
      .addOption(new Option('--watch-only=[false]:', 'Watch for changes to the requested object(s), without listing/getting first.').default(false))
      .addOption(new Option('--kind=[value]', 'get specific kind type for this resource.').default(''))
      .addOption(new Option('--resource=[value]', 'get specific name for this resource.').default(''))
      .addOption(new Option('--cwd=[value]', 'current working directory config location.').default('')).usage(`kubectl get
      [(-o|--output=)json|yaml|name|go-template|go-template-file|template|templatefile|jsonpath|jsonpath-as-json|jsonpath-file|custom-columns|custom-columns-file|wide]
      (TYPE[.VERSION][.GROUP] [NAME | -l label] | TYPE[.VERSION][.GROUP]/NAME ...) [flags] [options]`)
  }

  private deleteMenuHelp(): void {
    this.program
      .command('delete')
      .alias('del')
      .description('Delete resources by file names, stdin, resources and names, or by resources and label selector')
      .addOption(new Option('--all=[value]:', 'Delete all resources, in the namespace of the specified resource types.').default(false))
      .addOption(new Option('-A, --all-namespaces=[value]:', 'If present, list the requested object(s) across all namespaces. Namespace in current context is ignored even if specified with --resourcespace.').default(false))
      .addOption(new Option('--cascade=[value]:', 'Selects the deletion cascading strategy for the dependents (e.g. Pods created by a ReplicationController). Defaults to background.').choices(['background', 'orphan', 'foreground']))
      .addOption(
        new Option('--dry-run=[value]', 'If client strategy, only print the object that would be sent, without  sending it. If server strategy, submit server-side request without persisting the resource.')
          .default('none')
          .choices(['none', 'server', 'client'])
      )
      .addOption(
        new Option('--field-selector=[value]', "Selector (field query) to filter on, supports '=', '==', and '!='.(e.g. --field-selector  key1=value1,key2=value2). The server only supports a limited number of field queries per type.").default('')
      )
      .addOption(new Option('-f, --filename=[value]:', 'containing the resource to delete.').default(''))
      .addOption(
        new Option('--force=[value]:', 'If true, immediately remove resources from API and bypass graceful deletion. Note that immediate deletion of some resources may result in inconsistency or data loss and requires confirmation.').default(false)
      )
      .addOption(
        new Option('--grace-period=[value]:', 'Period of time in seconds given to the resource to terminate gracefully. Ignored if negative. Set to 1 for immediate shutdown. Can only be set to 0 when --force is true (force deletion).').default(-1)
      )
      .addOption(new Option('--ignore-not-found=[value]:', 'Treat "resource not found" as a successful delete. Defaults to "true" when --all is specified.').default(false))
      .addOption(new Option('--now=[value]:', 'If true, resources are signaled for immediate shutdown (same as --grace-period=1).').default(false))
      .addOption(new Option('-o, --output=[value]:', 'Output mode. Use "-o name" for shorter output (resource/name).').default(''))
      .addOption(new Option('--raw=[value]:', 'Raw URI to DELETE to the server.  Uses the transport specified by the kubeconfig file.').default(''))
      .addOption(new Option('-R, --recursive=[value]:', 'Process the directory used in -f, --filename recursively. Useful when you want to manage related manifests organized within the same directory.').default(''))
      .addOption(new Option('-l, --selector=[value]', "Selector (label query) to filter on, supports '=', '==', and '!='.(e.g. -l key1=value1,key2=value2). Matching objects must satisfy all of the specified label constraints.").default(''))
      .addOption(new Option('--timeout=[value]', 'The length of time to wait before giving up on a delete, zero means determine a timeout from the size of the object').default('0s'))
      .addOption(new Option('--wait=[value]:', 'If true, wait for resources to be gone before returning. This waits for finalizers.').default(true))
      .addOption(new Option('--kind=[value]', 'get specific kind type and delete this resources.').default(''))
      .addOption(new Option('--resource=[value]', 'get specific name and delete this resources.').default(''))
      .addOption(new Option('--cwd=[value]', 'current working directory config location.').default(''))
      .usage('kubectl delete ([-f FILENAME] | TYPE [(NAME | -l label | --all)]) [options]')
  }

  public handler(): void {
    this.getMenuHelp()
    this.deleteMenuHelp()
  }
}
