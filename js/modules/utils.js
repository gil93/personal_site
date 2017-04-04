module.exports = {

	init: function () {

		if ( !Array.prototype.map ) {

			Array.prototype.map = function( callback, thisArg ) {

				var T, A, k;

				if ( this == null ) {

					throw new TypeError( ' this is null or not defined' );

				}

				var	O = Object( this ),
					len = O.length >>> 0
				;

				if ( typeof callback !== 'function' ) {

					throw new TypeError( callback + ' is not a function' );

				}

				if ( arguments.length > 1 ) {

					T = thisArg;

				}

				A = new Array( len );

				k = 0;

				while ( k < len ) {

					var kValue, mappedValue;

					if ( k in O ) {

						kValue = O[k];

						mappedValue = callback.call( T, kValue, k, O );

						A[k] = mappedValue;
					}

					k++;
				}

				return A;

			};

		}

		if ( !Array.prototype.filter ) {

			Array.prototype.filter = function( fun/*, thisArg*/ ) {

				'use strict';

				if ( this === void 0 || this === null) {

					throw new TypeError();

				}

				var t = Object( this );

				var len = t.length >>> 0;

				if ( typeof fun !== 'function' ) {

					throw new TypeError();

				}

				var	res = [],
					thisArg = arguments.length >= 2 ? arguments[1] : void 0
				;

					for ( var i = 0; i < len; i++ ) {

						if ( i in t ) {

						var val = t[i];

						if ( fun.call( thisArg, val, i, t ) ) {

							res.push( val );

						}

					}

				}

				return res;

			};

		}

		if ( !Array.prototype.reduce ) {

			Array.prototype.reduce = function( callback /*, initialValue*/ ) {

				'use strict';

				if ( this === null ) {

					throw new TypeError( 'Array.prototype.reduce called on null or undefined' );

				}

				if ( typeof callback !== 'function' ) {

					throw new TypeError( callback + ' is not a function' );

				}

				var t = Object( this ), len = t.length >>> 0, k = 0, value;

				if ( arguments.length == 2 ) {

					value = arguments[1];

				} else {

					while ( k < len && !( k in t ) ) {

						k++;

					}

					if ( k >= len ) {

						throw new TypeError( 'Reduce of empty array with no initial value' );

					}

					value = t[k++];

				}

				for ( ; k < len; k++ ) {

					if ( k in t ) {

						value = callback( value, t[k], k, t );

					}

				}

				return value;

		  };

		}
		// Using ES6 Object.assign polyfill for symbol support
		require( 'es6-object-assign' ).polyfill();
		// And finally, concat is widely supported so no need for a polyfill there

	}
}