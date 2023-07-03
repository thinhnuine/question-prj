import question from "@/constants/data/questions.json"
import {NextRequest, NextResponse} from "next/server"
export async function GET(request: NextRequest) {
  const limit = Math.max(Number(request.nextUrl.searchParams.get("limit") ?? 30), 0)
  const page = Math.max(Number(request.nextUrl.searchParams.get("page") ?? 1), 1)
  const total = question.length
  const items = question.slice((page - 1) * limit, page * limit)
  return NextResponse.json({data: items, total})
}

export async function PATCH(request: NextRequest, response: NextResponse) {
  const body = await request.json()
  // return NextResponse.json(body)
}
