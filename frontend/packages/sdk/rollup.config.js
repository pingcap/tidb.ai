import { dts } from "rollup-plugin-dts";

const config = [
  // …
  {
    input: "./src/library.ts",
    output: [{ file: "dist/sdk.d.ts", format: "es" }],
    plugins: [dts({
      compilerOptions: {
        composite: false,
      },
      tsconfig: 'tsconfig.app.json'
    })],
  },
];

export default config;
