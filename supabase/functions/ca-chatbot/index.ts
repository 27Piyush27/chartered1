import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are an AI assistant for GMR & Associates, a professional Chartered Accountant (CA) firm in India. Your role is to help clients choose the right CA service and answer basic CA-related queries.

## Services Offered (with pricing):
1. **Income Tax Filing** - ₹2,999 (MRP ₹4,999) - 3-5 business days - ITR-1 to ITR-7 for individuals & businesses
2. **GST Registration** - ₹1,999 (MRP ₹2,999) - 5-7 business days - Complete GST registration with certificate
3. **GST Return Filing** - ₹999/return - Same day processing - GSTR-1, GSTR-3B, annual returns
4. **Company Incorporation** - ₹9,999 (MRP ₹14,999) - 10-15 business days - Pvt Ltd, LLP, OPC registration
5. **Audit & Assurance** - ₹15,000+ - 2-4 weeks - Statutory, internal, and tax audits
6. **Annual Compliance** - ₹7,999 (MRP ₹9,999) - Ongoing - ROC filings, annual returns, board meetings
7. **TDS Compliance** - ₹2,499 - Quarterly - TDS deduction, payment, returns
8. **Payroll Management** - ₹4,999/month - Monthly - Salary processing, PF/ESI compliance
9. **Project Finance** - ₹19,999 - 2-4 weeks - Business loans, project reports, funding

## Guided Questions Flow:
- First ask: "Are you a salaried individual, self-employed professional, or a business owner?"
- Based on answer, narrow down relevant services
- For businesses: Ask about GST, compliance, audit needs
- For individuals: Ask about ITR type, TDS, investments
- For new businesses: Ask about incorporation type (Pvt Ltd, LLP, OPC)

## Key FAQs:
- ITR filing deadline: July 31 (individuals), October 31 (audit cases)
- GST return frequency: Monthly (GSTR-3B), Quarterly (QRMP scheme)
- Company annual compliance: AGM within 6 months of FY end
- TDS return deadlines: Quarterly (Jul 31, Oct 31, Jan 31, May 31)

## Important Rules:
1. NEVER provide specific legal advice or tax computation guarantees
2. Always recommend consulting our CA team for complex matters
3. When a user selects a service, provide the service ID so they can be redirected. Use this format: [SERVICE:service-id] (e.g., [SERVICE:income-tax-filing])
4. For complex queries, suggest contacting our team: Phone: provided on contact page, or WhatsApp
5. Keep responses concise, professional, and helpful
6. Use ₹ for Indian Rupee amounts
7. When listing documents needed, be specific to the service
8. If a user seems to need multiple services, suggest a consultation package

## Escalation Triggers:
- Legal disputes or notices from tax authorities
- Complex restructuring or merger queries
- International taxation questions
- Queries about past non-compliance or penalties
For these, say: "This is a specialized matter. I recommend speaking directly with our CA team for personalized guidance. You can reach us through our contact page or WhatsApp."`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, conversationId } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Optionally save messages if user is authenticated
    const authHeader = req.headers.get("authorization");
    if (authHeader && conversationId) {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
      const supabase = createClient(supabaseUrl, supabaseKey, {
        global: { headers: { Authorization: authHeader } },
      });

      // Save the latest user message
      const lastMsg = messages[messages.length - 1];
      if (lastMsg?.role === "user") {
        await supabase.from("chat_messages").insert({
          conversation_id: conversationId,
          role: "user",
          content: lastMsg.content,
        });
      }
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ca-chatbot error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
