# node-greglearns-helper

Little helper functions that I use all the time.

This is probably something you don't want to use -- you should write your own that does the things you want it to do the way that you like them to be.

For each project, I like to have a 'helper.js' file at the project root. In that file, I require this one, and I also add this:

```javascript
function requireFromRoot(file) {
  return require(__dirname + '/' + file)
}
```

That way, requiring project files becomes:
```javascript
var help = require('../../<whereever the project root is/helper')
var otherProjectFile = help.requireFromRoot('lib/whatever')
```

