import { useState, useEffect, useRef } from 'react';
import { ref, set, onValue, remove, onDisconnect } from 'firebase/database';
import { database } from '../firebase';
import { Eye, EyeOff } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788'
];

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

// Country code to country name mapping (ISO 3166-1 alpha-2)
const COUNTRY_MAP = {
  AF: "Afghanistan", AX: "Åland Islands", AL: "Albania", DZ: "Algeria",
  AS: "American Samoa", AD: "Andorra", AO: "Angola", AI: "Anguilla",
  AQ: "Antarctica", AG: "Antigua and Barbuda", AR: "Argentina", AM: "Armenia",
  AW: "Aruba", AU: "Australia", AT: "Austria", AZ: "Azerbaijan",
  BS: "Bahamas", BH: "Bahrain", BD: "Bangladesh", BB: "Barbados",
  BY: "Belarus", BE: "Belgium", BZ: "Belize", BJ: "Benin",
  BM: "Bermuda", BT: "Bhutan", BO: "Bolivia", BQ: "Bonaire, Sint Eustatius and Saba",
  BA: "Bosnia and Herzegovina", BW: "Botswana", BV: "Bouvet Island", BR: "Brazil",
  IO: "British Indian Ocean Territory", BN: "Brunei Darussalam", BG: "Bulgaria",
  BF: "Burkina Faso", BI: "Burundi", KH: "Cambodia", CM: "Cameroon",
  CA: "Canada", CV: "Cape Verde", KY: "Cayman Islands", CF: "Central African Republic",
  TD: "Chad", CL: "Chile", CN: "China", CX: "Christmas Island",
  CC: "Cocos (Keeling) Islands", CO: "Colombia", KM: "Comoros", CG: "Congo",
  CD: "Congo, Democratic Republic of the", CK: "Cook Islands", CR: "Costa Rica",
  CI: "Côte d'Ivoire", HR: "Croatia", CU: "Cuba", CW: "Curaçao",
  CY: "Cyprus", CZ: "Czech Republic", DK: "Denmark", DJ: "Djibouti",
  DM: "Dominica", DO: "Dominican Republic", EC: "Ecuador", EG: "Egypt",
  SV: "El Salvador", GQ: "Equatorial Guinea", ER: "Eritrea", EE: "Estonia",
  ET: "Ethiopia", FK: "Falkland Islands (Malvinas)", FO: "Faroe Islands", FJ: "Fiji",
  FI: "Finland", FR: "France", GF: "French Guiana", PF: "French Polynesia",
  TF: "French Southern Territories", GA: "Gabon", GM: "Gambia", GE: "Georgia",
  DE: "Germany", GH: "Ghana", GI: "Gibraltar", GR: "Greece",
  GL: "Greenland", GD: "Grenada", GP: "Guadeloupe", GU: "Guam",
  GT: "Guatemala", GG: "Guernsey", GN: "Guinea", GW: "Guinea-Bissau",
  GY: "Guyana", HT: "Haiti", HM: "Heard Island and McDonald Islands",
  VA: "Holy See (Vatican City State)", HN: "Honduras", HK: "Hong Kong",
  HU: "Hungary", IS: "Iceland", IN: "India", ID: "Indonesia",
  IR: "Iran, Islamic Republic of", IQ: "Iraq", IE: "Ireland", IM: "Isle of Man",
  IL: "Israel", IT: "Italy", JM: "Jamaica", JP: "Japan",
  JE: "Jersey", JO: "Jordan", KZ: "Kazakhstan", KE: "Kenya",
  KI: "Kiribati", KP: "Korea, Democratic People's Republic of",
  KR: "Korea, Republic of", KW: "Kuwait", KG: "Kyrgyzstan",
  LA: "Lao People's Democratic Republic", LV: "Latvia", LB: "Lebanon",
  LS: "Lesotho", LR: "Liberia", LY: "Libya", LI: "Liechtenstein",
  LT: "Lithuania", LU: "Luxembourg", MO: "Macao", MK: "Macedonia, Republic of",
  MG: "Madagascar", MW: "Malawi", MY: "Malaysia", MV: "Maldives",
  ML: "Mali", MT: "Malta", MH: "Marshall Islands", MQ: "Martinique",
  MR: "Mauritania", MU: "Mauritius", YT: "Mayotte", MX: "Mexico",
  FM: "Micronesia, Federated States of", MD: "Moldova, Republic of", MC: "Monaco",
  MN: "Mongolia", ME: "Montenegro", MS: "Montserrat", MA: "Morocco",
  MZ: "Mozambique", MM: "Myanmar", NA: "Namibia", NR: "Nauru",
  NP: "Nepal", NL: "Netherlands", NC: "New Caledonia", NZ: "New Zealand",
  NI: "Nicaragua", NE: "Niger", NG: "Nigeria", NU: "Niue",
  NF: "Norfolk Island", MP: "Northern Mariana Islands", NO: "Norway", OM: "Oman",
  PK: "Pakistan", PW: "Palau", PS: "Palestine, State of", PA: "Panama",
  PG: "Papua New Guinea", PY: "Paraguay", PE: "Peru", PH: "Philippines",
  PN: "Pitcairn", PL: "Poland", PT: "Portugal", PR: "Puerto Rico",
  QA: "Qatar", RE: "Réunion", RO: "Romania", RU: "Russian Federation",
  RW: "Rwanda", BL: "Saint Barthélemy", SH: "Saint Helena, Ascension and Tristan da Cunha",
  KN: "Saint Kitts and Nevis", LC: "Saint Lucia", MF: "Saint Martin (French part)",
  PM: "Saint Pierre and Miquelon", VC: "Saint Vincent and the Grenadines",
  WS: "Samoa", SM: "San Marino", ST: "Sao Tome and Principe", SA: "Saudi Arabia",
  SN: "Senegal", RS: "Serbia", SC: "Seychelles", SL: "Sierra Leone",
  SG: "Singapore", SX: "Sint Maarten (Dutch part)", SK: "Slovakia", SI: "Slovenia",
  SB: "Solomon Islands", SO: "Somalia", ZA: "South Africa",
  GS: "South Georgia and the South Sandwich Islands", SS: "South Sudan", ES: "Spain",
  LK: "Sri Lanka", SD: "Sudan", SR: "Suriname", SJ: "Svalbard and Jan Mayen",
  SZ: "Swaziland", SE: "Sweden", CH: "Switzerland", SY: "Syrian Arab Republic",
  TW: "Taiwan, Province of China", TJ: "Tajikistan", TZ: "Tanzania, United Republic of",
  TH: "Thailand", TL: "Timor-Leste", TG: "Togo", TK: "Tokelau",
  TO: "Tonga", TT: "Trinidad and Tobago", TN: "Tunisia", TR: "Turkey",
  TM: "Turkmenistan", TC: "Turks and Caicos Islands", TV: "Tuvalu", UG: "Uganda",
  UA: "Ukraine", AE: "United Arab Emirates", GB: "United Kingdom", US: "United States",
  UM: "United States Minor Outlying Islands", UY: "Uruguay", UZ: "Uzbekistan",
  VU: "Vanuatu", VE: "Venezuela, Bolivarian Republic of", VN: "Viet Nam",
  VG: "Virgin Islands, British", VI: "Virgin Islands, U.S.", WF: "Wallis and Futuna",
  EH: "Western Sahara", YE: "Yemen", ZM: "Zambia", ZW: "Zimbabwe"
};

