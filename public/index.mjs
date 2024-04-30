import { readFile, writeFile } from "node:fs";
import { promisify } from "node:util";

(async () => {
  const data = await promisify(readFile)("./public/lib_deps.json", "utf-8");
  const d = JSON.parse(data);
  d.lib_deps.forEach((item) => {
    ["selects", "implies", "depends_ons"].forEach((key) => {
      if (item[key] && item[key].length && !item[key][0].key) {
        item[key] = item[key].map((value) => ({ key: value }));
      }
    });
  });

  await promisify(writeFile)(
    "./public/lib_deps2.json",
    JSON.stringify(d, null, 2),
    "utf-8"
  );
})();
