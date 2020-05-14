// Remove the no JS class so that the button will show
document.documentElement.classList.remove('no-js');

const STORAGE_KEY = 'user-color-scheme';
const COLOR_MODE_KEY = '--color-mode';
const modeToggleButton = document.querySelector('.js-mode-toggle');

const getCSSCustomProp = propKey => {
  let response = getComputedStyle(document.documentElement).getPropertyValue(propKey);

  // Tidy up the string if there’s something to work with
  if (response.length) {
      response = response.replace(/\'|"/g, '').trim();
  }

  // Return the string response by default
  return response;
};

const applySetting = passedSetting => {
  let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);

  if (currentSetting) {
      document.documentElement.setAttribute('data-user-color-scheme', currentSetting);
  }
};

const toggleSetting = () => {
  let currentSetting = localStorage.getItem(STORAGE_KEY);

  switch (currentSetting) {
      case null:
        currentSetting = getCSSCustomProp(COLOR_MODE_KEY) === 'dark' ? 'light' : 'dark';
        break;
      case 'light':
        currentSetting = 'dark';
        break;
      case 'dark':
        currentSetting = 'light';
        break;
  }

  localStorage.setItem(STORAGE_KEY, currentSetting);

  return currentSetting;
};

modeToggleButton.addEventListener('click', evt => {
  evt.preventDefault();

  applySetting(toggleSetting());
});

applySetting();