// Haversine formula to calculate distance between two coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c);
}

export default function LiveCursors({ isEnabled, onToggle }) {
  const [cursors, setCursors] = useState({});
  const [location, setLocation] = useState(null);
  const [userId] = useState(() => `user-${Math.random().toString(36).substr(2, 9)}`);
  const userColorRef = useRef(getRandomColor());
  const throttleRef = useRef(null);
  const routerLocation = useLocation();
  const currentPath = routerLocation.pathname;

  useEffect(() => {
    if (!isEnabled) return;

    const cursorsRef = ref(database, `cursors/${currentPath.replace(/\//g, '_')}`);

    const unsubscribe = onValue(cursorsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const now = Date.now();
        const filteredCursors = Object.entries(data)
          .filter(([id, cursor]) => 
            id !== userId && cursor.timestamp && now - cursor.timestamp < 60000 // 1 minute
          )
          .reduce((acc, [id, cursor]) => ({ ...acc, [id]: cursor }), {});
        setCursors(filteredCursors);
      } else {
        setCursors({});
      }
    });

    return () => {
      unsubscribe();
      const userRef = ref(database, `cursors/${currentPath.replace(/\//g, '_')}/${userId}`);
      remove(userRef);
    };
  }, [userId, isEnabled, currentPath]);

  useEffect(() => {
    if (!isEnabled || !location) return;

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;

      if (throttleRef.current) return;
      
      throttleRef.current = setTimeout(() => {
        throttleRef.current = null;
      }, 50);

      const userRef = ref(database, `cursors/${currentPath.replace(/\//g, '_')}/${userId}`);
      set(userRef, {
        x,
        y,
        location: location,
        color: userColorRef.current,
        timestamp: Date.now()
      });
    };

    const userRef = ref(database, `cursors/${currentPath.replace(/\//g, '_')}/${userId}`);
    onDisconnect(userRef).remove();

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [userId, location, isEnabled, currentPath]);

  const fetchLocationFromIP = async () => {
    try {
      const response = await fetch('https://ipinfo.io/json?token=66b09d2d289b40');
      const data = await response.json();
      const [lat, lon] = data.loc.split(',').map(Number);
      return {
        city: data.city || 'Unknown',
        country: COUNTRY_MAP[data.country] || data.country || 'Unknown',
        lat,
        lon
      };
    } catch {
      return { city: 'Unknown', country: 'Location', lat: 0, lon: 0 };
    }
  };

  const handleLocationAllow = async (coords) => {
    let lat, lon, city, country;

    // Get coordinates from browser geolocation
    if (coords && typeof coords.lat === 'number' && typeof coords.lon === 'number') {
      lat = coords.lat;
      lon = coords.lon;
    } else {
      // Fallback to IP coordinates
      const ipData = await fetchLocationFromIP();
      lat = ipData.lat;
      lon = ipData.lon;
    }

    // Always get city/country from IP API
    try {
      const response = await fetch('https://ipinfo.io/json?token=66b09d2d289b40');
      const data = await response.json();
      city = data.city || 'Unknown';
      country = COUNTRY_MAP[data.country] || data.country || 'Unknown';
    } catch {
      city = 'Unknown';
      country = 'Location';
    }

    setLocation({ city, country, lat, lon });
  };

  const handleLocationDeny = () => {
    setLocation({ city: 'Anonymous', country: 'User', lat: 0, lon: 0 });
  };

  useEffect(() => {
    if (isEnabled) {
      const permission = localStorage.getItem('cursor-location-permission');
      if (permission === 'allowed') {
        // Request browser geolocation first
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const { latitude, longitude } = pos.coords;
              handleLocationAllow({ lat: latitude, lon: longitude });
            },
            () => {
              // Fallback to IP if browser geolocation fails
              fetchLocationFromIP().then(loc => setLocation(loc));
            }
          );
        } else {
          // Fallback to IP if geolocation not supported
          fetchLocationFromIP().then(loc => setLocation(loc));
        }
      } else if (permission === 'denied') {
        setLocation({ city: 'Anonymous', country: 'User', lat: 0, lon: 0 });
      }
    }
  }, [isEnabled]);

  return (
    <>
      {!location && isEnabled && (
        <LocationPermission
          onAllow={handleLocationAllow}
          onDeny={handleLocationDeny}
        />
      )}

      {/* Always show the toggle button */}
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-40 bg-[#18181b] border border-[#232323] rounded-full p-3 shadow-lg hover:bg-[#232323] transition-all duration-200"
        title={isEnabled ? "Hide cursors" : "Show cursors"}
      >
        {isEnabled ? (
          <Eye className="w-5 h-5 text-[#f5f5f7]" />
        ) : (
          <EyeOff className="w-5 h-5 text-[#71717a]" />
        )}
      </button>

      {/* Only show cursors if enabled AND location is set */}
      {isEnabled && location &&
        Object.entries(cursors).map(([id, cursor]) => (
          <Cursor key={id} cursor={cursor} userLocation={location} />
        ))}
    </>
  );
}

