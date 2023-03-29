type TrieNode = Map<string | number, TrieNode | Set<string>>;

// Trie for matching subscriptions to entities
export class ColumnTrie {
  public root: TrieNode;
  private keyMap: Map<string, (string | number)[]> = new Map();

  constructor(private columns: (string[] | string)[]) {
    this.root = new Map();
  }

  private matchColumn(obj, column) {
    if (typeof column === 'string') {
      return obj[column];
    }

    let x = obj;
    for (const k of column) {
      x = x[k];
      if (x === undefined) break;
    }

    const value: string | number | undefined = x as any;
    return value;
  }

  insert(matcher: object, key: string) {
    let curr: TrieNode | Set<string> = this.root;
    const path: (string | number)[] = [];
    for (let i = 0; i < this.columns.length; i++) {
      if (curr instanceof Set) return false;

      const column = this.columns[i];

      // Recursively match column
      const value = this.matchColumn(matcher, column);

      if (value !== undefined) {
        if (!curr.has(value))
          curr.set(
            value,
            i === this.columns.length - 1 ? new Set() : new Map()
          );
        curr = curr.get(value);
        path.push(value);
      } else {
        if (!curr.get('*'))
          curr.set('*', i === this.columns.length - 1 ? new Set() : new Map());
        curr = curr.get('*');
        path.push('*');
      }

      if (curr === undefined) return false;
    }

    if (curr instanceof Set<string> && !curr.has(key)) {
      (curr as Set<string>).add(key);
      this.keyMap.set(key, path);
      return true;
    }

    return false;
  }

  remove(key: string) {
    const path = this.keyMap.get(key);
    let curr: TrieNode | Set<string> = this.root;
    const stack: (TrieNode | Set<string>)[] = [this.root];

    for (let i = 0; i < path.length; i++) {
      if (curr instanceof Set) return;
      curr = curr.get(path[i]);
      stack.push(curr);
    }

    (curr as Set<string>).delete(key);
    this.keyMap.delete(key);

    let prev: TrieNode | Set<string | number> = stack.pop();
    for (let i = path.length - 1; i >= 0; i--) {
      curr = stack.pop();
      if (prev.size === 0) {
        curr.delete(path[i] as string);
      }
      prev = curr;
    }
  }

  lookup(object: object): Set<string> {
    const helper = (i: number, curr: TrieNode | Set<string>): Set<string> => {
      const res = new Set<string>();
      for (; i < this.columns.length; i++) {
        if (curr instanceof Set) break;
        const column = this.columns[i];
        if (curr.has('*'))
          helper(i + 1, curr.get('*')).forEach((x) => res.add(x));

        const value = this.matchColumn(object, column);
        if (value) curr = curr.get(value);
        else break;
        if (curr === undefined) break;
      }

      if (curr instanceof Set) curr.forEach((x) => res.add(x));

      return res;
    };

    return helper(0, this.root);
  }
}
