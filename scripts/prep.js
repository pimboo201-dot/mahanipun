// admob.config.json वाचून www/ads-config.js बनवतो, android प्रोजेक्ट तयार करतो व AdMob App ID manifest मध्ये टाकतो.
const fs = require("fs"), cp = require("child_process");
const run = c => cp.execSync(c, { stdio: "inherit" });
const cfg = JSON.parse(fs.readFileSync("admob.config.json", "utf8"));
fs.writeFileSync("www/ads-config.js", "window.ADCFG=" + JSON.stringify(cfg) + ";\n");
if (!fs.existsSync("android")) run("npx cap add android");
const mf = "android/app/src/main/AndroidManifest.xml";
let m = fs.readFileSync(mf, "utf8");
if (!m.includes("com.google.android.gms.ads.APPLICATION_ID"))
  m = m.replace("</application>", `    <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="${cfg.appId}"/>\n    </application>`);
if (!m.includes("permission.AD_ID"))
  m = m.replace("<application", `<uses-permission android:name="com.google.android.gms.permission.AD_ID"/>\n    <application`);
fs.writeFileSync(mf, m);
const gf = "android/app/build.gradle";
let g = fs.readFileSync(gf, "utf8");
const vc = process.env.GITHUB_RUN_NUMBER || "1";
g = g.replace(/versionCode\s+\d+/, "versionCode " + vc);
fs.writeFileSync(gf, g);
run("npx cap sync android");
console.log("तयार ✔  testing=" + cfg.testing + "  versionCode=" + vc);
