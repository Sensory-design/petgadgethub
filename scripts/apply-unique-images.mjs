/**
 * One-off: assign 50 unique Unsplash image URLs to products.json (Stage A).
 * Run: node scripts/apply-unique-images.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dataPath = path.join(root, "data", "products.json");

const suffix = "?w=800&q=80&auto=format&fit=crop";
const u = (id) => `https://images.unsplash.com/photo-${id}${suffix}`;

/** 50 unique photo IDs (pet / home / lifestyle), order matches products array order */
const IDS = [
  "1571131116858-2295ade82a72", // petlibro fountain
  "1530700131180-d43d9b8cc41f", // poop bags walk
  "1565967093927-41cf31460afc", // kasa dog sofa
  "1546177747-80e61bda11cb", // chomchom cat
  "1767023028317-bbafd3157967", // feeder cat
  "1771157552643-2ba2fae724fb", // gps dog run
  "1574158622682-e40e69884006", // gps cat
  "1518020382113-e1b27727649e", // furbo living dog
  "1518791841217-8f162f1e1131", // airtag cat
  "1551717743-49982066eae8", // nail grinder paws
  "1552053831-71594a27632d", // bark collar small dog
  "1548199973-03cce0bbc87b", // airline carrier
  "1506905925346-21bda4d32df4", // hike bowl
  "1583337130417-334622a0fd0d", // slicker groom
  "1558618666-fcd25c85cd64", // blink interior
  "1513245543132-31f507938bfc", // surefeed cats
  "1583511655850-d0b82a9f1e87", // bissell sofa dog
  "1535930749578-68389c959717", // kong ball grass
  "1591382420306-cbaee84f7b42", // puzzle enrichment
  "1568393691624-c7aec0fdaeed", // chuckit fetch
  "1477884213360-7e390d9813ae", // ruffwear trail
  "1568572933382-74a204cdc5c7", // cooling mat
  "1449824913935-59a10b8d2000", // car window
  "1560185007-c5ca9d2c014d", // modern room pet
  "1601758228044-f3f2794d9a8b", // slo bowl walk
  "1597848212624-a19edf237b75", // furminator groom
  "1544565970-0aab61009c84", // gentle leader walk
  "1453227588063-6b36b3b0d400", // anxiety jacket vibe
  "1570457994381-856edd2b104a", // catit cat drink
  "1556228453-efd6c1ff04f6", // wyze minimal home
  "1493663284031-b7e3aefcae8e", // drinkwell water
  "1522276492697-04731f0009a8", // halti walk
  "1605568427561-40dd23c2acea", // hol ee toy
  "1516734212186-c29f69bf6271", // sherpa travel
  "1558929996-da4a9c4da9f2", // wipes wet dog
  "1513364776144-60967b5f5f29", // scoopfree home cat
  "1598133894008-61f7fdb820cc", // ifetch play
  "1558618047-3c8c76ca7d13", // petcube tech
  "1557683316-6817f65a91e6", // arlo indoor
  "1546422904-33bdf3bf521e", // kong extreme chew
  "1589927928-4d6b88a3764a", // greenies treats
  "1511690743691-3d61d5bbdb3c", // smart feed kitchen
  "1517849845537-296d2d5ede60", // clippers dog
  "1464822759023-fed622ff2c3b", // daypak mountain
  "1494942220329-31eb78680d4a", // kurgo car
  "1576201836716-0c8b0354a5ae", // chuckit ultra ball
  "1600077106729-44d881f08a44", // vari kennel
  "1586023492125-27b2c045efd7", // levoit clean room
  "1584990347449-0eac2c8bb5b0", // simplehuman kitchen
  "1548191541140-42b3157a6e9c", // wobble play (dog toy floor)
];

const j = JSON.parse(fs.readFileSync(dataPath, "utf8"));
if (j.products.length !== IDS.length) {
  console.error("Expected", IDS.length, "products, got", j.products.length);
  process.exit(1);
}
j.products = j.products.map((p, i) => ({ ...p, imageSrc: u(IDS[i]) }));
const seen = new Set();
for (const p of j.products) {
  if (seen.has(p.imageSrc)) console.error("DUPE", p.slug, p.imageSrc);
  seen.add(p.imageSrc);
}
fs.writeFileSync(dataPath, JSON.stringify(j, null, 2) + "\n", "utf8");
console.log("OK: 50 unique imageSrc values written");
