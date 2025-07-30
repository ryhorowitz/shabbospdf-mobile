interface CandleItem {
  title: string;
  date: string;
  hdate: string;
  category: string;
  hebrew: string;
}

interface CandleData {
  items: CandleItem[];
}

interface ExtractedItems {
  candleItem: CandleItem | null;
  parshahItem: CandleItem | null;
  havdalahItem: CandleItem | null;
}

export const extractCandleItems = (candleData: CandleData): ExtractedItems => {
  if (!candleData || !candleData.items) {
    return {
      candleItem: null,
      parshahItem: null,
      havdalahItem: null,
    };
  }

  const candleItem = candleData.items.find(item => item.category === 'candles');
  const parshahItem = candleData.items.find(item => item.category === 'parashat');
  const havdalahItem = candleData.items.find(item => item.category === 'havdalah');

  return {
    candleItem: candleItem || null,
    parshahItem: parshahItem || null,
    havdalahItem: havdalahItem || null,
  };
}; 