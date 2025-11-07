/**
 * ローカルストレージを使うカスタムフック
 */

import { useState, useEffect } from "react";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../lib/utils/localStorage";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // 初期値を設定
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = getFromLocalStorage<T>(key);
    return item !== null ? item : initialValue;
  });

  // 値が変更されたらローカルストレージに保存
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      setToLocalStorage(key, valueToStore);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
