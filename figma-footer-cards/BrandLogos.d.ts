import * as React from 'react';
export interface BrandLogosProps {
  className?: string;
  style?: React.CSSProperties;
  brand?: "adform" | "adwords" | "amazon" | "canto" | "defaultPlaceholder" | "dv360" | "facebook" | "fashionTv" | "google" | "instagram" | "iqiyi" | "mangoTv" | "meta" | "mytarget" | "pinterest" | "pptv" | "snapchat" | "sohu" | "tencent" | "tiktok" | "toutiao" | "tv" | "twitter" | "wechat" | "weibo" | "xiaomi" | "youku" | "youtube" | "kantar" | "realeyes" | "ipsos" | "dragonflyai";
}
export declare const BrandLogos: React.FC<BrandLogosProps>;
export default BrandLogos;
