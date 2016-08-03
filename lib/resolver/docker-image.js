export default function ({ image }) {
  let isOffical = true;
  const imageName = image.split(':')[0];

  if (image.includes('/')) {
    isOffical = false;
  }

  return [
    `https://hub.docker.com/${isOffical ? '_' : 'r'}/${imageName}`,
  ];
}
