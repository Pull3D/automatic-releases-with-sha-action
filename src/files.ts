import globby from 'globby';
import * as core from '@actions/core';

export const getPaths = async (
  files: string[],
): Promise<string[]> => {
  core.startGroup('Getting artifact paths from file globs');
  let paths: string[] = [];
  for (const fileGlob of files) {
    const gpaths = await globby(fileGlob);
    if (gpaths.length === 0) {
      core.error(`${fileGlob} doesn't match any files`);
    } else {
      paths = [...new Set([...paths, ...gpaths])];
    }
  }
  core.debug(`Artifact paths: ${paths}`);
  core.endGroup();
  return paths;
};
