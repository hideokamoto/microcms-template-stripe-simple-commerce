import { NextRequest, NextResponse } from 'next/server'
export const runtime = 'edge';
export async function POST(request: NextRequest) {
    return NextResponse.json(
        {
          message: 'Bad request.',
        },
        {
          status: 400,
        },
      )
}
