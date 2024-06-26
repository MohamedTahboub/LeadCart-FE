module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "extends": ["react-app", "eslint:recommended"],
  "parserOptions": {
    "ecmaVersion": 2017
  },
  "rules": {
    "indent": ["error", 2, { "ignoredNodes": ["TemplateLiteral"] }],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "no-mixed-spaces-and-tabs": 0,
    "react/jsx-closing-bracket-location": [2, "tag-aligned"],
    "function-paren-newline": [2, "multiline"],
    "import/imports-first": 0,
    "import/newline-after-import": 0,
    "import/no-dynamic-require": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-named-as-default": 0,
    "import/prefer-default-export": 0,
    "comma-dangle": ["error", "never"],
    "no-cond-assign": ["error", "always"],
    "no-control-regex": "error",
    "no-dupe-args": "error",
    "no-dupe-keys": "error",
    "no-duplicate-case": "error",
    "no-empty": "error",
    "no-empty-character-class": "error",
    "no-ex-assign": "error",
    "no-extra-boolean-cast": "error",
    "no-func-assign": "error",
    "no-inner-declarations": ["error", "functions"],
    "no-invalid-regexp": "error",
    "no-irregular-whitespace": "error",
    "no-negated-in-lhs": "error",
    "no-obj-calls": "error",
    "no-regex-spaces": "error",
    "no-sparse-arrays": "error",
    "no-unexpected-multiline": "error",
    "no-unreachable": "error",
    "use-isnan": "error",
    "valid-jsdoc": "error",
    "valid-typeof": "error",
    "array-callback-return": "error",
    "curly": ["error", "multi-or-nest", "consistent"],
    "dot-location": ["error", "property"],
    "dot-notation": "error",
    "eqeqeq": ["error", "smart"],
    "no-caller": "error",
    "no-empty-pattern": "error",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-fallthrough": "error",
    "no-floating-decimal": "error",
    "no-implied-eval": "error",
    "no-invalid-this": 0,
    "no-iterator": "error",
    "no-labels": "error",
    "no-lone-blocks": "error",
    "no-loop-func": "error",
    "no-multi-spaces": "error",
    "no-native-reassign": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-octal": "error",
    "no-octal-escape": 0,
    "no-param-reassign": "error",
    "no-proto": "error",
    "no-redeclare": "error",
    "no-return-assign": "error",
    "no-script-url": "error",
    "no-self-assign": "error",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-unused-expressions": "error",
    "no-useless-catch": 0,
    "no-prototype-builtins": 0,
    "no-restricted-globals": 0,
    "no-useless-call": "error",
    "no-useless-concat": "error",
    "no-useless-escape": "error",
    "no-void": "error",
    "no-with": "error",
    "radix": ["error", "as-needed"],
    "wrap-iife": ["error", "inside"],
    "yoda": ["error", "never", {
      "exceptRange": true
    }],
    "strict": ["error", "safe"],
    "no-delete-var": "error",
    "no-label-var": "error",
    "no-shadow-restricted-names": "error",
    "no-undef": "error",
    "no-undef-init": "error",
    "no-unused-vars": ["warn", {
      "vars": "local",
      "args": "after-used"
    }],
    "handle-callback-err": ["error", "^.(e|E)rr"],
    "no-mixed-requires": "error",
    "no-new-require": "error",
    "no-path-concat": "error",
    "no-process-exit": "error",
    "array-bracket-spacing": ["error", "never"],
    "block-spacing": ["error", "never"],
    "brace-style": ["error", "1tbs", {
      "allowSingleLine": true
    }],
    "comma-spacing": "error",
    "computed-property-spacing": "error",
    "consistent-this": ["error", "that"],
    "eol-last": "error",
    "jsx-quotes": ["error", "prefer-single"],
    "key-spacing": ["error", {
      "beforeColon": false,
      "mode": "minimum"
    }],
    "keyword-spacing": "error",
    "max-depth": ["error", 4],
    "max-len": ["error", {
      "code": 200,
      "tabWidth": 2,
      "ignoreComments": true
    }],
    "max-nested-callbacks": ["error", 10],
    "max-params": ["error", 6],
    "max-statements-per-line": ["error", {
      "max": 2
    }],
    "new-cap": 0,
    "new-parens": "error",
    "no-array-constructor": "error",
    "no-multiple-empty-lines": ["error", {
      "max": 2,
      "maxEOF": 1
    }],
    "no-new-object": "error",
    "no-spaced-func": "error",
    "no-trailing-spaces": "error",
    "no-whitespace-before-property": "error",
    "object-curly-newline": ["error", {
      "multiline": true
    }],
    "object-curly-spacing": ["error", "always"],
    "quote-props": ["error", "consistent-as-needed"],
    "sort-imports": ["error", {
      "ignoreDeclarationSort": true
    }],
    "space-before-blocks": ["error", "always"],
    "space-before-function-paren": ["error", "always"],
    "space-in-parens": ["error", "never"],
    "space-infix-ops": "error",
    "arrow-spacing": "error",
    "constructor-super": "error",
    "no-class-assign": "error",
    "no-useless-constructor": "error",
    "react/prefer-stateless-function": 0,
    "no-var": "error",
    "prefer-arrow-callback": "error",
    "prefer-template": "error",
    "arrow-parens": ["error", "always"],
    "prefer-const": "error",
    "require-yield": "error",
    "react/no-danger": 0,
    "react/no-direct-mutation-state": 2,
    "react/no-multi-comp": [2, {
      "ignoreStateless": true
    }],
    "react/no-unknown-property": 2,
    "react/react-in-jsx-scope": 2,
    "react/self-closing-comp": 2,
    "react/sort-comp": 2,
    "react/jsx-wrap-multilines": 2,
    "react/jsx-boolean-value": 2,
    "react/jsx-curly-spacing": 2,
    "react/jsx-equals-spacing": 2,
    "react/jsx-max-props-per-line": [2, {
      "maximum": 4
    }],
    "react/jsx-no-duplicate-props": 2,
    "react/jsx-no-undef": 2,
    "react/jsx-pascal-case": 0,
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 2,
    "react/jsx-filename-extension": 0,
    "react/destructuring-assignment": "warn",
    "jsx-a11y/no-static-element-interactions": 0,
    "no-nested-ternary": 0,
    "react-hooks/exhaustive-deps": 0
  }
}
