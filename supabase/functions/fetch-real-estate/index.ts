import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { apartmentId, regionCode, apartmentName, dealYearMonth } = await req.json();

    if (!regionCode || !dealYearMonth) {
      return new Response(
        JSON.stringify({ success: false, error: "regionCode and dealYearMonth are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const apiKey = Deno.env.get("DATA_GO_KR_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ success: false, error: "DATA_GO_KR_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 국토교통부 아파트매매 실거래 상세 자료 API
    const url = new URL(
      "http://openapi.molit.go.kr/OpenAPI_ToolInstall498/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev"
    );
    url.searchParams.set("serviceKey", apiKey);
    url.searchParams.set("LAWD_CD", regionCode); // 5자리 법정동코드
    url.searchParams.set("DEAL_YMD", dealYearMonth); // YYYYMM
    url.searchParams.set("pageNo", "1");
    url.searchParams.set("numOfRows", "1000");

    console.log("Fetching from:", url.toString());

    const response = await fetch(url.toString());
    const text = await response.text();

    console.log("API response status:", response.status);
    console.log("API response (first 500 chars):", text.substring(0, 500));

    // Parse XML response
    const items = parseXmlItems(text);

    // Filter by apartment name if provided
    const filtered = apartmentName
      ? items.filter((item: any) => item.aptNm?.includes(apartmentName))
      : items;

    // If apartmentId provided, save to DB
    if (apartmentId) {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
      );

      const rows = filtered.map((item: any) => ({
        apartment_id: apartmentId,
        deal_year: item.dealYear?.trim() || "",
        deal_month: item.dealMonth?.trim() || "",
        deal_day: item.dealDay?.trim() || "",
        area: item.excluUseAr ? parseFloat(item.excluUseAr) : null,
        floor: item.floor?.trim() || "",
        deal_amount: item.dealAmount?.trim()?.replace(/,/g, "") || "",
        apt_name: item.aptNm?.trim() || "",
      }));

      if (rows.length > 0) {
        const { error } = await supabase
          .from("apartment_transactions")
          .upsert(rows, { onConflict: "apartment_id,deal_year,deal_month,deal_day,area,floor" });

        if (error) {
          console.error("DB upsert error:", error);
        }
      }
    }

    return new Response(
      JSON.stringify({ success: true, data: filtered, total: filtered.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function parseXmlItems(xml: string): any[] {
  const items: any[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    const item: any = {};

    const fields = [
      "dealAmount", "dealYear", "dealMonth", "dealDay",
      "aptNm", "excluUseAr", "floor", "jibun",
      "sggCd", "umdNm", "buildYear"
    ];

    for (const field of fields) {
      const fieldRegex = new RegExp(`<${field}>([\\s\\S]*?)</${field}>`);
      const fieldMatch = fieldRegex.exec(itemXml);
      if (fieldMatch) {
        item[field] = fieldMatch[1].trim();
      }
    }

    if (item.dealAmount) {
      items.push(item);
    }
  }

  return items;
}
