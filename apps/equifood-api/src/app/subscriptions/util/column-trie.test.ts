import { ColumnTrie } from './column-trie';

describe('column trie', () => {
  it('inserts an element with wildcards', () => {
    const trie = new ColumnTrie(['a', 'b', 'c']);
    trie.insert({ a: 'a' }, 'foobar');
    expect(trie.root).toEqual(
      new Map([['a', new Map([['*', new Map([['*', new Set(['foobar'])]])]])]])
    );
  });

  it('insert returns false if exists & true if not', () => {
    const trie = new ColumnTrie(['a', 'b', 'c']);
    expect(trie.insert({ a: 'a' }, 'foobar')).toBe(true);
    expect(trie.insert({ a: 'a' }, 'foobar')).toBe(false);
  });

  it('inserts an element without wildcards', () => {
    const trie = new ColumnTrie(['a', 'b', 'c']);
    trie.insert({ a: 'a', b: 'b', c: 'c' }, 'foobar');
    expect(trie.root).toEqual(
      new Map([['a', new Map([['b', new Map([['c', new Set(['foobar'])]])]])]])
    );
  });

  it('removes element correctly', () => {
    const trie = new ColumnTrie(['a', 'b', 'c']);
    trie.insert({ a: 'a' }, 'foobar');
    trie.insert({ a: 'a' }, 'barfoo');
    trie.remove('foobar');
    expect(trie.root).toEqual(
      new Map([['a', new Map([['*', new Map([['*', new Set(['barfoo'])]])]])]])
    );
  });

  it('removes element correctly - with cleanup', () => {
    const trie = new ColumnTrie(['a', 'b', 'c']);
    trie.insert({ a: 'a' }, 'foobar');
    trie.remove('foobar');
    expect(trie.root).toEqual(new Map());
  });

  it('looks up elements correctly', () => {
    const trie = new ColumnTrie(['a', 'b', 'c']);
    trie.insert({ a: 'a' }, 'foobar');
    expect(trie.lookup({ a: 'a', b: 'b', c: 'c' })).toEqual(
      new Set(['foobar'])
    );
  });

  it('looks up elements with deep objects correctly', () => {
    const trie = new ColumnTrie(['a', 'b', 'c', ['d', 'a']]);
    trie.insert({ a: 'a', d: { a: 'abc' } }, 'foobar');
    expect(trie.lookup({ a: 'a', b: 'b', c: 'c', d: { a: 'abc' } })).toEqual(
      new Set(['foobar'])
    );
  });

  it('looks up elements with all wildcards', () => {
    const trie = new ColumnTrie(['a', 'b', 'c']);
    trie.insert({}, 'foobar');
    expect(trie.lookup({ a: 'a', b: 'b', c: 'c' })).toEqual(
      new Set(['foobar'])
    );
  });
});
