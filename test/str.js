
'use strict';

const chai = require('chai');
const Str = require('../src/str');
const promises = require('chai-as-promised');

/**
 * @name str:
 *   Unit tests for the Str utilities library.
 */
describe('str', () => {

  let should = chai.should();
  chai.use(promises);

  it('parses single items', () => {
    Str.split_delimited('')
      .should.deep.equal([ ]);
    Str.split_delimited(' ')
      .should.deep.equal([ '' ]);
    Str.split_delimited(' foo ')
      .should.deep.equal([ 'foo' ]);
    Str.split_delimited(' \\f\\o\\o ')
      .should.deep.equal([ 'foo' ]);
  });

  it('parses simple pairs', () => {
    Str.split_delimited('= ')
      .should.deep.equal([ '', '' ]);
    Str.split_delimited(' = ')
      .should.deep.equal([ '', '' ]);
    Str.split_delimited('=\\=\\\\')
      .should.deep.equal([ '', '=\\' ]);
    Str.split_delimited('foo\\=bar')
      .should.deep.equal([ 'foo=bar' ]);
    Str.split_delimited('foo\\bar=')
      .should.deep.equal([ 'foobar', '' ]);
    Str.split_delimited('foo=bar')
      .should.deep.equal([ 'foo', 'bar' ]);
    Str.split_delimited('foo = bar')
      .should.deep.equal([ 'foo', 'bar' ]);
    Str.split_delimited('foo\\ =\\ bar')
      .should.deep.equal([ 'foo', 'bar' ]);
    Str.split_delimited('foo\\==\\=bar')
      .should.deep.equal([ 'foo=', '=bar' ]);
    Str.split_delimited('foo\\===\\=bar')
      .should.deep.equal([ 'foo=', '', '=bar' ]);
    Str.split_delimited('foo\\====\\=bar')
      .should.deep.equal([ 'foo=', '', '', '=bar' ]);
    Str.split_delimited('foo\\\\')
      .should.deep.equal([ 'foo\\' ]);
    Str.split_delimited('foo\\\\=bar\\')
      .should.deep.equal([ 'foo\\', 'bar' ]);
    Str.split_delimited('\\\\\\==\\=\\\\')
      .should.deep.equal([ '\\=', '=\\' ]);
  });

  it('parses tuples', () => {
    Str.split_delimited('foo=bar=baz\\')
      .should.deep.equal([ 'foo', 'bar', 'baz' ]);
    Str.split_delimited('foo \\ =bar \\ =\\ba\\z\\')
      .should.deep.equal([ 'foo', 'bar', 'baz' ]);
  });

  it('obeys strict mode', () => {
    (() => Str.split_delimited('\\', '=', '\\', true))
      .should.throw(Error);
    (() => Str.split_delimited('\\\\\\', '=', '\\', true))
      .should.throw(Error);
    Str.split_delimited('  \\\\', '=', '\\', true)
      .should.deep.equal([ '\\' ]);
  });

});

