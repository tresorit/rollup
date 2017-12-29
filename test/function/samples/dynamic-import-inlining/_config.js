var assert = require( 'assert' );
var path = require( 'path' );

module.exports = {
	description: 'Dynamic import inlining',
	options: {
		experimentalDynamicImport: true,
		plugins: [{
			resolveDynamicImport ( specifier, parent ) {
				if ( specifier === './main' )
					return path.resolve( __dirname, 'main.js' );
			}
		}]
	},
	code: function ( code ) {
		assert.equal( code.indexOf( 'import(' ), -1 );
		assert.notEqual( code.indexOf( 'Promise.resolve(' ), -1 );
	},
	exports: function ( exports ) {
		assert.deepEqual( exports, { x: 41 } );
	}
};
