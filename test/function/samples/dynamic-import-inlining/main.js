export var x = 41;

import( './foo' ).then(foo => {
  console.log( foo.x );
});
