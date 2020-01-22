/**
 * [var声明转let声明]
 * 使用前：npm install -g jscodeshift
 * 使用方法：
 * 1、预览：jscodeshift -t transform.js ./src/demo.js --dry --print
 * 2、转译：jscodeshift -t transform.js ./src/demo.js
 * 可在【https://astexplorer.net】编写代码预览效果
 * @param  {[type]} file [文件]
 * @param  {[type]} api  [文件]
 * @return {[type]}      [jscodeshift库]
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.VariableDeclaration, { kind: 'var'})
    .forEach(path => {
      const letStatement = j.variableDeclaration('let', path.node.declarations)
      j(path).replaceWith(letStatement)
    })
    .toSource();
}
