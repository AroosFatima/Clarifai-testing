const S3_URL_PREFIX = 'https://portal-test-data.s3.amazonaws.com/';

export type AssetType = keyof typeof s3Assets;

/**
 * Get an array of asset urls for a given AssetType.
 */
export const getAssetUrls = (type: AssetType, amount = 0): string[] => {
  let assets: readonly string[] = s3Assets[type];
  if (amount > 0) {
    assets = assets.slice(0, amount);
  }
  const urls = assets.map((fileName) => `${S3_URL_PREFIX}${type}/${fileName}`);
  return urls;
};

/**
 * Get single asset url
 */
export const getAssetUrl = (assetType: AssetType, assetName: string): string => `${S3_URL_PREFIX}${assetType}/${assetName}`;

/**
 * Static inputs for testing, from the portal-test-data s3 bucket.
 * After uploading your test assets to the s3 bucket, add your file names here while maintaining the structure.
 */
export const s3Assets = {
  faces_images: [
    'faces_pic_0001.jpg',
    'faces_pic_0002.jpg',
    'faces_pic_0003.jpg',
    'faces_pic_0004.jpg',
    'faces_pic_0005.jpg',
    'faces_pic_0006.jpg',
    'faces_pic_0007.jpg',
    'faces_pic_0008.jpg',
    'faces_pic_0009.jpg',
    'faces_pic_0010.jpg',
  ],

  faces_videos: ['faces_vid_0001.mp4', 'faces_vid_0002.mp4', 'faces_vid_0003.mp4', 'faces_vid_0004.mp4'],

  cat_images: [
    '_5eTBktpnkQ.jpg',
    '2Nca6Aum17o.jpg',
    '5j7TkyLv4Yc.jpg',
    '6YvXKSjTOCk.jpg',
    '9OBUE-F7KJk.jpg',
    'b5shXEmOqkk.jpg',
    'c2b8JqyqCqg.jpg',
    'cODDD0IF5MQ.jpg',
    'dm-ApvBj0nI.jpg',
    'DrfFgts5sUA.jpg',
    'e0H-nwlk418.jpg',
    'E5HmmWbknoQ.jpg',
    'ekmieBED828.jpg',
    'F13lt6bRmM8.jpg',
    'HPms4CetpG0.jpg',
    'HVFCBYqIhC4.jpg',
    'I7cOK49n0ZM.jpg',
    'IbPxGLgJiMI.jpg',
    'IH9qF7jVwjI.jpg',
    'IUNNmqYX6OA.jpg',
    'kCCyQBDGK90.jpg',
    'l5MAPGcqp4M.jpg',
    'LoBqitTPEqU.jpg',
    'M8uSC8OPXco.jpg',
    'PcD60yj4NiA.jpg',
    'qLXa-miMhbw.jpg',
    'Qsjh0P-7Hws.jpg',
    'SC7o5xtbn1s.jpg',
    'SegriXPwK9c.jpg',
    'T-MD2c-vBqs.jpg',
    'tB4KJhciWxE.jpg',
    'TmYRKtBTpz8.jpg',
    'TszVNhi39a8.jpg',
    'tX_0Qf51PyE.jpg',
    'tyfTLpWvMSo.jpg',
    'UoNO74xD-JA.jpg',
    'UTVfyq6ZlBU.jpg',
    'Y_pLBbSAhHI.jpg',
    'zsW9_CNrlL8.jpg',
  ],

  car_images: ['e2eCar_0001.jpg', 'e2eCar_0002.jpg', 'e2eCar_0003.jpg', 'e2eCar_0004.jpg', 'e2eCar_0005.jpg'],

  bicycle_images: [
    'e2eBicycle_0001.jpg',
    'e2eBicycle_0002.jpg',
    'e2eBicycle_0003.jpg',
    'e2eBicycle_0004.jpg',
    'e2eBicycle_0005.jpg',
    'e2eBicycle_0006.jpg',
  ],

  dog_images: ['e2eDog_0001.jpg', 'e2eDog_0002.jpg', 'e2eDog_0003.jpg', 'e2eDog_0004.jpg', 'e2eDog_0005.jpg', 'e2eDog_0006.jpg', 'e2eDog_0007.jpg'],

  people_images: ['e2ePeople_0001.jpg', 'e2ePeople_0002.jpg', 'e2ePeople_0003.jpg'],

  general_videos: ['Motocross.mp4'],

  text_files: ['greeting.txt'],
  images_of_text: ['lipsum.png', 'lipsum2.png', 'lipsum3.png'],
  demographics: ['people_1.jpg', 'people_2.jpg'],
} as const;
