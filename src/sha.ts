import * as core from '@actions/core';
import sha256 from 'sha.js/sha256';
import {readFileSync} from 'fs';
import path from 'path';

export const getChecksums = async (
  paths: string[],
): Promise<string> => {
  let markdown = '';
  if (paths.length < 0) return markdown;

  core.startGroup('Generating checksums for artifacts');

  markdown += '## Checksums\nsha256\n```\n';

  for (const filePath of paths) {
    const buffer = readFileSync(filePath);
    const checksum = (new sha256()).update(buffer).digest('hex');
    markdown += `${checksum}  ${path.basename(filePath)}\n`;
  }

  markdown += '```';

  core.endGroup();
  return markdown;
};
