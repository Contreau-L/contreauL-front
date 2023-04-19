export function setCookie(name: string, value: string, hours: number): void {
  const d = new Date();
  d.setTime(d.getTime() + hours * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

export function getCookie(name: string): string | null {
  const cookieName = `${name}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return null;
}

export function deleteCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function storeTokenAndUsername(token: string, userName: string): void {
  setCookie('token', token, 12);
  setCookie('username', userName, 12);
}

export function getToken(): string | null {
  return getCookie('token');
}

export function getUsername(): string | null {
  return getCookie('username');
}

export function deleteTokenAndUsername(): void {
  deleteCookie('token');
  deleteCookie('username');
}
