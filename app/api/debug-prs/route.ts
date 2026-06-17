// app/api/debug-prs/route.ts
import { getOpenSourcePRs } from "@/lib/github";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const prs = await getOpenSourcePRs();
        return NextResponse.json({ success: true, count: prs.length, prs });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) });
    }
}