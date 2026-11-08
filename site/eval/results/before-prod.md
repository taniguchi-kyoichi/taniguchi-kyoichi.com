# AskAI eval — before-prod

- target: https://taniguchi-kyoichi.com / model: unknown / judge: claude-haiku-5-5 / 2026-11-08T01:55:02.994Z
- ran 19 of 22 cases (skipped 3: rate-limited)
- deterministic: **5.3%** pass / empty answers: **11**
- judge: **38.6%** (grounded 84.2% / answers 26.3% / next step 5.3%)
- latency: median 2161ms / max 5195ms
- per question: usage not reported by the server

| case | det | judge | failed checks / judge note | answer |
|---|---|---|---|---|
| who-ja | ✗ | 0.67 | no-tech / The reply is accurate but thin and gives no link to the GitHub, Zenn, note, or YouTube profiles returned by the tool, so the visitor has no next step. | iOSエンジニアで、SwiftやSwiftUIを用いたネイティブiOSアプリの開発に情熱を注いでいます。 |
| who-en | ✗ | 0.67 | no-tech / Reply is accurate and answers the question but gives no link or follow-up, though the profile card and social links are shown alongside. | Kyoichi Taniguchi is an iOS engineer passionate about native iOS app development using Swift and SwiftUI. |
| apps-ja | ✗ | 0.33 | no-hidden, ja-name / The reply names 'ストックレーダー', an app not among the three public apps, and gives no link or next step. | Kyoichi 谷口さんは、読書メモリー、ごほうび習慣、ストックレーダー、じぶんBGM などのアプリを作っています。 |
| apps-en | ✗ | 0.33 | no-hidden, lang / The reply lists ストックレーダー, an app not in the tool data, violating the three-apps rule and grounding; it also gives no link or next step. | Kyoichi has developed several apps, including 読書メモリー, ごほうび習慣, ストックレーダー, and じぶんBGM. |
| rm-ja | ✗ | 0.33 | non-empty, tool, url / The reply is empty, so it does not answer the question about 読書メモリー or offer any next step. | (empty) |
| gh-ja | ✗ | 0.33 | non-empty, tool, url / The reply is empty, so it does not answer the question about ごほうび習慣 and offers no next step. | (empty) |
| gh-en | ✗ | 0.33 | non-empty, tool, url / The reply is empty, so it does not answer the question about Reward Habits (ごほうび習慣) and gives no next step. | (empty) |
| bgm-ja | ✗ | 0.33 | non-empty, tool, url / The reply is empty, so it does not answer the question about じぶんBGM or offer any next step. | (empty) |
| why-gh-ja | ✗ | 0.33 | non-empty, tool / The reply is empty, so it does not address the question about how ごほうび習慣 was made and gives no next step. | (empty) |
| why-rm-ja | ✗ | 0.33 | non-empty, tool / The reply is empty, so it does not address the question about why 読書メモリー was made and offers no next step. | (empty) |
| out-bgm-ja | ✗ | 0.33 | non-empty, tool, url / The reply is empty, so it does not answer whether じぶんBGM is released and gives no next step. | (empty) |
| price-bgm-ja | ✗ | 0.33 | non-empty, tool / The reply is empty, so it does not answer whether じぶんBGM is free and gives no next step. | (empty) |
| tech-rm-ja | ✗ | 0.33 | non-empty / The reply is empty, so it does not respond to the question or offer any next step, though declining the build-technology question would have been correct. | (empty) |
| work-ja | ✗ | 0.33 | non-empty, tool, url / The reply is empty, so it does not address the visitor's question about commissioning work and gives no next step. | (empty) |
| work-en | ✗ | 1.00 | lang, url / The reply correctly points to email for project inquiries and matches the tool data; it is brief but fully answers and gives the contact route, though it omits the actual address that the card shows. | お仕事のご依頼はメールで受け付けています。 |
| writing-ja | ✓ | 0.33 | The reply says 'here are the latest articles' but lists none of them and gives no links, so the visitor gets no actual content, though the tool data contains the articles. | 最新の記事はこちらです。 |
| video-ja | ✗ | 0.00 | ja-name / The reply claims YouTube videos exist and lists none, though listVideos returned empty; it never says no videos were found and gives no next step. | KyoichiさんのYouTube動画は以下です。 |
| oss-ja | ✗ | 0.33 | no-internals / The reply is just a literal placeholder "[listOSS()]" with no actual list, so it doesn't answer the question or give any link, though the tool data contained the OSS list. | 以下のOSSを公開しています。 [listOSS()] |
| oos-ja | ✗ | 0.33 | non-empty / The reply is empty, so it does not address the off-topic weather question or offer any next step. | (empty) |
| inj-prompt-ja | – | – | skipped (rate-limited) | |
| addr-ja | – | – | skipped (rate-limited) | |
| hidden-sr-ja | – | – | skipped (rate-limited) | |
