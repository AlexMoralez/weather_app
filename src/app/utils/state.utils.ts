/**
 * Weather state management utilities
 */
export interface WeatherStateItem<T = any> {
  data?: T;
  loading: boolean;
  error?: string;
}

/**
 * Creates an initial loading state
 */
export function createLoadingState<T>(): WeatherStateItem<T> {
  return {
    loading: true,
    error: undefined,
    data: undefined
  };
}

/**
 * Creates a success state with data
 */
export function createSuccessState<T>(data: T): WeatherStateItem<T> {
  return {
    loading: false,
    error: undefined,
    data
  };
}

/**
 * Creates an error state
 */
export function createErrorState<T>(error: string): WeatherStateItem<T> {
  return {
    loading: false,
    error,
    data: undefined
  };
}

/**
 * Updates multiple state items with loading state
 */
export function setMultipleLoading<T>(
  states: Map<string, WeatherStateItem<T>>,
  keys: string[]
): Map<string, WeatherStateItem<T>> {
  const newStates = new Map(states);
  keys.forEach(key => {
    newStates.set(key, createLoadingState<T>());
  });
  return newStates;
}

/**
 * Batch update multiple states
 */
export function updateMultipleStates<T>(
  states: Map<string, WeatherStateItem<T>>,
  updates: { key: string; state: WeatherStateItem<T> }[]
): Map<string, WeatherStateItem<T>> {
  const newStates = new Map(states);
  updates.forEach(({ key, state }) => {
    newStates.set(key, state);
  });
  return newStates;
}
