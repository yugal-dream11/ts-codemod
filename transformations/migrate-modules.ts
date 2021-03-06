/**
 * Created by tushar on 23/07/18
 */

import {Transformation} from '..'
import * as ts from 'typescript'

export default class ArrayToRestParams extends Transformation<{
  modules: {
    [key: string]: string
  }
}> {
  visit(node: ts.Node): ts.VisitResult<ts.Node> {
    if (
      ts.isImportDeclaration(node) &&
      ts.isStringLiteral(node.moduleSpecifier) &&
      this.params.modules.hasOwnProperty(node.moduleSpecifier.text)
    )
      return ts.updateImportDeclaration(
        node,
        node.decorators,
        node.modifiers,
        node.importClause,
        ts.createStringLiteral(this.params.modules[node.moduleSpecifier.text])
      )
    else return node
  }
}
