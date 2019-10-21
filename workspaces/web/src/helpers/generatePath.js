import { generatePath as _generatePath } from 'react-router-dom';
import routes from 'routes';

export default function generatePath(routeName, ...args) {
  const path = routes[routeName] && routes[routeName].path;

  return _generatePath(path, ...args);
}
