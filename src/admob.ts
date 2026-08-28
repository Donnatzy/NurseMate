import { AdMob } from '@capacitor-community/admob';

const TEST_BANNER_ID = 'ca-app-pub-3940256099942544/9214589741';

async function startAds() {
  try {
    await AdMob.initialize();

    await AdMob.showBanner({
      adId: TEST_BANNER_ID,
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
