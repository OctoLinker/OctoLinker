export const options = [
  {
    type: 'checkbox',
    name: 'newWindow',
    label: 'New tab',
    description: 'Open link in a new tab.',
    defaultValue: false,
  },
  {
    type: 'checkbox',
    name: 'newWindowActive',
    label: 'Focus new tab',
    description: 'Focus new tab when opening a link.',
    defaultValue: true,
  },
  {
    type: 'checkbox',
    name: 'showLinkIndicator',
    label: 'Line indicator',
    description: 'Show an indicator if line contains OctoLinker links.',
    defaultValue: true,
  },
  {
    type: 'checkbox',
    name: 'showUpdateNotification',
    label: 'Update notification',
    description: 'Show a notification if a new version is available.',
    defaultValue: true,
  },
  {
    type: 'checkbox',
    name: 'doTrack',
    label: 'Usage reports',
    description: 'Send anonymous usage reports to Google Analytics.',
    defaultValue: true,
  },
];
