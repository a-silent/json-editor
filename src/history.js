import createBrowserHistory from 'history/createBrowserHistory';

export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
})