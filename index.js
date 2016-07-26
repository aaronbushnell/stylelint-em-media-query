var stylelint = require("stylelint");
var styleSearch = require('style-search');

var ruleName = "tmi/em-media-query"

module.exports = stylelint.createPlugin(ruleName, function (enabled) {
  return function (root, result) {
    var validOptions = stylelint.utils.validateOptions(result, ruleName, {
      actual: enabled,
      possible: [true, false]
    })

    if (!validOptions) { return }

    var regexTest = /@media\s?\(min-width:\s?[0-9]*(px|rem|cm|%)\)/;

    root.walkAtRules(function (statement) {
      if (regexTest.test(statement.toString())) {
        stylelint.utils.report({
          ruleName: ruleName,
          result: result,
          node: statement,
          message: 'Expected "em" units for media query.'
        });
      }
    })
  }
})

module.exports.ruleName = ruleName
