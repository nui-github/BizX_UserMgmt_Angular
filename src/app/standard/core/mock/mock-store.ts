// In-memory CRUD helper backing the mock handlers. Mutates the seed arrays in `data/`
// directly, so create/update/delete during a session behave like a real API within that session
// (resets on page reload since it's just JS memory, not persisted).
export class MockStore<T extends Record<string, any>> {
  constructor(private items: T[], private idField: keyof T) {}

  all(): T[] {
    return this.items;
  }

  search(predicate?: (item: T) => boolean): T[] {
    return predicate ? this.items.filter(predicate) : this.items;
  }

  getById(id: unknown): T | undefined {
    return this.items.find((item) => item[this.idField] === id);
  }

  upsert(input: Record<string, any>): T {
    const id = input[this.idField as string];
    const existingIndex = this.items.findIndex((item) => item[this.idField] === id);
    if (existingIndex >= 0) {
      this.items[existingIndex] = { ...this.items[existingIndex], ...input };
      return this.items[existingIndex];
    }
    const created = {
      ...input,
      [this.idField]: id ?? `mock-${String(this.idField)}-${Date.now()}`,
    } as T;
    this.items.push(created);
    return created;
  }

  patch(id: unknown, changes: Record<string, any>): T | undefined {
    const item = this.getById(id);
    if (!item) return undefined;
    Object.assign(item, changes);
    return item;
  }

  remove(id: unknown): void {
    const index = this.items.findIndex((item) => item[this.idField] === id);
    if (index >= 0) this.items.splice(index, 1);
  }
}
