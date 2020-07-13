import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import cleanup from "rollup-plugin-cleanup";

// ---- settings ------------

const name = "roessler-attractor";
const title = "Rössler Attractor";

const version = "0.1.0";
const year = "2020";
const bundleFalWorksLibraries = false;
const additionalBannerComment = ``;

const cleanBuild = false;

// --------------------------

const bundledLibraries = bundleFalWorksLibraries
  ? ` *
 * Bundled libraries:
 *   @fal-works/creative-coding-core (MIT license)
 *`
  : " *";

const url = `https://github.com/fal-works/threejs-sketches/tree/master/${name}`;

const bannerComment =
  `/**
 * ${title}.
 * Source code in TypeScript: ${url}
${bundledLibraries}
 * @copyright ${year} FAL
 * @version ${version}
 */
` + additionalBannerComment;

const typescriptPlugin = typescript({
  useTsconfigDeclarationDir: true,
  clean: cleanBuild,
});

const cleanupPlugin = cleanup({
  comments: /^\*\*/, // preserve multiline comments
  extensions: ["ts"],
});

const globals = {
  three: "THREE",
};
if (!bundleFalWorksLibraries) {
  globals["@fal-works/creative-coding-core"] = "CreativeCodingCore";
}

const external = ["three"];
if (!bundleFalWorksLibraries)
  external.push("@fal-works/creative-coding-core", "@fal-works/p5-extension");

const plugins = [typescriptPlugin, cleanupPlugin];
if (bundleFalWorksLibraries)
  plugins.unshift(
    resolve({
      extensions: [".mjs"],
      modulesOnly: true,
    })
  );

const config = {
  input: "src/main.ts",
  output: {
    file: "dist/sketch.js",
    format: "iife",
    sourcemap: true,
    banner: bannerComment,
    preferConst: true,
    globals,
  },
  treeshake: {
    propertyReadSideEffects: false,
  },
  external,
  plugins,
};

export default config;
