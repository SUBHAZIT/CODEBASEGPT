import { auth } from '@webcontainer/api';

export const initWebContainer = () => {
  auth.init({
    clientId: 'wc_api_team404found.hackathon_347d00a5ee39ddec72129db3ae3e01c9',
    scope: '',
  });
};

export const openInStackBlitz = (owner: string, name: string) => {
  const url = `https://stackblitz.com/github/${owner}/${name}`;
  window.open(url, '_blank');
};