function Cursor({ cursor, userLocation }) {
  let distanceText = "";

  // Parse coordinates as numbers
  const myLat = Number(userLocation?.lat);
  const myLon = Number(userLocation?.lon);
  const otherLat = Number(cursor.location?.lat);
  const otherLon = Number(cursor.location?.lon);

  // Check for valid coordinates (not NaN, not zero, not undefined)
  const validCoords =
    !isNaN(myLat) && !isNaN(myLon) && !isNaN(otherLat) && !isNaN(otherLon) &&
    myLat !== 0 && myLon !== 0 && otherLat !== 0 && otherLon !== 0;

  if (validCoords) {
    const distance = calculateDistance(myLat, myLon, otherLat, otherLon);
    distanceText = `${distance}km away • `;
  }

  return (
    <div
      className="fixed pointer-events-none z-50 transition-all duration-75 ease-out"
      style={{
        left: `${cursor.x}%`,
        top: `${cursor.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="drop-shadow-lg"
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill={cursor.color}
          stroke="white"
          strokeWidth="1"
        />
      </svg>

      {cursor.location && (
        <div
          className="absolute top-6 left-6 bg-[#18181b] border rounded-lg px-3 py-2 shadow-xl whitespace-nowrap animate-fade-in"
          style={{
            borderColor: cursor.color,
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: cursor.color }}
            />
            <span className="text-xs font-medium text-[#f5f5f7]">
              {distanceText}
              {cursor.location.city}, {cursor.location.country}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function LocationPermission({ onAllow, onDeny }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasResponded = localStorage.getItem('cursor-location-permission');
    if (!hasResponded) {
      setIsVisible(true);
    }
  }, []);

  const handleAllow = () => {
    localStorage.setItem('cursor-location-permission', 'allowed');
    setIsVisible(false);

    // Use browser geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          onAllow({ lat: latitude, lon: longitude });
        },
        () => {
          // If denied or failed, fallback to IP
          onAllow(null);
        }
      );
    } else {
      onAllow(null);
    }
  };

  const handleDeny = () => {
    localStorage.setItem('cursor-location-permission', 'denied');
    setIsVisible(false);
    onDeny();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md mx-4 bg-[#18181b] border border-[#232323] rounded-xl shadow-2xl p-6 animate-scale-in">
        <button
          onClick={handleDeny}
          className="absolute top-4 right-4 text-[#71717a] hover:text-[#f5f5f7] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-[#38bdf8]/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#38bdf8]"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <h2 className="text-xl font-semibold text-[#f5f5f7]">Share Your Location</h2>
        </div>
        
        <p className="text-[#a1a1aa] mb-6 text-sm leading-relaxed">
          See where other visitors are from and how far away they are! Your precise location is used only for distance calculation.
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={handleAllow}
            className="flex-1 bg-[#38bdf8] text-white hover:bg-[#38bdf8]/90 rounded-lg px-4 py-2 font-medium transition-colors"
          >
            Allow Location
          </button>
          <button
            onClick={handleDeny}
            className="flex-1 border border-[#232323] hover:bg-[#232323] text-[#f5f5f7] rounded-lg px-4 py-2 font-medium transition-colors"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}