import { Route, Router } from '@solidjs/router';
import { render } from 'solid-js/web';
import { App } from '@/App';
import { GlobalContextProvider } from '@/context/GlobalContext';
import { Firebase } from '@/pages/Firebase';
import { Home } from '@/pages/Home';
import { NotFound } from '@/pages/NotFound';

/* Extend Solid JSX */
declare module 'solid-js' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    type Props<T> = { [K in keyof T as `prop:${string & K}`]?: T[K] };
    type ElementProps<T> = { [K in keyof T]: Props<T[K]> & HTMLAttributes<T[K]> };
    interface IntrinsicElements extends ElementProps<HTMLElementTagNameMap> {
      img: ImgHTMLAttributes<HTMLImageElement> & { 'prop:src'?: string | undefined };
      input: InputHTMLAttributes<HTMLInputElement> & { 'prop:indeterminate'?: boolean };
    }
  }
}

/* Enable Mock Server */
if (import.meta.env.DEV && new URLSearchParams(location.search).has('mock'))
  (await import('@/services/mock/mockServer')).createMockServer();

/* Render App & Routes */
render(
  () => (
    <GlobalContextProvider>
      <Router root={App}>
        <Route path="/" component={Home} />
        <Route path="/firebase" component={Firebase} />
        <Route path="*" component={NotFound} />
      </Router>
    </GlobalContextProvider>
  ),
  document.querySelector('body')!
);
