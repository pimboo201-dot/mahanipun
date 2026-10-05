# महानिपुण विद्यार्थी स्तर पडताळणी (Capacitor + AdMob)

## APK कसा बनवायचा (GitHub Actions)
1. GitHub वर नवीन repo बनवा व या फोल्डरमधील सर्व फाईल्स `main` branch वर अपलोड करा.
2. `capacitor.config.json` मधील `appId` व `admob.config.json` मधील `pkg`, `dev`, `mail` तुमच्या माहितीने बदला (दोन्ही ठिकाणी package नाव सारखेच हवे).
3. **Actions** टॅबमध्ये "Android Build" चालेल. संपल्यावर **Artifacts → debug-apk** डाउनलोड करून फोनवर इन्स्टॉल करा.

## AdMob (आधी टेस्ट, मग खरे)
- सध्या Google चे **टेस्ट ID** आहेत (`"testing": true`). यावर क्लिक केले तरी चालते.
- AdMob मध्ये ॲप जोडून App ID, Banner ID, Rewarded ID घ्या व `admob.config.json` मध्ये टाका, आणि `"testing": false` करा.
- स्वतःच्या खऱ्या जाहिरातींवर स्वतः क्लिक करू नका (खाते बंद होऊ शकते).

## जाहिराती कुठे दिसतात
- **Banner:** खाली, फोनच्या navigation bar च्या वर. फक्त मुख्य, अहवाल, About, प्रायव्हसी पानांवर. परीक्षा, निकाल, बॅकअप व रेटिंग पानांवर लपवलेला (चुकून क्लिक टाळण्यासाठी).
- **Rewarded:** फक्त निकाल पानावर "📺 जाहिरात पाहा +२ ⭐" बटण दाबल्यावर (वापरकर्त्याच्या संमतीने). जाहिरात आधीच लोड असते.

## Play Store साठी (signed AAB)
Repo → Settings → Secrets → Actions मध्ये टाका: `KEYSTORE_BASE64` (keystore फाईलचे base64), `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`. मग **release-signed** artifact मध्ये `app-release.aab` मिळेल.
Keystore बनवा: `keytool -genkeypair -v -keystore release.keystore -alias mahanipun -keyalg RSA -keysize 2048 -validity 10000` आणि `base64 -w0 release.keystore`. Keystore सुरक्षित ठेवा, हरवला तर अपडेट देता येणार नाही.

## प्रायव्हसी पॉलिसी URL
`docs/privacy.html` मध्ये ईमेल बदला. Repo → Settings → Pages → Branch `main`, folder `/docs`. मिळालेली URL Play Console मध्ये द्या.

## Play Console सूचना
- Contains ads: **Yes**. Data safety: Advertising ID / device ID जाहिरातींसाठी गोळा होतो असे घोषित करा.
- Target audience: शिक्षक / प्रौढ. AdMob मध्ये ad content rating "G" व संवेदनशील categories ब्लॉक करा.
- App icon: `resources/icon.png` (1024×1024) ठेवून `npx @capacitor/assets generate --android` चालवा.
