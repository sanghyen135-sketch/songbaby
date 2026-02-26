
-- 관심 아파트 목록
CREATE TABLE public.tracked_apartments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL, -- 아파트명
  region_code TEXT NOT NULL, -- 법정동코드 (5자리: 시군구)
  dong_code TEXT, -- 법정동코드 (읍면동)
  address TEXT, -- 주소
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 실거래가 캐시
CREATE TABLE public.apartment_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  apartment_id UUID NOT NULL REFERENCES public.tracked_apartments(id) ON DELETE CASCADE,
  deal_year TEXT NOT NULL,
  deal_month TEXT NOT NULL,
  deal_day TEXT NOT NULL,
  area NUMERIC, -- 전용면적
  floor TEXT, -- 층
  deal_amount TEXT NOT NULL, -- 거래금액
  apt_name TEXT,
  fetched_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(apartment_id, deal_year, deal_month, deal_day, area, floor)
);

-- 이 앱은 개인/가족용이므로 모두 접근 가능하게 설정
ALTER TABLE public.tracked_apartments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.apartment_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to tracked_apartments"
ON public.tracked_apartments FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all access to apartment_transactions"
ON public.apartment_transactions FOR ALL USING (true) WITH CHECK (true);

-- 인덱스
CREATE INDEX idx_apt_transactions_apartment ON public.apartment_transactions(apartment_id);
CREATE INDEX idx_apt_transactions_deal ON public.apartment_transactions(deal_year, deal_month);
