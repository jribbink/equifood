import { ComponentLoader } from 'adminjs';
import path from 'path';

const componentLoader = new ComponentLoader();
const originalAdd = componentLoader.add;
componentLoader.add = ((
  name: string,
  filepath: string,
  caller?: string
): string => {
  return originalAdd.bind(componentLoader)(
    name,
    path.resolve(process.cwd(), __dirname, filepath),
    caller
  );
}).bind(componentLoader);

const Components = {
  //MyInput: componentLoader.add('MyInput', './my-input'),
  // other custom components
};

const Pages = {
  ReportPage: componentLoader.add('ReportPage', './pages/report'),
  // other custom components
};

export { componentLoader, Components, Pages };
