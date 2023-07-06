import ejs from 'ejs'
import nunjucks from 'nunjucks'
import jrepair from 'jsonrepair'
import { NyelemError } from '../utils/customError'

export enum TemplateEngine {
  ejs = 'ejs',
  njk = 'njk'
}

export class NyelemTemplate {
  private template: string

  constructor() {
    this.template = ''
  }

  private setTemplate(input: string, data: any, engine: 'ejs' | 'njk'): string {
    switch (engine) {
      case 'ejs':
        this.template = ejs.render(input, data, { beautify: true, rmWhitespace: true })
        return this.template

      case 'njk':
        this.template = nunjucks.renderString(input, data)
        return this.template

      default:
        throw new NyelemError('Template engine only support ejs or nunjucks')
    }
  }

  /**
   *
   * Rendering data from template engine like ejs or nunjucks
   * @param input string
   * @param data any
   * @param engine string
   */
  render(input: string, data: any, engine: TemplateEngine): void {
    this.template = this.setTemplate(input, data, engine)
    if (Array.isArray(this.template.match(/(<([^>]+)>)/gi))) throw new NyelemError('Template syntax cannot include HTML tags')

    const jsonParse: Record<string, any> | Record<string, any>[] = JSON.parse(jrepair(this.template.replace(/(<([^>]+)>)/gi, '')))

    process.stdout.write(JSON.stringify(jsonParse))
    process.stdout.write('\n')
  }
}

// const kubeDeployment = `
// {# Deployment Teritory #}
// {
// 	 apiVersion: "{{ version }}"
// 	 kind: "{{ kind }}"
// 	 metadata: {
// 		 name: "{{ label }}"
// 		 labels: {
// 			 name: "{{ label }}"
// 		 }
// 	 }
// 	 spec: {
// 			 replicas: {{ deployment.replicas }}
// 			 selector: {
// 				 matchLabels: {
// 					 name: "{{ label }}"
// 			 }
// 			}
// 			 template: {
// 				 metadata: {
// 				 labels: {
// 					 name: "{{ label }}"
// 				 }
// 				}
// 			 spec: {
// 				 containers: [{
// 					 name: "{{ label }}"
// 					 image: "{{ deployment.image }}"
// 					 imagePullPolicy: "{{ deployment.policy }}"
// 					 ports: [{ containerPort:  {{ port }} }]
// 					 restartPolicy: "{{ deployment.policy }}"
// 				 }]
// 			}
// 	 }
//  }
// `

// new NyelemTemplate().render(
//   kubeDeployment,
//   {
//     version: 'apps/v1',
//     kind: 'Deployment',
//     label: 'role-service',
//     deployment: {
//       image: 'docker.io/705471/roles-service',
//       policy: 'Always',
//       replicas: 1
//     },
//     port: 3001
//   },
//   TemplateEngine.njk
// )
