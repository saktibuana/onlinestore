import React, { lazy, Suspense } from 'react';

/**
 * KISS Loadable Component Factory (React 19 Native)
 *
 * Implements a lightweight, robust drop-in replacement for @loadable/component
 * leveraging React.lazy and Suspense. Eliminates the legacy React 16 context/hook
 * dispatcher issues ("Cannot read properties of null (reading 'useState')")
 * in React 19 while maintaining identical API contracts.
 */
export default function loadable(loadFn, options = {}) {
  const LazyComponent = lazy(loadFn);
  const fallback = options.fallback !== undefined ? options.fallback : null;

  const LoadableComponent = (props) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );

  LoadableComponent.preload = () => loadFn();
  LoadableComponent.load = () => loadFn();
  LoadableComponent.displayName = 'LoadableComponent';

  return LoadableComponent;
}
