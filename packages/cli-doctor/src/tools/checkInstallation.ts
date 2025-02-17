import semver from 'semver';
import commandExists from 'command-exists';

export enum PACKAGE_MANAGERS {
  YARN = 'YARN',
  NPM = 'NPM',
}

const isSoftwareNotInstalled = async (command: string): Promise<boolean> => {
  try {
    await commandExists(command);

    return false;
  } catch (_ignored) {
    return true;
  }
};

const doesSoftwareNeedToBeFixed = ({
  version,
  versionRange,
  looseRange = false,
}: {
  version: string;
  versionRange: string;
  looseRange?: boolean;
}): boolean => {
  const coercedVersion = semver.coerce(version, {loose: looseRange});

  return (
    version === 'Not Found' ||
    coercedVersion === null ||
    !semver.satisfies(coercedVersion, versionRange)
  );
};

export {isSoftwareNotInstalled, doesSoftwareNeedToBeFixed};
