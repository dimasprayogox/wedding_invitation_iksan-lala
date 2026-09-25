import { NextRequest, NextResponse } from 'next/server';
import { createHmac, randomBytes } from 'crypto';

const SECRET = process.env.ADMIN_SESSION_SECRET || randomBytes(32).toString('hex');
const COOKIE_NAME = 'admin_session';
const MAX_AGE = 60 * 60 * 24; // 1 day

function sign(value: string): string {
  const sig = createHmac('sha256', SECRET).update(value).digest('base64url');
  return `${value}.${sig}`;
}

function verify(cookie: string): boolean {
  const idx = cookie.lastIndexOf('.');
  if (idx === -1) return false;
  const value = cookie.slice(0, idx);
  return sign(value) === cookie;
}

// POST = login
export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const validUser = process.env.ADMIN_USERNAME;
  const validPass = process.env.ADMIN_PASSWORD;

  if (!validUser || !validPass) {
    return NextResponse.json(
      { error: 'Server belum dikonfigurasi. Set ADMIN_USERNAME dan ADMIN_PASSWORD.' },
      { status: 500 }
    );
  }

  if (username?.trim() !== validUser || password?.trim() !== validPass) {
    return NextResponse.json({ error: 'Username atau Password salah!' }, { status: 401 });
  }

  const token = sign(Date.now().toString());
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
  });
  return res;
}

// GET = check session
export async function GET(req: NextRequest) {
  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  if (!cookie || !verify(cookie)) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true });
}

// DELETE = logout
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, '', { path: '/', maxAge: 0 });
  return res;
}
