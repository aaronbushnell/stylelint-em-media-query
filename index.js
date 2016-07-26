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

    root.walkAtRules(function (statement) {
      styleSearch({
        source: statement.toString(),
        target: /@media\s?\(min-width:\s?[0-9]*(px|rem|cm)\)/,
      }, function (match, count) {
        stylelint.utils.report({
          ruleName: ruleName,
          result: result,
          node: statement,
          message: 'Expected "em" units for media query.'
        });
      });
    })
  }
})

module.exports.ruleName = ruleName
