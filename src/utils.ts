import { readTextFile, writeTextFile, exists, createDir } from '@tauri-apps/api/fs';
import { homeDir, join, dirname } from '@tauri-apps/api/path';
import dayjs from 'dayjs';

export const APP_CONF_JSON = 'phind.conf.json';
export const CHAT_MODEL_JSON = 'phind.model.json';
export const CHAT_MODEL_CMD_JSON = 'phind.model.cmd.json';
export const CHAT_DOWNLOAD_JSON = 'phind.download.json';
export const CHAT_AWESOME_JSON = 'phind.awesome.json';
export const CHAT_NOTES_JSON = 'phind.notes.json';
export const CHAT_PROMPTS_CSV = 'phind.prompts.csv';
export const GITHUB_PROMPTS_CSV_URL =
  'https://raw.githubusercontent.com/f/awesome-chatgpt-prompts/main/prompts.csv';
export const GITHUB_LOG_URL = 'https://raw.githubusercontent.com/lencx/ChatGPT/main/UPDATE_LOG.md';

export const DISABLE_AUTO_COMPLETE = {
  autoCapitalize: 'off',
  autoComplete: 'off',
  spellCheck: false,
};

export const chatRoot = async () => {
  return join(await homeDir(), '.phine');
};

export const chatModelPath = async (): Promise<string> => {
  return join(await chatRoot(), CHAT_MODEL_JSON);
};

export const chatPromptsPath = async (): Promise<string> => {
  return join(await chatRoot(), CHAT_PROMPTS_CSV);
};

type readJSONOpts = { defaultVal?: Record<string, any>; isRoot?: boolean; isList?: boolean };
export const readJSON = async (path: string, opts: readJSONOpts = {}) => {
  const { defaultVal = {}, isRoot = false, isList = false } = opts;
  const root = await chatRoot();
  let file = path;

  if (!isRoot) {
    file = await join(root, path);
  }

  if (!(await exists(file))) {
    if ((await dirname(file)) !== root) {
      await createDir(await dirname(file), { recursive: true });
    }
    await writeTextFile(
      file,
      isList
        ? '[]'
        : JSON.stringify(
            {
              name: 'Phine',
              link: 'https://github.com/boynTeam/Phind',
              ...defaultVal,
            },
            null,
            2,
          ),
    );
  }

  try {
    return JSON.parse(await readTextFile(file));
  } catch (e) {
    return {};
  }
};

type writeJSONOpts = { dir?: string; isRoot?: boolean };
export const writeJSON = async (
  path: string,
  data: Record<string, any>,
  opts: writeJSONOpts = {},
) => {
  const { isRoot = false } = opts;
  const root = await chatRoot();
  let file = path;

  if (!isRoot) {
    file = await join(root, path);
  }

  if (isRoot && !(await exists(await dirname(file)))) {
    await createDir(await dirname(file), { recursive: true });
  }

  await writeTextFile(file, JSON.stringify(data, null, 2));
};

export const fmtDate = (date: any) => dayjs(date).format('YYYY-MM-DD HH:mm:ss');

export const genCmd = (act: string) =>
  act
    .replace(/\s+|\/+/g, '_')
    .replace(/[^\d\w]/g, '')
    .toLocaleLowerCase();
