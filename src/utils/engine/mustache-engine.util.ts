import Mustache from "mustache";
import fs from "fs"
import path from "path";

export function engine(view: string, options: object, callback: Function): void {
  fs.readFile(view, ((err, data) => {
    return err ? callback(err) : callback(null, Mustache.render(data.toString(), options));
  }));
}

export function layout(view: string, options: object): string {
  const layoutPath = path.join(__dirname, '../../views/', view + '.mustache');
  return Mustache.render(fs.readFileSync(layoutPath, 'utf8'), options);
}
