import { AdMob } from '@capacitor-community/admob';

const NURSEMATE_BANNER_ID = 'ca-app-pub-6797540694008479/4039709517';

async function startAds() {
  try {
    await AdMob.initialize();

    await AdMob.showBanner({
      adId: NURSEMATE_BANNER_ID,
      adSize: 'BANNER',
      position: 'BOTTOM_CENTER',
      margin: 0,
    });
  } catch (error) {
    console.warn('NurseMate AdMob error:', error);
  }
}

window.addEventListener('load', () => {
  startAds();
});
