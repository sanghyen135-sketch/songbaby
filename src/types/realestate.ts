export interface TrackedApartment {
  id: string;
  name: string;
  region_code: string;
  dong_code?: string;
  address?: string;
  created_at: string;
}

export interface ApartmentTransaction {
  id: string;
  apartment_id: string;
  deal_year: string;
  deal_month: string;
  deal_day: string;
  area: number | null;
  floor: string;
  deal_amount: string;
  apt_name: string;
  fetched_at: string;
}

// 주요 시군구 코드 (서울 중심)
export const REGION_CODES: { code: string; name: string }[] = [
  { code: "11110", name: "서울 종로구" },
  { code: "11140", name: "서울 중구" },
  { code: "11170", name: "서울 용산구" },
  { code: "11200", name: "서울 성동구" },
  { code: "11215", name: "서울 광진구" },
  { code: "11230", name: "서울 동대문구" },
  { code: "11260", name: "서울 중랑구" },
  { code: "11290", name: "서울 성북구" },
  { code: "11305", name: "서울 강북구" },
  { code: "11320", name: "서울 도봉구" },
  { code: "11350", name: "서울 노원구" },
  { code: "11380", name: "서울 은평구" },
  { code: "11410", name: "서울 서대문구" },
  { code: "11440", name: "서울 마포구" },
  { code: "11470", name: "서울 양천구" },
  { code: "11500", name: "서울 강서구" },
  { code: "11530", name: "서울 구로구" },
  { code: "11545", name: "서울 금천구" },
  { code: "11560", name: "서울 영등포구" },
  { code: "11590", name: "서울 동작구" },
  { code: "11620", name: "서울 관악구" },
  { code: "11650", name: "서울 서초구" },
  { code: "11680", name: "서울 강남구" },
  { code: "11710", name: "서울 송파구" },
  { code: "11740", name: "서울 강동구" },
  { code: "41111", name: "경기 수원 장안구" },
  { code: "41113", name: "경기 수원 권선구" },
  { code: "41115", name: "경기 수원 팔달구" },
  { code: "41117", name: "경기 수원 영통구" },
  { code: "41131", name: "경기 성남 수정구" },
  { code: "41133", name: "경기 성남 중원구" },
  { code: "41135", name: "경기 성남 분당구" },
  { code: "41150", name: "경기 의정부시" },
  { code: "41170", name: "경기 안양시" },
  { code: "41190", name: "경기 부천시" },
  { code: "41210", name: "경기 광명시" },
  { code: "41220", name: "경기 평택시" },
  { code: "41250", name: "경기 동두천시" },
  { code: "41270", name: "경기 안산시" },
  { code: "41280", name: "경기 고양 덕양구" },
  { code: "41285", name: "경기 고양 일산동구" },
  { code: "41287", name: "경기 고양 일산서구" },
  { code: "41360", name: "경기 남양주시" },
  { code: "41370", name: "경기 파주시" },
  { code: "41390", name: "경기 시흥시" },
  { code: "41410", name: "경기 군포시" },
  { code: "41430", name: "경기 의왕시" },
  { code: "41450", name: "경기 하남시" },
  { code: "41460", name: "경기 용인시" },
  { code: "41480", name: "경기 파주시" },
  { code: "41500", name: "경기 이천시" },
  { code: "41550", name: "경기 김포시" },
  { code: "41570", name: "경기 화성시" },
  { code: "41590", name: "경기 광주시" },
];
