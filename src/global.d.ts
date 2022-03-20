type Updater<T, K extends keyof T> = Omit<Partial<T>, K> & Pick<T, K>;
type Creater<T> = Omit<T, 'createdAt' | 'updatedAt' | 'deletedAt' | 'id'>;
type Override<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
