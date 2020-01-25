import Input from './input';
import Unity from './unity';

const tc = require('@actions/tool-cache');
const core = require('@actions/core');

class Cache {
  static get libraryKey() {
    const { projectPath } = Input.getFromUser();

    return `${projectPath}`;
  }

  static async load() {
    // Look for cache
    const libraryFolder = await tc.find('library', this.libraryKey);

    // Cache miss
    if (!libraryFolder) {
      return;
    }

    // Restore
    await core.addPath(libraryFolder);
  }

  static async save() {
    console.log(`saving to ${Unity.libraryFolder}`);
    await tc.cacheDir(Unity.libraryFolder, 'library', this.libraryKey);
  }
}

export default Cache;
