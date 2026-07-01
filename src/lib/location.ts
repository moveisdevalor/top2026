export type LocationInfo = {
  lat: string;
  long: string;
  city: string;
  country: string;
  ip: string;
};

export async function getIpInfo(): Promise<Partial<LocationInfo>> {
  try {
    const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
    if (!res.ok) return {};
    const d = await res.json();
    return {
      city: d.city || "",
      country: d.country_name || d.country || "",
      ip: d.ip || "",
    };
  } catch {
    return {};
  }
}

export type GpsResult = { lat: string; long: string; accuracy: number };

// Observa a posição por até `maxMs`, mantendo a leitura mais precisa.
// Encerra cedo se a precisão atingir < `targetAccuracy` metros.
export function getGpsCoords(
  { maxMs = 8000, targetAccuracy = 20 }: { maxMs?: number; targetAccuracy?: number } = {},
): Promise<GpsResult | null> {
  if (typeof navigator === "undefined" || !navigator.geolocation) {
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    let best: GeolocationPosition | null = null;
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      navigator.geolocation.clearWatch(watchId);
      if (!best) return resolve(null);
      resolve({
        lat: String(best.coords.latitude),
        long: String(best.coords.longitude),
        accuracy: best.coords.accuracy,
      });
    };

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        if (!best || pos.coords.accuracy < best.coords.accuracy) best = pos;
        if (best.coords.accuracy <= targetAccuracy) finish();
      },
      () => finish(),
      { enableHighAccuracy: true, timeout: maxMs, maximumAge: 0 },
    );

    setTimeout(finish, maxMs);
  });
}

export async function getLocation(): Promise<LocationInfo> {
  const [ip, gps] = await Promise.all([getIpInfo(), getGpsCoords()]);
  return {
    lat: gps?.lat ?? "",
    long: gps?.long ?? "",
    city: ip.city ?? "",
    country: ip.country ?? "",
    ip: ip.ip ?? "",
  };
}
